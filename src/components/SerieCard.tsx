'use client';

import Image from 'next/image';
import { getStatusText } from '@/utils/projectStatus';
import Link from 'next/link';
import NewBadge from '@/components/NewBadge';
import { useState } from 'react';

export default function SerieCard({ serie, link }: { serie: any, link?: string }) {
  const [imgSrc, setImgSrc] = useState(`/images/series/${serie.id}/posterImage`);

  console.log(serie)

  const handleError = () => {
    setImgSrc('/noImage.jpg');
  };
  
  return (
    <div key={serie.id}>
      <div className="overflow-hidden relative flex flex-col min-w-0 break-words h-[260px] mb-[5px] rounded-[5px]">
        <div>
          {serie._count?.chapters > 0 && (
            <span className="absolute text-primary bg-primary-content uppercase z-[1] font-semibold text-xs px-2.5 py-[4px] rounded-[5px] left-[5px] top-[5px]">
              {serie._count.chapters}
            </span>
          )}
          {serie.status && (
            <span className="absolute text-secondary bg-secondary-content uppercase z-[1] font-semibold text-xs px-2.5 py-[4px] rounded-[5px] right-[5px] top-[5px]">
              {getStatusText(serie.status)}
            </span>
          )}
        </div>
        <Link href={link || `/series/${serie.id}/${serie.slug}`} className="h-52 w-36">
          <Image
            alt={serie.title}
            src={imgSrc}
            width={640}
            height={960}
            placeholder="empty"
            priority
            className="h-full object-fill object-[center_top] absolute w-full z-0 transition-all rounded-[5px] hover:scale-110"
            onError={handleError}
          />
        </Link>
      </div>
      <div className="flex justify-center items-center h-[50px] mb-1 mt-2 px-2">
        <Link href={link || `/series/${serie.id}/${serie.slug}`}>
          <p className="text-base font-semibold line-clamp-2">{serie.title}</p>
        </Link>
      </div>
      <div className="flex flex-col">
        {serie.chapters?.map((chapter: any, index: number) => (
          <Link
            key={index}
            href={`/series/${serie.id}/ler/vol-${chapter.volume}-cap-${chapter.index}`}
          >
            <div className="flex items-center justify-between text-sm mt-1 bg-base-300 rounded-md px-4 py-2 hover:bg-primary-content hover:text-primary hover:font-bold">
              <p>Capítulo {chapter.index}</p>
              <div className="text-sm text-base-content">
                <NewBadge date={chapter.createdAt} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
