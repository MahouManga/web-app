// src/app/admin/reports/page.tsx
"use client";
import React from "react";

const ReportedCommentsPage = () => {
  // Exemplo de dados estáticos para os comentários denunciados
  const reportedComments = [
    {
      id: 1,
      author: "Henrique",
      content: "Isso mesmo seu preto",
      category: "Atualizações",
    },
    {
      id: 2,
      author: "Maria Souza",
      content: "Ai, homem tem que ser queimado vivo.",
      category: "Reportes",
    },
    // Adicione outros exemplos de comentários, se necessário
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Denúncias de Comentários</h1>
      <div className="space-y-4">
        {reportedComments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-base-300 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-medium">Autor: {comment.author}</p>
              <p className="text-sm">Comentário: "{comment.content}"</p>
              <p className="text-sm text-gray-600">Categoria: {comment.category}</p>
            </div>
            <button className="btn btn-secondary btn-sm">Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedCommentsPage;
