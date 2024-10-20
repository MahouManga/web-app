// RightSide.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoBook, IoReader } from 'react-icons/io5';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { SeriePlus } from '@/services/serieService';
import { getStatusText } from '@/utils/projectStatus';

export default function RightSide({ serie, chapters }: { serie: SeriePlus, chapters: any }) {
  const [tab, setTab] = useState('About');
  const [isDescending, setIsDescending] = useState(false);

  // Sorting chapters
  const sortedChapters = [...chapters].sort((a, b) => {
    return isDescending ? b.index - a.index : a.index - b.index;
  });

  return (
    <div className='col-span-12 h-full self-end lg:col-span-9 rounded p-4 z-10 flex flex-col gap-3 w-full text-base-content'>
      <div className='flex flex-col gap-2 items-center lg:items-start'>
        <div className='flex flex-row gap-3 items-center flex-wrap'>
          <h1 className='text-xl md:text-3xl font-bold text-center lg:text-left inline'>{serie.title}</h1>
        </div>
        <div className='flex flex-row gap-3 items-center flex-wrap'>
          <span className="text-[10px] font-bold px-2 py-1 rounded uppercase text-secondary bg-secondary-content">
            {getStatusText(serie.status)}
          </span>
          <span className='text-base'>{serie.titles?.map((a) => a.title).join(', ')}</span>
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
                  {serie.genres?.map((genre) => (
                    <a className='btn btn-secondary text-secondary-content mr-5 mt-2' href='#' rel='tag'>{genre.name}</a>
                  ))}
                </div>
                <div className="bg-base-content/10 mx-1 my-8 h-px"></div>
              </div>
            </section>
            <section className="mt-4">
              <h2 className="text-xl font-bold">Sinopse</h2>
              <pre className="mt-2 whitespace-pre-wrap">
                {serie.synopsis}
              </pre>
              <div className="bg-base-content/10 mx-1 my-8 h-px"></div>
            </section>
            {serie.description && <section className="mt-4">
              <h2 className="text-xl font-bold">Detalhes</h2>
              <pre className="mt-2 whitespace-pre-wrap">
                {serie.description}
              </pre>
              <div className="bg-base-content/10 mx-1 my-8 h-px"></div>
            </section>}
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
                    <Link href={`/ler/${chapter.id}`} className="flex justify-between items-center">
                      <div className='truncate flex space-x-3'>
                        <p className="font-semibold">Cap. {chapter.index}</p>
                        {chapter.title.length > 0 ? <span className='opacity-65 text-neutral-content'>{chapter.title}</span> : ''}
                      </div>
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
