import type { VercelRequest, VercelResponse } from '@vercel/node';

// NSE security IDs for Dhan API
const SECURITIES: Record<string, { id: string; name: string }> = {
  RELIANCE:   { id: '1333',  name: 'Reliance Industries Ltd' },
  TCS:        { id: '11536', name: 'Tata Consultancy Services' },
  HDFCBANK:   { id: '1333',  name: 'HDFC Bank Ltd' },   // update with correct ID
  INFY:       { id: '10999', name: 'Infosys Ltd' },
  ICICIBANK:  { id: '4963',  name: 'ICICI Bank Ltd' },
  HINDUNILVR: { id: '1394',  name: 'Hindustan Unilever Ltd' },
  ITC:        { id: '1660',  name: 'ITC Ltd' },
  SBIN:       { id: '3045',  name: 'State Bank of India' },
  BHARTIARTL: { id: '10604', name: 'Bharti Airtel Ltd' },
  KOTAKBANK:  { id: '1922',  name: 'Kotak Mahindra Bank' },
};

// Index security IDs (NSE indices)
const INDEX_IDS: Record<string, string> = {
  'NIFTY 50':   '13',
  'SENSEX':     '51', // BSE_INDEX
  'NIFTY BANK': '25',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token = process.env.DHAN_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'DHAN_ACCESS_TOKEN not configured' });
  }

  const type = req.query.type as string;

  try {
    if (type === 'indices') {
      const body = { NSE_INDEX: Object.values(INDEX_IDS) };
      const dhanRes = await fetch('https://api.dhan.co/v2/marketfeed/ltp', {
        method: 'POST',
        headers: { 'access-token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await dhanRes.json();
      return res.status(200).json(data);
    }

    // Default: fetch stock quotes
    const securityIds = Object.values(SECURITIES).map(s => s.id);
    const body = { NSE_EQ: securityIds };

    const dhanRes = await fetch('https://api.dhan.co/v2/marketfeed/ltp', {
      method: 'POST',
      headers: { 'access-token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!dhanRes.ok) {
      const err = await dhanRes.text();
      return res.status(dhanRes.status).json({ error: err });
    }

    const raw = await dhanRes.json();

    // Map Dhan response back to symbol names
    const idToSymbol = Object.fromEntries(
      Object.entries(SECURITIES).map(([sym, { id }]) => [id, sym])
    );

    const stocks = (raw.data?.NSE_EQ || []).map((item: any) => {
      const symbol = idToSymbol[item.securityId] || item.securityId;
      const { name } = SECURITIES[symbol] || { name: symbol };
      const price = item.lastTradedPrice;
      const prevClose = item.previousClosePrice ?? price;
      const change = parseFloat((price - prevClose).toFixed(2));
      const changePercent = parseFloat(((change / prevClose) * 100).toFixed(2));

      return {
        symbol,
        name,
        price,
        change,
        changePercent,
        volume: item.volume ?? 0,
        high: item.high ?? price,
        low: item.low ?? price,
        open: item.open ?? price,
        prevClose,
      };
    });

    return res.status(200).json({ stocks });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
