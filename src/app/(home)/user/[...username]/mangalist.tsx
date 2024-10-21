// app/profile/reading-list.tsx

import Image from 'next/image';

const sampleData = [
    {
        title: 'Author of My Own Destiny',
        image: '/noImage.jpg',
        chaptersRead: 87,
        totalChapters: 114,
        score: 5,
        status: 'Reading',
    },
    {
        title: 'Blue Lock',
        image: '/noImage.jpg',
        chaptersRead: 279,
        totalChapters: 279,
        score: 5,
        status: 'Completed',
    },
    {
        title: 'Blue Lock',
        image: '/noImage.jpg',
        chaptersRead: 279,
        totalChapters: 279,
        score: 5,
        status: 'Completed',
    },
    {
        title: 'Blue Lock',
        image: '/noImage.jpg',
        chaptersRead: 279,
        totalChapters: 279,
        score: 5,
        status: 'Completed',
    },
    {
        title: 'Blue Lock',
        image: '/noImage.jpg',
        chaptersRead: 279,
        totalChapters: 279,
        score: 5,
        status: 'Completed',
    },
    {
        title: 'Blue Lock',
        image: '/noImage.jpg',
        chaptersRead: 279,
        totalChapters: 279,
        score: 5,
        status: 'Completed',
    },
    {
        title: 'Blue Lock',
        image: '/noImage.jpg',
        chaptersRead: 279,
        totalChapters: 279,
        score: 5,
        status: 'Completed',
    },
    // Adicione mais dados conforme necessário
];

export default function MangaList() {
    return (
        <div>
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-base-200 p-4 rounded-lg shadow-md mr-6">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Filter"
                            className="w-full p-2 border border-gray-300 bg-base-100 rounded-md"
                        />
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold mb-2">Lists</h3>
                        <ul className="text-sm space-y-2">
                            <li className="hover:text-blue-600 cursor-pointer">All</li>
                            <li className="hover:text-blue-600 cursor-pointer">Reading</li>
                            <li className="hover:text-blue-600 cursor-pointer">Completed</li>
                            <li className="hover:text-blue-600 cursor-pointer">Dropped</li>
                            <li className="hover:text-blue-600 cursor-pointer">Planning</li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold mb-2">Filters</h3>
                        <select className="w-full mb-2 p-2 border rounded-md bg-base-100">
                            <option>Format</option>
                        </select>
                        <select className="w-full mb-2 p-2 border rounded-md bg-base-100">
                            <option>Status</option>
                        </select>
                        <select className="w-full mb-2 p-2 border rounded-md bg-base-100">
                            <option>Genres</option>
                        </select>
                        <select className="w-full mb-2 p-2 border rounded-md bg-base-100">
                            <option>Country</option>
                        </select>
                        <input
                            type="range"
                            min="0"
                            max="2024"
                            className="w-full mt-4"
                        />
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold mb-2">Sort</h3>
                        <select className="w-full p-2 border rounded-md bg-base-100">
                            <option>Score</option>
                        </select>
                        <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Reset
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-6">Reading</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sampleData.map((item, index) => (
                            <div key={index} className="relative bg-base-100 rounded-lg shadow-md overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={200}
                                    height={280}
                                    className="object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-sm font-bold">{item.title}</h3>
                                    <p className="text-xs opacity-70">
                                        {item.chaptersRead} / {item.totalChapters} chapters
                                    </p>
                                    <p className="text-xs text-blue-600">
                                        {item.score} ★
                                    </p>
                                </div>
                                <div className="absolute top-2 left-2 h-3 w-3 bg-green-500 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
