'use client';

import { useState } from 'react';
import { login } from './actions';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const a = await login(null, formData); // Passa os dados do formulário para a função de login
    setError(a);
  };

  return (
    <div className="flex min-h-screen">
      {/* Esquerda */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-base-100 text-base-content">
        <div className="w-full max-w-md p-8 space-y-4">
          {/* Botão Voltar */}
          <div className="w-full flex">
            <button onClick={() => window.history.back()} className="btn btn-ghost">
              ← Voltar
            </button>
          </div>
          {/* Logo */}
          <a href="/" className="flex justify-center items-center mb-6 text-2xl font-semibold">
            <Image
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
              width={32}
              height={32}
            />
            Mahou
          </a>
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p>Por favor, entre com suas credenciais para continuar.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium mb-1"
              >
                Username ou Email
              </label>
              <input
                name="identifier"
                id="identifier"
                className={`input input-bordered w-full ${error?.type === 'username' ? 'input-error' : ''
                  }`}
                required
              />
              {/* Exibe erro de username */}
              {error?.type === 'username' && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`input input-bordered w-full ${error?.type === 'password' || error?.type === 'incorrect'
                    ? 'input-error'
                    : ''
                  }`}
                required
              />
              {/* Exibe erro de senha ou erro geral */}
              {(error?.type === 'password' || error?.type === 'incorrect') && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Continuar
            </button>
          </form>

          {/* Link para Registrar */}
          <div className="text-center mt-4">
            Não tem uma conta?{' '}
            <Link href="/auth/signup" className=" font-semibold hover:underline">
              Registre-se
            </Link>
          </div>
        </div>
      </div>
      {/* Direita */}
      <div className="w-1/2 bg-neutral-content flex md:visible invisible justify-center items-center">
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
