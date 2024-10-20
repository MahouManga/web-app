'use client';

import { SeriePlus } from '@/services/serieService';
import { getStatusText } from '@/utils/projectStatus';
import Image from 'next/image';
import { useState } from 'react';
import { IoBook, IoBookmarkOutline, IoHeartOutline, IoStar, IoEye, IoBookmark } from 'react-icons/io5';

export default function LeftSide({ serie }: { serie: SeriePlus }) {
  const [imgSrc, setImgSrc] = useState(`/images/series/${serie.id}/posterImage`);

  console.log(serie)

  const handleError = () => {
    setImgSrc('/noImage.jpg');
  };

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
              <span className="font-bold text-xl leading-4 bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text">0.0</span>
              <small className="text-[10px] leading-3 bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text">Ratings</small>
            </div>
          </li>
          <li className='w-full h-14 flex items-center justify-center gap-2 rounded'>
            <IoEye size={25} className='text-yellow-500' />
            <div className='flex flex-col'>
              <span className="font-bold text-xl leading-4 bg-gradient-to-br from-red-500 to-yellow-500 text-transparent bg-clip-text">
                0
              </span>
              <small className="text-[10px] leading-3 bg-gradient-to-br from-red-500 to-yellow-500 text-transparent bg-clip-text">Views</small>
            </div>
          </li>
          <li className='w-full h-14 flex items-center justify-center gap-2 rounded'>
            <IoBookmark size={25} className='text-green-500' />
            <div className='flex flex-col'>
              <span className="font-bold text-xl leading-4 bg-gradient-to-br from-green-500 to-blue-500 text-transparent bg-clip-text">0</span>
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
      </div>
    </div>
  );
}