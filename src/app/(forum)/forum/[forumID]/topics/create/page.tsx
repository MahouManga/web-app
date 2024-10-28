import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CreatePage from "./createPage";
import { validateRequest } from "@/lib/auth";
import { getForumByID } from "@/services/forumService";

export default async function Page({ params }: { params: Params }) {
    const { forumID } = params
    const { user } = await validateRequest();

    const forum = await getForumByID(forumID);

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