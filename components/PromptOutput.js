import { useState } from 'react';

export default function PromptOutput({ prompt, onSave }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const handleSave = () => {
    onSave(prompt);
    alert('Prompt saved to library!');
  };

  if (!prompt) {
    return (
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-white/30 p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💬</span>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Generated Prompt
          </h2>
        </div>
        <div className="flex items-center justify-center h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-400 italic text-center px-4">
            Your generated prompt will appear here... ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-white/30 p-6 lg:p-8 mb-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💬</span>
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Generated Prompt
        </h2>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl mb-5 max-h-96 overflow-y-auto border-2 border-gray-200 shadow-inner">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
          {prompt}
        </pre>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <span>✓</span> Copied!
            </>
          ) : (
            <>
              <span>📋</span> Copy to Clipboard
            </>
          )}
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:border-indigo-700 transition-all font-semibold shadow-sm hover:shadow flex items-center gap-2"
        >
          <span>💾</span> Save
        </button>
      </div>
    </div>
  );
}
