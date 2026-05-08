import { Stock, MarketData } from '../types';

const API_BASE = '/api/quotes';

export async function fetchLiveStockData(): Promise<Stock[]> {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const { stocks } = await res.json();
    return stocks;
  } catch (err) {
    console.error('fetchLiveStockData failed, using mock:', err);
    return getMockStocks();
  }
}

export async function fetchStockDetails(symbol: string): Promise<Stock> {
  const stocks = await fetchLiveStockData();
  return stocks.find(s => s.symbol === symbol) ?? stocks[0];
}

export async function fetchMarketIndices(): Promise<MarketData[]> {
  try {
    const res = await fetch(`${API_BASE}?type=indices`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const raw = await res.json();

    const indexMap: Record<string, string> = { '13': 'NIFTY 50', '51': 'SENSEX', '25': 'NIFTY BANK' };
    return (raw.data?.NSE_INDEX || []).map((item: any) => {
      const value = item.lastTradedPrice;
      const prevClose = item.previousClosePrice ?? value;
      const change = parseFloat((value - prevClose).toFixed(2));
      return {
        index: indexMap[item.securityId] ?? item.securityId,
        value: parseFloat(value.toFixed(2)),
        change,
        changePercent: parseFloat(((change / prevClose) * 100).toFixed(2)),
      };
    });
  } catch (err) {
    console.error('fetchMarketIndices failed, using mock:', err);
    return getMockIndices();
  }
}

export async function fetchHistoricalData(_symbol: string, days: number = 30) {
  // Dhan historical candles endpoint — requires separate integration
  return getMockHistorical(days);
}

// ── Fallback mock data ──────────────────────────────────────────────────────

function getMockStocks(): Stock[] {
  const STOCKS = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
    { symbol: 'TCS', name: 'Tata Consultancy Services' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd' },
    { symbol: 'INFY', name: 'Infosys Ltd' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd' },
  ];
  return STOCKS.map(({ symbol, name }) => {
    const price = parseFloat((Math.random() * 3000 + 100).toFixed(2));
    const change = parseFloat(((Math.random() - 0.5) * 80).toFixed(2));
    return {
      symbol, name, price,
      change,
      changePercent: parseFloat(((change / price) * 100).toFixed(2)),
      volume: Math.floor(Math.random() * 1e7),
      high: parseFloat((price * 1.02).toFixed(2)),
      low: parseFloat((price * 0.98).toFixed(2)),
      open: parseFloat((price - change).toFixed(2)),
      prevClose: parseFloat((price - change).toFixed(2)),
    };
  });
}

function getMockIndices(): MarketData[] {
  return [
    { index: 'NIFTY 50',   value: 21500, change: 80,  changePercent: 0.37 },
    { index: 'SENSEX',     value: 71000, change: 240, changePercent: 0.34 },
    { index: 'NIFTY BANK', value: 45000, change: 150, changePercent: 0.33 },
  ];
}

function getMockHistorical(days: number) {
  const data = [];
  const now = new Date();
  let price = 1500;
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    price += (Math.random() - 0.48) * 50;
    data.push({ date: date.toISOString().split('T')[0], price: parseFloat(price.toFixed(2)), volume: Math.floor(Math.random() * 5e6) });
  }
  return data;
}
