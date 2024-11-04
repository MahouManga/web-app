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

    // Estado para as mensagens citadas
    const [quotedPosts, setQuotedPosts] = useState<any[]>([]);

    // Estado para o modal de denúncia
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportPostId, setReportPostId] = useState<string | null>(null);
    const [reportReason, setReportReason] = useState('');
    const [reportDetails, setReportDetails] = useState('');

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

    // Função para citar uma mensagem
    const handleQuote = (post: any) => {
        console.log(post)
        if (!quotedPosts.some((p) => p.id === post.id)) {
            setQuotedPosts([...quotedPosts, post]);
            toast.success('Mensagem citada adicionada à sua resposta.');
        } else {
            toast.error('Você já citou esta mensagem.');
        }
    }

    // Função para abrir o modal de denúncia
    const handleReport = (postId: string) => {
        setReportPostId(postId);
        setShowReportModal(true);
    }

    // Função para enviar a denúncia
    const submitReport = async () => {
        if (!reportReason) {
            toast.error('Por favor, selecione um motivo para a denúncia.');
            return;
        }

        try {
            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    postId: reportPostId,
                    reason: reportReason,
                    details: reportDetails,
                }),
            });

            if (response.ok) {
                toast.success('Denúncia enviada com sucesso.');
                setShowReportModal(false);
                setReportReason('');
                setReportDetails('');
                setReportPostId(null);
            } else {
                toast.error('Erro ao enviar a denúncia.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            toast.error('Erro ao enviar a denúncia.');
        }
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
                                Entrou em {moment(post.user.createdAt).format('LL')}
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
                                    {post.user.id === user.id && <button
                                        className="btn btn-sm btn-outline btn-info tooltip tooltip-left"
                                        data-tip="Editar publicação"
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
                                        onClick={() => handleQuote(post)}
                                    >
                                        <FaComment />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline btn-error tooltip tooltip-left"
                                        data-tip="Denunciar publicação"
                                        onClick={() => handleReport(post.id)}
                                    >
                                        <FaExclamationTriangle />
                                    </button>
                                </div>}
                            </div>
                            {post.citingPosts && post.citingPosts.length > 0 && (
                                <div className="mb-4 space-y-4">
                                    <h4 className="text-md font-semibold">Respostas a esta mensagem:</h4>
                                    {post.citingPosts.map((citation: any) => (
                                        <div key={citation.citedPost.id} className="border-l-4 border-info pl-4 bg-base-200 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src={`/noImage.jpg`}
                                                    alt={`Avatar de ${citation.citedPost.user.name}`}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <p className="text-sm font-semibold">{citation.citedPost.user.name}:</p>
                                            </div>
                                            <div
                                                className="mt-2 text-sm line-clamp-5 topic-post"
                                                dangerouslySetInnerHTML={{ __html: citation.citedPost.content }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                                className="bg-base-100 w-full h-70 overflow-y-auto"
                                                theme="snow"
                                                modules={modules('t2')}
                                                formats={formats}
                                            />
                                        </div>}
                                    <div className='flex items-end justify-end space-x-3 p-2'>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setShowPreview(!showPreview)}>
                                            {showPreview ? 'Voltar' : 'Preview'}
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
                                    Última atualização: {moment(post.updatedAt).fromNow()}.
                                </p>}
                        </div>
                    </div>
                ))}
            </div>
            <BottomBar topic={topic} user={user} quotedPosts={quotedPosts} setQuotedPosts={setQuotedPosts} /> {/* Inclua o componente BottomBar */}
            {/* Modal de Denúncia */}
            {showReportModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Denunciar Publicação</h3>
                        <div className="py-4">
                            <label className="block mb-2">
                                Motivo:
                                <select
                                    className="select select-bordered w-full"
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                >
                                    <option value="">Selecione um motivo</option>
                                    <option value="spam">Spam</option>
                                    <option value="offensive">Conteúdo ofensivo</option>
                                    <option value="harassment">Assédio</option>
                                    <option value="other">Outro</option>
                                </select>
                            </label>
                            <label className="block mb-2">
                                Detalhes adicionais:
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    value={reportDetails}
                                    onChange={(e) => setReportDetails(e.target.value)}
                                    placeholder="Descreva detalhes adicionais"
                                />
                            </label>
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowReportModal(false)}>Cancelar</button>
                            <button className="btn btn-primary" onClick={submitReport}>Enviar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
