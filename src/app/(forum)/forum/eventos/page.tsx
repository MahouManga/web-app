'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const ForumCategoryPage = () => {
  const pathname = usePathname();
  const category = pathname.split('/').pop() || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/postsforum?category=${category}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/postsforum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      });

      if (!res.ok) throw new Error('Erro ao criar post');

      const newPost = await res.json();
      setPosts([newPost, ...posts]);
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
      <h1 className="text-2xl font-semibold">{category}</h1>

      {!showForm ? (
        <>
          <button onClick={() => setShowForm(true)} className="btn btn-primary mt-4 mb-4">
            Criar Post
          </button>

          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-base-300 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-primary">{post.title}</h3>
                  <p className="text-sm">{post.content}</p>
                  <p className="text-xs text-gray-500 mt-2">Criado em: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhum post encontrado nesta categoria.</p>
            )}
          </div>
        </>
      ) : (
        <div className="mt-4">
          <button onClick={() => setShowForm(false)} className="btn btn-secondary mb-4">
            Cancelar
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
      )}
    </div>
  );
};

export default ForumCategoryPage;
