// app/profile/forum-posts/page.tsx

import { getUserForumPosts } from '@/services/forumService';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/pt-br';

interface ForumPostsPageProps {
    user: any;
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ForumPostsPage({ user, searchParams }: ForumPostsPageProps) {
    const page = parseInt((searchParams.page as string) || '1', 10);

    const { posts, totalPages } = await getUserForumPosts(user.id, page);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Postagens no Fórum</h1>
            <div className="space-y-6">
                {posts.map((post:any) => (
                    <div key={post.id} className="p-4 bg-base-200 rounded shadow space-y-4">
                        <div className="text-xl">
                            Em tópico{' '}
                            <Link href={`/forum/thread/${post.thread.id}`} className="text-info hover:underline">
                                {post.thread.title}
                            </Link>
                        </div>

                        <div className="topic-post" dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* Exibir as citações, se houver */}
                        {post.citedPosts && post.citedPosts.length > 0 && (
                            <div className="mt-4 pl-4 border-l-4 border-gray-300 space-y-2">
                                <h3 className="text-sm font-semibold text-gray-500">Citações:</h3>
                                {post.citedPosts.map((cited:any) => (
                                    <div key={cited.id} className="text-sm text-gray-500 italic">
                                        <span className="font-semibold">{cited.user.name} disse:</span>
                                        <div
                                            className="mt-1 topic-post"
                                            dangerouslySetInnerHTML={{ __html: cited.content }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-1 text-xs text-gray-500">
                            {moment(post.createdAt).locale('pt-br').format("DD [de] MMMM [de] YYYY [às] HH:mm")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de Paginação */}
            <div className="mt-8 flex justify-center items-center space-x-4">
                <Pagination currentPage={page} totalPages={totalPages} basePath={`/user/${user.username}/forum-posts`} />
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
