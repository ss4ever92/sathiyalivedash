export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}

export interface AgentAnalysis {
  agentName: string;
  agentType: 'technical' | 'fundamental' | 'sentiment' | 'risk' | 'setup';
  confidence: number;
  signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL';
  analysis: string;
  keyPoints: string[];
  timestamp: Date;
}

export interface TradeSetup {
  symbol: string;
  action: 'BUY' | 'SELL';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  quantity: number;
  riskRewardRatio: number;
  timeframe: string;
  confidence: number;
  reasoning: string;
  agents: AgentAnalysis[];
}

export interface MarketData {
  index: string;
  value: number;
  change: number;
  changePercent: number;
}
