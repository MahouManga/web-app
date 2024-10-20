'use client'; // Componente de cliente

import React, { useState } from 'react';
import { IoNotifications, IoMegaphone, IoPeople, IoBulb, IoWarning } from 'react-icons/io5';

const ForumPage = () => {
  const [showForm, setShowForm] = useState(false); // Estado para controlar se o formulário está visível
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const forumSections = [
    { title: "Atualizações", description: "Feedback de todas as atualizações feitas recentemente.", icon: <IoNotifications /> },
    { title: "Avisos", description: "Feedback de todos os avisos feitos recentemente.", icon: <IoMegaphone /> },
    { title: "Eventos da comunidade", description: "Espaço feito para a divulgação de eventos realizados pela comunidade e staff.", icon: <IoPeople /> },
    { title: "Sugestões", description: "Site, staff.", icon: <IoBulb /> },
    { title: "Reporte", description: "Relatos sobre o site em geral, Relatos sobre usuário, Relatos sobre a staff.", icon: <IoWarning /> }
  ];

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/postsforum/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, authorId: 'user-id' }), // Ajuste o authorId conforme necessário
      });

      if (!res.ok) throw new Error('Erro ao criar post');

      setTitle('');
      setContent('');
      setShowForm(false); // Oculta o formulário após a publicação
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Título e botão de "Criar Post" */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Fóruns</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? "Cancelar" : "Criar Post"}
        </button>
      </div>

      {/* Exibe o formulário se o botão de "Criar Post" for clicado */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium">Conteúdo</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Exibe mensagens de erro se houver algum problema */}
          {error && <p className="text-red-500">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Post'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de Fóruns */}
        <div className="lg:col-span-2">
          <div className="bg-base-300 p-4 rounded-lg shadow space-y-4">
            {forumSections.map((section, index) => (
              <div key={index} className="flex items-center bg-primary-content p-4 rounded-lg shadow">
                <div className="text-3xl mr-4">{section.icon}</div>
                <div>
                  <h3 className="text-lg text-primary font-semibold">{section.title}</h3>
                  <p className="text-sm">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Tópicos e Posts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tópicos</h2>
          <div className="bg-base-300 p-4 rounded-lg shadow space-y-4">
            <div className="bg-secondary-content p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-secondary">Dúvidas</h3>
              <p className="text-sm">Por Henrique, Agosto 24</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Posts</h2>
          <div className="bg-base-300 p-4 rounded-lg shadow space-y-4">
            <div className="bg-secondary-content p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-secondary">Como faz pra publicar mangás?</h3>
              <p className="text-sm">Por Henrique, Agosto 24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Estatísticas de Usuários - Fixada no Rodapé */}
      <div className="bg-base-300 p-4 rounded-lg shadow mt-6 absolute bottom-0 w-full">
        <h2 className="text-2xl font-semibold mb-4">Estatísticas de Usuários</h2>
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">821</h3>
            <p className="text-sm">Membros</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">551</h3>
            <p className="text-sm">Online</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Henrique</h3>
            <p className="text-sm">Membro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
