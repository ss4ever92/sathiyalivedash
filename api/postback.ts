import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dhan sends POST here on every order status change
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;

    // Dhan postback payload fields:
    // orderId, exchangeOrderId, orderStatus, tradingSymbol, transactionType,
    // quantity, price, orderType, productType, fillQty, fillPrice, remarks

    console.log('[Dhan Postback]', JSON.stringify(payload));

    const {
      orderId,
      orderStatus,
      tradingSymbol,
      transactionType,
      quantity,
      price,
      fillQty,
      fillPrice,
    } = payload;

    // You can extend this to:
    // - Write to a database (Supabase, PlanetScale, etc.)
    // - Send a Telegram notification
    // - Trigger a UI refresh via websocket/SSE

    console.log(
      `Order ${orderId} | ${tradingSymbol} | ${transactionType} ${quantity}@${price} | Status: ${orderStatus} | Filled: ${fillQty}@${fillPrice}`
    );

    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('[Dhan Postback Error]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
