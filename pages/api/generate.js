export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { actAs, action, contextPurpose, detailedInput } = req.body || {};
  const userPrompt = [
    `Act as a: ${actAs || 'Professional prompt writer'}`,
    `Action: ${action || 'Create'}`,
    contextPurpose ? `Context & Purpose:\n${contextPurpose}` : null,
    detailedInput ? `Detailed Input Requirements:\n${detailedInput}` : null,
    `Instructions:`,
    `- Create a single, optimized prompt for a general LLM (model-agnostic).`,
    `- Include role, task, constraints, and explicit output format if relevant.`,
    `- Keep it concise but complete.`,
  ].filter(Boolean).join('\n\n');

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in .env.local' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-20250514',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content:
`You are an expert prompt engineer. Create a high-quality prompt that an end user can paste into any LLM (OpenAI, Anthropic, etc.). Use the inputs below.

${userPrompt}

Return only the final prompt text.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || `Anthropic request failed (${response.status})`;
      return res.status(response.status).json({ error: message, raw: data });
    }

    const generatedPrompt = data?.content?.[0]?.text || '';
    return res.status(200).json({ prompt: generatedPrompt });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
