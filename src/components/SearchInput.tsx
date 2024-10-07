'use client';

import { Genre } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getStatusText } from '@/utils/projectStatus';
import { IoSearchSharp } from "react-icons/io5";

interface QueryParams {
    searchQuery: string;
    orderBy: string;
    sort: string;
    status: string;
    genre: string;
}

interface SearchInputProps {
    genres: Genre[];
    query: QueryParams;
    route: string;
}

export default function SearchInput({ genres, query, route }: SearchInputProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>(query.searchQuery || '');
    const [selectedOrderBy, setSelectedOrderBy] = useState<string>(query.orderBy || 'title');
    const [selectedSort, setSelectedSort] = useState<string>(query.sort || '');
    const [selectedStatus, setSelectedStatus] = useState<string>(query.status || '');
    const [selectedGenre, setSelectedGenre] = useState<string>(query.genre || '');

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const params = new URLSearchParams({
            q: searchQuery,
            orderBy: selectedOrderBy,
            sort: selectedSort,
            status: selectedStatus,
            genre: selectedGenre,
        });

        router.push(`${route}?${params.toString()}`);
    };

    return (
        <form onSubmit={onSearch}>
            <div className="container px-5 my-5">
                <div className="flex flex-col flex-wrap items-center gap-3 lg:flex-row w-full">
                    <label className="input input-bordered flex items-center w-full">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Pesquisar"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                        <IoSearchSharp size={20} />
                    </label>
                    <div className="flex flex-wrap w-full lg:flex-row gap-3">
                        <select
                            value={selectedOrderBy}
                            onChange={(event) => setSelectedOrderBy(event.target.value)}
                            className="select select-bordered"
                        >
                            <option value="title">Título</option>
                            <option value="chapterCount">Quantidade de capítulos</option>
                            <option value="releasedAt">Data de lançamento</option>
                            <option value="updatedAt">Modificado em</option>
                            <option value="createdAt">Criado em</option>
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(event) => setSelectedStatus(event.target.value)}
                            className="select select-bordered"
                        >
                            <option value="">Status</option>
                            {[1, 2, 3, 4, 5].map((status) => (
                                <option key={status} value={status}>
                                    {getStatusText(status)}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedGenre}
                            onChange={(event) => setSelectedGenre(event.target.value)}
                            className="select select-bordered"
                        >
                            <option value="">Gêneros</option>
                            {genres && genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedSort}
                            onChange={(event) => setSelectedSort(event.target.value)}
                            className="select select-bordered"
                        >
                            <option value="">Ordenação</option>
                            <option value="asc">Crescente</option>
                            <option value="desc">Decrescente</option>
                        </select>
                        <button type="submit" className="btn btn-primary">
                            Pesquisar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
