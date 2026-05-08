# 🚀 AI Trading Dashboard - Indian Stock Market

> **⭐ NEW USER? START HERE:** Read **[START_HERE.md](START_HERE.md)** for a 3-step quick start guide!

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://your-link-here)
[![Built with React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

# AI Trading Dashboard - Indian Stock Market

A comprehensive AI-powered trading dashboard featuring multiple intelligent agents that analyze Indian stocks and provide actionable trade setups.

## 📚 Documentation Quick Links

| Guide | Purpose | When to Use |
|-------|---------|-------------|
| **[START_HERE.md](START_HERE.md)** | 3-step quick start | 👈 **Start here!** |
| **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** | Deploy to web | Make it live online |
| **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** | Connect real APIs | Add live market data |
| **[AI_AGENTS_ARCHITECTURE.md](AI_AGENTS_ARCHITECTURE.md)** | Technical deep dive | Understand the AI system |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Complete overview | See what's included |

## 🎯 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Open browser
http://localhost:5173
```

That's it! Click any stock to see AI analysis.

A comprehensive AI-powered trading dashboard featuring multiple intelligent agents that analyze Indian stocks and provide actionable trade setups.

## 🤖 AI Agent System

This dashboard features **5 specialized AI agents** that work together to provide comprehensive stock analysis:

### 1. **Technical Analysis Agent** 📊
- **RSI (Relative Strength Index)**: Identifies overbought/oversold conditions
- **MACD (Moving Average Convergence Divergence)**: Detects momentum shifts
- **Price Action Analysis**: Analyzes support/resistance levels
- **Momentum Detection**: Identifies strong trending moves

### 2. **Fundamental Analysis Agent** 💼
- **P/E Ratio Analysis**: Evaluates stock valuation
- **ROE (Return on Equity)**: Assesses profitability
- **Debt-to-Equity Ratio**: Analyzes financial health
- **P/B Ratio**: Book value assessment

### 3. **Sentiment Analysis Agent** 💬
- **News Sentiment**: Analyzes recent news coverage
- **Social Media Buzz**: Tracks retail investor interest
- **Analyst Ratings**: Aggregates professional recommendations
- **Market Mood**: Overall sentiment scoring

### 4. **Risk Management Agent** 🛡️
- **Volatility Analysis**: Measures price fluctuation risk
- **Beta Calculation**: Assesses market correlation
- **Liquidity Assessment**: Evaluates ease of entry/exit
- **Risk Level Classification**: High/Medium/Low risk categorization

### 5. **Trade Setup Agent** 🎯
- **Master Agent**: Aggregates insights from all other agents
- **Entry Price**: Optimal entry point calculation
- **Target Price**: Profit target based on risk-reward
- **Stop Loss**: Risk management level
- **Position Sizing**: Recommended quantity
- **Risk-Reward Ratio**: Typically targets 1:2 or better

## 🌟 Features

- **Live Market Data**: Real-time updates for NIFTY 50, SENSEX, and NIFTY BANK
- **Top Indian Stocks**: Pre-configured with major stocks (Reliance, TCS, HDFC Bank, etc.)
- **Interactive Dashboard**: Click any stock to get instant AI analysis
- **Visual Charts**: Historical price data with beautiful visualizations
- **Confidence Scores**: Each agent provides a confidence level for its analysis
- **Consensus View**: Trade setup based on agreement between multiple agents
- **Detailed Reasoning**: Clear explanations for each recommendation

## 🚀 How It Works

1. **Select a Stock**: Click on any stock from the list
2. **AI Analysis**: All 5 agents analyze the stock simultaneously
3. **Trade Setup**: Receive a comprehensive trade recommendation with:
   - Entry price
   - Target price
   - Stop loss
   - Risk-reward ratio
   - Confidence level
   - Detailed reasoning

4. **Make Informed Decisions**: Use the multi-agent consensus to guide your trading

## 💡 Use Cases

- **Day Traders**: Quick technical setups with momentum analysis
- **Swing Traders**: Medium-term setups based on technical + fundamental confluence
- **Long-term Investors**: Fundamental analysis with risk assessment
- **Risk Management**: Understand volatility and position sizing

## 🔧 Technical Stack

- **React + TypeScript**: Type-safe component development
- **Tailwind CSS**: Beautiful, responsive UI
- **Recharts**: Interactive price charts
- **Lucide Icons**: Modern icon system
- **Vite**: Fast build and development

## 📊 Market Coverage

Currently includes:
- NIFTY 50 Index
- SENSEX Index
- NIFTY BANK Index
- Top 10 Indian stocks (RELIANCE, TCS, HDFC BANK, INFY, ICICI BANK, etc.)

## 🔮 Future Enhancements

To connect with real market data, you can integrate:

### Indian Market Data APIs:
1. **NSE/BSE Official APIs**: Official exchange data
2. **Alpha Vantage**: Free tier available
3. **Yahoo Finance API**: Historical and real-time data
4. **Zerodha Kite Connect**: For trading integration
5. **Upstox API**: Alternative trading platform

### Sample Integration Code:
```typescript
// Example: Integrating with Alpha Vantage
const API_KEY = 'your_api_key';
const symbol = 'RELIANCE.BSE';

async function fetchRealMarketData() {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await response.json();
  return data;
}
```

### Additional Features to Add:
- **Live News Feed**: Integrate news APIs for real-time sentiment
- **Backtesting**: Test strategies on historical data
- **Alerts**: Set price alerts and trade notifications
- **Portfolio Tracking**: Track your positions and P&L
- **Screener**: Filter stocks based on criteria
- **Machine Learning**: Train models on historical data

## ⚠️ Disclaimer

**IMPORTANT**: This dashboard is for educational and demonstration purposes only. It uses simulated data and AI analysis. The recommendations provided are NOT financial advice. Always:

- Do your own research (DYOR)
- Consult with a qualified financial advisor
- Understand the risks involved in trading
- Never invest more than you can afford to lose

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 License

MIT License - Feel free to use and modify for your projects!

---

Built with ❤️ for the Indian trading community
