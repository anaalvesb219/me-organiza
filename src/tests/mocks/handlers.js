import { http, HttpResponse } from 'msw';

// Respostas simuladas da OpenAI
const openaiSuccessResponse = {
  choices: [
    {
      message: {
        content: "Resposta simulada do ChatGPT: Para organizar melhor seus estudos, recomendo criar um cronograma semanal dividindo as matérias em blocos de tempo."
      }
    }
  ]
};

// Respostas simuladas do Gemini
const geminiSuccessResponse = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: "Resposta simulada do Gemini: Baseado nas suas matérias, sugiro dedicar 2 horas por dia para cada disciplina, alternando entre teoria e exercícios práticos."
          }
        ]
      }
    }
  ]
};

// Handlers para interceptar chamadas de API
export const handlers = [
  // Mock para OpenAI - resposta bem-sucedida
  http.post('https://api.openai.com/v1/chat/completions', () => {
    return HttpResponse.json(openaiSuccessResponse);
  }),

  // Mock para OpenAI - erro de servidor 500
  http.post('https://api.openai.com/v1/error-500', () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // Mock para OpenAI - erro de cliente 401 (não autorizado)
  http.post('https://api.openai.com/v1/error-401', () => {
    return new HttpResponse(null, { status: 401 });
  }),

  // Mock para OpenAI - timeout
  http.post('https://api.openai.com/v1/timeout', () => {
    return HttpResponse.error();
  }),

  // Mock para Gemini - resposta bem-sucedida
  http.post('https://generativelanguage.googleapis.com/v1beta/models/:model', () => {
    return HttpResponse.json(geminiSuccessResponse);
  }),

  // Mock para Gemini - erro de servidor 500
  http.post('https://generativelanguage.googleapis.com/v1beta/error-500', () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // Mock para Gemini - erro de cliente 403 (proibido)
  http.post('https://generativelanguage.googleapis.com/v1beta/error-403', () => {
    return new HttpResponse(null, { status: 403 });
  }),

  // Mock para Gemini - timeout
  http.post('https://generativelanguage.googleapis.com/v1beta/timeout', () => {
    return HttpResponse.error();
  }),
]; 