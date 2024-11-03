import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

export default function ForumComponent({ forum }: any) {
    let items = forum.forums ?? forum.subForums;

    return (
        <div className="mx-auto space-y-2">
            {
                items && items.map((item: any) => (
                    <Link key={item.id} href={`/forum/${item.id}`} className="block group">
                        <div className="bg-primary-content rounded-lg p-4 flex relative group-hover:pl-6 transition-all">
                            <div className="w-2 bg-pink-500 rounded-l-lg absolute inset-y-0 left-0 group-hover:w-4 transition-all flex items-center">
                                <FaChevronRight className="text-primary-content opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                            <div className="flex-1 pl-4 ml-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-primary hover:underline">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        5 horas por <Link href="/user/temal1d" className="text-accent-content hover:underline">temal1d</Link> 
                                    </p>
                                </div>
                                {item.subForums?.length > 0 && <div className="flex space-x-4 text-secondary text-sm">
                                    {item.subForums?.map((subforum: any) => (
                                        <Link key={subforum.id} href={`/forum/${subforum.id}`} className="hover:underline">
                                            <p className='flex items-center text-center'>
                                                <FaAngleRight /> {subforum.title}
                                            </p>
                                        </Link>
                                    ))}
                                </div>}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}