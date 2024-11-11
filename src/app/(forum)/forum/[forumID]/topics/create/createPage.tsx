'use client';

import EditorToolbar, { modules } from "@/components/editorToolBar";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
  "header", "font", "size", "bold", "italic", "underline",
  "align", "strike", "script", "blockquote", "background",
  "list", "bullet", "indent", "link", "image", "video",
  "color", "code-block"
];
export default function CreatePage({ forum, user }: { forum: any, user: any }) {
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/forum/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content: content,
          forumId: forum.id,
          userId: user.id
        })
      });

      const dataResponse = await response.json();

      if (response.ok) {
        toast.success("Tópico criado com sucesso!");
        router.push(`/forum/${forum.id}/topics/${dataResponse.id}`);
      } else {
        toast.error("Erro ao criar o tópico.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao criar o tópico.");
    }
  };

  return (
    <div>
      <div className="bg-base-300 p-6 rounded-lg space-y-4">
        <div>
          <nav className="text-sm text-base-content mb-4">
            <Link href="/forum" className="hover:underline">Mahou Reader Fóruns</Link> <span className="mx-1"><span className="mx-1">&rsaquo;</span></span>
            <Link href={`/forum/${forum.id}`} className="hover:underline">{forum.title}</Link>
          </nav>
        </div>
        <div className='flex justify-between items-center'>
          <h2 className="text-2xl font-semibold">Criar novo tópico</h2>
          <button className="btn btn-secondary font-bold" onClick={() => setPreview(!preview)}>
            {preview ? 'Editar' : 'Pré-visualizar'}
          </button>
        </div>
        <div className='space-y-4 flex flex-col'>
          <input
            id="title-input"
            type="text"
            placeholder="Clique aqui para definir o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full text-lg text-base-content bg-base-200 placeholder-neutral-content focus:outline-none focus:ring focus:ring-primary border-b border-neutral-content mb-2"
          />
          {preview ?
            <div
              className="mt-4 topic-post border rounded p-4 topic-post"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            : (
              <div>
                <div className="">
                  <ReactQuill
                    id="content"
                    value={content}
                    onChange={setContent}
                    className="bg-white text-black h-70 overflow-y-auto"
                    theme="snow"
                    modules={modules('t2')}
                    formats={formats}
                  />
                </div>
                <EditorToolbar toolbarId={'t2'} />
              </div>)}
        </div>
        <div className='flex w-full justify-end'>
          <button className="btn btn-primary font-bold" onClick={() => handleSubmit()}>Publicar</button>
        </div>
      </div>
    </div>
  );
}
