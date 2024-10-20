import Image from 'next/image';
import Link from 'next/link';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import { getSerie } from '@/services/serieService';
import NotFoundPage from '@/components/NotFoundPage';
import { getChapters } from '@/services/chapterService';
import Background from './Background';

export default async function SeriePage({params}: any) {
  const { id } = params;
  const serie = await getSerie(Number(id[0]));
  console.log(serie)
  
  if(!serie.data) {
    return (<NotFoundPage/>)
  }

  const chapters = await getChapters(serie.data.id);

  return (
    <>
      <main className='w-full transition-all duration-300 ease-in'>
        {/* Background Image */}
        <Background serie={serie.data} />
        {/* Gradient overlay */}
        <div className="h-[300px] z-10 absolute lg:relative" style={{ backgroundImage: `linear-gradient(0deg, hsl(0deg 0% 6%), transparent)` }}></div>
        {/* Main Content */}
        <section className='bg-base-100 lg:z-10 relative flex w-full justify-center'>
          <div className='grid grid-cols-12 pt-3 gap-y-3 gap-x-3 container px-5 text-foreground bg-base-100 text-base-content'>
            <LeftSide serie={serie.data} />
            <RightSide serie={serie.data} chapters={chapters} />
          </div>
        </section>
      </main>
    </>
  );
}