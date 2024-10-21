// app/profile/page.tsx

'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage({ user, tabs, selectedTab }: any) {
    return (
        <div className="bg-gray-100">
            {/* Banner */}
            <div className="relative h-64 bg-cover bg-center flex justify-center items-end"
                style={{
                    backgroundImage: `url('https://s4.anilist.co/file/anilistcdn/user/banner/b576886-5rBWiuzQqZ8b.jpg')`,
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent "></div>
                <div className='flex items-end container max-w-6xl justify-between z-1'>
                    <div className='flex justify-items-start items-end'>
                        <div className="w-30 h-30 bg-white rounded-full overflow-hidden shadow-lg border-4 border-white">
                            <Image
                                src="/noImage.jpg"
                                alt="Avatar"
                                width={144}
                                height={144}
                                className="object-cover"
                            />
                        </div>
                        <h1 className="mb-6 mr-6 ml-6 text-white text-xl md:text-2xl font-medium">HarryKaray</h1>
                    </div>
                    <div className='flex text-white md:gap-10 gap-5 pb-4 pr-4 text-center'>
                        <div className='flex gap-3'>
                            <p>10</p>
                            <h3>Publicações</h3>
                        </div>
                        <div className='flex gap-3'>
                            <p>100</p>
                            <h3>Seguidores</h3>
                        </div>
                        <div className='flex gap-3'>
                            <p>300</p>
                            <h3>Seguindo</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center border-b bg-base-100">
                {tabs.map((tab:any) => (
                    <a
                        key={tab.name}
                        href={`/user/${user.username}/${tab.href}`}
                        className={`px-6 py-2 hover:text-blue-600 ${selectedTab.name === tab.name ? 'border-b-2 border-blue-600 font-semibold' : ''
                            }`}
                    >
                        {tab.name}
                    </a>
                ))}
            </div>
        </div>
    );
}
