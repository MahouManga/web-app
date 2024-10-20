import { getChapterID } from "@/services/chapterService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ChapterPage from "./ChapterPage";
import { getSerie } from "@/services/serieService";

export default async function Page({ params }: { params: Params }) {
    const chapter = await getChapterID(params.chapterID);

    if (!chapter) {
        return (
            <div>Capitulo não encontrado!</div>
        )
    }

    const serie = await getSerie(chapter.serieID);

    if (!serie) {
        return (
            <div>Serie nao encontrada!</div>
        )
    }
    return (
        <ChapterPage serie={serie.data} chapter={chapter} previousChapter={1} nextChapter={2} />
    )
}