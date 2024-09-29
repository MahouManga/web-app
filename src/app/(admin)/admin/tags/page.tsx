import TagPage from './TagPage';
import { getTags } from '@/services/tagService';

export default async function Page() {
  const res = await getTags();
  const data = res.data || [];

  return <TagPage data={data} />;
}