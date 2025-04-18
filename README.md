# MeOrganiza

Um aplicativo de produtividade completo para estudantes gerenciarem suas tarefas, projetos, calendário e horários de estudo.

![MeOrganiza](https://via.placeholder.com/800x400?text=MeOrganiza+Screenshot)

## 📋 Funcionalidades

- **Dashboard** - Visualização rápida das principais informações
- **Tarefas** - Gerenciamento de tarefas com prioridade e prazos
- **Calendário estilo Notion** - Visualização e gerenciamento de eventos com filtros por categorias
- **Notas** - Anotações rápidas e organizadas por matéria
- **Quadro Kanban** - Organização visual de projetos e fluxos de trabalho
- **Horários** - Gerenciamento de grade horária de aulas e compromissos
- **Matérias** - Organização de disciplinas e materiais de estudo
- **Temas Claro/Escuro** - Suporte a personalização visual
- **Assistente IA** - Ajuda inteligente para organização e planejamento (POC)

## 🖥️ Tecnologias

- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool para desenvolvimento rápido
- **React Router** - Navegação entre páginas
- **FullCalendar** - Biblioteca de calendário com suporte a eventos
- **React Icons** - Pacote de ícones para interface
- **TailwindCSS** - Framework CSS para estilização
- **LocalStorage** - Armazenamento local de dados do usuário
- **APIs de IA** - Integração com ChatGPT/Gemini para recursos inteligentes

## 🚀 Calendário estilo Notion

O aplicativo conta com um calendário inspirado no Notion Calendar, com as seguintes funcionalidades:

- Layout moderno e minimalista
- Sidebar secundária exclusiva para o calendário (pode ser ocultada)
- Mini-calendário para navegação rápida entre datas
- Categorias de eventos com códigos de cores personalizados:
  - Aulas (azul)
  - Estudos (verde)
  - Trabalhos (laranja)
  - Provas (vermelho)
  - Eventos (roxo)
  - Reuniões (amarelo)
- Filtro de eventos por categoria
- Busca de eventos por título
- Visualizações de mês, semana e lista
- Suporte a tema escuro

![Calendário Notion](https://via.placeholder.com/800x400?text=Notion+Calendar+Style)

## 🤖 Integração com IA (POC)

Esta branch (`poc-ia-integration`) contém uma Prova de Conceito para integração com modelos de IA como ChatGPT e Gemini. Os recursos incluem:

- **Assistente de Planejamento** - Recomendações para organização do tempo
- **Sugestão de Estudos** - Propõe horários ideais com base em produtividade
- **Resumo de Notas** - Condensa e organiza anotações por assunto
- **Priorização Inteligente** - Sugere ordem de tarefas com base em prazos e importância
- **Agendamento Otimizado** - Analisa agenda e sugere melhores horários para novas atividades

### Fluxo de Desenvolvimento:

1. Validar conceitos de integração com IA nesta branch
2. Testar e refinar as funcionalidades em ambiente controlado
3. Uma vez aprovada a POC, criar branch de feature específica
4. Implementar lógica de negócio completa
5. Integrar ao projeto principal após validação

### Implementação Atual:

- Arquivo de serviço `src/services/gptService.js` para comunicação com APIs de IA
- Componentes de interface para interação com assistente
- Exemplos de prompts e respostas para casos de uso específicos
- Sistema de fallback para operação offline

## 🛠️ Instalação e Uso

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/meorganiza.git
cd meorganiza
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o ambiente de desenvolvimento:
```bash
npm run dev
```

4. Para build de produção:
```bash
npm run build
```

## 📱 Responsividade

O aplicativo é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Desktop
- Tablet
- Mobile

## 🔮 Próximos Passos

- [ ] Sincronização com a nuvem
- [ ] Integração com Google Calendar
- [ ] Sistema de lembretes e notificações
- [ ] Aplicativo móvel (React Native)
- [ ] Modo offline
- [ ] Estatísticas de produtividade
- [ ] Expansão das capacidades do assistente IA

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

Ana Alves - SolucionAI Studio
