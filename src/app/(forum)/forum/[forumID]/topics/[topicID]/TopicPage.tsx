// components/ForumConversation.tsx
"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import BottomBar from "./BottomBar"; // Importe o componente BottomBar
import 'react-quill/dist/quill.snow.css';

export default function TopicPage({ topic, forum, user }: any) {
    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-center space-y-5 overflow-y-auto mb-17">
                {topic.posts.map((post:any, index:number) => (
                    <div
                        key={index}
                        className="w-full max-w-6xl rounded-lg shadow-lg lg:flex group"
                    >
                        {/* Informações do Usuário à Esquerda */}
                        <div className="flex flex-row justify-between lg:w-1/6 lg:flex-col items-center bg-base-100 border border-base-200 p-4">
                            <div className='flex flex-row lg:flex-col items-center lg:space-x-0 space-x-5 justify-center mb-0 lg:mb-4'>
                                <img
                                    src={`/noImage.jpg`}
                                    alt={`Avatar de ${post.user.name}`}
                                    className="w-16 h-16 rounded-full mb-4"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{post.user.name}</h2>
                                    <p>@{post.user.username}</p>
                                </div>
                            </div>
                            <p className="text-sm opacity-50">
                                Entrou em 17 de Janeiro
                            </p>
                        </div>

                        {/* Conteúdo da Postagem à Direita */}
                        <div className="flex-1 bg-base-100 p-4 border border-base-200">
                            <div className="flex space-x-5 w-full items-center justify-between">
                                <div className="flex space-x-5 w-full items-center">
                                    {index === 0 && (
                                        <span className="bg-green-700 text-white px-2 py-1 rounded text-xs mt-2">
                                            Autor do Tópico
                                        </span>
                                    )}
                                    <p className="text-sm opacity-50">Postado em</p>
                                </div>
                                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
                                    <button
                                        className="btn btn-sm btn-outline tooltip tooltip-left"
                                        data-tip="Citar publicação na resposta"
                                    >
                                        <FaComment />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline btn-error tooltip tooltip-left"
                                        data-tip="Denunciar publicação"
                                    >
                                        <FaExclamationTriangle />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="mt-4 topic-post"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                            <p className="text-gray-500 text-sm mt-2">
                                Última edição (Atualiziado em).
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <BottomBar /> {/* Inclua o componente BottomBar */}
        </div>
    );
}
