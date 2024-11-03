// src/app/admin/reports/page.tsx
"use client";
import React, { useState } from "react";

const ReportedContentPage = () => {
  const [activeTab, setActiveTab] = useState<"postagens" | "comentarios">("postagens");

  const reportedPosts = [
    {
      id: 1,
      author: "Henrique",
      content: "Postagem ofensiva no fórum",
      category: "Atualizações",
      reportCount: 3,
    },
    {
      id: 2,
      author: "Maria Souza",
      content: "Outro conteúdo impróprio no fórum",
      category: "Reportes",
      reportCount: 2,
    },
  ];

  const reportedComments = [
    {
      id: 1,
      author: "Carlos",
      content: "Esse mangá é horrível",
      category: "Obra: One Piece",
      reportCount: 4,
    },
    {
      id: 2,
      author: "João",
      content: "Esse capítulo está péssimo",
      category: "Obra: Naruto",
      reportCount: 1,
    },
  ];

  const totalReports = reportedPosts.length + reportedComments.length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Denúncias de Conteúdo</h1>
      <p className="text-gray-400 mb-6">Total de denúncias: {totalReports}</p>

      <div className="flex mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("postagens")}
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "postagens" ? "border-b-2 border-primary font-semibold" : "text-gray-500"
          }`}
        >
          Denúncias de Postagens
        </button>
        <button
          onClick={() => setActiveTab("comentarios")}
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "comentarios" ? "border-b-2 border-primary font-semibold" : "text-gray-500"
          }`}
        >
          Denúncias de Comentários de Obras
        </button>
      </div>

      {activeTab === "postagens" ? (
        <div className="space-y-4">
          {reportedPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-base-300 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">Autor: {post.author}</p>
                <p className="text-sm">Postagem: "{post.content}"</p>
                <p className="text-sm text-gray-600">Categoria: {post.category}</p>
                <p className="text-sm text-gray-400">Denúncias: {post.reportCount}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm">Ignorar</button>
                <button className="btn btn-error btn-sm">Deletar</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                <p className="text-sm text-gray-400">Denúncias: {comment.reportCount}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm">Ignorar</button>
                <button className="btn btn-error btn-sm">Deletar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportedContentPage;
