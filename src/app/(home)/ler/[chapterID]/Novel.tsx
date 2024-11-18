'use client';

import { useEffect, useRef, useState } from "react";
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaCompressAlt, FaExpandAlt, FaFont } from 'react-icons/fa';
import { FaAnglesRight, FaAnglesLeft } from 'react-icons/fa6';

const getAlignmentClass = (align: string) => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'justify':
        return 'text-justify';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };
  

export default function NovelLoader({ chapter, previousChapter, nextChapter }: { chapter: any, previousChapter: any, nextChapter: any }) {
    const chapterRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [hasReportedRead, setHasReportedRead] = useState(false); // Flag para controlar a chamada da API de leitura
  
    const [fontSize, setFontSize] = useState(() => {
      if (typeof window !== 'undefined') {
        const savedFontSize = localStorage.getItem('fontSize');
        return savedFontSize ? parseInt(savedFontSize) : 20;
      }
      return 20; // Valor padrão caso o localStorage não esteja disponível
    });
    const [alignmentIndex, setAlignmentIndex] = useState(() => {
      if (typeof window !== 'undefined') {
        const savedAlignmentIndex = localStorage.getItem('alignmentIndex');
        return savedAlignmentIndex ? parseInt(savedAlignmentIndex) : 0;
      }
      return 0; // Valor padrão caso o localStorage não esteja disponível
    });
  
    const alignments = ['left', 'justify', 'center', 'right'];
    const currentAlignment = alignments[alignmentIndex];
  
    const increaseFont = () => {
      setFontSize(prevSize => {
        const newSize = Math.min(26, prevSize + 1);
        if (typeof window !== 'undefined') {
          localStorage.setItem('fontSize', newSize.toString());
        }
        return newSize;
      });
    };
  
    const decreaseFont = () => {
      setFontSize(prevSize => {
        const newSize = Math.max(14, prevSize - 1);
        if (typeof window !== 'undefined') {
          localStorage.setItem('fontSize', newSize.toString());
        }
        return newSize;
      });
    };
  
    const handleNextAlignment = () => {
      const nextIndex = (alignmentIndex + 1) % alignments.length;
      setAlignmentIndex(nextIndex);
      if (typeof window !== 'undefined') {
        localStorage.setItem('alignmentIndex', nextIndex.toString());
      }
    };
  
    useEffect(() => {
      const handleScroll = async () => {
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
  
    function addErrorHandlingToImages(htmlContent: string, fallbackText: string = 'Imagem não disponível'): string {
      // Lida com qualquer src, independentemente de como começa, e com aspas simples ou duplas
      let content = htmlContent.replace(/<img\s+[^>]*src=(["'])([^"']+)\1/g, (match, quote, src) => {
        const newSrc = `/images/${src}`;
        return `<img src="${newSrc}" onerror="this.onerror=null;this.src='';this.outerHTML='<div style=&quot;color:red;&quot;>${fallbackText}</div>';" onload="this.style.opacity=1;" style="opacity:0; transition:opacity 0.5s ease;"`;
      });
  
      return content;
    }
  

  
    // Segurança no load de texto
    const contentWithImageFallback = addErrorHandlingToImages(chapter && chapter.content?.text ? chapter.content.text : '', 'Imagem não disponível');
    //const wrappedContent = wrapTextWithParagraphs(contentWithImageFallback);
    const contentArray = contentWithImageFallback.split("</p>");
    const halfwayIndex = Math.floor(contentArray.length / 2);
    const firstHalf = contentArray.slice(0, halfwayIndex).join("</p>");
    const secondHalf = contentArray.slice(halfwayIndex).join("</p>");
  
    return (
      <div className='flex flex-col items-center justify-center w-full h-full rounded-3xl'>
        <div ref={chapterRef} className="flex flex-col items-center justify-center max-w-screen-xl md:mr-11">
          {/* First half of the content */}
          <div
            className={`chapter-section ${getAlignmentClass(currentAlignment)}`}
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: contentWithImageFallback }}
          />
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
                <a onClick={increaseFont} id="inc-font" className="flex items-center cursor-pointer">
                  <FaFont />+
                </a>
              </li>
              <li>
                <a onClick={decreaseFont} id="dec-font" className="flex items-center cursor-pointer">
                  <FaFont />-
                </a>
              </li>
              <li>
                <a onClick={handleNextAlignment} id="align-text" className="flex items-center cursor-pointer">
                  {currentAlignment === 'left' && <FaAlignLeft />}
                  {currentAlignment === 'center' && <FaAlignCenter />}
                  {currentAlignment === 'justify' && <FaAlignJustify />}
                  {currentAlignment === 'right' && <FaAlignRight />}
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
      </div>
    );
  }