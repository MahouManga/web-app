// SeriePage.jsx

import Image from 'next/image';
import Link from 'next/link';
import RightSide from './RightSide';
import LeftSide from './LeftSide';

export default function SeriePage() {
  return (
    <>
      <main className='w-full transition-all duration-300 ease-in'>
        {/* Background Image */}
        <div className="w-full h-full absolute overflow-hidden z-10">
          <div style={{ willChange: 'transform', transform: 'translateY(-27.3309%) scale(1)' }}>
            <Image alt="Serie Title" width={1000} height={600} loading="lazy" src="/noImage.jpg" className="w-full h-auto blur" />
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="h-[300px] z-10 absolute lg:relative" style={{ backgroundImage: `linear-gradient(0deg, hsl(0deg 0% 6%), transparent)` }}></div>
        {/* Main Content */}
        <section className='bg-base-100 lg:z-10 relative flex w-full justify-center'>
          <div className='grid grid-cols-12 pt-3 gap-y-3 gap-x-3 container px-5 text-foreground'>
            <LeftSide />
            <RightSide />
          </div>
        </section>
      </main>
    </>
  );
}