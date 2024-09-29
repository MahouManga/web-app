// /app/admin/genres/page.tsx
import { getGenres } from '@/services/genreService';
import GenrePage from './GenrePage';

export default async function Page() {
  const res = await getGenres();
  const data = res.data || [];

  return <GenrePage data={data} />;
}