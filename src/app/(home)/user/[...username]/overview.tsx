import Image from "next/image";

export default function Overview() {
    return (
        <div className='w-full'>
            <div className='flex gap-10 justify-center w-full mt-1'>
                <div className='flex gap-5 bg-base-100 p-5 rounded-xl'>
                    <div className='text-center'>
                        <h3 className='text-info'>11</h3>
                        <label>Total Novel</label>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-info'>11</h3>
                        <label>Capitulos Lidos</label>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-info'>11</h3>
                        <label>Total Novel</label>
                    </div>
                </div>
                <div className='flex gap-5 bg-base-100 p-5 rounded-xl'>
                    <div className='text-center'>
                        <h3 className='text-info'>11</h3>
                        <label>Total Novel</label>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-info'>11</h3>
                        <label>Capitulos Lidos</label>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-info'>11</h3>
                        <label>Total Novel</label>
                    </div>
                </div>
            </div>
            <div className='mt-3 px-2'>
                <div className='flex justify-between p-2'>
                    <h2 className='font-semibold'>Histórico</h2>
                    <label>
                        Filter
                    </label>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                    <ActivityCard
                        imageSrc="/noImage.jpg"
                        title="76 - 85 de My F-Rank High School Life"
                        timeAgo="11 horas atrás"
                    />
                </div>
            </div>
        </div>
    )
}

export function ActivityCard({ imageSrc, title, timeAgo }: any) {
    return (
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden p-4 items-center">
            <div className="w-16 h-20 flex-shrink-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={64}
                    height={80}
                    className="object-cover rounded-md"
                />
            </div>
            <div className="ml-4 flex-grow">
                <p className="text-sm text-gray-800">{title}</p>
            </div>
            <div className="text-right text-gray-500 text-xs ml-4">
                <p>{timeAgo}</p>
                <div className="flex gap-2 mt-2">
                    <button className="text-gray-400 hover:text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM5.457 6.021A6.013 6.013 0 0012 6c1.26 0 2.424.393 3.357 1.021A4.982 4.982 0 0114.25 10H5.75a4.982 4.982 0 01-1.542-3.979z" />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M4 3a1 1 0 00-.293.707V16a1 1 0 001.414.414l4.95-4.95a.5.5 0 01.707 0l4.95 4.95a1 1 0 001.414-.414V3.707A1 1 0 0016 3H4z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}