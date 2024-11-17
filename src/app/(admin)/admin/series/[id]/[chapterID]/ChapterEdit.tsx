'use client';

import { getStatusText } from "@/utils/projectStatus";
import { Chapter, Serie, User } from "@prisma/client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import MangaEditor from "./MangaEditor";
import NovelEditor from "./NovelEditor";

export default function ChapterEdit({ user, serie, chapter, chapterID, }: any) {
    const [editorState, setEditorState] = useState<string>(serie.type)
    const [formData, setFormData] = useState({
        title: chapter ? chapter.title : '',
        index: chapter ? chapter.index : 0,
        volume: chapter ? chapter.volume : 0,
        creatorID: 0,
        serieID: serie.id,
        userId: user.id,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/chapter', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: chapterID }),
            });
            if (response.ok) {
                console.log('LETWS GOO')
            } else {
                console.error('Error deleting chapter:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting chapter:', error);
        }
    }


    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

            <div className="flex flex-col md:flex-row md:space-x-4 mb-5 relative">
                <div className="flex-shrink-0">
                    <div className="card w-32 bg-base-300">
                        <figure>
                            <Image
                                src={`/images/series/${serie.id}/posterImage`}
                                alt="serie Cover"
                                width={200}
                                height={200}
                                className="object-cover w-full h-full"
                            />
                        </figure>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 flex-grow">
                    <h2 className="text-xl font-bold">{serie.title}</h2>
                    <p>Hyungwuk Shin, Killer Whale</p>
                    <p>Ano de publicação: {serie.releasedAt}</p>
                    <p>Status: {getStatusText(serie.status)}</p>
                    <p>Tipo: {serie.type}</p>
                    <p>SubTipo: {serie.subtype}</p>
                </div>
                <button onClick={handleDelete} className="absolute top-0 right-0 btn btn-error btn-sm mt-2 mr-2">
                    Deletar Capítulo
                </button>
            </div>

            <div className="bg-base-300 p-5 rounded-lg mb-5 shadow-inner">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="chapter-title">
                        Nome do Capítulo
                        <div className="tooltip tooltip-right" data-tip="Opcional">
                            <span className="text-info cursor-pointer ml-2">?</span>
                        </div>
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="input input-bordered w-full"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="chapter-number">Capítulo</label>
                        <input
                            id="index"
                            name="index"
                            className="input input-bordered w-full"
                            type="number"
                            value={formData.index}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="volume-number">
                            Volume
                            <div className="tooltip tooltip-right" data-tip="Se a obra não tiver volume, deixe em 0.">
                                <span className="text-info cursor-pointer ml-2">?</span>
                            </div>
                        </label>
                        <input
                            id="volume"
                            name="volume"
                            className="input input-bordered w-full"
                            type="number"
                            value={formData.volume}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="creator">Publicando por quem? (Você/Grupo)</label>
                    <select
                        id="creatorID"
                        name="creatorID"
                        className="select select-bordered w-full"
                        value={formData.creatorID}
                        onChange={handleChange}
                    >
                        <option value="">Nenhum</option>
                    </select>
                </div>
            </div>

            <ChooseEditor
                user={user}
                serie={serie}
                editorState={editorState}
                setEditorState={setEditorState}
                formData={formData}
                setFormData={setFormData}
                chapterID={chapterID}
                chapter={chapter}
            />

        </div>
    )
}

interface ChooseEditorProps {
    user: User,
    serie: Serie,
    editorState: string,
    setEditorState: any,
    formData: any,
    setFormData: any,
    chapterID: any,
    chapter: Chapter,
}

function ChooseEditor(props: ChooseEditorProps) {
    if (props.serie.type == 'MANGA') {
        return <MangaEditor {...props} />
    } else if (props.serie.type == 'NOVEL') {
        return <NovelEditor {...props} />
    }
}