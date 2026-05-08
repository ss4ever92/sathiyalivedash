# AI Agents Architecture

## System Overview

The trading dashboard uses a **multi-agent AI system** where specialized agents work collaboratively to provide comprehensive stock analysis and trade recommendations.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      STOCK DATA INPUT                        │
│              (Price, Volume, Historical Data)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │    PARALLEL AGENT ANALYSIS     │
         └───────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Technical   │  │ Fundamental  │  │  Sentiment   │
│   Agent      │  │    Agent     │  │    Agent     │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       │                 │                 │
       │                 ▼                 │
       │          ┌──────────────┐         │
       │          │     Risk     │         │
       │          │   Management │         │
       │          │     Agent    │         │
       │          └──────┬───────┘         │
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  Trade Setup    │
                │     Agent       │
                │  (Aggregator)   │
                └────────┬────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   TRADE RECOMMENDATION│
              │  • Entry Price        │
              │  • Target Price       │
              │  • Stop Loss          │
              │  • Confidence Score   │
              └──────────────────────┘
```

## Agent Specifications

### 1. Technical Analysis Agent

**Purpose**: Analyze price patterns and technical indicators

**Inputs**:
- Current stock data (OHLCV)
- Historical price data (30 days default)

**Analysis Methods**:
```typescript
- RSI (Relative Strength Index)
  • Oversold: < 30 → BUY signal
  • Overbought: > 70 → SELL signal
  • Neutral: 30-70 → HOLD

- MACD (Moving Average Convergence Divergence)
  • Positive histogram → Bullish
  • Negative histogram → Bearish
  
- Support/Resistance Levels
  • Support = Current Price × 0.97
  • Resistance = Current Price × 1.03
  
- Price Momentum
  • Strong upward: > 2% change
  • Strong downward: < -2% change
```

**Outputs**:
- Signal: BUY/SELL/HOLD
- Confidence: 0-95%
- Key Points: Array of insights
- Analysis: Text summary

**Confidence Calculation**:
```
Base confidence = 0
+ 30 points if RSI shows clear signal
+ 25 points if MACD confirms direction
+ 15 points if strong momentum detected
= Max 70-95% confidence
```

---

### 2. Fundamental Analysis Agent

**Purpose**: Evaluate company's financial health and valuation

**Inputs**:
- Stock data
- Simulated fundamental metrics (would use real financial data in production)

**Analysis Methods**:
```typescript
- P/E Ratio (Price-to-Earnings)
  • < 20: Undervalued → BUY
  • > 35: Overvalued → SELL
  • 20-35: Fair value → HOLD
  
- ROE (Return on Equity)
  • > 18%: Strong profitability
  • < 12%: Weak profitability
  
- Debt-to-Equity Ratio
  • < 0.5: Strong balance sheet
  • > 1.0: High leverage risk
  
- P/B Ratio (Price-to-Book)
  • Valuation crosscheck
```

**Outputs**:
- Signal: BUY/SELL/HOLD
- Confidence: 0-90%
- Key financial metrics
- Valuation assessment

**Ideal for**: Long-term investment decisions

---

### 3. Sentiment Analysis Agent

**Purpose**: Gauge market mood and investor sentiment

**Inputs**:
- Stock data
- Simulated sentiment scores (would use real news/social APIs in production)

**Analysis Methods**:
```typescript
- News Sentiment Analysis
  • Positive/Negative/Neutral classification
  • Weight: 33%
  
- Social Media Buzz
  • Retail investor interest tracking
  • Weight: 33%
  
- Analyst Ratings
  • Professional recommendations aggregation
  • Weight: 33%
  
- Overall Sentiment Score = Average of all three
  • > 65: Positive → BUY
  • < 35: Negative → SELL
  • 35-65: Neutral → HOLD
```

**Outputs**:
- Signal: BUY/SELL/HOLD
- Confidence: Based on sentiment strength
- Market mood indicators

**Real-world Integration**:
- News API for headlines
- Twitter/Reddit sentiment
- Analyst consensus data

---

### 4. Risk Management Agent

**Purpose**: Assess investment risk and volatility

**Inputs**:
- Stock data
- Historical price data

**Analysis Methods**:
```typescript
- Volatility Calculation
  • Annualized standard deviation of returns
  • Low: < 15% → Safe
  • Medium: 15-30%
  • High: > 30% → Risky
  
- Beta Calculation
  • Market correlation measure
  • < 1: Less volatile than market
  • > 1: More volatile than market
  
- Liquidity Assessment
  • Volume ratio analysis
  • > 5M: High liquidity
  • < 1M: Low liquidity
  
- Risk Classification
  • High/Medium/Low based on combined metrics
```

**Outputs**:
- Signal: Usually NEUTRAL (provides context)
- Risk Level: High/Medium/Low
- Volatility percentage
- Liquidity assessment

**Purpose in System**: Prevents high-risk recommendations

---

### 5. Trade Setup Agent (Master Aggregator)

**Purpose**: Combine all agent insights into actionable trade plan

**Inputs**:
- All 4 agent analyses
- Current stock data

**Aggregation Logic**:
```typescript
1. Count BUY vs SELL signals
2. Calculate average confidence
3. Determine consensus strength
   • Agreement = Max(buy_count, sell_count) / total_agents
   • Strong: > 75% agreement
   • Moderate: 50-75% agreement
   • Weak: < 50% agreement

4. Generate trade parameters:
   • Entry Price = Current market price
   • ATR (Average True Range) = High - Low
   • Stop Loss = Entry ± (ATR × 1.5)
   • Target = Entry ± (ATR × 3)
   • Risk:Reward Ratio = Target distance / Stop distance
   
5. Position Sizing
   • Based on ₹1 lakh position size
   • Quantity = 100000 / Entry Price
   
6. Timeframe Selection
   • Fundamental dominant → Long-term (3-12 months)
   • Technical dominant → Short-term (1-3 months)
   • Mixed → Medium-term (1-4 weeks)
```

**Outputs**:
- Complete Trade Setup:
  - Action: BUY/SELL
  - Entry Price
  - Target Price
  - Stop Loss
  - Quantity
  - Risk:Reward Ratio
  - Timeframe
  - Confidence Score
  - Detailed Reasoning

---

## Agent Communication Flow

```typescript
// Pseudo-code of the analysis pipeline

async function analyzeStock(symbol: string) {
  // Step 1: Fetch data
  const stock = await fetchStockData(symbol);
  const historical = await fetchHistoricalData(symbol);
  
  // Step 2: Run agents in parallel
  const [technical, fundamental, sentiment, risk] = await Promise.all([
    technicalAgent.analyze(stock, historical),
    fundamentalAgent.analyze(stock),
    sentimentAgent.analyze(stock),
    riskAgent.analyze(stock, historical)
  ]);
  
  // Step 3: Aggregate results
  const tradeSetup = setupAgent.generateSetup(
    stock,
    [technical, fundamental, sentiment, risk]
  );
  
  return tradeSetup;
}
```

## Decision Making Matrix

| Technical | Fundamental | Sentiment | Risk | Final Action | Confidence |
|-----------|-------------|-----------|------|--------------|------------|
| BUY | BUY | BUY | Low Risk | **STRONG BUY** | 90%+ |
| BUY | BUY | HOLD | Med Risk | **BUY** | 75-85% |
| BUY | SELL | BUY | Low Risk | **HOLD** | 50-65% |
| SELL | SELL | SELL | High Risk | **STRONG SELL** | 90%+ |
| Mixed signals | Mixed | Mixed | Any | **HOLD/CAUTION** | <50% |

## Extending the System

### Adding New Agents

```typescript
// 1. Create new agent class
export class VolumeAnalysisAgent {
  analyze(stock: Stock, historical: any[]): AgentAnalysis {
    // Your analysis logic
    const volumeSpike = this.detectVolumeSpike(historical);
    
    return {
      agentName: 'Volume Analysis Agent',
      agentType: 'volume', // Add to types
      confidence: 75,
      signal: volumeSpike ? 'BUY' : 'HOLD',
      analysis: 'Volume analysis shows...',
      keyPoints: ['Volume increased by 200%'],
      timestamp: new Date(),
    };
  }
  
  private detectVolumeSpike(data: any[]): boolean {
    // Implementation
    return true;
  }
}

// 2. Register in App.tsx
const volumeAgent = new VolumeAnalysisAgent();

// 3. Include in analysis
const volumeAnalysis = volumeAgent.analyze(stock, historical);
const allAnalyses = [...existingAnalyses, volumeAnalysis];
```

### Machine Learning Integration

```typescript
// Future enhancement: ML-based prediction agent
export class MLPredictionAgent {
  private model: any; // TensorFlow.js model
  
  async analyze(stock: Stock, historical: any[]): Promise<AgentAnalysis> {
    // Prepare features
    const features = this.prepareFeatures(historical);
    
    // Get prediction
    const prediction = await this.model.predict(features);
    
    return {
      agentName: 'ML Prediction Agent',
      agentType: 'ml',
      confidence: prediction.confidence * 100,
      signal: prediction.signal,
      analysis: `ML model predicts ${prediction.direction} movement`,
      keyPoints: prediction.factors,
      timestamp: new Date(),
    };
  }
}
```

## Best Practices

1. **Independence**: Each agent analyzes independently
2. **Confidence Scoring**: Always provide confidence levels
3. **Explainability**: Include key points and reasoning
4. **Diversity**: Different agents use different methodologies
5. **Aggregation**: Final decision considers all perspectives
6. **Risk Management**: Always include risk assessment

## Performance Optimization

```typescript
// Cache agent results to avoid recomputation
const agentCache = new Map<string, AgentAnalysis>();

function getCachedAnalysis(key: string, computeFn: () => AgentAnalysis) {
  if (agentCache.has(key)) {
    return agentCache.get(key);
  }
  
  const result = computeFn();
  agentCache.set(key, result);
  return result;
}
```

## Future Enhancements

1. **Options Strategy Agent**: For options trading recommendations
2. **Sector Correlation Agent**: Compare with sector performance
3. **Earnings Predictor Agent**: Forecast based on earnings history
4. **News Event Agent**: React to major corporate events
5. **Portfolio Optimizer Agent**: Multi-stock portfolio balancing
6. **Backtesting Agent**: Validate strategies on historical data

---

This architecture ensures comprehensive analysis from multiple perspectives while maintaining clarity and explainability in trading decisions.
