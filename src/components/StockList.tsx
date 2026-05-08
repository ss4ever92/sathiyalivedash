import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types';

interface StockListProps {
  stocks: Stock[];
  onSelectStock: (symbol: string) => void;
  selectedStock: string | null;
}

export default function StockList({ stocks, onSelectStock, selectedStock }: StockListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Stocks</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Symbol</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Name</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">Change</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => onSelectStock(stock.symbol)}
                className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${
                  selectedStock === stock.symbol ? 'bg-blue-50' : ''
                }`}
              >
                <td className="py-3 px-2">
                  <span className="font-semibold text-gray-900">{stock.symbol}</span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-600">{stock.name}</span>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="font-semibold text-gray-900">₹{stock.price.toFixed(2)}</span>
                </td>
                <td className="py-3 px-2 text-right">
                  <div className={`flex items-center justify-end ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span className="text-sm font-semibold">
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="text-sm text-gray-600">
                    {(stock.volume / 1000000).toFixed(2)}M
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
