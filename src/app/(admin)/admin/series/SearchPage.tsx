// app/series/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NovelCard from '@/components/NovelCard';
import SearchInput from '@/components/SearchInput';
import { Genre } from '@prisma/client';

export default function SearchPage({ genres }: { genres: Genre[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const query = {
        searchQuery: searchParams.get('q') || '',
        orderBy: searchParams.get('orderBy') || 'title',
        sort: searchParams.get('sort') || '',
        status: searchParams.get('status') || '',
        genre: searchParams.get('genre') || '',
    };

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const params = new URLSearchParams({
                    q: query.searchQuery,
                    orderBy: query.orderBy,
                    sort: query.sort,
                    status: query.status,
                    genre: query.genre,
                });

                const res = await fetch(`/api/series?${params.toString()}`);
                const result = await res.json();
                setData(result.data || []);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchParams]);

    return (
        <main className="mx-auto">
            <div className="flex flex-col items-center w-full max-w-screen-xl mx-auto md:items-start">
                <div className="flex flex-col w-full">
                    <div className="container px-5 m-auto lg:px-0">
                        <SearchInput genres={genres} query={query} route="/admin/series" />
                        {isLoading ? (
                            <p>Carregando...</p>
                        ) : (
                            <div className="grid grid-cols-2 text-center text-white md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-3 xl:grid-cols-5 gap-y-4">
                                {data.map((serie: any) => (
                                    <NovelCard key={serie.id} serie={serie} link={`/admin/series/${serie.id}`} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}