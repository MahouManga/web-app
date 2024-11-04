// app/profile/page.tsx

'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage({ user, tabs, selectedTab, userLogged, isFollow }: any) {
    const [isFollowing, setIsFollowing] = useState(isFollow);

    const handleFollowToggle = async () => {
        try {
            const response = await fetch('/api/user/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userLogged.id,
                    followId: user.id,
                    follow: isFollowing,
                }),
            });

            if (response.ok) {
                // Suponha que a resposta da API indique o novo status de "Seguindo"
                const result = await response.json();
                setIsFollowing(!isFollowing);
            } else {
                console.error("Erro ao seguir/desseguir o usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

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
                        <h1 className="mb-6 mr-6 ml-6 text-white text-xl md:text-2xl font-medium">{user.name}
                            <span className='text-sm opacity-80 ml-4'>@{user.username}</span></h1>
                    </div>

                    {userLogged && user && user.id !== userLogged.id &&
                        <div className='flex text-white md:gap-10 gap-5 pb-4 pr-4 mr-6 text-center'>
                            <button className='btn btn-outline' onClick={() => handleFollowToggle()}>
                                {isFollowing ? 'Seguindo' : 'Seguir'}
                            </button>
                        </div>}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center border-b bg-base-100">
                {tabs.map((tab: any) => (
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
