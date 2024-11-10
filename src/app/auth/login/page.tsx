'use client';

import ThemeSwitch from "@/components/ThemeSwitch";
import { FaGoogle, FaGithub, FaEnvelope } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-base-100 text-base-content">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold">
          <Image
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          Mahou
        </a>
        <div className="w-full max-w-md p-8 space-y-6">
          <h1 className="text-4xl font-bold">Bem vindo!</h1>
          <p>Agora sua vida escolar vai ficar muito mais fácil!</p>

          <div className="space-y-4">
            <button
              className="btn btn-outline w-full"
              onClick={() => router.push('/auth/google')}
            >
              <FaGoogle size={18} />
              Entrar com Google
            </button>

            <button
              className="btn btn-outline w-full"
              onClick={() => router.push('/auth/github')}
            >
              <FaGithub size={18} />
              Entrar com Github
            </button>

            <button
              className="btn btn-outline w-full"
              onClick={() => router.push('/auth/signin')}
            >
              <FaEnvelope size={18} />
              Entrar com e-mail
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-neutral-content flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <Image
            src="/images/parrot.png"
            alt="Mascote Teachy"
            className="w-56 h-56"
            width={100}
            height={100}
          />
          <div className="flex space-x-4 p-4 bg-white shadow rounded-lg">
            <i className="icon icon-star"></i>
            <i className="icon icon-pencil"></i>
            {/* Coloque aqui os ícones que você deseja */}
          </div>
        </div>
      </div>
    </div>
  );
}
