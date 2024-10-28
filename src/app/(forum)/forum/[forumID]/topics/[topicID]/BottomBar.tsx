// components/BottomBar.tsx
"use client";

import { useState } from "react";
import { FaBookmark, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

export default function BottomBar() {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  return (
    <>
      {/* Caixa de Resposta */}
      {showReplyBox && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center z-50">
          <div className="bg-base-100 p-4 shadow-lg rounded w-full max-w-md">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Escreva sua resposta..."
            />
            <div className="flex justify-end mt-2">
              <button className="btn btn-primary" onClick={toggleReplyBox}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra Inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-4 flex justify-between items-center z-40">
        {/* Ícone da Esquerda */}
        <div>
          <FaBookmark size={24} />
        </div>

        {/* Navegação Central */}
        <div className="flex items-center">
          <button className="btn btn-sm btn-ghost">
            <FaAngleLeft size={20} />
          </button>
          <span className="mx-2">1 / 10</span> {/* Atualize conforme necessário */}
          <button className="btn btn-sm btn-ghost">
            <FaAngleRight size={20} />
          </button>
        </div>

        {/* Botão da Direita */}
        <button className="btn btn-primary" onClick={toggleReplyBox}>
          Responder
        </button>
      </div>
    </>
  );
}
