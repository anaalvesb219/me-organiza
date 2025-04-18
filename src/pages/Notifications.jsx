import React from "react";

const notificacoes = [
  { id: 1, texto: "Avisar 1h antes do vídeo de matemática", ativo: true },
  { id: 2, texto: "Enviar e-mail no dia do post de português", ativo: true },
  { id: 3, texto: "Lembrar 30min antes do quiz de história", ativo: false },
];

const Notifications = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notificações</h1>
      <div className="space-y-4">
        {notificacoes.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded shadow flex items-center justify-between ${
              n.ativo ? "bg-green-50" : "bg-gray-100"
            }`}
          >
            <span>{n.texto}</span>
            <button className="text-sm text-red-500 hover:underline">
              {n.ativo ? "Desativar" : "Ativado"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
