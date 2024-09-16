import ThemeSwitch from "@/components/ThemeSwitch";
import Profile from "./Profile";

export default async function NavBar() {
    return (
        <div className="bg-base-100 flex justify-center text-base-content">
            <div className='navbar max-w-screen-xl'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a>Obras</a>
                                <ul className="p-2">
                                    <li><a>Mangas</a></li>
                                    <li><a>Novels</a></li>
                                </ul>
                            </li>
                            <li><a>Recentes</a></li>
                            <li><a>Fórum</a></li>
                            <li><a>Admininstração</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">MahouManga</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>Obras</summary>
                                <ul className="p-2">
                                    <li><a>Mangas</a></li>
                                    <li><a>Novels</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Recentes</a></li>
                        <li><a>Fórum</a></li>
                        <li><a>Admininstração</a></li>
                    </ul>
                </div>
                <div className="navbar-end space-x-3">
                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <ThemeSwitch />
                    <Profile/>
                </div>
            </div>
        </div>
    )
}