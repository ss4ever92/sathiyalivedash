import { AgentAnalysis, Stock, TradeSetup } from '../types';

// Technical Analysis Agent
export class TechnicalAnalysisAgent {
  analyze(stock: Stock, historicalData: any[]): AgentAnalysis {
    const rsi = this.calculateRSI(historicalData);
    const macd = this.calculateMACD(historicalData);
    const support = stock.price * 0.97;
    const resistance = stock.price * 1.03;
    
    let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    let confidence = 0;
    const keyPoints: string[] = [];
    
    // RSI analysis
    if (rsi < 30) {
      signal = 'BUY';
      confidence += 30;
      keyPoints.push(`RSI at ${rsi.toFixed(2)} - Oversold condition`);
    } else if (rsi > 70) {
      signal = 'SELL';
      confidence += 30;
      keyPoints.push(`RSI at ${rsi.toFixed(2)} - Overbought condition`);
    } else {
      keyPoints.push(`RSI at ${rsi.toFixed(2)} - Neutral zone`);
    }
    
    // MACD analysis
    if (macd.histogram > 0) {
      if (signal !== 'SELL') signal = 'BUY';
      confidence += 25;
      keyPoints.push('MACD showing bullish momentum');
    } else {
      if (signal !== 'BUY') signal = 'SELL';
      confidence += 25;
      keyPoints.push('MACD showing bearish momentum');
    }
    
    // Price action
    if (stock.changePercent > 2) {
      keyPoints.push('Strong upward momentum detected');
      confidence += 15;
    } else if (stock.changePercent < -2) {
      keyPoints.push('Strong downward pressure detected');
      confidence += 15;
    }
    
    keyPoints.push(`Support at ₹${support.toFixed(2)}, Resistance at ₹${resistance.toFixed(2)}`);
    
    confidence = Math.min(confidence, 95);
    
    return {
      agentName: 'Technical Analysis Agent',
      agentType: 'technical',
      confidence,
      signal,
      analysis: `Based on technical indicators, ${stock.symbol} shows ${signal} signals with ${confidence}% confidence. Current price action suggests ${stock.changePercent > 0 ? 'bullish' : 'bearish'} momentum.`,
      keyPoints,
      timestamp: new Date(),
    };
  }
  
  private calculateRSI(data: any[]): number {
    if (data.length < 14) return 50;
    
    const prices = data.slice(-14).map(d => d.price);
    let gains = 0, losses = 0;
    
    for (let i = 1; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff > 0) gains += diff;
      else losses += Math.abs(diff);
    }
    
    const avgGain = gains / 14;
    const avgLoss = losses / 14;
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
  
  private calculateMACD(data: any[]): { macd: number; signal: number; histogram: number } {
    const prices = data.map(d => d.price);
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    const macd = ema12 - ema26;
    const signal = macd * 0.9; // Simplified signal line
    
    return {
      macd,
      signal,
      histogram: macd - signal,
    };
  }
  
  private calculateEMA(prices: number[], period: number): number {
    const k = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * k + ema * (1 - k);
    }
    
    return ema;
  }
}

// Fundamental Analysis Agent
export class FundamentalAnalysisAgent {
  analyze(stock: Stock): AgentAnalysis {
    // Simulate fundamental metrics
    const pe = 15 + Math.random() * 30;
    const pb = 2 + Math.random() * 8;
    const roe = 10 + Math.random() * 20;
    const debtEquity = Math.random() * 1.5;
    
    let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    let confidence = 0;
    const keyPoints: string[] = [];
    
    // P/E analysis
    if (pe < 20) {
      signal = 'BUY';
      confidence += 25;
      keyPoints.push(`P/E ratio of ${pe.toFixed(2)} indicates undervaluation`);
    } else if (pe > 35) {
      signal = 'SELL';
      confidence += 25;
      keyPoints.push(`P/E ratio of ${pe.toFixed(2)} suggests overvaluation`);
    } else {
      keyPoints.push(`P/E ratio of ${pe.toFixed(2)} is fairly valued`);
    }
    
    // ROE analysis
    if (roe > 18) {
      if (signal !== 'SELL') signal = 'BUY';
      confidence += 30;
      keyPoints.push(`Strong ROE of ${roe.toFixed(2)}% shows good profitability`);
    } else if (roe < 12) {
      keyPoints.push(`ROE of ${roe.toFixed(2)}% indicates moderate profitability`);
    }
    
    // Debt analysis
    if (debtEquity < 0.5) {
      confidence += 20;
      keyPoints.push(`Low debt-equity ratio of ${debtEquity.toFixed(2)} - Strong balance sheet`);
    } else if (debtEquity > 1) {
      confidence -= 10;
      keyPoints.push(`High debt-equity ratio of ${debtEquity.toFixed(2)} - Monitor leverage`);
    }
    
    keyPoints.push(`P/B ratio: ${pb.toFixed(2)}`);
    confidence = Math.max(0, Math.min(confidence, 90));
    
    return {
      agentName: 'Fundamental Analysis Agent',
      agentType: 'fundamental',
      confidence,
      signal,
      analysis: `Fundamental analysis suggests ${stock.symbol} is ${signal === 'BUY' ? 'undervalued' : signal === 'SELL' ? 'overvalued' : 'fairly valued'} based on key financial metrics.`,
      keyPoints,
      timestamp: new Date(),
    };
  }
}

// Sentiment Analysis Agent
export class SentimentAnalysisAgent {
  analyze(stock: Stock): AgentAnalysis {
    // Simulate sentiment from news, social media, analyst ratings
    const newsSentiment = Math.random() * 100;
    const socialSentiment = Math.random() * 100;
    const analystRating = Math.random() * 5;
    
    const avgSentiment = (newsSentiment + socialSentiment + analystRating * 20) / 3;
    
    let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    const keyPoints: string[] = [];
    
    if (avgSentiment > 65) {
      signal = 'BUY';
      keyPoints.push('Positive market sentiment detected');
    } else if (avgSentiment < 35) {
      signal = 'SELL';
      keyPoints.push('Negative market sentiment detected');
    } else {
      keyPoints.push('Neutral market sentiment');
    }
    
    if (newsSentiment > 70) {
      keyPoints.push('Strong positive news coverage');
    } else if (newsSentiment < 30) {
      keyPoints.push('Concerning news developments');
    }
    
    if (socialSentiment > 65) {
      keyPoints.push('High social media buzz - Retail investor interest');
    }
    
    keyPoints.push(`Analyst consensus: ${analystRating > 3 ? 'Buy' : analystRating > 2 ? 'Hold' : 'Sell'}`);
    
    return {
      agentName: 'Sentiment Analysis Agent',
      agentType: 'sentiment',
      confidence: Math.round(avgSentiment),
      signal,
      analysis: `Market sentiment for ${stock.symbol} is ${avgSentiment > 65 ? 'positive' : avgSentiment < 35 ? 'negative' : 'neutral'} based on news, social media, and analyst ratings.`,
      keyPoints,
      timestamp: new Date(),
    };
  }
}

// Risk Management Agent
export class RiskManagementAgent {
  analyze(stock: Stock, historicalData: any[]): AgentAnalysis {
    const volatility = this.calculateVolatility(historicalData);
    const beta = 0.8 + Math.random() * 0.8; // Simulated beta
    const volumeRatio = stock.volume / 1000000;
    
    let signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL' = 'NEUTRAL';
    let confidence = 70;
    const keyPoints: string[] = [];
    
    // Volatility assessment
    if (volatility < 15) {
      signal = 'BUY';
      keyPoints.push(`Low volatility (${volatility.toFixed(2)}%) - Stable investment`);
      confidence += 15;
    } else if (volatility > 30) {
      signal = 'HOLD';
      keyPoints.push(`High volatility (${volatility.toFixed(2)}%) - Increased risk`);
      confidence -= 20;
    } else {
      keyPoints.push(`Moderate volatility (${volatility.toFixed(2)}%)`);
    }
    
    // Beta analysis
    if (beta < 1) {
      keyPoints.push(`Beta ${beta.toFixed(2)} - Less volatile than market`);
      confidence += 10;
    } else if (beta > 1.3) {
      keyPoints.push(`Beta ${beta.toFixed(2)} - Higher market sensitivity`);
    }
    
    // Liquidity check
    if (volumeRatio > 5) {
      keyPoints.push('High liquidity - Easy entry/exit');
      confidence += 10;
    } else if (volumeRatio < 1) {
      keyPoints.push('Lower liquidity - Consider position sizing');
      confidence -= 15;
    }
    
    // Risk recommendation
    const riskLevel = volatility > 25 ? 'High' : volatility > 15 ? 'Medium' : 'Low';
    keyPoints.push(`Risk Level: ${riskLevel}`);
    
    confidence = Math.max(30, Math.min(confidence, 95));
    
    return {
      agentName: 'Risk Management Agent',
      agentType: 'risk',
      confidence,
      signal,
      analysis: `Risk assessment for ${stock.symbol} indicates ${riskLevel.toLowerCase()} risk with volatility at ${volatility.toFixed(2)}%. ${volumeRatio > 5 ? 'Good liquidity' : 'Monitor liquidity'}.`,
      keyPoints,
      timestamp: new Date(),
    };
  }
  
  private calculateVolatility(data: any[]): number {
    if (data.length < 2) return 20;
    
    const returns = [];
    for (let i = 1; i < data.length; i++) {
      returns.push((data[i].price - data[i - 1].price) / data[i - 1].price);
    }
    
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance) * Math.sqrt(252) * 100; // Annualized volatility
  }
}

// Trade Setup Agent (Master Agent)
export class TradeSetupAgent {
  generateSetup(stock: Stock, analyses: AgentAnalysis[]): TradeSetup {
    // Aggregate all agent signals
    const buySignals = analyses.filter(a => a.signal === 'BUY').length;
    const sellSignals = analyses.filter(a => a.signal === 'SELL').length;
    const avgConfidence = analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length;
    
    const action: 'BUY' | 'SELL' = buySignals > sellSignals ? 'BUY' : 'SELL';
    const agreement = Math.max(buySignals, sellSignals) / analyses.length;
    
    // Calculate trade parameters
    const atr = Math.abs(stock.high - stock.low);
    
    let entryPrice, targetPrice, stopLoss;
    
    if (action === 'BUY') {
      entryPrice = stock.price;
      stopLoss = entryPrice - (atr * 1.5);
      targetPrice = entryPrice + (atr * 3);
    } else {
      entryPrice = stock.price;
      stopLoss = entryPrice + (atr * 1.5);
      targetPrice = entryPrice - (atr * 3);
    }
    
    const riskRewardRatio = Math.abs(targetPrice - entryPrice) / Math.abs(entryPrice - stopLoss);
    const quantity = Math.floor(100000 / entryPrice); // ₹1L position
    
    // Build reasoning
    const reasoning = this.buildReasoning(analyses, action, agreement);
    
    return {
      symbol: stock.symbol,
      action,
      entryPrice: parseFloat(entryPrice.toFixed(2)),
      targetPrice: parseFloat(targetPrice.toFixed(2)),
      stopLoss: parseFloat(stopLoss.toFixed(2)),
      quantity,
      riskRewardRatio: parseFloat(riskRewardRatio.toFixed(2)),
      timeframe: this.determineTimeframe(analyses),
      confidence: Math.round(avgConfidence * agreement),
      reasoning,
      agents: analyses,
    };
  }
  
  private buildReasoning(analyses: AgentAnalysis[], action: 'BUY' | 'SELL', agreement: number): string {
    const agreementPct = (agreement * 100).toFixed(0);
    const reasons = analyses
      .filter(a => a.signal === action)
      .map(a => a.agentName.replace(' Agent', ''))
      .join(', ');
    
    return `${agreementPct}% of AI agents (${reasons}) agree on ${action} signal. ${
      agreement > 0.75
        ? 'Strong consensus across multiple analysis dimensions.'
        : agreement > 0.5
        ? 'Moderate agreement with some conflicting signals.'
        : 'Mixed signals - proceed with caution.'
    }`;
  }
  
  private determineTimeframe(analyses: AgentAnalysis[]): string {
    const technicalAgent = analyses.find(a => a.agentType === 'technical');
    const fundamentalAgent = analyses.find(a => a.agentType === 'fundamental');
    
    if (fundamentalAgent && fundamentalAgent.confidence > 70) {
      return 'Medium to Long Term (3-12 months)';
    } else if (technicalAgent && technicalAgent.confidence > 70) {
      return 'Short to Medium Term (1-3 months)';
    }
    
    return 'Short Term (1-4 weeks)';
  }
}
