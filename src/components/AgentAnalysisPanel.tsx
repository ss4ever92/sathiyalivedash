import { Brain, TrendingUp, Building2, MessageSquare, Shield, Target } from 'lucide-react';
import { AgentAnalysis } from '../types';

interface AgentAnalysisPanelProps {
  analyses: AgentAnalysis[];
}

const agentIcons = {
  technical: TrendingUp,
  fundamental: Building2,
  sentiment: MessageSquare,
  risk: Shield,
  setup: Target,
};

const agentColors = {
  technical: 'blue',
  fundamental: 'purple',
  sentiment: 'green',
  risk: 'orange',
  setup: 'indigo',
};

const signalColors = {
  BUY: 'bg-green-100 text-green-800 border-green-300',
  SELL: 'bg-red-100 text-red-800 border-red-300',
  HOLD: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  NEUTRAL: 'bg-gray-100 text-gray-800 border-gray-300',
};

export default function AgentAnalysisPanel({ analyses }: AgentAnalysisPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">AI Agent Analysis</h2>
      </div>
      
      <div className="space-y-4">
        {analyses.map((analysis, index) => {
          const Icon = agentIcons[analysis.agentType];
          const color = agentColors[analysis.agentType];
          const signalColor = signalColors[analysis.signal];
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-${color}-100 mr-3`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{analysis.agentName}</h3>
                    <p className="text-sm text-gray-500">
                      Confidence: {analysis.confidence}%
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${signalColor}`}>
                  {analysis.signal}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{analysis.analysis}</p>
              
              <div className="space-y-1">
                {analysis.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
              
              {/* Confidence bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${color}-600`}
                    style={{ width: `${analysis.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
