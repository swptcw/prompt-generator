import { useState, useEffect } from 'react';
import PromptForm from '../components/PromptForm';
import PromptOutput from '../components/PromptOutput';
import PromptLibrary from '../components/PromptLibrary';

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('promptLibrary');
    if (saved) setSavedPrompts(JSON.parse(saved));
  }, []);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate');
      setGeneratedPrompt(data.prompt);
    } catch (error) {
      alert(error.message || 'Failed to generate prompt');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (prompt) => {
    const newItem = { id: Date.now(), prompt, timestamp: new Date().toISOString() };
    const updated = [newItem, ...savedPrompts];
    setSavedPrompts(updated);
    localStorage.setItem('promptLibrary', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(updated);
    localStorage.setItem('promptLibrary', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <header className="relative border-b border-white/30 bg-white/60 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">✨</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Prompt Generator
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">Craft perfect prompts in seconds</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 text-emerald-700 font-medium shadow-sm">
              🔓 No login
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-100 border border-indigo-200 text-indigo-700 font-medium shadow-sm">
              🚀 MVP
            </span>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className="mb-8 sm:mb-12">
          <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Generate better prompts, faster ⚡
                </h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Minimal inputs, optimized outputs. Model-agnostic and ready to paste anywhere.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-medium shadow-md">
                  ✓ No login
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium shadow-md">
                  📋 Copy ready
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          <div className="space-y-6">
            <PromptOutput prompt={generatedPrompt} onSave={handleSave} />
            <PromptLibrary prompts={savedPrompts} onDelete={handleDelete} />
          </div>
        </div>
      </main>

      <footer className="relative mt-16 border-t border-white/30 bg-white/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-xs text-gray-600 mb-2">
            Built for creators • Model-agnostic • Runs on your API key
          </p>
          <p className="text-xs text-gray-400">
            Made with 💜 for the AI community
          </p>
        </div>
      </footer>
    </div>
  );
}
