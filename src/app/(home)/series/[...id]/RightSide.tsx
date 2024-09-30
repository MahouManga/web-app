// RightSide.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoBook, IoReader } from 'react-icons/io5';
import { HiOutlineSwitchVertical } from 'react-icons/hi';

export default function RightSide() {
  const [tab, setTab] = useState('About');
  const [isDescending, setIsDescending] = useState(false);

  // Sample data for chapters
  const chapters = [
    { id: 1, volume: 1, index: 1, name: 'Capítulo 1', date: '2023-01-01' },
    { id: 2, volume: 1, index: 2, name: 'Capítulo 2', date: '2023-01-02' },
    // Add more chapters as needed
  ];

  // Sorting chapters
  const sortedChapters = [...chapters].sort((a, b) => {
    return isDescending ? b.index - a.index : a.index - b.index;
  });

  return (
    <div className='col-span-12 h-full self-end lg:col-span-9 rounded p-4 z-10 flex flex-col gap-3 w-full'>
      <div className='flex flex-col gap-2 items-center lg:items-start'>
        <div className='flex flex-row gap-3 items-center flex-wrap'>
          <h1 className='text-xl md:text-3xl text-foreground font-bold text-center lg:text-left inline'>Título da Série</h1>
        </div>
        <div className='flex flex-row gap-3 items-center flex-wrap'>
          <span className="text-[10px] font-bold text-foreground-100 px-2 py-1 rounded uppercase text-secondary bg-secondary-content">
            Em Andamento
          </span>
          <span className='text-muted-foreground text-base'>Títulos Alternativos</span>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className="flex mb-5 space-x-6 tabs tabs-bordered tabs-lg">
          <button
            className={`space-x-2 tab py-2 px-4 font-semibold ${tab === 'About' ? 'tab-active' : ''}`}
            onClick={() => setTab('About')}
          >
            <IoReader size={18} />
            <p>Sobre</p>
          </button>
          <button
            className={`space-x-2 tab py-2 px-4 font-semibold ${tab === 'Chapters' ? 'tab-active' : ''}`}
            onClick={() => setTab('Chapters')}
          >
            <IoBook size={18} />
            <p>Capítulos ({chapters.length})</p>
          </button>
        </div>
        {tab === 'About' && (
          <div>
            <div className=''>
              <Link href="#">
                <button className="btn btn-primary text-primary-content px-5">
                  <span className="font-semibold text-base">
                    Ler Capítulo 1
                  </span>
                </button>
              </Link>
            </div>
            <section className="mt-4">
              <h2 className="text-xl font-bold">Gêneros</h2>
              <div className='mt-2'>
                <p>Você pode clicar em uma categoria ou tag para pesquisar por ela.</p>
                <div className='flex flex-wrap my-3'>
                  <a className='btn btn-secondary text-secondary-content mr-5 mt-2' href='#' rel='tag'>Ação</a>
                  <a className='btn btn-secondary text-secondary-content mr-5 mt-2' href='#' rel='tag'>Aventura</a>
                  <a className='btn btn-secondary text-secondary-content mr-5 mt-2' href='#' rel='tag'>Fantasia</a>
                </div>
                <div className="bg-base-content/10 mx-1 my-8 h-px"></div>
              </div>
            </section>
            <section className="mt-4">
              <h2 className="text-xl font-bold">Sinopse</h2>
              <pre className="mt-2 whitespace-pre-wrap">
                Aqui vai a sinopse da série.
              </pre>
              <div className="bg-base-content/10 mx-1 my-8 h-px"></div>
            </section>
            <section className="mt-4">
              <h2 className="text-xl font-bold">Detalhes</h2>
              <pre className="mt-2 whitespace-pre-wrap">
                Aqui vão os detalhes da série.
              </pre>
              <div className="bg-base-content/10 mx-1 my-8 h-px"></div>
            </section>
          </div>
        )}
        {tab === 'Chapters' && (
          <div className="mt-4 space-y-4">
            <div className='flex items-center space-x-5 justify-end'>
              <button className='py-2 font-semibold flex space-x-2' onClick={() => setIsDescending(!isDescending)}>
                <HiOutlineSwitchVertical className="h-5 w-5" /> <p>Ordenar</p>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-base-300 rounded-lg max-h-[400px] overflow-y-auto custom-scrollbar">
              {sortedChapters.map((chapter) => (
                <div className="flex w-full items-center bg-neutral text-neutral-content p-2 rounded-lg shadow btn" key={chapter.id}>
                  <div className="flex-shrink-0 w-[8%]">
                    <IoBook size={18} />
                  </div>
                  <div className="flex-grow w-[10%] xl:w-[60%]">
                    <Link href="#" className="flex justify-between items-center">
                      <p className="font-semibold truncate">{chapter.name}</p>
                    </Link>
                  </div>
                  <div className="flex-shrink-0 w-[20%] xl:w-[25%] text-right">
                    <p className="text-sm truncate">{chapter.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
