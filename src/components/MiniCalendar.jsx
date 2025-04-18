import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import '../styles/miniCalendar.css';

const MiniCalendar = ({ events = [], onSelectDate }) => {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());

  const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Navega para o mês anterior
  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  // Navega para o próximo mês
  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  // Volta para o dia atual
  const irParaHoje = () => {
    setMesAtual(hoje.getMonth());
    setAnoAtual(hoje.getFullYear());
    setDiaSelecionado(hoje.getDate());
    
    if (onSelectDate) {
      onSelectDate(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()));
    }
  };

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

  // Seleciona um dia no calendário
  const selecionarDia = (dia) => {
    setDiaSelecionado(dia.numero);
    
    if (onSelectDate) {
      onSelectDate(new Date(dia.ano, dia.mes, dia.numero));
    }
    
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
    if (!events || events.length === 0) return [];
    
    return events.filter(evento => {
      const dataEvento = new Date(evento.dataInicio || evento.date || evento.startDate);
      return (
        dataEvento.getDate() === dia.numero &&
        dataEvento.getMonth() === dia.mes &&
        dataEvento.getFullYear() === dia.ano
      );
    });
  };

  const diasDoMes = gerarDiasDoMes();

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <button className="mini-nav-button" onClick={mesAnterior}>
          <FaChevronLeft />
        </button>
        <span className="mini-month-title">
          {MESES[mesAtual].substring(0, 3)} {anoAtual}
        </span>
        <button className="mini-nav-button" onClick={proximoMes}>
          <FaChevronRight />
        </button>
      </div>

      <div className="mini-weekdays">
        {DIAS_SEMANA.map(dia => (
          <div key={dia} className="mini-weekday">{dia}</div>
        ))}
      </div>

      <div className="mini-calendar-grid">
        {diasDoMes.map((dia, index) => {
          const eventosNoDia = getEventosDoDia(dia);
          const classeDia = `mini-calendar-day ${dia.atual ? '' : 'mini-other-month'} ${
            ehHoje(dia) ? 'mini-today' : ''
          } ${dia.atual && dia.numero === diaSelecionado ? 'mini-selected' : ''}`;

          return (
            <div 
              key={index} 
              className={classeDia}
              onClick={() => selecionarDia(dia)}
            >
              <span className="mini-day-number">{dia.numero}</span>
              {eventosNoDia.length > 0 && (
                <span className="mini-event-indicator"></span>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mini-calendar-footer">
        <button className="mini-today-button" onClick={irParaHoje}>
          <FaCalendarAlt /> Hoje
        </button>
      </div>
    </div>
  );
};

export default MiniCalendar; 