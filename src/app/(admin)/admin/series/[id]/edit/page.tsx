import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Form from "../../CreateAndEditPage"
import { getSerie } from "@/services/serieService";
import { validateRequest } from "@/lib/auth";
import { getGenres2 } from "@/services/genreService";

export default async function Admin({ params }: { params: Params }) {
    const { id } = params;

    const serie = await getSerie(Number(id));
    const genres = await getGenres2();
    const user = await validateRequest();

    if (!serie || !user) {
        return (
            <div>
                Serie not found
            </div>
        );
    }

    return (
        <Form serie={serie.data} genres={genres} />
    );
}