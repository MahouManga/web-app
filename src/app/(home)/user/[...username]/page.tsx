import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProfilePage from "./Perfil";
import Overview from "./overview";
import { validateRequest } from "@/lib/auth";
import { getUserByUsername } from "@/services/userService";
import ReadingList from "./readingList";

export default async function Page({ params }: { params: Params }) {

    const { username } = params;
    const user = await getUserByUsername(username[0]);

    const tabNavigate = username[1] ?? 'overview';

    const tabs = [
        { name: 'Overview', url: '', href: '/', component: <Overview user={user} /> },
        { name: 'Novel List', url: 'novellist', href: '/novellist', component: <ReadingList user={user} type='NOVEL' /> },
        { name: 'Manga List', url: 'mangalist', href: '/mangalist', component: <ReadingList user={user} type='MANGA'/> },
        { name: 'Stats', url: 'stats', href: '/stats' },
        { name: 'Social', url: 'social', href: '/social' },
        { name: 'Reviews', url: 'reviews', href: '/reviews' },
        { name: 'Submissions', url: 'submissions', href: '/submissions' },
    ];

    // Função para encontrar o componente correspondente com base na URL
    const selectedTab = tabs.find(tab => tab.url === tabNavigate) || tabs[0];
    const renderTabComponent = () => {
        return selectedTab?.component ?? <Overview user={user} />;
    };

    return (
        <>
            <ProfilePage user={user} selectedTab={selectedTab} tabs={tabs} />
            <div className='flex w-full justify-center bg-base-300'>
            <div className='flex container max-w-5xl p-2 h-screen'>
                {renderTabComponent()}
            </div>
            </div>
        </>
    );
}