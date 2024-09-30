import { getGenres } from '@/services/genreService';
import { Genre } from '@prisma/client';
import SearchPage from './SearchPage';

export const metadata = {
  title: 'Busca | Mahou Reader',
};

export default async function Page() {
  // Busque os gêneros no servidor
  const genres: Genre[] = await getGenres();

  return (<SearchPage genres={genres} />);
}