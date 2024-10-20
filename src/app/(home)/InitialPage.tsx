'use client';

import SerieCard from "@/components/SerieCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEye } from "react-icons/io5";

export default function InitialPage({ recently, slider, trending }: any) {
  const [activeTab, setActiveTab] = useState('month'); // Inicializado com 'today'

  const tabs = [
    { label: 'Diário', key: 'daily' },
    { label: 'Semanal', key: 'week' },
    { label: 'Mensal', key: 'month' },
  ];
  return (
    <main className='mx-auto container max-w-screen-xl'>
      <div className='grid grid-cols-12 gap-x-6 gap-y-4 mt-5'>
        <div className='col-span-12 p-3 rounded md:col-span-12 lg:col-span-8 bg-gray-850'>
          <h1 className="flex items-end mb-5 text-3xl font-bold text-left">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="fire-flame-curved" className="h-10 svg-inline--fa fa-fire-flame-curved" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z"></path>
            </svg> <span className='mx-2'>Atualizações</span>
          </h1>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-3 lg:grid-cols-4 gap-y-4'>
            {recently?.map((serie: any) => (
              <SerieCard key={serie.id} serie={serie} />
            ))}
          </div>
        </div>

        <div className='col-span-12 p-3 rounded md:col-span-12 lg:col-span-4 bg-gray-850'>
          <h1 className="flex font-sans font-bold text-center text-4xl items-center">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="fire" className="h-12 svg-inline--fa fa-fire" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"></path>
            </svg><span className='mx-2'>Em alta</span>
          </h1>
          <div className='w-full mt-2'>
            <div dir="ltr" data-orientation="horizontal" className="flex flex-col w-full">
              <div role="tablist" aria-orientation="horizontal" className="flex gap-2 my-2 shrink-0" data-orientation="horizontal">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`h-[45px] flex items-center justify-center text-[15px] leading-noneselect-none transition-all flex-1 px-5 py-0 rounded-md btn
                      ${activeTab === tab.key ? 'btn-secondary font-semibold' : 'btn-neutral'}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="content">
                {trending[activeTab].map((item: any, index: number) => (
                  <div key={index}>
                    <Link href={`/series/${item.id}/${item.slug}`}>
                      <div className='relative gap-3 flex w-full flex-row items-center px-0 py-5 border-b-[grey] border-b border-solid'>
                        <div className='min-w-[40px] h-10 text-center text-[1em] flex justify-center items-center bg-neutral text-neutral-content shadow-[rgba(0,0,0,0.55)_0px_0px_20px_0px] rounded-md'>
                          <span>{index + 1}</span>
                        </div>
                        <div className='flex flex-row gap-3 text-left'>
                          <div className='relative max-w-[64px] max-h-24 overflow-hidden rounded-md shrink-0'>
                            <div className='h-52 w-36'>
                              <Image
                                alt={item.title}
                                src={`/images/series/${item.id}/posterImage`}
                                width={200}
                                height={300}
                                decoding="async" data-nimg="1"
                                placeholder='empty'
                                priority
                                className="h-full object-fill object-[center_top] absolute w-full z-0 transition-all rounded-[5px] hover:scale-110"
                              />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <span className='overflow-hidden trendingItemTitle text-lg'>{item.title}</span>
                            <div className='flex flex-row text-center items-center space-x-2 font-bold leading-4 big-clip-text'>
                              <IoEye size={20} className='' />
                              <p className=''>{item.views}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}