import { getGenres2 } from '@/services/genreService';
import { Genre } from '@prisma/client';
import SearchPage from './SearchPage';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Busca | Mahou Reader',
};

export default async function Page() {
  const genres: Genre[] = await getGenres2() || [];

  return (<SearchPage genres={genres} />);
}