import React from "react";
import NavBar from "@/components/Navbar/Index";
import SideBar from "@/components/Sidebar";

const ForumPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />

      <div className="flex">
        {/* Sidear */}
        <SideBar/>

        {/* Conteúdo principal */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Seção de Fóruns */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Fóruns</h2>
                <div className="space-y-4">
                  {/* Exemplo de item do fórum */}
                  <div className="bg-gray-700 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src="/noImage.jpg"
                          alt="icon"
                          className="h-10 w-10 mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">Atualizações</h3>
                          <p className="text-sm text-gray-400">Discussões sobre atualizações recentes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">10 Posts</p>
                        <p className="text-sm text-gray-400">Último post: 2 dias atrás</p>
                      </div>
                    </div>
                  </div>
                  {/* Adicione mais itens conforme necessário */}
                </div>
              </div>
            </div>

            {/* Seção de Tópicos */}
            <div>
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Tópicos</h2>
                {/* Lista de tópicos */}
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Reconhecimento de eventos</h3>
                    <p className="text-sm text-gray-400">Por Henriquegameplays</p>
                  </div>
                  {/* Adicione mais tópicos conforme necessário */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
