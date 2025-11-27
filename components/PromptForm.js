import { useState } from 'react';

const ACT_AS_OPTIONS = [
  'Professional prompt writer',
  'Senior software engineer',
  'Marketing strategist',
  'Technical writer',
  'Product manager',
  'Data analyst',
  'Educator',
];

const ACTION_OPTIONS = [
  'Create',
  'Design',
  'Suggest',
  'Review',
];

export default function PromptForm({ onGenerate, isLoading }) {
  const [formData, setFormData] = useState({
    actAs: ACT_AS_OPTIONS[0],
    action: ACTION_OPTIONS[0],
    contextPurpose: '',
    detailedInput: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['actAs', 'action', 'detailedInput'];
    const missing = requiredFields.filter((f) => !formData[f]?.trim());
    if (missing.length > 0) {
      alert('Please fill in the required fields.');
      return;
    }
    onGenerate(formData);
  };

  const handleClear = () => {
    setFormData({
      actAs: ACT_AS_OPTIONS[0],
      action: ACTION_OPTIONS[0],
      contextPurpose: '',
      detailedInput: '',
    });
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-white/30 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Prompt
          </h2>
        </div>
        <p className="text-sm text-gray-600">Fill the essentials. We'll generate an optimized prompt.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-indigo-600 transition-colors">Act as a</label>
            <select
              name="actAs"
              value={formData.actAs}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all shadow-sm"
            >
              {ACT_AS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-indigo-600 transition-colors">Action</label>
            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all shadow-sm"
            >
              {ACTION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-indigo-600 transition-colors">Context & Purpose</label>
          <textarea
            name="contextPurpose"
            value={formData.contextPurpose}
            onChange={handleChange}
            placeholder="Explain the background and goals (optional)"
            rows="3"
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all shadow-sm resize-none"
          />
          <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
            <span>💡</span> Optional but helpful for better prompts
          </p>
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 group-hover:text-indigo-600 transition-colors">
            Detailed Input Requirements <span className="text-indigo-600">*</span>
          </label>
          <textarea
            name="detailedInput"
            value={formData.detailedInput}
            onChange={handleChange}
            placeholder="Provide specifics, constraints, audience, tone, examples, edge cases..."
            rows="5"
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-all shadow-sm resize-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-300 transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating…
              </>
            ) : (
              <>
                <span>✨</span> Generate Prompt
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 text-gray-700 transition-all font-semibold shadow-sm hover:shadow"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
