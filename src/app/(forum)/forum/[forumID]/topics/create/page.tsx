import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CreatePage from "./createPage";
import { validateRequest } from "@/lib/auth";
import { getForum } from "@/services/forumService";

export default async function Page({ params }: { params: Params }) {
    const { forumID } = params
    const { user } = await validateRequest();

    const forum = await getForum(forumID);

    if (!forum) {
        return (
            <div className="text-center py-10">
                Forum not found
            </div>
        )
    }

    return (
        <CreatePage forum={forum} user={user} />
    )
}