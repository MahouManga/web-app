'use client';

import { useState } from 'react';
import { signup } from './actions';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';

export default function Page() {
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const a = await signup(null, formData); // Pass the form data to the register function
    setError(a);
    console.log(error)
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-base-100 text-base-content">
        <div className="w-full max-w-md p-8 space-y-4">
          {/* Back Button */}
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
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p>Por favor, preencha os campos para criar uma nova conta.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                name="username"
                id="username"
                className={`input input-bordered w-full ${error?.type === 'username' ? 'input-error' : ''
                  }`}
                required
              />
              {/* Display username error */}
              {error?.type === 'username' && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                name="name"
                id="name"
                className={`input input-bordered w-full ${error?.type === 'name' ? 'input-error' : ''
                  }`}
                required
              />
              {/* Display name error */}
              {error?.type === 'name' && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`input input-bordered w-full ${error?.type === 'email' ? 'input-error' : ''
                  }`}
                required
              />
              {/* Display email error */}
              {error?.type === 'email' && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`input input-bordered w-full ${error?.type === 'password' ? 'input-error' : ''
                  }`}
                required
              />
              {/* Display password error */}
              {error?.type === 'password' && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirme a Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`input input-bordered w-full ${error?.type === 'confirmPassword' ? 'input-error' : ''
                  }`}
                required
              />
              {/* Display confirm password error */}
              {error?.type === 'confirmPassword' && (
                <p className="text-error mt-1">{error.error}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Registrar
            </button>
          </form>

          {/* Link to Sign In */}
          <div className="text-center mt-4">
            Já tem uma conta?{' '}
            <Link href="/auth/signin" className="font-semibold hover:underline">
              Entre aqui
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side */}
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
            {/* Add any icons you wish */}
          </div>
        </div>
      </div>
    </div>
  );
}