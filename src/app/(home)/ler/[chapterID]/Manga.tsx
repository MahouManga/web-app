'use client';

import ThemeSwitch from "@/components/ThemeSwitch";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCompressAlt, FaExpandAlt } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function MangaLoader({ chapter, previousChapter, nextChapter }: any) {
    const chapterRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [widthIndex, setWidthIndex] = useState(4); // Valor inicial padrão

    const widths = ['w-1/4', 'w-1/3', 'w-2/5', 'w-1/2', 'w-3/5', 'w-2/3', 'w-3/4', 'w-full'];

    // Verifica se está no lado do cliente e então recupera valores do localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWidthIndex = localStorage.getItem('widthIndex');

            if (savedWidthIndex !== null) {
                setWidthIndex(parseInt(savedWidthIndex));
            }
        }
    }, []);

    const increaseWidth = () => {
        setWidthIndex(prevIndex => {
            const newIndex = Math.min(widths.length - 1, prevIndex + 1);
            if (typeof window !== 'undefined') {
                localStorage.setItem('widthIndex', newIndex.toString());
            }
            return newIndex;
        });
    };

    const decreaseWidth = () => {
        setWidthIndex(prevIndex => {
            const newIndex = Math.max(0, prevIndex - 1);
            if (typeof window !== 'undefined') {
                localStorage.setItem('widthIndex', newIndex.toString());
            }
            return newIndex;
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!chapterRef.current) return;

            const rect = chapterRef.current.getBoundingClientRect();
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            const totalChapterHeight = chapterRef.current.scrollHeight;
            const chapterVisibleTop = rect.top >= 0 ? rect.top : 0;
            const chapterVisibleBottom = rect.bottom > windowHeight ? windowHeight : rect.bottom;
            const visibleHeight = chapterVisibleBottom - chapterVisibleTop;
            const scrolled = totalChapterHeight - rect.bottom;
            const progressPercentage = (scrolled + visibleHeight) / totalChapterHeight * 100;
            const clampedProgress = Math.min(100, Math.max(0, progressPercentage));
            setProgress(clampedProgress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                {chapter.content?.pages.map((page: any, index: number) => (
                    <div key={index} className={`flex self-center justify-center ${widths[widthIndex]}`}>
                        <Image
                            src={`/images/series/${chapter.serieID}/chapters/${chapter.id}/${page.imageURL}`}
                            alt={`Page ${index + 1}`}
                            width={page.width}
                            height={page.height}
                            className="w-full h-auto"
                        />
                    </div>
                ))}
            </div>
            <section className="fixed bottom-0 w-full h-auto p-4 shadow-lg md:top-0 md:right-0 md:w-auto bg-base-200">
                <div className="absolute top-0 left-0 hidden bg-blue-500 md:show" style={{ width: '5px', height: `${progress}%` }}></div>
                <nav className="flex flex-col items-center justify-center h-full settings">
                    <ul className="flex items-center justify-around w-full md:space-y-6 md:flex-col">
                        <li>
                            <a
                                href={previousChapter ? `/ler/${previousChapter.id}` : undefined}
                                className={`transition-opacity ${!previousChapter ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
                            >
                                <FaAnglesLeft />
                            </a>
                        </li>
                        <li title="Quantidade lida" className="flex items-center md:flex-col">
                            <div className="text-lg progress-count">{progress.toFixed(0)}%</div>
                        </li>
                        <li>
                            <ThemeSwitch />
                        </li>
                        <li>
                            <a onClick={increaseWidth} id="inc-width" className="flex items-center cursor-pointer">
                                <FaExpandAlt />+
                            </a>
                        </li>
                        <li>
                            <a onClick={decreaseWidth} id="dec-width" className="flex items-center cursor-pointer">
                                <FaCompressAlt />-
                            </a>
                        </li>
                        <li>
                            <a
                                href={nextChapter ? `/ler/${nextChapter.id}` : undefined}
                                className={`transition-opacity ${!nextChapter ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
                            >
                                <FaAnglesRight />
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </>
    );
}