'use client';

import { LibraryRatingsData } from '@/services/libraryService';
import { SeriePlus } from '@/services/serieService';
import { getStatusText } from '@/utils/projectStatus';
import { User } from 'lucia';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoBook, IoBookmarkOutline, IoHeartOutline, IoStar, IoEye, IoBookmark } from 'react-icons/io5';

export default function LeftSide({ user, serie, ratings }: { user: User | null, serie: SeriePlus, ratings: LibraryRatingsData }) {
  const [imgSrc, setImgSrc] = useState(`/images/series/${serie.id}/posterImage`);
  const [viewRegistered, setViewRegistered] = useState(false);

  const handleError = () => {
    setImgSrc('/noImage.jpg');
  };

  useEffect(() => {
    const registerView = async () => {
      try {
        if (!viewRegistered) {
          await new Promise(resolve => setTimeout(resolve, 4000)); // Espera de 4 segundos
          const response = await fetch(`/api/views`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serieID: serie.id })
          });

          if (!response.ok) {
            throw new Error('Erro ao registrar visualização');
          }

          setViewRegistered(true); // Marca que a visualização foi registrada
        }
      } catch (error) {
        console.error('Erro ao registrar visualização:', error);
      }
    };

    if (serie && !viewRegistered) {
      registerView();
    }
  }, [serie]);

  return (
    <div className='col-span-12 lg:col-span-3 relative flex justify-center w-full lg:min-h-[750px] text-base-content'>
      <div className='z-10 lg:absolute flex flex-col items-center justify-center gap-y-2 w-full lg:-translate-y-[130px]'>
        <div className="p-1 bg-background rounded overflow-hidden">
          <Image loading="lazy" width={640} height={960} alt="Poster Image" onError={handleError}
            src={imgSrc} className="w-full bg-muted/40 h-[500px] sm:h-[720px] md:h-[530px] lg:w-full lg:h-[320px] xl:h-[430px] 2xl:h-[450px] rounded" />
        </div>
        <div className='flex gap-5'>
          <li className='w-full h-14 flex items-center justify-center gap-2 rounded'>
            <IoStar size={25} className='text-purple-600' />
            <div className='flex flex-col'>
              <span className="font-bold text-xl leading-4 bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text">{ratings.averageRating}</span>
              <small className="text-[10px] leading-3 bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text">Ratings</small>
            </div>
          </li>
          <li className='w-full h-14 flex items-center justify-center gap-2 rounded'>
            <IoEye size={25} className='text-yellow-500' />
            <div className='flex flex-col'>
              <span className="font-bold text-xl leading-4 bg-gradient-to-br from-red-500 to-yellow-500 text-transparent bg-clip-text">
                {ratings.monthlyViews}
              </span>
              <small className="text-[10px] leading-3 bg-gradient-to-br from-red-500 to-yellow-500 text-transparent bg-clip-text">Views</small>
            </div>
          </li>
          <li className='w-full h-14 flex items-center justify-center gap-2 rounded'>
            <IoBookmark size={25} className='text-green-500' />
            <div className='flex flex-col'>
              <span className="font-bold text-xl leading-4 bg-gradient-to-br from-green-500 to-blue-500 text-transparent bg-clip-text">{ratings.bookmarks}</span>
              <small className="text-[10px] leading-3 bg-gradient-to-br from-green-500 to-blue-500 text-transparent bg-clip-text">Bookmarks</small>
            </div>
          </li>
        </div>
        <div className="w-5/6 sm:block">
          <div className="flex justify-center text-3.5 md:text-4">
            <button className="btn btn-ghost btn-square">
              <IoBookmarkOutline size={32} />
            </button>
            <button className="btn btn-ghost btn-square">
              <IoHeartOutline size={32} />
            </button>
          </div>
        </div>
        <div className="space-y-2 rounded p-5 bg-muted/10 w-full">
          <div className="flex justify-between w-full">
            <span className="text-muted-foreground">Status</span>
            <span className="text-muted-foreground">{getStatusText(serie.status)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-muted-foreground">Lançamento</span>
            <span className="text-muted-foreground">2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Autor</span>
            <span className="text-muted-foreground line-clamp-1">{serie.authors?.map(author => author.name).join(', ') || 'Desconhecido'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo</span>
            <span className="text-muted-foreground line-clamp-1">{serie.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtipo</span>
            <span className="text-muted-foreground line-clamp-1">{serie.subtype}</span>
          </div>
        </div>
        {user && (
          <div className="form-control w-full">
            <div className="relative">
              <select
                className="select select-bordered w-full">
                <option key={-1} value={-1}>Remover Nota</option>
                <option key={0} value={0}>0 - Podre</option>
                <option key={1} value={1}>1 - Lixo</option>
                <option key={2} value={2}>2 - Ruim</option>
                <option key={3} value={3}>3 - Decente</option>
                <option key={4} value={4}>4 - Legal</option>
                <option key={5} value={5}>5 - Bom</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}