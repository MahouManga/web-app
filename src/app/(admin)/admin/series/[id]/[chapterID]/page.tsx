import { getChapterID } from "@/services/chapterService";
import { getSerie } from "@/services/serieService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ChapterEdit from "./ChapterEdit";
import { validateRequest } from "@/lib/auth";

const ChapterContentType = { // Novel or Manga
    'NOVEL': 'NOVEL',
    'MANGA': 'MANGA',
}

export default async function Page({ params }: { params: Params }) {
    const { id, chapterID } = params
    
    const user = validateRequest();
    const serie = await getSerie(Number(id));
    const chapter = await getChapterID(chapterID);

    if (!user || !serie || serie.error || (!chapter && chapterID !== 'new')) {
        return (
            <div>
                Serie or Chapter not found
            </div>
        )
    }

    return (
        <ChapterEdit user={user} serie={serie.data} chapter={chapter} chapterID={chapterID} />
    )
}