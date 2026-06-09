// Chave antiga deixada para teste, como solicitado. Para produção, gere uma nova e use Firebase Functions.
const GEMINI_API_KEY = 'AQ.Ab8RN6JNYa9Xlr-gABk-Lftzew0SnvM4ZMtSY7f01lk7C_oJFw';
const MODEL = 'gemini-1.5-flash';

export async function askGemini(prompt, context = {}) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes('SUA_CHAVE')) {
    return 'Configure sua chave Gemini em assets/gemini.js para ativar a IA.';
  }
  const payload = {
    contents: [{ parts: [{ text: `Você é a IA financeira da TH EMPREENDIMENTOS. Responda em português, direto e profissional. Nunca invente números; use apenas o contexto informado.\n\nCONTEXTO DO SISTEMA:\n${JSON.stringify(context, null, 2)}\n\nPERGUNTA:\n${prompt}` }] }]
  };
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Gemini retornou erro ${res.status}`);
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'A IA não retornou resposta.';
  } catch (err) {
    return `Não consegui consultar a Gemini agora. Detalhe: ${err.message}`;
  }
}
