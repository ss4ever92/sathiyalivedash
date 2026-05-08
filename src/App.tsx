import { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import MarketOverview from './components/MarketOverview';
import StockList from './components/StockList';
import AgentAnalysisPanel from './components/AgentAnalysisPanel';
import TradeSetupCard from './components/TradeSetupCard';
import StockChart from './components/StockChart';
import AgentWorkflow from './components/AgentWorkflow';
import { fetchLiveStockData, fetchMarketIndices, fetchHistoricalData } from './services/marketDataService';
import {
  TechnicalAnalysisAgent,
  FundamentalAnalysisAgent,
  SentimentAnalysisAgent,
  RiskManagementAgent,
  TradeSetupAgent,
} from './services/aiAgents';
import { Stock, AgentAnalysis, TradeSetup } from './types';

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [indices, setIndices] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<AgentAnalysis[]>([]);
  const [tradeSetup, setTradeSetup] = useState<TradeSetup | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize agents
  const technicalAgent = new TechnicalAnalysisAgent();
  const fundamentalAgent = new FundamentalAnalysisAgent();
  const sentimentAgent = new SentimentAnalysisAgent();
  const riskAgent = new RiskManagementAgent();
  const setupAgent = new TradeSetupAgent();

  // Load initial data
  useEffect(() => {
    loadMarketData();
    const interval = setInterval(loadMarketData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Analyze when stock is selected
  useEffect(() => {
    if (selectedStock) {
      analyzeStock(selectedStock);
    }
  }, [selectedStock]);

  const loadMarketData = async () => {
    const [stockData, indexData] = await Promise.all([
      fetchLiveStockData(),
      fetchMarketIndices(),
    ]);
    setStocks(stockData);
    setIndices(indexData);
  };

  const analyzeStock = async (symbol: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const stock = stocks.find(s => s.symbol === symbol) || stocks[0];
    const historical = await fetchHistoricalData(symbol);
    setHistoricalData(historical);
    
    // Run all AI agents
    const techAnalysis = technicalAgent.analyze(stock, historical);
    const fundAnalysis = fundamentalAgent.analyze(stock);
    const sentAnalysis = sentimentAgent.analyze(stock);
    const riskAnalysis = riskAgent.analyze(stock, historical);
    
    const allAnalyses = [techAnalysis, fundAnalysis, sentAnalysis, riskAnalysis];
    setAnalyses(allAnalyses);
    
    // Generate trade setup
    const setup = setupAgent.generateSetup(stock, allAnalyses);
    setTradeSetup(setup);
    
    setIsAnalyzing(false);
  };

  const handleRefresh = () => {
    loadMarketData();
    if (selectedStock) {
      analyzeStock(selectedStock);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mr-3">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Trading Dashboard</h1>
                <p className="text-sm text-gray-600">Indian Stock Market - Live Analysis</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Market Overview */}
        <div className="mb-8">
          <MarketOverview indices={indices} />
        </div>

        {/* Stock List */}
        <div className="mb-8">
          <StockList
            stocks={stocks}
            onSelectStock={setSelectedStock}
            selectedStock={selectedStock}
          />
        </div>

        {/* Analysis Section */}
        {selectedStock && (
          <>
            {isAnalyzing && (
              <div className="mb-8 bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
                  <p className="text-lg font-semibold text-gray-700">AI Agents Analyzing {selectedStock}...</p>
                  <p className="text-sm text-gray-500 mt-2">Running Technical, Fundamental, Sentiment & Risk Analysis</p>
                </div>
              </div>
            )}

            {!isAnalyzing && tradeSetup && (
              <>
                {/* Trade Setup Card */}
                <div className="mb-8">
                  <TradeSetupCard setup={tradeSetup} />
                </div>

                {/* Chart and Analysis Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <StockChart data={historicalData} symbol={selectedStock} />
                  <AgentAnalysisPanel analyses={analyses} />
                </div>
              </>
            )}
          </>
        )}

        {/* Initial State */}
        {!selectedStock && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-12 text-center mb-8">
              <div className="max-w-md mx-auto">
                <div className="inline-flex p-4 bg-indigo-100 rounded-full mb-4">
                  <Activity className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to AI Trading Dashboard
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a stock from the list above to get comprehensive AI-powered analysis and trade setup recommendations.
                </p>
                <div className="bg-indigo-50 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-indigo-900 mb-2">Our AI Agents:</h3>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li>📊 <strong>Technical Analysis</strong> - RSI, MACD, Price Action</li>
                    <li>💼 <strong>Fundamental Analysis</strong> - P/E, ROE, Balance Sheet</li>
                    <li>💬 <strong>Sentiment Analysis</strong> - News, Social Media, Analyst Ratings</li>
                    <li>🛡️ <strong>Risk Management</strong> - Volatility, Beta, Liquidity</li>
                    <li>🎯 <strong>Trade Setup</strong> - Entry, Target, Stop Loss</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Agent Workflow Visualization */}
            <AgentWorkflow />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            <strong>Disclaimer:</strong> This dashboard uses simulated data and AI analysis for demonstration purposes. 
            Always consult with a financial advisor before making investment decisions. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
