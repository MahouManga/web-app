import Link from "next/link"
import { FaAngleRight } from "react-icons/fa6"

export default function ForumComponent({ forum }: any) {
    let items = forum.forums ?? forum.subForums;

    return (
        <div className="mx-auto space-y-2">
            {
                items && items.map((item: any) => (
                    <div key={item.id} className="bg-primary-content rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <Link href={`/forum/${item.id}`}>
                                    <h3 className="text-lg font-bold text-primary hover:underline">{item.title}</h3>
                                </Link>
                                <p className="text-gray-400 text-sm">
                                    {item.description}
                                </p>
                            </div>
                            <p className="text-gray-500 text-sm">
                                5 horas por <span className="text-info-content">temal1d</span>
                            </p>
                        </div>
                        {item.subForums?.length > 0 && <div className="flex space-x-4 text-secondary text-sm">
                            {item.subForums?.map((subforum: any) => (
                                <Link key={subforum.id} href={`/forum/${item.id}/${subforum.id}`} className="hover:underline">
                                    <p className='flex items-center text-center'>
                                        <FaAngleRight /> {subforum.title}
                                    </p>
                                </Link>
                            ))}
                        </div>}
                    </div>
                ))
            }
        </div>
    )
}