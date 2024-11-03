import { useSearchParams } from "next/navigation";
import FollowingList from "./FollowingList";
import FollowersList from "./FollowersList";
import { getFollowing, getFollowers } from "@/services/socialService";

export default async function SocialPage({ user, searchParams }: { user: any, searchParams: any }) {
    const tab = (searchParams.tab as string) || 'following';

    // Executa a função de obtenção de dados diretamente no componente
    const following = tab === "following" ? await getFollowing(user.id) : [];
    const followers = tab === "followers" ? await getFollowers(user.id) : [];

    return (
        <div className="flex">
            {/* Menu Lateral */}
            <div className="w-1/4 p-4 bg-base-100">
                <h2 className="text-lg font-bold mb-4">Social</h2>
                <ul>
                    <li className={`cursor-pointer ${tab === "following" ? "font-bold" : ""}`}>
                        <a href="?tab=following">Following</a>
                    </li>
                    <li className={`cursor-pointer ${tab === "followers" ? "font-bold" : ""}`}>
                        <a href="?tab=followers">Followers</a>
                    </li>
                </ul>
            </div>

            {/* Conteúdo da Página */}
            <div className="w-3/4 p-4">
                {tab === "following" ? (
                    <FollowingList following={following} />
                ) : (
                    <FollowersList followers={followers} />
                )}
            </div>
        </div>
    );
}