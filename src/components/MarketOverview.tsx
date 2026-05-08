import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '../types';

interface MarketOverviewProps {
  indices: MarketData[];
}

export default function MarketOverview({ indices }: MarketOverviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((index) => (
          <div key={index.index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{index.index}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {index.value.toFixed(2)}
                </p>
              </div>
              <div className={`flex items-center ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index.change >= 0 ? (
                  <TrendingUp className="w-6 h-6" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm font-semibold ${
              index.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}</span>
              <span className="ml-2">({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
