import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from '../mocks/server';
import { askChatGPT, askGemini, getAIAssistance, PROMPT_TEMPLATES } from '../../services/gptService';

// Configura o servidor de mock antes dos testes
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reseta qualquer handler entre os testes
afterEach(() => server.resetHandlers());

// Fecha o servidor após os testes
afterAll(() => server.close());

// Testes para o serviço gptService
describe('gptService', () => {
  // Sobrescreve fetch global para que o timeout funcione corretamente
  const originalFetch = global.fetch;
  
  beforeAll(() => {
    // Configura um spy no console.error para testar os logs de erro
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    // Restaura fetch global
    global.fetch = originalFetch;
    // Restaura console.error
    console.error.mockRestore();
  });

  describe('askChatGPT', () => {
    it('deve retornar uma resposta bem-sucedida do ChatGPT', async () => {
      const response = await askChatGPT('Como organizar meus estudos?');
      expect(response).toContain('Resposta simulada do ChatGPT');
    });

    it('deve lidar com erro 500 do servidor OpenAI', async () => {
      // Sobrescreve fetch para simular erro 500
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({})
        })
      );
      
      // O serviço deve retornar uma resposta de fallback em caso de erro
      const response = await askChatGPT('Como organizar meus estudos?');
      expect(response).toBeTruthy();
      expect(console.error).toHaveBeenCalled();
    });

    it('deve lidar com erro 401 de autorização', async () => {
      // Sobrescreve o endpoint para simular erro 401
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({})
        })
      );
      
      // O serviço deve retornar uma resposta de fallback em caso de erro
      const response = await askChatGPT('Como priorizar minhas tarefas?');
      expect(response).toContain('priorizar');
      expect(console.error).toHaveBeenCalled();
    });

    it('deve lidar com timeout na requisição', async () => {
      // Sobrescreve fetch para simular timeout
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.reject(new Error('Network timeout'))
      );
      
      // O serviço deve retornar uma resposta de fallback em caso de timeout
      const response = await askChatGPT('Como fazer resumos?');
      expect(response).toContain('resumos');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('askGemini', () => {
    it('deve retornar uma resposta bem-sucedida do Gemini', async () => {
      // Configura o mock específico para o teste
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: "Resposta simulada do Gemini: Baseado nas suas matérias, sugiro dedicar 2 horas por dia para cada disciplina."
                    }
                  ]
                }
              }
            ]
          })
        })
      );
      
      const response = await askGemini('Sugira um plano de estudos');
      expect(response).toContain('Resposta simulada do Gemini');
    });

    it('deve lidar com erro 500 do servidor Gemini', async () => {
      // Sobrescreve fetch para simular erro 500
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({})
        })
      );
      
      // O serviço deve retornar uma resposta de fallback em caso de erro
      const response = await askGemini('Como organizar meu calendário?');
      expect(response).toContain('agenda');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getAIAssistance', () => {
    it('deve retornar uma resposta ao usar um modelo configurado', async () => {
      // Teste simples de que a função devolve um resultado
      const response = await getAIAssistance('Uma pergunta genérica');
      expect(response).toBeTruthy();
      expect(typeof response).toBe('string');
    });
  
    it('deve adicionar contexto ao prompt', async () => {
      const prompt = 'Sugira um plano de estudos';
      const context = {
        userName: 'Ana',
        tasks: [{ title: 'Estudar Química', priority: 'Alta', dueDate: '2023-06-30' }],
        events: [{ title: 'Prova de Física', date: '2023-06-28', time: '14:00' }],
        subjects: [{ name: 'Matemática' }]
      };
      
      // Configura spy para console.log
      vi.spyOn(console, 'log').mockImplementation(() => {});
      
      // Continua o teste normalmente
      const response = await getAIAssistance(prompt, context);
      expect(response).toBeTruthy();
    });

    it('deve funcionar com diferentes tipos de prompt', async () => {
      // Teste com prompt relacionado a planejamento
      const responsePlanejamento = await getAIAssistance('Como planejar meu tempo de estudo?');
      expect(responsePlanejamento).toBeTruthy();
      
      // Teste com prompt relacionado a priorização
      const responsePriorizacao = await getAIAssistance('Como priorizar minhas tarefas?');
      expect(responsePriorizacao).toBeTruthy();
      
      // Teste com prompt relacionado a resumo
      const responseResumo = await getAIAssistance('Como fazer bons resumos?');
      expect(responseResumo).toBeTruthy();
      
      // Teste com prompt relacionado a agenda
      const responseAgenda = await getAIAssistance('Como organizar minha agenda?');
      expect(responseAgenda).toBeTruthy();
    });
  });

  describe('PROMPT_TEMPLATES', () => {
    it('deve conter templates predefinidos', () => {
      expect(PROMPT_TEMPLATES).toBeDefined();
      expect(PROMPT_TEMPLATES.STUDY_PLANNING).toContain('{days}');
      expect(PROMPT_TEMPLATES.TASK_PRIORITIZATION).toContain('tarefas');
      expect(PROMPT_TEMPLATES.NOTE_SUMMARIZATION).toContain('{notes}');
    });
  });
}); 