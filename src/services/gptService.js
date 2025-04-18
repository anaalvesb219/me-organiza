/**
 * Serviço para integração com APIs de IA - Prova de Conceito
 * Este arquivo contém as funções para comunicação com ChatGPT e Gemini
 * Parte da POC de integração com IA para o MeOrganiza
 */

// Configuração das chaves de API (em produção, use variáveis de ambiente)
const CONFIG = {
  // Substitua com sua chave real em desenvolvimento
  apiKeys: {
    openai: "sua-chave-openai-aqui",
    gemini: "sua-chave-gemini-aqui"
  },
  models: {
    openai: "gpt-4o",
    gemini: "gemini-1.5-pro"
  },
  endpoints: {
    openai: "https://api.openai.com/v1/chat/completions",
    gemini: "https://generativelanguage.googleapis.com/v1beta/models"
  },
  useModel: "openai" // 'openai' ou 'gemini'
};

/**
 * Envia uma solicitação para a API do ChatGPT
 * @param {string} prompt - O texto de instrução para o modelo
 * @param {Object} context - Dados contextuais para personalizar a resposta
 * @returns {Promise<string>} - A resposta do modelo
 */
export async function askChatGPT(prompt, context = {}) {
  try {
    const response = await fetch(CONFIG.endpoints.openai, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONFIG.apiKeys.openai}`
      },
      body: JSON.stringify({
        model: CONFIG.models.openai,
        messages: [
          { role: "system", content: "Você é um assistente de produtividade para estudantes, especializado em organização, planejamento de estudos e gestão de tempo." },
          { role: "user", content: enrichPromptWithContext(prompt, context) }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API do OpenAI: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao comunicar com ChatGPT:", error);
    return getFallbackResponse(prompt, context);
  }
}

/**
 * Envia uma solicitação para a API do Gemini
 * @param {string} prompt - O texto de instrução para o modelo
 * @param {Object} context - Dados contextuais para personalizar a resposta
 * @returns {Promise<string>} - A resposta do modelo
 */
export async function askGemini(prompt, context = {}) {
  const modelName = CONFIG.models.gemini;
  const apiKey = CONFIG.apiKeys.gemini;
  
  try {
    const response = await fetch(
      `${CONFIG.endpoints.gemini}/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Você é um assistente de produtividade para estudantes, especializado em organização, planejamento de estudos e gestão de tempo.
                  
                  ${enrichPromptWithContext(prompt, context)}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API do Gemini: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return getFallbackResponse(prompt, context);
  }
}

/**
 * Função principal para enviar prompts para o modelo escolhido
 * @param {string} prompt - O texto de instrução para o modelo
 * @param {Object} context - Dados contextuais para personalizar a resposta
 * @returns {Promise<string>} - A resposta do modelo escolhido
 */
export async function getAIAssistance(prompt, context = {}) {
  // Registra a solicitação para análise posterior
  logUserPrompt(prompt, context);
  
  // Usa o modelo configurado
  if (CONFIG.useModel === "gemini") {
    return askGemini(prompt, context);
  } else {
    return askChatGPT(prompt, context);
  }
}

/**
 * Enriquece o prompt com dados contextuais
 * @param {string} prompt - O prompt original
 * @param {Object} context - Dados contextuais
 * @returns {string} - O prompt enriquecido
 */
function enrichPromptWithContext(prompt, context) {
  let enrichedPrompt = prompt;

  // Adiciona informações do contexto ao prompt
  if (context.userName) {
    enrichedPrompt = `[Usuário: ${context.userName}] ${enrichedPrompt}`;
  }
  
  if (context.tasks && context.tasks.length > 0) {
    enrichedPrompt += "\n\nTarefas pendentes:\n";
    context.tasks.forEach((task, index) => {
      enrichedPrompt += `${index + 1}. ${task.title} (Prioridade: ${task.priority}, Prazo: ${task.dueDate})\n`;
    });
  }
  
  if (context.events && context.events.length > 0) {
    enrichedPrompt += "\n\nEventos próximos:\n";
    context.events.forEach((event, index) => {
      enrichedPrompt += `${index + 1}. ${event.title} (${event.date}, ${event.time})\n`;
    });
  }
  
  if (context.subjects && context.subjects.length > 0) {
    enrichedPrompt += "\n\nMatérias:\n";
    context.subjects.forEach((subject, index) => {
      enrichedPrompt += `${index + 1}. ${subject.name}\n`;
    });
  }
  
  return enrichedPrompt;
}

/**
 * Fornece respostas de fallback quando a API falha
 * @param {string} prompt - O prompt original
 * @param {Object} context - Dados contextuais
 * @returns {string} - Uma resposta de fallback
 */
function getFallbackResponse(prompt, context) {
  // Respostas pré-definidas para casos comuns
  const fallbackResponses = {
    planejamento: "Para planejar melhor seus estudos, recomendo criar blocos de tempo dedicados para cada matéria, priorizando as que têm provas mais próximas. Reserve também pequenos intervalos entre as sessões de estudo.",
    priorização: "Recomendo priorizar suas tarefas com base nos prazos e na importância. Comece pelas tarefas urgentes e importantes, depois passe para as importantes mas não urgentes.",
    resumo: "Para fazer resumos eficientes, foque nos conceitos-chave e use técnicas como mapas mentais ou o método Cornell de anotações.",
    agenda: "Para organizar melhor sua agenda, bloqueie horários específicos para estudos, projetos e tempo livre. Mantenha uma rotina consistente para melhorar sua produtividade.",
    geral: "Para melhorar sua produtividade, experimente a técnica Pomodoro (25 minutos de foco, 5 de descanso) e mantenha uma lista de tarefas organizada por prioridade."
  };

  // Verifica o tipo de pergunta para escolher a resposta mais adequada
  const promptLower = prompt.toLowerCase();
  if (promptLower.includes("planejar") || promptLower.includes("organizar estudo")) {
    return fallbackResponses.planejamento;
  } else if (promptLower.includes("priorizar") || promptLower.includes("prioridade")) {
    return fallbackResponses.priorização;
  } else if (promptLower.includes("resumo") || promptLower.includes("resumir")) {
    return fallbackResponses.resumo;
  } else if (promptLower.includes("agenda") || promptLower.includes("calendário")) {
    return fallbackResponses.agenda;
  } else {
    return fallbackResponses.geral;
  }
}

/**
 * Registra prompts para análise e melhoria contínua
 * @param {string} prompt - O prompt do usuário
 * @param {Object} context - O contexto fornecido
 */
function logUserPrompt(prompt, context) {
  // Em um ambiente real, envie para um serviço de análise ou armazene em log
  console.log("[IA Assistant] Prompt recebido:", prompt);
  
  // Apenas para fins de desenvolvimento, não logar em produção
  if (process.env.NODE_ENV !== "production") {
    console.log("[IA Assistant] Contexto:", JSON.stringify(context, null, 2));
  }
}

/**
 * Exemplos de prompts para casos de uso específicos
 */
export const PROMPT_TEMPLATES = {
  STUDY_PLANNING: "Baseado nas minhas matérias e eventos, sugira um plano de estudos para os próximos {days} dias.",
  TASK_PRIORITIZATION: "Analisando minhas tarefas pendentes, qual a melhor ordem para realizá-las?",
  NOTE_SUMMARIZATION: "Por favor, faça um resumo conciso com os pontos principais do conteúdo: {notes}",
  EVENT_SUGGESTION: "Com base na minha agenda atual, qual seria o melhor horário para adicionar um evento de {duration} horas para {activity}?",
  PRODUCTIVITY_TIP: "Me dê uma dica para melhorar minha produtividade nos estudos de {subject}."
};
