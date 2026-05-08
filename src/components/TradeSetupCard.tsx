import { Target, ArrowUpCircle, ArrowDownCircle, AlertTriangle } from 'lucide-react';
import { TradeSetup } from '../types';

interface TradeSetupCardProps {
  setup: TradeSetup;
}

export default function TradeSetupCard({ setup }: TradeSetupCardProps) {
  const actionColor = setup.action === 'BUY' ? 'green' : 'red';
  const ActionIcon = setup.action === 'BUY' ? ArrowUpCircle : ArrowDownCircle;
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border-2 border-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Recommended Trade Setup</h2>
        </div>
        <div className={`flex items-center px-4 py-2 rounded-full bg-${actionColor}-100 border-2 border-${actionColor}-300`}>
          <ActionIcon className={`w-5 h-5 text-${actionColor}-700 mr-2`} />
          <span className={`font-bold text-${actionColor}-700 text-lg`}>{setup.action}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Stock Symbol</p>
            <p className="text-2xl font-bold text-gray-900">{setup.symbol}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Entry Price</p>
            <p className="text-xl font-bold text-gray-900">₹{setup.entryPrice.toFixed(2)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Quantity</p>
            <p className="text-xl font-bold text-gray-900">{setup.quantity} shares</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
            <p className="text-sm text-green-700 font-medium mb-1">Target Price</p>
            <p className="text-xl font-bold text-green-800">₹{setup.targetPrice.toFixed(2)}</p>
            <p className="text-sm text-green-600 mt-1">
              Potential Profit: ₹{(Math.abs(setup.targetPrice - setup.entryPrice) * setup.quantity).toFixed(2)}
            </p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 shadow-sm border border-red-200">
            <p className="text-sm text-red-700 font-medium mb-1">Stop Loss</p>
            <p className="text-xl font-bold text-red-800">₹{setup.stopLoss.toFixed(2)}</p>
            <p className="text-sm text-red-600 mt-1">
              Max Risk: ₹{(Math.abs(setup.entryPrice - setup.stopLoss) * setup.quantity).toFixed(2)}
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200">
            <p className="text-sm text-blue-700 font-medium mb-1">Risk:Reward Ratio</p>
            <p className="text-xl font-bold text-blue-800">1:{setup.riskRewardRatio.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-700">Confidence Level</p>
          <p className="text-lg font-bold text-indigo-600">{setup.confidence}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
            style={{ width: `${setup.confidence}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Timeframe</p>
        <p className="text-gray-900">{setup.timeframe}</p>
      </div>
      
      <div className="bg-amber-50 rounded-lg p-4 shadow-sm border border-amber-200">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">AI Analysis Summary</p>
            <p className="text-sm text-amber-900">{setup.reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
