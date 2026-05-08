import { Brain, TrendingUp, Building2, MessageSquare, Shield, Target, ArrowRight } from 'lucide-react';

export default function AgentWorkflow() {
  const agents = [
    {
      name: 'Technical',
      icon: TrendingUp,
      color: 'blue',
      tasks: ['RSI', 'MACD', 'Support/Resistance'],
    },
    {
      name: 'Fundamental',
      icon: Building2,
      color: 'purple',
      tasks: ['P/E Ratio', 'ROE', 'Debt Analysis'],
    },
    {
      name: 'Sentiment',
      icon: MessageSquare,
      color: 'green',
      tasks: ['News', 'Social', 'Analysts'],
    },
    {
      name: 'Risk',
      icon: Shield,
      color: 'orange',
      tasks: ['Volatility', 'Beta', 'Liquidity'],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border border-indigo-200">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">AI Agent Workflow</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <div key={agent.name}>
              <div className={`bg-white rounded-lg p-4 shadow-md border-2 border-${agent.color}-200 hover:shadow-lg transition-shadow`}>
                <div className={`inline-flex p-3 rounded-lg bg-${agent.color}-100 mb-3`}>
                  <Icon className={`w-6 h-6 text-${agent.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{agent.name}</h3>
                <ul className="space-y-1">
                  {agent.tasks.map((task) => (
                    <li key={task} className="text-xs text-gray-600 flex items-start">
                      <span className="text-gray-400 mr-1">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
              {index < agents.length - 1 && (
                <div className="hidden md:flex justify-center my-4">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Final Setup Agent */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-4 shadow-lg text-white">
          <div className="inline-flex p-3 rounded-lg bg-white/20 mb-3">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold mb-2">Trade Setup</h3>
          <ul className="space-y-1">
            <li className="text-xs flex items-start">
              <span className="mr-1">•</span>
              Aggregates All
            </li>
            <li className="text-xs flex items-start">
              <span className="mr-1">•</span>
              Entry/Target/SL
            </li>
            <li className="text-xs flex items-start">
              <span className="mr-1">•</span>
              Final Decision
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 bg-white/60 rounded-lg p-4">
        <p className="text-sm text-gray-700 text-center">
          Each agent analyzes independently, then the <strong>Trade Setup Agent</strong> combines 
          all insights to generate a comprehensive recommendation.
        </p>
      </div>
    </div>
  );
}
