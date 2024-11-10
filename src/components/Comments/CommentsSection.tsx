'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';

import EditorToolbar, { modules } from "@/components/editorToolBar";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from 'next/image';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
  "header", "font", "size", "bold", "italic", "underline",
  "align", "strike", "script", "blockquote", "background",
  "list", "bullet", "indent", "link", "image", "video",
  "color", "code-block"
];

function SenderComponent({ parentId, handleAddReply }: any) {
  const router = useRouter();
  const [content, setContent] = useState('');

  return (
    <div className="mt-2 ml-4">
      <div className="">
        <EditorToolbar toolbarId={parentId ? 'id' + parentId : 'messanger'} />
        <ReactQuill
          id="content"
          value={content}
          onChange={setContent}
          className="bg-base-100 h-50 overflow-y-auto"
          theme="snow"
          modules={parentId ? modules('id' + parentId) : modules('messanger')}
          formats={formats}
        />
      </div>
      <div className='flex flex-end justify-end'>
        <button onClick={() => handleAddReply(parentId ?? null, content)} className="btn btn-primary mt-2">
          Comentar
        </button>
      </div>
    </div>
  );
}

export default function CommentsSection({ itemId, user, type }: any) {
  const router = useRouter();
  const [comments, setComments] = useState<any[]>([]);
  const [collapsedComments, setCollapsedComments] = useState<{ [key: string]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const COMMENTS_PER_PAGE = 20;

  // Função para buscar comentários
  const fetchComments = useCallback(async (currentPage: number, append = false) => {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
  
      const response = await fetch(`/api/comments?itemId=${itemId}&type=${type}&page=${currentPage}&limit=${COMMENTS_PER_PAGE}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.comments.length < COMMENTS_PER_PAGE) {
          setHasMore(false);
        }
  
        if (append) {
          setComments((prevComments) => [...prevComments, ...data.comments]);
        } else {
          setComments(data.comments);
        }
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      if (currentPage === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  }, [itemId, type]);
  
  // useEffect para carregar comentários na montagem do componente
  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  const handleAddReply = async (parentId: string | null, content: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          userId: user.id,
          parentId: parentId || null,
          content,
          type: type,
        }),
      });

      if (response.ok) {
        // Após adicionar um comentário, recarrega os comentários
        fetchComments(1);
        setReplyingTo(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to add comment:', errorData.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = (commentId: string) => {
    // Implementação de like
  };

  const handleDislike = (commentId: string) => {
    // Implementação de dislike
  };

  const toggleCollapse = (commentId: string) => {
    setCollapsedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const loadMoreComments = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage, true);
  };

  const renderReplies = (replies: any[], level = 1) => {
    return replies.map((reply) => (
      <React.Fragment key={reply.id}>
        <div
          className={`flex items-start space-x-4 mb-4 ml-${level * 4}`}
        >
          <div className="flex items-start w-full">
            <Image
              src={reply.user.image || "/noImage.jpg"}
              alt="Avatar"
              className={`w-${level === 1 ? 10 : 8} h-${level === 1 ? 10 : 8} rounded-full`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white">{reply.user.name}</span>
                  <span className="text-gray-500 text-sm">{new Date(reply.createdAt).toLocaleString()}</span>
                </div>
                <button onClick={() => toggleCollapse(reply.id)} className="text-gray-400 hover:text-white">
                  {collapsedComments[reply.id] ? <FaPlus /> : <FaMinus />}
                </button>
              </div>
              {!collapsedComments[reply.id] && (
                <>
                  <p className="text-gray-300 topic-post" dangerouslySetInnerHTML={{ __html: reply.content }}></p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button onClick={() => handleLike(reply.id)} className="text-gray-400 hover:text-white flex items-center space-x-1">
                      <MdThumbUp /> <span>{reply.likes || 0}</span>
                    </button>
                    <button onClick={() => handleDislike(reply.id)} className="text-gray-400 hover:text-white flex items-center space-x-1">
                      <MdThumbDown /> <span>{reply.dislikes || 0}</span>
                    </button>
                    <button onClick={() => {
                      replyingTo === reply.id ? setReplyingTo(null) : setReplyingTo(reply.id)
                    }} className="text-gray-400 hover:text-white">Responder</button>
                  </div>

                  {replyingTo === reply.id && <SenderComponent parentId={reply.id} handleAddReply={handleAddReply} />}
                </>
              )}
            </div>
          </div>
        </div>
        {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies, level + 1)}
      </React.Fragment>
    ));
  };

  if (loading) {
    return <div className="text-center py-6">Carregando comentários...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-lg">
      {/* Campo de entrada de novo comentário */}
      <div className="mb-4">
        <SenderComponent handleAddReply={handleAddReply} parentId={null} />
      </div>

      {/* Opções de Ordenação */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400">{comments.length} Comentários</span>
        <div className="tabs">
          <a className="tab tab-bordered tab-sm tab-active">Melhores</a>
          <a className="tab tab-bordered tab-sm">Mais Recentes</a>
          <a className="tab tab-bordered tab-sm">Mais Antigos</a>
        </div>
      </div>

      {/* Lista de Comentários */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-start w-full">
                <Image
                  src={comment.user.image || "/noImage.jpg"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{comment.user.name}</span>
                      <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                    <button onClick={() => toggleCollapse(comment.id)} className="text-gray-400 hover:text-white">
                      {collapsedComments[comment.id] ? <FaPlus /> : <FaMinus />}
                    </button>
                  </div>
                  {!collapsedComments[comment.id] && (
                    <>
                      <p className="text-gray-300 whitespace-pre-line topic-post" dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className="text-gray-400 hover:text-white flex items-center space-x-1"
                        >
                          <MdThumbUp /> <span>{comment.likes || 0}</span>
                        </button>
                        <button onClick={() => handleDislike(comment.id)} className="text-gray-400 hover:text-white flex items-center space-x-1">
                          <MdThumbDown /> <span>{comment.dislikes || 0}</span>
                        </button>
                        <button onClick={() => setReplyingTo(comment.id)} className="text-gray-400 hover:text-white">Responder</button>
                      </div>

                      {replyingTo === comment.id && <SenderComponent parentId={comment.id} handleAddReply={handleAddReply} />}

                      {/* Respostas */}
                      {comment.replies && comment.replies.length > 0 && renderReplies(comment.replies, 2)}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botão "Carregar Mais" */}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreComments}
              className="btn btn-outline"
              disabled={loadingMore}
            >
              {loadingMore ? 'Carregando...' : 'Carregar Mais'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}