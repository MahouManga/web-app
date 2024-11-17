import { getSerie } from '@/services/serieService';
import SeriePage from './SeriePage';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getChaptersByUserID } from '@/services/chapterService';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Admin Serie Page | Mahou Reader',
};



export default async function Page({ params }: { params: Params }) {
    const { id } = params;

    const { user } = await validateRequest();
    if (!user) {
        return redirect("/");
    }

    const serie = await getSerie(Number(id));
    const chapters = await getChaptersByUserID(user.id, Number(id));

    if (!serie || serie.error) {
        return (<div>
            Serie not found
        </div>)
    }
    return (<SeriePage serie={serie.data} chapters={chapters} />);
}