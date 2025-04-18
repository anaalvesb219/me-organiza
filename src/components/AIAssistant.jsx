import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaSpinner, FaTimes, FaLightbulb } from 'react-icons/fa';
import { getAIAssistance, PROMPT_TEMPLATES } from '../services/gptService';
import '../styles/ai-assistant.css';

/**
 * Componente de Assistente de IA para o MeOrganiza
 * POC de integração com ChatGPT/Gemini
 */
const AIAssistant = ({ 
  tasks = [], 
  events = [], 
  subjects = [], 
  onClose, 
  userName = "Estudante",
  isOpen = false
}) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'assistant', 
      content: 'Olá! Sou seu assistente de estudos e produtividade. Como posso ajudar você hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'Planeje meus estudos para esta semana',
    'Organize minhas tarefas por prioridade',
    'Sugira horários para estudar'
  ]);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Rolagem automática para a mensagem mais recente
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Função para enviar mensagem para o assistente
  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return;
    
    // Adiciona a mensagem do usuário
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Prepara o contexto com dados do aplicativo
      const context = {
        userName,
        tasks,
        events,
        subjects
      };
      
      // Obtém resposta da IA
      const response = await getAIAssistance(text, context);
      
      // Adiciona a resposta do assistente
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Atualiza sugestões com base no histórico de conversa
      updateSuggestions();
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      
      // Adiciona mensagem de erro
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Desculpe, enfrentei um problema ao processar sua solicitação. Poderia tentar novamente?',
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza sugestões baseado no contexto atual
  const updateSuggestions = () => {
    const newSuggestions = [];
    
    // Sugestões baseadas nas tarefas
    if (tasks.length > 0) {
      newSuggestions.push('Como priorizar minhas tarefas atuais?');
    }
    
    // Sugestões baseadas nos eventos
    if (events.length > 0) {
      newSuggestions.push('Sugira horários para estudar entre meus compromissos');
    }
    
    // Sugestões baseadas nas matérias
    if (subjects.length > 0) {
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
      newSuggestions.push(`Dicas para estudar ${randomSubject.name}`);
    }
    
    // Adiciona sugestões genéricas se necessário
    if (newSuggestions.length < 3) {
      const genericSuggestions = [
        'Como melhorar minha concentração nos estudos?',
        'Técnicas de memorização para provas',
        'Organizar cronograma de revisões',
        'Como criar resumos eficientes?'
      ];
      
      // Adiciona sugestões genéricas até ter 3 no total
      while (newSuggestions.length < 3) {
        const randomIndex = Math.floor(Math.random() * genericSuggestions.length);
        const suggestion = genericSuggestions[randomIndex];
        
        if (!newSuggestions.includes(suggestion)) {
          newSuggestions.push(suggestion);
        }
      }
    }
    
    setSuggestions(newSuggestions);
  };

  // Handler para tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Limpa o histórico de mensagens
  const handleClearChat = () => {
    setMessages([
      { 
        id: Date.now(), 
        role: 'assistant', 
        content: 'Histórico limpo. Como posso ajudar você agora?'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-assistant-container">
      <div className="ai-assistant-header">
        <div className="ai-assistant-title">
          <FaRobot className="ai-assistant-icon" />
          <span>Assistente IA</span>
          <div className="ai-assistant-badge">POC</div>
        </div>
        <button 
          className="ai-assistant-close-btn"
          onClick={onClose}
          aria-label="Fechar assistente"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="ai-assistant-chat" ref={chatContainerRef}>
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`ai-message ${message.role} ${message.isError ? 'error' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="ai-avatar">
                <FaRobot />
              </div>
            )}
            <div className="ai-message-content">
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="ai-message assistant loading">
            <div className="ai-avatar">
              <FaRobot />
            </div>
            <div className="ai-message-content">
              <FaSpinner className="ai-loading-spinner" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="ai-assistant-suggestions">
        <div className="ai-suggestions-label">
          <FaLightbulb />
          <span>Sugestões</span>
        </div>
        <div className="ai-suggestions-list">
          {suggestions.map((suggestion, index) => (
            <button 
              key={index}
              className="ai-suggestion-btn"
              onClick={() => handleSendMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <div className="ai-assistant-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pergunte algo ao assistente..."
          rows={1}
          disabled={isLoading}
        />
        <button 
          className="ai-send-btn"
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
        >
          <FaPaperPlane />
        </button>
      </div>
      
      <div className="ai-assistant-footer">
        <button 
          className="ai-clear-btn"
          onClick={handleClearChat}
        >
          Limpar conversa
        </button>
        <span className="ai-assistant-disclaimer">
          Assistente em fase experimental
        </span>
      </div>
    </div>
  );
};

export default AIAssistant; 