// src/app/forum/page.tsx
import ForumComponent from '@/components/Forum/ForumComponent';
import { getCategorys } from '@/services/forumService';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

export default async function ForumHome() {
  const categories = await getCategorys();

  if (!categories) {
    return <p>No categories found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fóruns</h1>
      <div className="min-h-screen text-base-content">
        <div className="mx-auto">
          {categories.map((category: any) => (
            <div key={category.id} className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <ForumComponent key={category.id} forum={category} />
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
}