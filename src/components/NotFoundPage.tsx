import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center max-w-md p-8 bg-neutral rounded-lg shadow-lg">
        <div className="mb-6">
          <Image
            src="/noImage.jpg"
            alt="Not Found Illustration"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-error-content mb-2">404 - Não foi encontrado!</h1>
          <p className="text-neutral-content mb-6">
            A página que você está procurando pode ter sido removida ou não existe.
          </p>
        </div>
        <Link href="/" passHref>
          <button className="btn btn-primary w-full">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}