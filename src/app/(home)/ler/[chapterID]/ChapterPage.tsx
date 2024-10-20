'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import NovelLoader from "./Novel";
import { IoChevronBackOutline, IoHomeSharp } from "react-icons/io5";
import { GrUnorderedList } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import NewBadge from "@/components/NewBadge";
import MangaLoader from "./Manga";

export default function ChapterPage({ serie, chapter, previousChapter, nextChapter }: any) {
    const router = useRouter();

    return (
        <>
            <main className={`mx-auto h-full min-h-screen px-2 sm:px-6 lg:px-8 max-w-screen-xl 2xl:max-w-screen-2xl`}>
                <div className='px-4 mx-auto sm:px-6 lg:px-8 '>
                    <ChapterHeader serie={serie} chapter={chapter} previousChapter={previousChapter} nextChapter={nextChapter} />
                    <ChaptersDrawer serie={serie} chapter={chapter} />
                </div>
                <div className='lg:hidden flex justify-center w-full space-x-5'>
                    <div className='max-h-12'>
                        <Image src={serie.posterImage} alt={serie.title} className='rounded h-full w-[40px]' width={100} height={300} />
                    </div>
                    <div className="flex flex-col lg:min-w-[240px]">
                        <h1 className="font-semibold text-foreground text-xl">{chapter.volume == 0 ? '' : `Volume ${chapter.volume} - `}Capítulo {chapter.index}</h1>
                        <h2 className="text-muted-foreground text-sm">{serie.title}</h2>
                    </div>
                </div>
                <ContentLoader serie={serie} chapter={chapter} previousChapter={previousChapter} nextChapter={nextChapter} />
                <div className='flex flex-col justify-center md:mr-11'>
                    Comentários aqui?
                </div>
            </main>
        </>
    );
};

function ContentLoader({ serie, chapter, previousChapter, nextChapter }: { serie: any, chapter: any, previousChapter: any, nextChapter: any }) {
    return (
        <section>
            {serie.mediaType === 'NOVEL' ? (
                <NovelLoader chapter={chapter} previousChapter={previousChapter} nextChapter={nextChapter} />
            ) : (
                <MangaLoader chapter={chapter} previousChapter={previousChapter} nextChapter={nextChapter} />
            )}
        </section>
    );
}

function ChapterHeader({ serie, chapter, previousChapter, nextChapter }: any) {
    return (
        <nav className='flex'>
            <div className='flex flex-row container justify-center lg:justify-between items-center mb-4 shadow-xl'>
                <div className='flex flex-row gap-x-3 justify-center grow-0 py-3 rounded self-start'>
                    <a href={previousChapter ? `/series/${serie.id}/ler/vol-${previousChapter.volume}-cap-${previousChapter.index}` : undefined}>
                        <button className="btn btn-outline px-2">
                            <IoChevronBackOutline size={25} />
                        </button>
                    </a>
                    <div className='hidden lg:flex space-x-4'>
                        <div className='max-h-12 hidden sm:block'>
                            <Image src={`/images/series/${serie.id}/posterImage`} alt={serie.title} className='rounded h-full w-[40px]' width={100} height={300} />
                        </div>
                        <div className="lg:min-w-[240px]">
                            <h1 className="font-semibold text-base-content text-xl">{chapter.volume == 0 ? '' : `Volume ${chapter.volume} - `}Capítulo {chapter.index}</h1>
                            <h2 className="text-base-content text-sm">{serie.title}</h2>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-x-3 justify-center grow-0 px-4 py-3 rounded'>
                    <a href={`/series/${serie.id}/${serie.slug}`}>
                        <button className="btn btn-outline px-3">
                            <IoHomeSharp size={18} /><span className="hidden lg:block text-xxs">Home</span>
                        </button></a>
                    <label htmlFor="my-drawer" className="btn btn-outline px-2">
                        <GrUnorderedList size={23} /> Capitulos
                    </label>
                    <a href={nextChapter ? `/series/${serie.id}/ler/vol-${nextChapter.volume}-cap-${nextChapter.index}` : undefined}>
                        <button className='btn btn-outline px-2'>
                            <IoIosArrowForward size={25} />
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    )
}

function ChaptersDrawer({ serie, chapter }: any) {
    const [chapters, setChapters] = useState([]);
    const chapterRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        async function fetchChapters() {
            try {
                const response = await fetch(`/api/chapter?serieID=${serie.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch chapters');
                }
                const data = await response.json();
                setChapters(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchChapters();
    }, [chapter]);


    useEffect(() => {
        const drawerCheckbox = document.getElementById('my-drawer') as HTMLInputElement;

        const handleDrawerChange = () => {
            if (drawerCheckbox.checked && chapterRef.current) {
                chapterRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        drawerCheckbox.addEventListener('change', handleDrawerChange);

        return () => {
            drawerCheckbox.removeEventListener('change', handleDrawerChange);
        };
    }, [chapters]);

    const sortedChapters = chapters.sort((a: any, b: any) => {
        if (a.volume === b.volume) {
            return a.index - b.index;
        }
        return a.volume - b.volume;
    });

    return (
        <div className="drawer drawer-end z-99999">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-2/3 sm:w-90 p-4">
                    {chapters && sortedChapters.map((item: any) => (
                        <a key={`${item.id}`} href={`/series/${serie.id}/ler/vol-${item.volume}-cap-${item.index}`}>
                            <li
                                ref={item.index === chapter.index && item.volume == chapter.volume ? chapterRef : null}
                                className={`flex flex-row items-start` + (item.index === chapter.index ? ' bg-primary text-primary-content rounded-xl' : '')}
                            >
                                <div className="flex min-w-0 flex-col items-start justify-start w-full">
                                    <span className="text-lg line-clamp-1 font-semibold">
                                        {item.volume === 0 ? '' : `Vol.${item.volume}`} Capitulo {item.index}
                                    </span>
                                    <NewBadge date={chapter.createdAt} />
                                </div>
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    );
}