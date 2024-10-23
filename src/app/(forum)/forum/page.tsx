'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoNotifications, IoMegaphone, IoPeople, IoBulb, IoWarning } from 'react-icons/io5';

const ForumPage = () => {
  const [showForm, setShowForm] = useState(false); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const forumSections = [
    { title: "Atualizações", description: "Feedback de todas as atualizações feitas recentemente.", icon: <IoNotifications />, link: "/forum/atualizacoes" },
    { title: "Avisos", description: "Feedback de todos os avisos feitos recentemente.", icon: <IoMegaphone />, link: "/forum/avisos" },
    { title: "Eventos da comunidade", description: "Espaço feito para a divulgação de eventos realizados pela comunidade e staff.", icon: <IoPeople />, link: "/forum/eventos" },
    { title: "Sugestões", description: "Site, staff.", icon: <IoBulb />, link: "/forum/sugestoes" },
    { title: "Reporte", description: "Relatos sobre o site em geral, Relatos sobre usuário, Relatos sobre a staff.", icon: <IoWarning />, link: "/forum/reporte" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/postsforum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, authorId: 'user-id' }), 
      });

      if (!res.ok) throw new Error('Erro ao criar post');

      setTitle('');
      setContent('');
      setShowForm(false); 
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Fóruns</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? "Cancelar" : "Criar Post"}
        </button>
      </div>

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

          {error && <p className="text-red-500">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Post'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2">
          <div className="bg-base-300 p-4 rounded-lg shadow space-y-4">
            {forumSections.map((section, index) => (
              <Link href={section.link} key={index}>
                <div className="flex items-center bg-primary-content p-4 rounded-lg shadow hover:bg-primary-700 cursor-pointer">
                  <div className="text-3xl mr-4">{section.icon}</div>
                  <div>
                    <h3 className="text-lg text-primary font-semibold">{section.title}</h3>
                    <p className="text-sm">{section.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Seção de tópicos e posts permanece igual */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          <div className="bg-base-300 p-4 rounded-lg shadow space-y-4">
            {/* Aqui pode ser adicionado a renderização de posts dinâmicos */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
