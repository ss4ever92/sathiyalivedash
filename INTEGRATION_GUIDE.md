# Integration Guide: Connecting to Real Market Data

## Overview

Currently, the dashboard uses simulated data. Here's how to integrate with real Indian stock market APIs.

## Recommended APIs for Indian Markets

### 1. Alpha Vantage (Free Tier Available)
**Best for**: Historical data and basic real-time quotes

```typescript
// src/services/alphaVantageService.ts
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchRealTimeQuote(symbol: string) {
  const response = await fetch(
    `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${API_KEY}`
  );
  const data = await response.json();
  
  return {
    symbol: symbol,
    price: parseFloat(data['Global Quote']['05. price']),
    change: parseFloat(data['Global Quote']['09. change']),
    changePercent: parseFloat(data['Global Quote']['10. change percent']),
    volume: parseInt(data['Global Quote']['06. volume']),
    // ... map other fields
  };
}
```

### 2. Yahoo Finance API (Unofficial)
**Best for**: Free, comprehensive data

```typescript
// Using yfinance or similar libraries
import yahooFinance from 'yahoo-finance2';

export async function fetchYahooData(symbol: string) {
  const quote = await yahooFinance.quote(`${symbol}.NS`); // .NS for NSE
  
  return {
    symbol: symbol,
    price: quote.regularMarketPrice,
    change: quote.regularMarketChange,
    changePercent: quote.regularMarketChangePercent,
    volume: quote.regularMarketVolume,
    high: quote.regularMarketDayHigh,
    low: quote.regularMarketDayLow,
    open: quote.regularMarketOpen,
    prevClose: quote.regularMarketPreviousClose,
  };
}
```

### 3. NSE India Official API
**Best for**: Official exchange data

```typescript
// NSE provides unofficial APIs that can be accessed
const NSE_BASE = 'https://www.nseindia.com/api';

export async function fetchNSEQuote(symbol: string) {
  const response = await fetch(
    `${NSE_BASE}/quote-equity?symbol=${symbol}`,
    {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      }
    }
  );
  
  const data = await response.json();
  
  return {
    symbol: symbol,
    price: data.priceInfo.lastPrice,
    change: data.priceInfo.change,
    changePercent: data.priceInfo.pChange,
    volume: data.preOpenMarket.totalTradedVolume,
    // ... map other fields
  };
}
```

### 4. Zerodha Kite Connect (Paid)
**Best for**: Trading integration, most reliable

```typescript
import KiteConnect from 'kiteconnect';

const kite = new KiteConnect({
  api_key: 'YOUR_API_KEY'
});

// After authentication
export async function fetchKiteQuote(symbol: string) {
  const quotes = await kite.getQuote([`NSE:${symbol}`]);
  const quote = quotes[`NSE:${symbol}`];
  
  return {
    symbol: symbol,
    price: quote.last_price,
    change: quote.change,
    changePercent: quote.change_percent,
    volume: quote.volume,
    high: quote.ohlc.high,
    low: quote.ohlc.low,
    open: quote.ohlc.open,
    prevClose: quote.ohlc.close,
  };
}
```

## Step-by-Step Integration

### Step 1: Install Required Packages

```bash
npm install axios
# OR for Yahoo Finance
npm install yahoo-finance2
# OR for Zerodha
npm install kiteconnect
```

### Step 2: Create Environment Variables

Create `.env` file:
```env
VITE_ALPHA_VANTAGE_KEY=your_key_here
VITE_KITE_API_KEY=your_key_here
VITE_KITE_API_SECRET=your_secret_here
```

### Step 3: Update Market Data Service

Replace `src/services/marketDataService.ts`:

```typescript
import axios from 'axios';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

export async function fetchLiveStockData(): Promise<Stock[]> {
  const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK'];
  
  const promises = symbols.map(symbol => 
    axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: `${symbol}.BSE`,
        apikey: API_KEY
      }
    })
  );
  
  const results = await Promise.all(promises);
  
  return results.map((result, index) => {
    const quote = result.data['Global Quote'];
    return {
      symbol: symbols[index],
      name: getStockName(symbols[index]),
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      prevClose: parseFloat(quote['08. previous close']),
    };
  });
}
```

### Step 4: Add News/Sentiment API

For real sentiment analysis, integrate news APIs:

```typescript
// Using News API
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchStockNews(symbol: string) {
  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: symbol,
      language: 'en',
      sortBy: 'publishedAt',
      apiKey: NEWS_API_KEY
    }
  });
  
  // Analyze sentiment using a library like 'sentiment'
  const Sentiment = require('sentiment');
  const sentiment = new Sentiment();
  
  const articles = response.data.articles;
  const scores = articles.map(article => 
    sentiment.analyze(article.title + ' ' + article.description).score
  );
  
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  return {
    sentiment: avgScore > 0 ? 'positive' : avgScore < 0 ? 'negative' : 'neutral',
    score: avgScore,
    articles: articles.slice(0, 5)
  };
}
```

### Step 5: WebSocket for Real-Time Updates

For live updates, use WebSocket:

```typescript
export function connectToMarketFeed(onUpdate: (data: Stock) => void) {
  const ws = new WebSocket('wss://your-websocket-endpoint');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(parseStockData(data));
  };
  
  return () => ws.close();
}

// In App.tsx
useEffect(() => {
  const disconnect = connectToMarketFeed((stock) => {
    setStocks(prev => prev.map(s => 
      s.symbol === stock.symbol ? stock : s
    ));
  });
  
  return disconnect;
}, []);
```

## API Comparison

| API | Cost | Rate Limit | Real-time | Best For |
|-----|------|------------|-----------|----------|
| Alpha Vantage | Free tier + Paid | 5 req/min (free) | No | Learning/Testing |
| Yahoo Finance | Free | Unlimited | ~15min delay | Free projects |
| NSE Official | Free | Varies | Yes | Indian markets |
| Zerodha Kite | ₹2000/month | High | Yes | Trading bots |
| Upstox | ₹1500/month | High | Yes | Alternative to Kite |

## Rate Limiting Best Practices

```typescript
// Implement caching
const cache = new Map();
const CACHE_DURATION = 60000; // 1 minute

export async function fetchWithCache(key: string, fetchFn: () => Promise<any>) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

## Error Handling

```typescript
export async function safeFetch(fetchFn: () => Promise<any>) {
  try {
    return await fetchFn();
  } catch (error) {
    console.error('API Error:', error);
    // Fall back to cached data or show error to user
    return null;
  }
}
```

## Testing with Mock Data

Keep the mock data service for development:

```typescript
// src/services/marketDataService.ts
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export function fetchLiveStockData() {
  if (USE_MOCK_DATA) {
    return fetchMockStockData();
  }
  return fetchRealStockData();
}
```

## Legal & Compliance

⚠️ **Important Notes:**
- Always check API Terms of Service
- Some exchanges prohibit data reselling
- For production, consider official data providers
- Implement proper rate limiting
- Add appropriate disclaimers

## Support & Resources

- NSE India Developer Resources: https://www.nseindia.com/
- BSE India: https://www.bseindia.com/
- SEBI Guidelines: https://www.sebi.gov.in/
- Zerodha Kite Docs: https://kite.trade/docs/connect/v3/
- Alpha Vantage Docs: https://www.alphavantage.co/documentation/

---

For questions or issues, feel free to open an issue on GitHub!
