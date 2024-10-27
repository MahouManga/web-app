// src/app/forum/page.tsx
import { getCategorys } from '@/services/forumService';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

export default async function ForumHome() {
  const categories = await getCategorys();

  if (!categories) {
    return <p>No categories found.</p>;
  }
  console.log(categories[0].forums)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fóruns</h1>
      <div className="min-h-screen text-white">
        <div className="mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="mt-8">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="mt-4 space-y-4">
                {
                  category.forums?.map((forum) => (
                    <div className="bg-primary-content rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold text-primary">{forum.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {forum.description}
                          </p>
                        </div>
                        <p className="text-gray-500 text-sm">
                          5 horas por <span className="text-info-content">temal1d</span>
                        </p>
                      </div>
                      {forum.subForums.length > 0 && <div className="flex space-x-4 text-secondary text-sm">
                        {forum.subForums?.map((subforum) => (
                          <Link key={subforum.id} href={`/forum/${category.id}/${subforum.id}`} className="hover:underline">
                            <p className='flex items-center text-center'>
                              <FaAngleRight /> {subforum.title}
                            </p>
                          </Link>
                        ))}
                      </div>}
                    </div>
                  ))
                }
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
}