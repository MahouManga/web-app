import { getAdjacentChapters, getChapterID } from "@/services/chapterService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ChapterPage from "./ChapterPage";
import { getSerie } from "@/services/serieService";
import { validateRequest } from "@/lib/auth";

export default async function Page({ params }: { params: Params }) {
    const chapter = await getChapterID(params.chapterID);
    const { user } = await validateRequest();

    if (!chapter) {
        return (
            <div>Capitulo não encontrado!</div>
        )
    }

    const serie = await getSerie(chapter.serieID);

    const { previousChapter, nextChapter } = await getAdjacentChapters(chapter.serieID, chapter.volume, chapter.index);

    if (!serie) {
        return (
            <div>Serie nao encontrada!</div>
        )
    }
    return (
        <ChapterPage user={user} serie={serie.data} chapter={chapter} previousChapter={previousChapter} nextChapter={nextChapter} />
    )
}