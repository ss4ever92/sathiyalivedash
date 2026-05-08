import { Stock, MarketData } from '../types';

// Simulated live market data - In production, replace with actual API calls
// For Indian market: NSE/BSE APIs, Alpha Vantage, Yahoo Finance, etc.

const INDIAN_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd' },
  { symbol: 'INFY', name: 'Infosys Ltd' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd' },
  { symbol: 'ITC', name: 'ITC Ltd' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank' },
];

// Generate realistic stock data with Indian market characteristics
function generateStockData(symbol: string, name: string): Stock {
  const basePrice = Math.random() * 3000 + 100;
  const changePercent = (Math.random() - 0.5) * 8; // ±4%
  const change = basePrice * (changePercent / 100);
  const price = basePrice + change;
  
  return {
    symbol,
    name,
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    volume: Math.floor(Math.random() * 10000000) + 100000,
    high: parseFloat((price * (1 + Math.random() * 0.03)).toFixed(2)),
    low: parseFloat((price * (1 - Math.random() * 0.03)).toFixed(2)),
    open: parseFloat((basePrice + (Math.random() - 0.5) * 20).toFixed(2)),
    prevClose: parseFloat(basePrice.toFixed(2)),
  };
}

export function fetchLiveStockData(): Stock[] {
  return INDIAN_STOCKS.map(stock => generateStockData(stock.symbol, stock.name));
}

export function fetchStockDetails(symbol: string): Stock {
  const stock = INDIAN_STOCKS.find(s => s.symbol === symbol) || INDIAN_STOCKS[0];
  return generateStockData(stock.symbol, stock.name);
}

export function fetchMarketIndices(): MarketData[] {
  return [
    {
      index: 'NIFTY 50',
      value: 21500 + Math.random() * 500,
      change: (Math.random() - 0.5) * 200,
      changePercent: (Math.random() - 0.5) * 2,
    },
    {
      index: 'SENSEX',
      value: 71000 + Math.random() * 1000,
      change: (Math.random() - 0.5) * 400,
      changePercent: (Math.random() - 0.5) * 2,
    },
    {
      index: 'NIFTY BANK',
      value: 45000 + Math.random() * 1000,
      change: (Math.random() - 0.5) * 300,
      changePercent: (Math.random() - 0.5) * 2.5,
    },
  ].map(index => ({
    ...index,
    value: parseFloat(index.value.toFixed(2)),
    change: parseFloat(index.change.toFixed(2)),
    changePercent: parseFloat(index.changePercent.toFixed(2)),
  }));
}

// Historical data for charts
export function fetchHistoricalData(_symbol: string, days: number = 30) {
  const data = [];
  const now = new Date();
  let basePrice = Math.random() * 2000 + 500;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random walk with slight upward bias
    const change = (Math.random() - 0.48) * 50;
    basePrice += change;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(basePrice.toFixed(2)),
      volume: Math.floor(Math.random() * 5000000) + 500000,
    });
  }
  
  return data;
}
