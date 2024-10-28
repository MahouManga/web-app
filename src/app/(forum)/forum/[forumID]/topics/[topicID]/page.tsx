// components/ForumConversation.tsx
"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import BottomBar from "./BottomBar"; // Importe o componente BottomBar

export default function ForumConversation() {
  // Exemplo de dados
  const posts = [
    {
      user: {
        name: "Brainage",
        username: "brainage",
        createdAt: "dezembro 2017",
      },
      content: `
        <p>HAVENT SEEN ONE OF THESE IN A WHILE!!! HOPE YOU MISSED THEM BECAUSE IM MAKING ANOTHER ONE HELL YEAH</p>
        <p><strong>RULES</strong></p>
        <ul>
          <li>1. DON'T BREAK FORUM RULES</li>
          <li>DONATE 3 DOLLARS TO WIKIPEDIA OR SUFFER THE CONSEQUENCE</li>
          <li>JUST POST RANDOM STUFF LIKE PEWDIEPIE &gt; T SERIES</li>
        </ul>
        <p>HAVE FUN GUYS</p>
        <p class="text-gray-500">edit: no-one is shouting anymore so i just removed the rule "all caps"</p>
      `,
      createdAt: "há 6 anos",
      updatedAt: "há 6 anos",
    },
    {
      user: {
        name: "Aiseca",
        username: "aiseca",
        createdAt: "fevereiro 2017",
      },
      content: `<p>I actually smell death for this thread... RIP.</p>`,
      createdAt: "há 6 anos",
      updatedAt: "há 6 anos",
    },
    // ... Outros posts
  ];

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center space-y-5 pb-24">
        {posts.map((post, index) => (
          <div
            key={index}
            className="w-full max-w-6xl rounded-lg shadow-lg flex group"
          >
            {/* Informações do Usuário à Esquerda */}
            <div className="flex w-1/6 flex-col items-center bg-base-300 pt-4 pb-4">
              <img
                src={`/noImage.jpg`}
                alt={`Avatar de ${post.user.name}`}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold">{post.user.name}</h2>
              <p className="text-sm opacity-50">
                Entrou em {post.user.createdAt}
              </p>
            </div>

            {/* Conteúdo da Postagem à Direita */}
            <div className="flex-1 bg-base-100 rounded-lg p-4">
              <div className="flex space-x-5 w-full items-center justify-between">
                <div className="flex space-x-5 w-full items-center">
                  {index === 0 && (
                    <span className="bg-green-700 text-white px-2 py-1 rounded text-xs mt-2">
                      Autor do Tópico
                    </span>
                  )}
                  <p className="text-sm opacity-50">{post.createdAt}</p>
                </div>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
                  <button
                    className="btn btn-sm btn-outline tooltip"
                    data-tip="Citar publicação na resposta"
                  >
                    <FaComment />
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error tooltip"
                    data-tip="Denunciar publicação"
                  >
                    <FaExclamationTriangle />
                  </button>
                </div>
              </div>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <p className="text-gray-500 text-sm mt-2">
                Última edição {post.updatedAt}.
              </p>
            </div>
          </div>
        ))}
      </div>
      <BottomBar /> {/* Inclua o componente BottomBar */}
    </div>
  );
}
