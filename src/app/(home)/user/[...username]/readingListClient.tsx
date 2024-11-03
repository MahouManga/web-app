// app/profile/ReadingListClient.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SerieSubtype } from '@prisma/client'; // Importe o enum se necessário
import { statusNames } from '@/utils/projectStatus';

interface ReadingListClientProps {
  series: any[];
  type: 'MANGA' | 'NOVEL';
}

export default function ReadingListClient({ series, type }: ReadingListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [formatFilter, setFormatFilter] = useState<SerieSubtype | null>(null);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('Score');

  // Filtragem dos dados
  const filteredSeries = series.filter((item) => {
    const matchesSearch = item.serie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter !== null ? item.status === statusFilter : true;
    const matchesFormat = formatFilter ? item.serie.subtype === formatFilter : true;
    const matchesGenre = genreFilter
      ? item.serie.genres.some((genre: any) => genre.name === genreFilter)
      : true;
    return matchesSearch && matchesStatus && matchesFormat && matchesGenre;
  });

  // Ordenação dos dados
  const sortedSeries = filteredSeries.sort((a, b) => {
    if (sortOption === 'Score') {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  return (
    <div className=''>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-base-200 p-4 rounded-lg shadow-md mr-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full p-2 border border-gray-300 bg-base-100 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <h3 className="font-bold mb-2">Status</h3>
            <ul className="text-sm space-y-2">
              <li
                className={`cursor-pointer ${statusFilter === null ? 'font-bold' : ''}`}
                onClick={() => setStatusFilter(null)}
              >
                Todos
              </li>
              {statusNames.map((statusName, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${statusFilter === index ? 'font-bold' : ''}`}
                  onClick={() => setStatusFilter(index)}
                >
                  {statusName}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-bold mb-2">Formatos</h3>
            <select
              className="w-full mb-2 p-2 border rounded-md bg-base-100"
              value={formatFilter || ''}
              onChange={(e) =>
                setFormatFilter(e.target.value ? (e.target.value as SerieSubtype) : null)
              }
            >
              <option value="">Todos</option>
              {Object.values(SerieSubtype).map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <h3 className="font-bold mb-2">Gêneros</h3>
            <select
              className="w-full mb-2 p-2 border rounded-md bg-base-100"
              value={genreFilter || ''}
              onChange={(e) => setGenreFilter(e.target.value || null)}
            >
              <option value="">Todos</option>
              {/* Extrai todos os gêneros disponíveis */}
              {Array.from(
                new Set(series.flatMap((item) => item.serie.genres?.map((g: any) => g.name)))
              ).map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <h3 className="font-bold mb-2">Ordenar</h3>
            <select
              className="w-full p-2 border rounded-md bg-base-100"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Score">Pontuação</option>
            </select>
            <button
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter(null);
                setFormatFilter(null);
                setGenreFilter(null);
                setSortOption('Score');
              }}
            >
              Resetar Filtros
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">
            {type === 'MANGA' ? 'Lista de Mangás' : 'Lista de Novels'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedSeries.map((item) => (
              <div
                key={item.id}
                className="relative bg-base-100 rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={`/images/series/${item.serie.id}/posterImage`}
                  alt={item.serie.title || 'No Title'}
                  width={200}
                  height={280}
                  className="object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-bold">{item.serie.title}</h3>
                  <p className="text-xs opacity-70">
                    {item.lastChapterRead
                      ? `Último Lido: Vol. ${item.lastChapterRead.volume} Cap. ${item.lastChapterRead.index}`
                      : 'Ainda não lido'}
                  </p>
                  <p className="text-xs opacity-70">
                    {item.lastAvailableChapter
                      ? `Disponível: Vol. ${item.lastAvailableChapter.volume} Cap. ${item.lastAvailableChapter.index}`
                      : 'Sem capítulos'}
                  </p>
                  <p className="text-xs text-blue-600">
                    {item.rating ? `${item.rating} ★` : 'Sem Avaliação'}
                  </p>
                  <p className="text-xs opacity-70">
                    Status: {statusNames[item.status + 1] || 'N/A'}
                  </p>
                </div>
                {/* Indicador de Leitura */}
                {item.status === 1 && (
                  <div className="absolute top-2 left-2 h-3 w-3 bg-green-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
