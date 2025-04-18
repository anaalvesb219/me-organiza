import React from "react";

const BoardView = () => {
  const columns = [
    {
      title: "Ideias",
      cards: ["Vídeo de introdução", "Enquete de tema"],
    },
    {
      title: "Em produção",
      cards: ["Roteiro de matemática", "Slides de história"],
    },
    {
      title: "Finalizado",
      cards: ["Post de lançamento", "Checklist de revisão"],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quadro de Conteúdo</h1>
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((col) => (
          <div
            key={col.title}
            className="min-w-[250px] w-1/3 bg-gray-100 rounded p-4 shadow"
          >
            <h2 className="text-lg font-semibold mb-4">{col.title}</h2>
            <div className="space-y-2">
              {col.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded shadow hover:bg-gray-50 transition"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardView;
