'use client';
import Link from "next/link";
import { useState } from "react"
import { IoBarChart, IoPeople , IoBook, IoPricetagSharp, IoBookmarks, IoAddCircle, IoWarningSharp   } from "react-icons/io5";
import SidebarHeader from "./header";
import { Toaster } from "sonner";

export default function SidebarBase({ children, user }: { children: React.ReactNode, user: any }) {
    const Menus = [
        { title: "Dashboard", src: IoBarChart, link: '/' },
        { title: "Obras", src: IoBook, link: '/admin/series', gap: true },
        { title: "Criar Obra", src: IoAddCircle, link: '/admin/series/create' },
        { title: "Gêneros", src: IoBookmarks, link: '/admin/genres', gap: true },
        { title: "Tags", src: IoPricetagSharp, link: '/admin/tags' },
        { title: "Forum", src: IoPeople, link: '/admin/forum', gap: true },
        {title: "Reports", src: IoWarningSharp, link: '/admin/reports', gap: true}
    ];

    const [open, setOpen] = useState(false);
    return (
        <div className="flex text-base-content bg-base-300">
            <div className={` ${open ? "w-64" : "w-20 "} fixed flex flex-col bg-base-300 h-screen p-5 pt-8 duration-300 justify-between`}>
                <div className='z-10'>
                    <img
                        src="/favicon.ico"
                        className={`absolute cursor-pointer -right-3 top-5 w-7 border-dark-purple
                        border-2 rounded-full  ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                    />
                    <div>
                        <Link className="flex gap-x-4 items-center" href="/">
                            <img
                                src="/favicon.ico"
                                className={`w-9 h-9 cursor-pointer duration-500 ${open && "rotate-[360deg]"
                                    }`}
                            />
                            <h1 className={`origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
                                Mahou Admin
                            </h1>
                        </Link>
                    </div>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <Link href={Menu.link} key={index}>
                                <li
                                    className={`flex hover:bg-primary hover:text-primary-content p-2 rounded-md cursor-pointer text-sm items-center gap-x-4 
                                        ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                        } `}
                                >
                                    <Menu.src size={20} />
                                    <span className={`${!open && "hidden"} text-base origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={`relative flex bg-base-100 h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden ${open ? 'ml-64' : 'ml-20'}`}>
                <SidebarHeader user={user} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        <Toaster />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
