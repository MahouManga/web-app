import { getUserSeriesAndChapterStats, libraryChaptersReaded } from "@/services/libraryService";
import Image from "next/image";


export default async function Overview({ user }: {user: any}) {
    const chaptersReaded = await libraryChaptersReaded(user.id);
    const status = await getUserSeriesAndChapterStats(user.id);

    return (
        <div className='w-full'>
            <div className='flex gap-10 justify-center w-full mt-1'>
                <div className='flex gap-5 bg-base-100 p-5 rounded-xl'>
                    <div className='text-center'>
                        <h3 className='text-info'>{status?.totalSeries.NOVEL}</h3>
                        <label>Total Novel</label>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-info'>{status?.totalChaptersRead.NOVEL}</h3>
                        <label>Capitulos Lidos</label>
                    </div>
                </div>
                <div className='flex gap-5 bg-base-100 p-5 rounded-xl'>
                    <div className='text-center'>
                        <h3 className='text-info'>{status?.totalSeries.MANGA}</h3>
                        <label>Total Manga</label>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-info'>{status?.totalChaptersRead.MANGA}</h3>
                        <label>Capitulos Lidos</label>
                    </div>
                </div>
            </div>
            <div className='mt-3 px-2'>
                <div className='flex justify-between p-2'>
                    <h2 className='font-semibold'>Histórico</h2>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    {
                        chaptersReaded?.map((item: any) => {
                            return (
                                <ActivityCard
                                    key={item.id}
                                    imageSrc="/noImage.jpg"
                                    serie={item.serie}
                                    chapter={item.chapter}
                                    timeAgo="11 horas atrás"
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export function ActivityCard({ imageSrc, serie, chapter, timeAgo }: any) {
    return (
        <div className="flex bg-primary-content rounded-lg shadow-md overflow-hidden p-4 items-center">
            <div className="w-16 h-20 flex-shrink-0">
                <Image
                    src={`/images/series/${serie.id}/posterImage`}
                    alt='a'
                    width={64}
                    height={80}
                    className="object-cover rounded-md"
                />
            </div>
            <div className="ml-4 flex-grow">
                <p className='text-secondary'>{serie?.title}</p>
                <p className="text-sm ">{`Vol. ${chapter?.volume} Cap. ${chapter?.index}`}</p>
            </div>
            <div className="text-right opacity-60 text-xs ml-4">
                <p>{timeAgo}</p>
                <div className="flex gap-2 mt-2">
                    <button className="opacity-80 hover:text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM5.457 6.021A6.013 6.013 0 0012 6c1.26 0 2.424.393 3.357 1.021A4.982 4.982 0 0114.25 10H5.75a4.982 4.982 0 01-1.542-3.979z" />
                        </svg>
                    </button>
                    <button className="opacity-80 hover:text-blue-500">
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