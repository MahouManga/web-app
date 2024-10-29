import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import TopicPage from "./TopicPage";
import { getForumByID } from "@/services/forumService";
import { validateRequest } from "@/lib/auth";
import { getTopicByID } from "@/services/threadService";

export default async function Page({ params }: { params: Params }) {
  const { forumID, topicID } = params;
  const forum = await getForumByID(forumID);
  const { user } = await validateRequest();
  const topic = await getTopicByID(topicID);

  if (!forum || !topic) {
    return (
      <div className="text-center py-10">
        Forum and Topic not found
      </div>
    )
  }

  return (
    <TopicPage topic={topic} forum={forum} user={user} />
  )
}