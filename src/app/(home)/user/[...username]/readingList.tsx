// app/profile/ReadingList.tsx

import { getUserSeriesByType } from '@/services/libraryService';
import ReadingListClient from './readingListClient';

interface ReadingListProps {
  user: any;
  type: 'MANGA' | 'NOVEL';
}

export default async function ReadingList({ user, type }: ReadingListProps) {
  const series = await getUserSeriesByType(user.id, type);

  return <ReadingListClient series={series} type={type} />;
}