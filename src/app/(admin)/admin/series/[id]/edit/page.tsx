import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Form from "../../CreateAndEditPage"
import { getSerie } from "@/services/serieService";
import { validateRequest } from "@/lib/auth";

export default async function Admin({ params }: { params: Params }) {
    const { id } = params;

    const serie = await getSerie(Number(id));
    const user = await validateRequest();

    if (!serie || !user) {
        return (
            <div>
                Serie not found
            </div>
        );
    }

    console.log(serie)

    return (
        <Form serie={serie.data}/>
    );
}