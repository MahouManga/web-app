'use client';
import Link from "next/link";
import { useState } from "react";
import { IoBarChart, IoPeople, IoBook, IoPricetagSharp, IoBookmarks, IoAddCircle, IoWarningSharp, IoMenu } from "react-icons/io5";
import SidebarHeader from "./header";
import { Toaster } from "sonner";
import Image from "next/image";

export default function SidebarBase({ children, user }: { children: React.ReactNode, user: any }) {
    console.log('Rendering SidebarBase component');
    const Menus = [
        { title: "Dashboard", src: IoBarChart, link: '/admin' },
        { title: "Obras", src: IoBook, link: '/admin/series', gap: true },
        { title: "Criar Obra", src: IoAddCircle, link: '/admin/series/create' },
        { title: "Gêneros", src: IoBookmarks, link: '/admin/genres', gap: true, admin:true },
        { title: "Tags", src: IoPricetagSharp, link: '/admin/tags', admin:true },
        { title: "Forum", src: IoPeople, link: '/admin/forum', gap: true, admin: true },
        { title: "Reports", src: IoWarningSharp, link: '/admin/reports', gap: true, admin: true }
    ];

    console.log('Menus:', Menus);

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex text-base-content bg-base-200">
            {/* Mobile Sidebar Toggle Button */}
            <div className="md:hidden fixed top-4 left-4 z-20">
                <button className="p-2 bg-primary text-secondary-content rounded-full" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    <IoMenu size={24} />
                </button>
            </div>
            {/* Sidebar */}
            <div className={`fixed top-0 ${isMobileOpen ? 'left-0' : '-left-full'} md:left-0 w-64 flex flex-col bg-base-300 h-full p-5 pt-8 shadow-lg z-30 transition-all duration-300 ease-in-out`}>
                <div className="flex flex-row items-center justify-between pb-4 border-b border-gray-600">
                    <Link href="/" className="font-bold text-xl text-center cursor-pointer">
                        Mahou Admin
                    </Link>
                    <button className="md:hidden p-2 text-secondary" onClick={() => setIsMobileOpen(false)}>
                        X
                    </button>
                </div>
                <ul className="pt-8">
                    {Menus.map((Menu, index) => (
                        Menu.admin && user.role !== 'ADMIN' ? null :<Link href={Menu.link} key={index} className="group">
                            <li
                                className={`flex hover:bg-primary hover:text-primary-content p-3 rounded-lg cursor-pointer text-sm items-center gap-x-4 transition-all
                                    ${Menu.gap ? "mt-10" : "mt-4"} ${index === 0 && "bg-base-100"}
                                    `}
                            >
                                <Menu.src size={24} className="text-secondary group-hover:text-primary-content" />
                                <span className="text-lg origin-left duration-300 font-medium"> {Menu.title} </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            {/* Main Content */}
            <div className={`relative flex bg-base-100 h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden md:ml-64 transition-all duration-300 ease-in-out ${isMobileOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="md:hidden flex justify-end items-center p-4 bg-base-100 border-b border-gray-300">
                    <SidebarHeader user={user} />
                </div>
                <div className="hidden md:block">
                    <SidebarHeader user={user} />
                </div>
                <main>
                    <div className="mx-auto max-w-screen-2xl p-6 md:p-8 2xl:p-12 bg-base-100">
                        <Toaster />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}