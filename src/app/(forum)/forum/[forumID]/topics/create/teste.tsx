'use client';

import { useState } from 'react';

export default function TopicoPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);

  const handlePublish = () => {
    if (!title || !content) {
      alert('Por favor, preencha o título e o conteúdo antes de publicar.');
      return;
    }
    alert('Tópico publicado com sucesso!');
  };


  const execCommand = (command) => {
    document.execCommand(command);
  };

  return (
    <div className="bg-base-200 p-10 rounded-lg w-11/12 max-w-4xl mx-auto mt-8">
      <div className="text-sm breadcrumbs text-neutral-content">
        <ul>
          <li><a href="#" className="text-neutral-content hover:text-primary-content">MahouHeader</a></li>
          <li><a href="#" className="text-neutral-content hover:text-primary-content">osul</a></li>
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4 bg-base-300 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-base-content">Criar novo tópico</h2>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-info text-info-content font-bold" onClick={() => setPreview(!preview)}>
            {preview ? 'Editar' : 'Pré-visualizar'}
          </button>
          <button className="btn btn-outline btn-info text-info-content font-bold">Criar enquete</button>
        </div>
      </div>

      {!preview ? (
        <div className="mt-2 bg-base-300 p-4 rounded-lg">
          <input
            id="title-input"
            type="text"
            placeholder="Clique aqui para definir o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full text-lg text-base-content bg-base-200 placeholder-neutral-content focus:outline-none focus:ring focus:ring-primary border-b border-neutral-content mb-2"
          />
          <textarea
            id="content-textarea"
            placeholder="Escreva o conteúdo da publicação aqui"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full h-48 text-base-content bg-base-200 placeholder-neutral-content focus:outline-none focus:ring focus:ring-primary border-b border-neutral-content mb-2"
          ></textarea>
        </div>
      ) : (
        <div className="mt-6 bg-base-300 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-base-content mb-4">Pré-visualizar a publicação</h3>
          <h4 className="text-lg font-bold text-base-content mb-2">{title}</h4>
          <p className="text-base-content whitespace-pre-line">{content}</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          <button onClick={() => execCommand('bold')} className="btn btn-ghost text-base-content text-lg font-bold" title="Negrito">B</button>
          <button onClick={() => execCommand('italic')} className="btn btn-ghost text-base-content text-lg italic" title="Itálico">I</button>
          <button onClick={() => execCommand('strikeThrough')} className="btn btn-ghost text-base-content text-lg line-through" title="Riscado">S</button>
          <button onClick={() => execCommand('createLink')} className="btn btn-ghost text-base-content" title="Adicionar link">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 0H9a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          </button>
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn btn-ghost text-base-content" title="Mais opções">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7 7 7-7" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-40">
              <li><a href="#">Caixa de spoiler</a></li>
              <li><a href="#">Lista numerada</a></li>
              <li><a href="#">Lista</a></li>
              <li><a href="#">Imagem</a></li>
            </ul>
          </div>
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn btn-ghost text-base-content flex items-center justify-between w-full" title="Tamanho da fonte">
              Tamanho da fonte
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-40">
              <li><a href="#">Pequeno</a></li>
              <li><a href="#">Médio</a></li>
              <li><a href="#">Grande</a></li>
            </ul>
          </div>
          <button className="btn btn-ghost text-base-content" title="Ajuda">Ajuda</button>
        </div>
        <button onClick={handlePublish} className="btn btn-success">Publicar</button>
      </div>
    </div>
  );
}
