import { getChapterID } from "@/services/chapterService";
import { getSerie } from "@/services/serieService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ChapterEdit from "./ChapterEdit";

const ChapterContentType = { // Novel or Manga
    'NOVEL': 'NOVEL',
    'MANGA': 'MANGA',
}

export default async function Page({ params }: { params: Params }) {
    const { id, chapterID } = params

    const serie = await getSerie(Number(id));
    const chapter = await getChapterID(chapterID);

    if (!serie || (!chapter && chapterID !== 'new')) {
        return (
            <div>
                Chapter not found
            </div>
        )
    }

    return (
        <ChapterEdit serie={serie.data} chapter={chapter} chapterID={chapterID} />
    )
}