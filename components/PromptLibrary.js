import { useState } from 'react';

export default function PromptLibrary({ prompts, onDelete }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleCopy = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-white/30 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">📚</span>
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Prompt Library
        </h2>
        <span className="ml-auto px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-md">
          {prompts.length}
        </span>
      </div>
      
      {prompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-400 italic text-center px-4 mb-2">
            No saved prompts yet
          </p>
          <p className="text-xs text-gray-400">
            Save prompts to access them later
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {prompts.map((item, index) => (
            <div 
              key={item.id} 
              className="border-2 border-gray-200 rounded-xl p-4 bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full">
                    #{prompts.length - index}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-xs px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  >
                    {expandedId === item.id ? '▲ Collapse' : '▼ Expand'}
                  </button>
                  <button
                    onClick={() => handleCopy(item.prompt)}
                    className="text-xs px-2 py-1 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
              
              <div className={`text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200 ${expandedId === item.id ? '' : 'line-clamp-2'}`}>
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {item.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
