// components/BottomBar.tsx
"use client";

import { useState } from "react";
import { FaBookmark, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import EditorToolbar, { modules } from "@/components/editorToolBar";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { threadId } from "worker_threads";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: true });

const formats = [
  "header", "font", "size", "bold", "italic", "underline",
  "align", "strike", "script", "blockquote", "background",
  "list", "bullet", "indent", "link", "image", "video",
  "color", "code-block"
];

export default function BottomBar({ user, topic }: any) {
  const router = useRouter();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState('');

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/forum/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          threadId: topic.id,
          userId: user.id,
          content,
        })
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setShowReplyBox(false);
        setContent('');
        toast.success("Mensagem Enviada com sucesso!");
        router.refresh();
      } else {
        toast.error("Erro ao criar o tópico.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao criar o tópico.");
    }
  };

  return (
    <>
      {/* Caixa de Resposta */}
      {showReplyBox && (
        <div className="fixed flex bottom-16 left-0 right-0 justify-center z-50 p-4">
          <div className="bg-primary-content p-4 shadow-lg rounded-xl w-full max-w-6xl space-y-3">
            <div className="flex justify-between items-center">
              <h1 className='text-xl'>Enviar Resposta</h1>
              <div className='space-x-3'>
                <button className="btn btn-secondary" onClick={() => setShowPreview(!showPreview)}>
                  {showPreview ? 'Editor' : 'Pré-visualizar'}
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Enviar Mensagem
                </button>
              </div>
            </div>
            {showPreview ?
              <div
                className="mt-4 topic-post border rounded p-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              : <div className="">
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
          </div>
        </div >
      )
      }

      {/* Barra Inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-4 flex justify-between items-center z-40">
        {/* Ícone da Esquerda */}
        <div>
          <FaBookmark size={24} />
        </div>

        {/* Navegação Central */}
        <div className="flex items-center">
          <button className="btn btn-sm btn-ghost">
            <FaAngleLeft size={20} />
          </button>
          <span className="mx-2">1 / 10</span> {/* Atualize conforme necessário */}
          <button className="btn btn-sm btn-ghost">
            <FaAngleRight size={20} />
          </button>
        </div>

        {/* Botão da Direita */}
        <button className="btn btn-primary" onClick={toggleReplyBox}>
          Responder
        </button>
      </div>
    </>
  );
}
