import React, { useState, useEffect } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaCalendarAlt, 
  FaPlus,
  FaSearch
} from 'react-icons/fa';
import EventModal from './EventModal';
import '../../styles/calendar.css';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Dados simulados de eventos
const eventosSimulados = [
  {
    id: 1,
    titulo: 'Aula de Matemática',
    descricao: 'Aula sobre funções trigonométricas',
    dataInicio: new Date(2023, 5, 15, 10, 0),
    dataFim: new Date(2023, 5, 15, 11, 30),
    categoria: 'aula',
    prioridade: 'media'
  },
  {
    id: 2,
    titulo: 'Estudo para prova de Física',
    descricao: 'Revisar capítulos 5-8',
    dataInicio: new Date(2023, 5, 16, 14, 0),
    dataFim: new Date(2023, 5, 16, 17, 0),
    categoria: 'estudo',
    prioridade: 'alta'
  },
  {
    id: 3,
    titulo: 'Prova de História',
    descricao: 'Revolução Francesa e Era Napoleônica',
    dataInicio: new Date(2023, 5, 18, 9, 0),
    dataFim: new Date(2023, 5, 18, 11, 0),
    categoria: 'prova',
    prioridade: 'alta'
  },
  {
    id: 4,
    titulo: 'Trabalho em grupo',
    descricao: 'Preparação para apresentação de biologia',
    dataInicio: new Date(2023, 5, 20, 15, 0),
    dataFim: new Date(2023, 5, 20, 17, 0),
    categoria: 'trabalho',
    prioridade: 'media'
  },
  {
    id: 5,
    titulo: 'Feira de Ciências',
    descricao: 'Apresentação do projeto de ciências',
    dataInicio: new Date(2023, 5, 25, 13, 0),
    dataFim: new Date(2023, 5, 25, 18, 0),
    categoria: 'evento',
    prioridade: 'media'
  }
];

const CalendarPage = () => {
  const hoje = new Date();
  
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());
  const [eventos, setEventos] = useState(eventosSimulados);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Para eventos futuros, poderia ser substituído por uma chamada API
  useEffect(() => {
    // Simula carregar eventos do servidor
    setEventos(eventosSimulados);
  }, []);

  // Gera a matriz de dias para o calendário
  const gerarDiasDoMes = () => {
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    
    const diasAnterior = new Date(anoAtual, mesAtual, 0).getDate();
    const dias = [];
    
    // Dias do mês anterior
    for (let i = diasAnterior - primeiroDia + 1; i <= diasAnterior; i++) {
      dias.push({
        numero: i,
        atual: false,
        mes: mesAtual - 1,
        ano: mesAtual === 0 ? anoAtual - 1 : anoAtual
      });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= diasNoMes; i++) {
      dias.push({
        numero: i,
        atual: true,
        mes: mesAtual,
        ano: anoAtual
      });
    }
    
    // Dias do próximo mês para completar a grade
    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push({
        numero: i,
        atual: false,
        mes: mesAtual + 1,
        ano: mesAtual === 11 ? anoAtual + 1 : anoAtual
      });
    }
    
    return dias;
  };

  // Navega para o mês anterior
  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
    setDiaSelecionado(null);
  };

  // Navega para o próximo mês
  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
    setDiaSelecionado(null);
  };

  // Volta para o dia atual
  const irParaHoje = () => {
    setMesAtual(hoje.getMonth());
    setAnoAtual(hoje.getFullYear());
    setDiaSelecionado(hoje.getDate());
  };

  // Seleciona um dia no calendário
  const selecionarDia = (dia) => {
    setDiaSelecionado(dia.numero);
    if (!dia.atual) {
      if (dia.mes < mesAtual || (dia.mes === 11 && mesAtual === 0)) {
        mesAnterior();
      } else {
        proximoMes();
      }
    }
  };

  // Verifica se um dia é hoje
  const ehHoje = (dia) => {
    return (
      dia.numero === hoje.getDate() &&
      dia.mes === hoje.getMonth() &&
      dia.ano === hoje.getFullYear()
    );
  };

  // Filtra eventos para um dia específico
  const getEventosDoDia = (dia) => {
    return eventos.filter(evento => {
      const dataEvento = new Date(evento.dataInicio);
      return (
        dataEvento.getDate() === dia.numero &&
        dataEvento.getMonth() === dia.mes &&
        dataEvento.getFullYear() === dia.ano
      );
    });
  };

  // Abre o modal para adicionar um novo evento
  const abrirModalNovoEvento = () => {
    setEventoSelecionado(null);
    setModoEdicao(false);
    setModalAberto(true);
  };

  // Abre o modal para editar um evento existente
  const abrirModalEditarEvento = (evento) => {
    setEventoSelecionado(evento);
    setModoEdicao(true);
    setModalAberto(true);
  };

  // Fecha o modal de evento
  const fecharModal = () => {
    setModalAberto(false);
    setEventoSelecionado(null);
  };

  // Salva um evento (novo ou editado)
  const salvarEvento = (evento) => {
    if (modoEdicao) {
      // Atualiza um evento existente
      setEventos(eventos.map(e => (e.id === evento.id ? evento : e)));
    } else {
      // Adiciona um novo evento com ID único
      const novoEvento = {
        ...evento,
        id: Date.now() // Usa timestamp como ID único
      };
      setEventos([...eventos, novoEvento]);
    }
    fecharModal();
  };

  // Exclui um evento
  const excluirEvento = (eventoId) => {
    setEventos(eventos.filter(e => e.id !== eventoId));
    fecharModal();
  };

  // Renderiza os dias do calendário
  const diasDoMes = gerarDiasDoMes();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Calendário</h1>
        <p>Visualize e gerencie seus eventos, aulas e compromissos</p>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <div className="calendar-navigation">
            <button className="nav-button" onClick={mesAnterior}>
              <FaChevronLeft />
            </button>
            <span className="month-title">
              {MESES[mesAtual]} {anoAtual}
            </span>
            <button className="nav-button" onClick={proximoMes}>
              <FaChevronRight />
            </button>
          </div>
          
          <div className="calendar-actions">
            <button className="today-button" onClick={irParaHoje}>
              <FaCalendarAlt /> Hoje
            </button>
            <button className="add-event-button" onClick={abrirModalNovoEvento}>
              <FaPlus /> Novo Evento
            </button>
          </div>
        </div>

        <div className="weekdays">
          {DIAS_SEMANA.map(dia => (
            <div key={dia} className="weekday">{dia}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {diasDoMes.map((dia, index) => {
            const eventosNoDia = getEventosDoDia(dia);
            const classeDia = `calendar-day ${dia.atual ? '' : 'other-month'} ${
              ehHoje(dia) ? 'today' : ''
            } ${dia.atual && dia.numero === diaSelecionado ? 'selected' : ''}`;

            return (
              <div 
                key={index} 
                className={classeDia}
                onClick={() => selecionarDia(dia)}
              >
                <div className="day-number">{dia.numero}</div>
                
                <div className="day-events">
                  {eventosNoDia.slice(0, 3).map(evento => (
                    <div 
                      key={evento.id} 
                      className={`event-item event-${evento.categoria}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirModalEditarEvento(evento);
                      }}
                    >
                      {evento.titulo}
                    </div>
                  ))}
                  {eventosNoDia.length > 3 && (
                    <div className="more-events">
                      +{eventosNoDia.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalAberto && (
        <EventModal
          evento={eventoSelecionado}
          diaSelecionado={
            diaSelecionado 
              ? new Date(anoAtual, mesAtual, diaSelecionado) 
              : new Date()
          }
          onSave={salvarEvento}
          onDelete={excluirEvento}
          onClose={fecharModal}
        />
      )}
    </div>
  );
};

export default CalendarPage; 