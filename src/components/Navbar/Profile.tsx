'use server';
import { validateRequest, logout } from "@/lib/auth";
import { useEffect, useRef, useState } from "react";

export default async function () {
    const { user } = await validateRequest();
    return (
        user ? <div className="dropdown dropdown-end">
            <div className="flex flex-row space-x-4">
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium">
                        {user.name}
                    </span>
                    <span className="block text-xs">{user.username}</span>
                </span>
                <div tabIndex={0} role="button" className="w-10 rounded-full avatar">
                    <img
                        className='rounded-full'
                        alt="Avatar"
                        src="/noAvatar.png" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <a className="justify-between">
                        Perfil
                        <span className="badge bg-base-300">New</span>
                    </a>
                </li>
                <li key='settings'><a>Biblioteca</a></li>
                <li key='settings'><a>Configurações</a></li>
                <li key='logout'>
                    <form action={logout}>
                        <button>Deslogar</button>
                    </form></li>
            </ul>
        </div> :
            <div className='btn btn-ghost'>
                <a href='/auth/login'>Login</a>
            </div>
    )
}