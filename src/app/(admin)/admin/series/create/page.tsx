import { getGenres2 } from "@/services/genreService";
import Form from "../CreateAndEditPage"

export default async function Admin() {
    const genres = await getGenres2() || [];

    return (
        <Form genres={genres}/>
    );
}