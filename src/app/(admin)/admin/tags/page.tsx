// /app/admin/genres/page.tsx
import { getGenres } from '@/services/genreService';
import TagPage from './TagPage';

export default async function Page() {
  const res = await getGenres();
  const data = res.data || [];

  return <TagPage data={data} />;
}