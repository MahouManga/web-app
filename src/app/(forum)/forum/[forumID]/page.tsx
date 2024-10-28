import ForumComponent from "@/components/Forum/ForumComponent";
import { getForum } from "@/services/forumService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default async function ForumPage({ params }: { params: Params }) {
    const { forumID } = params;
    const forum = await getForum(forumID);

    if (!forum) {
        return (
            <div className="text-center py-10">
                Forum not found
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-primary">{forum.title}</h1>
            <div className="min-h-screen text-base-content">
                <div className="mx-auto">
                    <ForumComponent forum={forum} />
                </div>
                {forum.allowTopics && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <Link href={`/forum/${forumID}/topics/create`} className='btn btn-primary'>
                                Criar Novo Tópico
                            </Link>
                            <div className="flex items-center">
                                <label htmlFor="orderBy" className="mr-2 text-lg font-medium">Ordenar por:</label>
                                <select id="orderBy" className="select select-bordered">
                                    <option value="recent">Mais recentes</option>
                                    <option value="popular">Mais populares</option>
                                </select>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Threads</h2>
                        {forum.threads && forum.threads.length > 0 ? (
                            <ul className="list-disc ml-5">
                                {forum.threads.map((thread: any) => (
                                    <div key={0} className="flex justify-between items-center gap-2 p-3 bg-base-200 border-l-4 border-secondary rounded-lg">
                                        <Link href={`/forum/${forumID}/topics/${thread.id}`}
                                            className="font-medium text-base-content hover:underline">
                                            {thread.title}
                                        </Link>
                                        <div className='flex space-x-4'>
                                            <p className="text-sm">Created at: {new Date(thread.createdAt).toLocaleDateString()}</p>
                                            <p className="text-sm">Posts: {thread.posts?.length ?? 0}</p>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>No threads available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}