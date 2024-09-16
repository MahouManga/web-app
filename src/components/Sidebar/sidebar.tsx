'use client';
import { useState } from "react"
import { IoBarChart, IoSearchSharp, IoBook } from "react-icons/io5";

export default function SidebarBase({ children, user }: { children: React.ReactNode, user: any }) {
    const Menus = [
        { title: "Dashboard", src: IoBarChart, link: '/' },
        { title: "Obras", src: IoBook, link: '/' },
        { title: "Files ", src: IoBarChart, link: '/', gap: true },
        { title: "Setting", src: IoBarChart, link: '/' },
    ];

    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div className={` ${open ? "w-64" : "w-20 "} flex flex-col bg-base-300 h-screen p-5 pt-8 relative duration-300 justify-between`}>
                <div>
                    <img
                        src="/favicon.ico"
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                        border-2 rounded-full  ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                    />
                    <div className="flex gap-x-4 items-center">
                        <img
                            src="/favicon.ico"
                            className={`w-9 h-9 cursor-pointer duration-500 ${open && "rotate-[360deg]"
                                }`}
                        />
                        <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
                            Mahou Admin
                        </h1>
                    </div>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex hover:bg-primary-content p-2 rounded-md cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                            ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <Menu.src size={20} />
                                <span className={`${!open && "hidden"} text-base origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                {user && <div className="flex flex-row space-x-4">
                    <div tabIndex={0} role="button" className="w-10 rounded-full avatar">
                        <img
                            className='rounded-full'
                            alt="Avatar"
                            src="/noAvatar.png" />
                    </div>
                    {open && <span className="hidden w-full text-left lg:block">
                        <span className="block text-sm font-medium">
                            {user.name}
                        </span>
                        <span className="block text-xs">{user.username}</span>
                    </span>}
                </div>}
            </div>
            <div className="h-screen flex-1 p-7">
                {children}
            </div>
        </div>
    );
}