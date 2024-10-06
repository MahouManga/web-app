import React from 'react';
import ForumLayout from './layout';
import { IoNotifications, IoMegaphone, IoPeople, IoBulb, IoWarning } from 'react-icons/io5';

const ForumPage = () => {
  const forumSections = [
    { title: "Atualizações", description: "Feedback de todas as atualizações feitas recentemente.", icon: <IoNotifications /> },
    { title: "Avisos", description: "Feedback de todos os avisos feitos recentemente.", icon: <IoMegaphone /> },
    { title: "Eventos da comunidade", description: "Espaço feito para a divulgação de eventos realizados pela comunidade e staff.", icon: <IoPeople /> },
    { title: "Sugestões", description: "Site, staff.", icon: <IoBulb /> },
    { title: "Reporte", description: "Relatos sobre o site em geral, Relatos sobre usuário, Relatos sobre a staff.", icon: <IoWarning /> }
  ];

  return (
    <ForumLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de Fóruns */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 ml-4">Fóruns</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow space-y-4">
            {forumSections.map((section, index) => (
              <div key={index} className="flex items-center bg-gray-700 p-4 rounded-lg shadow">
                <div className="text-3xl text-white mr-4">{section.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-gray-400">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Tópicos e Posts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tópicos</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Duvidas</h3>
              <p className="text-sm text-gray-400">Por Henrique, Agosto 24</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Posts</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Como faz pra publicar mangás?</h3>
              <p className="text-sm text-gray-400">Por Henrique, Agosto 24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Estatísticas de Usuários - Fixada no Rodapé */}
      <div className="bg-gray-800 p-4 rounded-lg shadow mt-6 absolute bottom-0 w-full">
        <h2 className="text-2xl font-semibold mb-4">Estatísticas de Usuários</h2>
        <div className="flex justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">821</h3>
            <p className="text-sm text-gray-400">Membros</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">551</h3>
            <p className="text-sm text-gray-400">Online</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Henrique</h3>
            <p className="text-sm text-gray-400">Membro</p>
          </div>
        </div>
      </div>
    </ForumLayout>
  );
};

export default ForumPage;
