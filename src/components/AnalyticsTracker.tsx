
import React from 'react';
import { List } from 'lucide-react';

export const AnalyticsTracker: React.FC<{ events: string[] }> = ({ events }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-stone-50/80 backdrop-blur-sm shadow-lg rounded-xl p-4 border border-stone-200 max-w-sm w-full">
      <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><List size={16} /> User Journey</h3>
      <ul className="text-xs text-stone-600 space-y-1 max-h-40 overflow-y-auto">
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
         {events.length === 0 && <li>No actions recorded yet.</li>}
      </ul>
    </div>
  );
};
