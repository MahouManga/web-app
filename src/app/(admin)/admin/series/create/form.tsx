'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import { SerieType, SerieSubtype } from "@prisma/client";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getStatusText } from "@/utils/projectStatus";

const mediaTypes = Object.keys(SerieType).map((key) => ({
    value: key,
    label: key.charAt(0) + key.slice(1).toLowerCase(), // Formata o label, ex: "NOVEL" -> "Novel"
}));

const subTypes = Object.keys(SerieSubtype).map((key) => ({
    value: key,
    label: key.charAt(0) + key.slice(1).toLowerCase(), // Formata o label, ex: "NOVEL" -> "Novel"
}));

export default function Form() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        synopsis: '',
        description: '',
        readingTips: '',
        status: '',
        adult: false,
        type: '',
        subtype: '',
        genres: [] as any,
        titles: [] as any,
        authors: [] as any,
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

    const handleAddTitle = () => {
        setFormData({
            ...formData,
            titles: [...formData.titles, { title: '', type: '' }],
        });
    };

    const handleRemoveTitle = (index: number) => {
        const titles = formData.titles.filter((_: any, i: any) => i !== index);
        setFormData({ ...formData, titles });
    };

    const handleTitleChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const titles = [...formData.titles];
        titles[index] = { ...titles[index], [name]: value };
        setFormData({ ...formData, titles });
    };

    const handleAddAuthor = () => {
        setFormData({
            ...formData,
            authors: [...formData.authors, { name: '' }],
        });
    };

    const handleRemoveAuthor = (index: number) => {
        const authors = formData.authors.filter((_: any, i: any) => i !== index);
        setFormData({ ...formData, authors });
    };

    const handleAuthorChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const authors = [...formData.authors];
        authors[index] = { ...authors[index], [name]: value };
        setFormData({ ...formData, authors });
    };

    const handleGenreClick = (genreId: number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            genres: prevFormData.genres.includes(genreId)
                ? prevFormData.genres.filter((id: any) => id !== genreId)
                : [...prevFormData.genres, genreId],
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/series', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();


            if (data.error) {
                toast.error('Erro na criação da obra, \ntem alguma coisa faltando!');
            } else {
                toast.success('Obra criada com sucesso!');
                router.push(`/admin/series/${data.data.id}`);
            }
        } catch (error) {
            console.error('Error submitting novel:', error);
        }
    };

    return (

        <div className="bg-primary relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="card-body">
                <h2 className="card-title">Adicionar nova Obra</h2>
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="status">
                                <span className="label-text">Status da Obra</span>
                            </label>
                            <div className="input-group">
                                <select
                                    id="status"
                                    name="status"
                                    className="select select-bordered w-full"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=""> Selecione o Tipo </option>
                                    <option value={1}>{getStatusText(1)}</option>
                                    <option value={2}>{getStatusText(2)}</option>
                                    <option value={3}>{getStatusText(3)}</option>
                                    <option value={4}>{getStatusText(4)}</option>
                                    <option value={5}>{getStatusText(5)}</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="status">
                                <span className="label-text">Tipo de Media</span>
                            </label>
                            <div className="input-group">
                                <select
                                    id="type"
                                    name="type"
                                    className="select select-bordered w-full"
                                    value={formData.type}
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

                    {/* Títulos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="titles">
                                <span className="label-text">Titles</span>
                                <button onClick={handleAddTitle}
                                    type="button"
                                    className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <IoAdd className="w-5 h-5 mr-2" />
                                    Add New
                                </button>
                            </label>
                            {formData.titles.map((title: any, index: number) => (
                                <div key={index} className="flex label space-x-2 mb-2">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        className="input input-bordered w-full"
                                        value={title.title}
                                        onChange={(e) => handleTitleChange(index, e)}
                                        required
                                    />
                                    <select
                                        name="type"
                                        className="select select-bordered w-full"
                                        value={title.type}
                                        onChange={(e) => handleTitleChange(index, e)}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="default">Default</option>
                                        <option value="synonym">Synonym</option>
                                        <option value="portuguese">Português</option>
                                        <option value="english">English</option>
                                        <option value="japanese">japanese</option>
                                        <option value="korean">Korean</option>
                                    </select>
                                    <button type="button" className="btn btn-error" onClick={() => handleRemoveTitle(index)}>Remove</button>
                                </div>
                            ))}
                        </div>

                        {/* Autores */}
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="titles">
                                <span className="label-text">Authors</span>
                                <button onClick={handleAddAuthor}
                                    type="button"
                                    className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <IoAdd className="w-5 h-5 mr-2" />
                                    Add New
                                </button>
                            </label>
                            {formData.authors.map((author: any, index: number) => (
                                <div key={index} className="flex label space-x-2 mb-2">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Author Name"
                                        className="input input-bordered w-full"
                                        value={author.name}
                                        onChange={(e) => handleAuthorChange(index, e)}
                                        required
                                    />
                                    <button type="button" className="btn btn-error" onClick={() => handleRemoveAuthor(index)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botão de Submit */}
                    <div className="form-control mt-6 flex items-center">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary w-full md:w-1/4">Add Novel</button>
                    </div>
                </form>
            </div>
        </div >
    );
}