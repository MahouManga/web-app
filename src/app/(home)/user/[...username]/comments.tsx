// app/profile/comments/page.tsx

import { getUserComments } from '@/services/libraryService';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/pt-br';

interface CommentsPageProps {
    user: any;
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CommentsPage({ user, searchParams }: CommentsPageProps) {
    const page = parseInt((searchParams.page as string) || '1', 10);

    const { comments, totalPages } = await getUserComments(user.id, page);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Últimos Comentários</h1>
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-base-200 rounded shadow space-y-4">
                        <div className="text-xl">
                            {comment.chapter ? (
                                <>
                                    Em capítulo{' '}
                                    <Link href={`/ler/${comment.chapter.id}`} className="text-info hover:underline">
                                        {comment.chapter.title || `Vol. ${comment.chapter.volume} Cap. ${comment.chapter.index}`}
                                    </Link>{' '}
                                    da série{' '}
                                    <Link href={`/serie/${comment.serie?.id}`} className="text-info hover:underline">
                                        {comment.serie?.title}
                                    </Link>
                                </>
                            ) : comment.serie ? (
                                <>
                                    Série{' '}
                                    <Link href={`/serie/${comment.serie.id}`} className="text-info hover:underline">
                                        {comment.serie.title}
                                    </Link>
                                </>
                            ) : (
                                'Comentário geral'
                            )}
                        </div>

                        {/* Exibir "Em resposta de..." se houver um comentário pai */}
                        {comment.parent && (
                            <div className="pl-4 border-l-4 border-gray-300 text-sm text-gray-500 italic">
                                Em resposta de <span className="font-semibold">{comment.parent.user.name}</span>:
                                <div
                                    className="mt-1 topic-post"
                                    dangerouslySetInnerHTML={{ __html: comment.parent.content }}
                                />
                            </div>
                        )}

                        <div className='topic-post' dangerouslySetInnerHTML={{ __html: comment.content }} />
                        <div className="mt-1 text-xs text-gray-500">
                            {moment(comment.createdAt).locale('pt-br').format("DD [de] MMMM [de] YYYY [às] HH:mm")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de Paginação */}
            <div className="mt-8 flex justify-center items-center space-x-4">
                <Pagination currentPage={page} totalPages={totalPages} basePath={`/user/${user.username}/comments`} />
            </div>
        </div>
    );
}


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    return (
        <div className="flex items-center space-x-4">
            {currentPage > 1 && (
                <Link href={`${basePath}?page=${currentPage - 1}`} className="px-3 py-1 bg-base-200 rounded hover:bg-base-300">
                    Anterior
                </Link>
            )}
            <span>
                Página {currentPage} de {totalPages}
            </span>
            {currentPage < totalPages && (
                <Link href={`${basePath}?page=${currentPage + 1}`} className="px-3 py-1 bg-base-200 rounded hover:bg-base-300">
                    Próxima
                </Link>
            )}
        </div>
    );
}