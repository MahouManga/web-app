// components/NovelCard.tsx
'use client';

import Image from 'next/image';
import {getStatusText} from '@/utils/projectStatus';
import Link from 'next/link';
import NewBadge from '@/components/NewBadge';

export default function NovelCard({ novel, link }: { novel: any, link?: string }) {
  const imageSrc = novel.posterImage || '/noImage.jpg';

  return (
    <div key={novel.id}>
      <div className="overflow-hidden relative flex flex-col min-w-0 break-words h-[260px] mb-[5px] rounded-[5px]">
        <div>
          {novel._count?.chapters > 0 && (
            <span className="absolute text-primary bg-primary-content uppercase z-[1] font-semibold text-xs px-2.5 py-[4px] rounded-[5px] left-[5px] top-[5px]">
              {novel._count.chapters}
            </span>
          )}
          {novel.status && (
            <span className="absolute text-secondary bg-secondary-content uppercase z-[1] font-semibold text-xs px-2.5 py-[4px] rounded-[5px] right-[5px] top-[5px]">
              {getStatusText(novel.status)}
            </span>
          )}
        </div>
        <Link href={link || `/series/${novel.id}/${novel.slug}`} className="h-52 w-36">
          <Image
            alt={novel.title}
            src={imageSrc}
            width={640}
            height={960}
            placeholder="empty"
            priority
            className="h-full object-fill object-[center_top] absolute w-full z-0 transition-all rounded-[5px] hover:scale-110"
          />
        </Link>
      </div>
      <div className="flex justify-center items-center h-[50px] mb-1 mt-2 px-2">
        <Link href={link || `/series/${novel.id}/${novel.slug}`}>
          <p className="text-base font-semibold line-clamp-2">{novel.title}</p>
        </Link>
      </div>
      <div className="flex flex-col">
        {novel.chapters?.map((chapter:any, index:number) => (
          <Link
            key={index}
            href={`/series/${novel.id}/ler/vol-${chapter.volume}-cap-${chapter.index}`}
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
