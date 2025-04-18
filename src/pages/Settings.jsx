import React from "react";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { currentUser, signOutUser } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <div className="bg-white shadow p-4 rounded flex items-center space-x-4">
        <img
          src={currentUser?.photoURL}
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">{currentUser?.displayName}</p>
          <p className="text-gray-500">{currentUser?.email}</p>
        </div>
      </div>

      <button
        onClick={signOutUser}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Sair da Conta
      </button>
    </div>
  );
};

export default Settings;
