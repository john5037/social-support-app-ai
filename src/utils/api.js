import {
  GEMINI_API_URL,
  GEMINI_API_KEY,
  OPENAI_API_URL,
  OPENAI_API_KEY,
} from "./constants";

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || "gemini"; // or "openai"

export const generateAISuggestion = async (field, currentText, isRTL, texts) => {
  if (AI_PROVIDER === "openai") {
    return await callChatGPTApi(field, currentText, isRTL, texts);
  } else {
    return await callGeminiApi(field, currentText, isRTL, texts);
  }
};

export async function fetchWithBackoff(url, options = {}, maxRetries = 5, timeoutMs = 15000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);

      if (!response.ok) {
        if (response.status === 429 || response.status >= 500) {
          const err = new Error(`Server error, status: ${response.status}`);
          err.code = response.status;
          throw err;
        }
        // non-retryable client error
        const text = await response.text();
        throw new Error(`API failed with status ${response.status}: ${text}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(id);
      // handle AbortError separately for clearer messaging
      if (error.name === "AbortError") {
        console.warn(`Request aborted (timeout) attempt ${attempt + 1}`);
      } else {
        console.warn(`Attempt ${attempt + 1} failed:`, error.message || error);
      }

      const isRetryable =
        error.code === 429 || (error.code >= 500 && error.code < 600) || error.name === "AbortError";

      if (attempt === maxRetries - 1 || !isRetryable) {
        throw new Error("Failed to communicate with AI service after multiple retries.");
      }

      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export const callChatGPTApi = async (field, currentText, isRTL, texts) => {

  const fieldLabel = texts[field] || field;

  const systemPrompt = isRTL
    ? `أنت مساعد ذكاء اصطناعي حكومي مهذب ومحترف. مهمتك هي كتابة وصف موجز وواضح ومحترم بناءً على مدخلات المستخدم. يجب أن يكون النص متعاطفًا، مختصرًا، وبنبرة رسمية. لا تتجاوز 150 كلمة. اكتب باللغة العربية.`
    : `You are a friendly, professional, and respectful government AI assistant. Your job is to draft a concise, professional, clear, and empathetic description based on user input. Do not exceed 150 words. Write in English.`;

  const userPrompt = isRTL
    ? `يرجى صياغة نص لخانة "${fieldLabel}" في نموذج طلب دعم مالي. مدخلاتي هي: "${currentText}". اكتب وصفًا شاملاً يشرح وضعي وحاجتي للدعم. أعد النص المصاغ فقط دون مقدمات.`
    : `Please draft text for the "${fieldLabel}" field of a financial support application. My input is: "${currentText}". Write a full description that summarizes my situation and explains my need for assistance. Return ONLY the drafted text with no preamble.`;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 200,
    temperature: 0.4,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    const result = await fetchWithBackoff(OPENAI_API_URL, options);
    return result.choices?.[0]?.message?.content || texts.aiError;
  } catch (error) {
    console.error("ChatGPT API error:", error);
    return texts.aiError;
  }
};


export const callGeminiApi = async (field, currentText, isRTL, texts) => {
  const fieldLabel = texts[field] || field;

  const systemPrompt = isRTL
    ? `أنت مساعد ذكاء اصطناعي حكومي ودود ومحترف. مهمتك هي صياغة وصف موجز ومهني وواضح ومحترم للوضع بناءً على المدخلات الأولية المقدمة. يجب أن تكون النبرة متعاطفة ومباشرة. لا تزد عن 150 كلمة. اكتب باللغة العربية.`
    : `You are a friendly, professional, and respectful government AI assistant. Your task is to draft a concise, professional, clear, and respectful description of a situation based on the initial input provided. The tone must be empathetic and direct. Do not exceed 150 words. Write in English.`;

  const userQuery = isRTL
    ? `يرجى صياغة نص لخانة "${fieldLabel}" لوثيقة طلب دعم مالي. المدخلات الأولية لي هي: "${currentText}". اكتب وصفًا شاملاً يلخص وضعي ويشرح حاجتي للمساعدة. أعد النص المصاغ فقط، بدون مقدمات أو ملاحظات.`
    : `Please draft text for the "${fieldLabel}" box of a financial support application document. My initial input is: "${currentText}". Write a comprehensive description that summarizes my situation and explains my need for assistance. Return ONLY the drafted text, with no pre-amble or notes.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const result = await fetchWithBackoff(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    options
  );
  return result.candidates?.[0]?.content?.parts?.[0]?.text || texts.aiError;
};
