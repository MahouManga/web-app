import React from 'react';
import Link from 'next/link';

const ForumPage = () => {
  return (
    <div className="min-h-screen max-w-screen-lg mx-auto bg-neutral text-neutral-content">
      
      <nav className="breadcrumbs text-xs p-2">
        <ul>
          <li><a href="#">fórum</a></li>
          <li><a href="#">Outros</a></li>
          <li className="font-bold">Titulo do Fórum em questão</li>
        </ul>
      </nav>

      <main className="w-full max-w-4xl py-4 px-2 mx-auto">
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2">Titulo do Fórum em questão</h2>
          <p className="mb-6">Explicação sobre o Fórum em questão.</p>
        </section>

        <section className="mb-12">
          <h3 className="text-base font-semibold mb-4">Tópicos Fixados</h3>
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-base-200 border-l-4 border-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-warning"><i className="fas fa-exclamation-circle"></i></div>
                  <Link href={`/topico-fixado/${index + 1}`} className="font-medium text-base-content hover:underline">
                    Título de tópico fixado exemplo {index + 1}
                  </Link>
                </div>
                <div className="ml-auto text-xs text-accent flex flex-col items-end">3 publicações - 10 visualizações</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button className="btn btn-sm btn-primary">Criar Novo Tópico</button>
              <button className="btn btn-sm btn-secondary">Marcar Fórum como Lido</button>
            </div>
            <div className="text-sm">
              Ordenar por:
              <select className="select select-bordered ml-2">
                <option>Última Resposta</option>
                <option>Criado</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-base-200 border-l-4 border-secondary rounded-lg">
                <Link href={`/topico/${index + 1}`} className="font-medium text-base-content hover:underline">
                  Título de tópico exemplo {index + 1}
                </Link>
                <div className="ml-auto text-xs text-accent flex flex-col items-end">3 publicações - 10 visualizações</div>
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-center items-center mt-8">
            <div className="btn-group space-x-1">
                <button className="btn btn-sm">ANT.</button>
                <button className="btn btn-sm btn-active">1</button>
                <button className="btn btn-sm">2</button>
                <button className="btn btn-sm">3</button>
                <span className="btn btn-sm">...</span>
                <button className="btn btn-sm">135</button>
                <button className="btn btn-sm">PRÓX.</button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ForumPage;
