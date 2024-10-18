import { getSerie } from '@/services/serieService';
import SeriePage from './SeriePage';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getChapters } from '@/services/chapterService';

export const metadata = {
    title: 'Admin Serie Page | Mahou Reader',
};

export default async function Page({ params }: { params: Params }) {
    const { id } = params;

    const serie = await getSerie(Number(id));
    const chapters = await getChapters(Number(id));

    if (!serie || serie.error) {
        return (<div>
            Serie not found
        </div>)
    }
    return (<SeriePage serie={serie.data} chapters={chapters} />);
}