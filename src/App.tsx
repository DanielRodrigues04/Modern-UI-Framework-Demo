import React, { useState } from 'react';
import { Activity, Zap, Sparkles } from 'lucide-react';
import { useAnimatedMount } from './framework/animations';
import { useFeedback } from './framework/interactions';
import { useBatchedState } from './framework/performance';

function DemoCard({ title, children, icon: Icon }: { 
  title: string; 
  children: React.ReactNode;
  icon: React.ElementType;
}) {
  const cardRef = useAnimatedMount({ delay: 100 });
  const { state, trigger } = useFeedback();

  return (
    <div
      ref={cardRef}
      className={`bg-white p-6 rounded-lg shadow-lg transition-transform ${
        state.isActive ? 'scale-95' : 'scale-100'
      }`}
      onClick={trigger}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function App() {
  const [count, setCount] = useBatchedState(0);
  const [interactions, setInteractions] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-indigo-900">
          Modern UI Framework Demo
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <DemoCard title="Micro-Interactions" icon={Sparkles}>
            <p className="text-gray-600 mb-4">
              Click anywhere on this card to see the scale animation effect
            </p>
            <button
              onClick={() => setInteractions(prev => prev + 1)}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
            >
              Interactions: {interactions}
            </button>
          </DemoCard>

          <DemoCard title="Performance" icon={Zap}>
            <p className="text-gray-600 mb-4">
              Rapid updates are batched for optimal performance
            </p>
            <button
              onClick={() => {
                for (let i = 0; i < 100; i++) {
                  setCount(prev => prev + 1);
                }
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
            >
              Batch Count: {count}
            </button>
          </DemoCard>

          <DemoCard title="Reactive Updates" icon={Activity}>
            <p className="text-gray-600 mb-4">
              Components react instantly to state changes
            </p>
            <div className="h-4 bg-gray-200 rounded overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${(count % 100)}%` }}
              />
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export default App;