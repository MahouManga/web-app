// components/ForumConversation.tsx
"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import { FaComment, FaPen } from "react-icons/fa6";
import BottomBar from "./BottomBar"; // Importe o componente BottomBar
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";

import EditorToolbar, { modules } from "@/components/editorToolBar";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { threadId } from "worker_threads";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");
const ReactQuill = dynamic(() => import('react-quill'), { ssr: true });

const formats = [
    "header", "font", "size", "bold", "italic", "underline",
    "align", "strike", "script", "blockquote", "background",
    "list", "bullet", "indent", "link", "image", "video",
    "color", "code-block"
];

export default function TopicPage({ topic, forum, user }: any) {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [editPost, setEditPost] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const toggleEdit = (postID: string) => {
        setEditPost(postID);
        setShowEdit(true);
        setShowPreview(false);
    }

    const savePost = async (postID: string) => {
        try {
            const response = await fetch(`/api/forum/post`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    postId: postID,
                    content: content,
                }),
            });

            if (response.ok) {
                toast.success('Post atualizado com sucesso!');
                setShowEdit(false);
                setEditPost('');
                setContent('');
                router.refresh();
            } else {
                toast.error('Erro ao atualizar o post!');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            toast.error('Erro ao atualizar o post!');
        }
    }

    const cancelarEdit = () => {
        setShowEdit(false);
        setEditPost('');
        setContent('');
    }

    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-center space-y-5 overflow-y-auto mb-17">
                {topic.posts.map((post: any, index: number) => (
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
                                    {topic.user.id === post.user.id && (
                                        <span className="bg-green-700 text-white px-2 py-1 rounded text-xs mt-2">
                                            Autor do Tópico
                                        </span>
                                    )}
                                    <p className="text-sm opacity-50">Postado: {moment(post.createdAt).fromNow()}</p>
                                </div>
                                {post.id !== editPost && <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
                                    {topic.user.id === post.user.id && <button
                                        className="btn btn-sm btn-outline btn-info tooltip tooltip-left"
                                        data-tip="Citar publicação na resposta"
                                        onClick={() => {
                                            toggleEdit(post.id);
                                            setContent(post.content);
                                        }}
                                    >
                                        <FaPen />
                                    </button>}
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
                                </div>}
                            </div>
                            {showEdit && editPost === post.id ?
                                <div className='m-4 topic-post'>
                                    {showPreview ?
                                        <div
                                            className="topic-post"
                                            dangerouslySetInnerHTML={{ __html: content }}
                                        />
                                        : <div className='topic-post'>
                                            <EditorToolbar toolbarId={'t2'} />
                                            <ReactQuill
                                                id="content"
                                                value={content}
                                                onChange={setContent}
                                                className="bg-base-100 h-60 overflow-y-auto"
                                                theme="snow"
                                                modules={modules('t2')}
                                                formats={formats}
                                            />
                                        </div>}
                                    <div className='flex items-end justify-end space-x-3 p-2'>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setShowPreview(!showPreview)}>
                                            { showPreview ? 'Voltar' : 'Preview' }
                                        </button>
                                        <button className="btn btn-sm btn-error" onClick={() => cancelarEdit()}>
                                            Cancelar
                                        </button>
                                        <button className="btn btn-sm btn-success" onClick={() => savePost(post.id)}>
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                                : <div
                                    className="mt-4 topic-post"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            }
                            {moment(post.updatedAt).fromNow() !== moment(post.createdAt).fromNow() &&
                            <p className="flex justify-end opacity-50 text-sm mt-2">
                                Ultima atualização: {moment(post.updatedAt).fromNow()}.
                            </p>}
                        </div>
                    </div>
                ))}
            </div>
            <BottomBar topic={topic} user={user} /> {/* Inclua o componente BottomBar */}
        </div>
    );
}
