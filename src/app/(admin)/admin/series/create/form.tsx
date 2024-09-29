'use client'

import { ChangeEvent, useState } from "react";
import { MediaType, SerieSubtype, StatusType } from "@prisma/client";

const mediaTypes = Object.keys(MediaType).map((key) => ({
    value: key,
    label: key.charAt(0) + key.slice(1).toLowerCase(), // Formata o label, ex: "NOVEL" -> "Novel"
}));

const subTypes = Object.keys(SerieSubtype).map((key) => ({
    value: key,
    label: key.charAt(0) + key.slice(1).toLowerCase(), // Formata o label, ex: "NOVEL" -> "Novel"
}));

const statusTypes = Object.keys(StatusType).map((key) => ({
    value: key,
    label: key.charAt(0) + key.slice(1).toLowerCase(), // Formata o label, ex: "NOVEL" -> "Novel"
}));

export default function Form() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        synopsis: '',
        description: '',
        readingTips: '',
        status: 1,
        adult: false,
        mediaType: '',
        subtype: '',
        genres: [],
        titles: [],
        authors: [],
        releasedAt: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
            const { checked } = e.target;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div>
            <div className="bg-base-300 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="card-body">
                    <h2 className="card-title">Adicionar nova Obra</h2>
                    <form>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="title">
                                <span className="">Titulo</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="input input-bordered"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control mb-4">
                                <label className="label" htmlFor="status">
                                    <span className="label-text">Tipo de Media</span>
                                </label>
                                <div className="input-group">
                                    <select
                                        id="mediaType"
                                        name="mediaType"
                                        className="select select-bordered w-full"
                                        value={formData.mediaType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value=""> Selecione o Tipo </option>
                                        {mediaTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-control mb-4">
                                <label className="label" htmlFor="status">
                                    <span className="label-text">Subtipo</span>
                                </label>
                                <div className="input-group">
                                    <select
                                        id="subtype"
                                        name="subtype"
                                        className="select select-bordered w-full"
                                        value={formData.subtype}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value=""> Qual o SubTipo </option>
                                        {subTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label" htmlFor="synopsis">
                                <span className="label-text">Sinopse</span>
                            </label>
                            <textarea
                                id="synopsis"
                                name="synopsis"
                                className="textarea textarea-bordered"
                                value={formData.synopsis}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label" htmlFor="description">
                                <span className="label-text">Descrição</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="textarea textarea-bordered"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* ReleasedAt */}
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="releasedAt">
                                <span className="label-text">
                                    Release Date
                                    <div className="tooltip tooltip-right" data-tip="Data de lançamento da obra.">
                                        <span className="text-info cursor-pointer ml-2">?</span>
                                    </div></span>
                            </label>
                            <input
                                type="number"
                                min="1900"
                                max="2299"
                                step="1"
                                id="releasedAt"
                                name="releasedAt"
                                className="input input-bordered"
                                value={formData.releasedAt}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}