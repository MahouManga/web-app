'use client';
import { ChangeEvent, useEffect, useState } from "react";

import EditorToolbar, { modules } from "@/components/editorToolBar";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
    "header", "font", "size", "bold", "italic", "underline",
    "align", "strike", "script", "blockquote", "background",
    "list", "bullet", "indent", "link", "image", "video",
    "color", "code-block"
];
export default function NovelEditor({ editorState, setEditorState, chapter, chapterID, formData, serie }: any) {
    const [isHtmlPriority, setIsHtmlPriority] = useState(1);
    const [content, setContent] = useState<string>(chapter.content.text? chapter.content.text : '');
    const [htmlContent, setHtmlContent] = useState<string>(chapter.content.text? chapter.content.text : '');

    const handleEditorChange = (content: string) => {
        if (isHtmlPriority == 1) {
            setContent(content);
            setHtmlContent(content);
        }
    };

    const handleSave = async () => {
        try{
            const response = await fetch('/api/chapter/novel', {
                method: chapterID == 'new' ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, type: editorState, contentText: htmlContent, id: chapterID }), // ID is irrelevant if is 'POST'
            });
            if (response.ok) {
                console.log('LETWS GOO')
            } else {
                console.error('Error creating chapter:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating chapter:', error);
        }
    }

    return (
        <section>
            <div className="mb-4 flex justify-center space-x-5 items-center">
                {[1, 2].map((priority) => (
                    <button
                        key={priority}
                        className={`btn ${isHtmlPriority === priority ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setIsHtmlPriority(priority)}
                    >
                        {priority === 1 ? 'Editor de Texto' :'Visualizar Texto'}
                    </button>
                ))}
            </div>

            {isHtmlPriority == 1 ? (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="content">Editor de Texto</label>
                    <EditorToolbar toolbarId={'t2'} />
                    <div className="">
                        <ReactQuill
                            id="content"
                            value={content.replace(/<img src="\/([^"]+)"/g, '<img src="https://cdn.mahoureader.com/$1"')}
                            onChange={handleEditorChange}
                            className="bg-white text-black mb-5 h-150 overflow-y-auto"
                            theme="snow"
                            modules={modules('t2')}
                            formats={formats}
                        />
                    </div>
                </div>
            ) : (
                <div className="mb-5">
                    <h2 className="text-xl font-bold mb-3">Visualização</h2>
                    <div
                        className="p-5 text-base-content rounded-lg h-150 overflow-y-auto chapter-section"
                        dangerouslySetInnerHTML={{
                            __html: content.replace(/<img src="\/([^"]+)"/g, '<img src="https://cdn.mahoureader.com/$1"')
                        }}
                    />
                </div>
            )}

            <div className='flex justify-center'>
                <button
                    className="btn btn-primary w-auto lg:w-2/6"
                    onClick={handleSave}
                >
                    Salvar Capítulo
                </button>
            </div>
        </section>
    )
}