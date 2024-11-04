"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ReportedContentPage = () => {
  const [activeTab, setActiveTab] = useState<"postagens" | "comentarios" | "capitulos">("postagens");
  const [reportedPosts, setReportedPosts] = useState([]);
  const [reportedComments, setReportedComments] = useState([]);
  const [reportedChapters, setReportedChapters] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const response = await fetch('/api/reports');
        const { posts, comments, chapters } = await response.json();
        console.log(posts)
        setReportedPosts(posts);
        setReportedComments(comments);
        setReportedChapters(chapters);
      } catch (error) {
        toast.error("Erro ao carregar denúncias.");
      }
    };
    loadReports();
  }, []);

  const handleDelete = async (post: any) => {
    try {
      const response = await fetch(`/api/reports`, {
        method: 'DELETE',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      },);
      if (response.ok) {
        toast.success("Denúncia deletada.");
        setReportedPosts(reportedPosts.filter((report: any) => report.id !== post.id));
        setReportedComments(reportedComments.filter((report: any) => report.id !== post.id));
        setReportedChapters(reportedChapters.filter((report: any) => report.id !== post.id));
      } else {
        throw new Error("Erro ao deletar denúncia.");
      }
    } catch {
      toast.error("Erro ao deletar a denúncia.");
    }
  };

  const handleIgnore = async (post: any) => {
    try {
      const response = await fetch(`/api/reports`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      },);
      if (response.ok) {
        toast.success("Denúncia ignorada.");
        setReportedPosts(reportedPosts.filter((report: any) => report.id !== post.id));
        setReportedComments(reportedComments.filter((report: any) => report.id !== post.id));
        setReportedChapters(reportedChapters.filter((report: any) => report.id !== post.id));
      } else {
        throw new Error("Erro ao ignorar denúncia.");
      }
    } catch {
      toast.error("Erro ao ignorar a denúncia.");
    }
  };

  const tabs = [
    { name: "Denúncias de Postagens", key: "postagens" },
    { name: "Denúncias de Comentários", key: "comentarios" },
    { name: "Denúncias de Capítulos", key: "capitulos" },
  ];

  return (
    <div className="p-6 space-y-6 bg-base-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2 text-primary">Denúncias de Conteúdo</h1>
      <p className="text-gray-500 mb-4">Gerencie todas as denúncias feitas pelos usuários</p>

      <div className="flex space-x-4 mb-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "postagens" | "comentarios" | "capitulos")}
            className={`px-4 py-2 focus:outline-none ${activeTab === tab.key
              ? "border-b-2 border-primary font-semibold text-primary"
              : "text-gray-500"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === "postagens" && reportedPosts?.map((report: any) => (
          <ReportCard key={report.id} report={report} onDelete={handleDelete} onIgnore={handleIgnore} />
        ))}
        {activeTab === "comentarios" && reportedComments?.map((report: any) => (
          <ReportCard key={report.id} report={report} onDelete={handleDelete} onIgnore={handleIgnore} />
        ))}
        {activeTab === "capitulos" && reportedChapters?.map((report: any) => (
          <ReportCard key={report.id} report={report} onDelete={handleDelete} onIgnore={handleIgnore} />
        ))}
      </div>
    </div>
  );
};

export default ReportedContentPage;

const ReportCard = ({ report, onDelete, onIgnore }: any) => (
  <div className="p-4 bg-base-300 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <p className="text-sm font-medium text-secondary">Autor: {report.post?.user.username || report.comment?.user.username || report.chapter?.user.username}</p>
      <p className="text-sm text-gray-600">Reason: {report.reason}</p>
      <p className="text-sm text-gray-600">Detalhes: {report.details}</p>
      <p className="text-sm text-gray-400">Denúncias: {report._count}</p>
      <div>
        <p className="text-sm">Conteúdo:</p>
        <div
          className="mt-2 text-sm line-clamp-5 topic-post"
          dangerouslySetInnerHTML={{ __html: report.post?.content || report.comment?.content || report.chapter?.content }}
        />
      </div>
    </div>
    <div className="flex gap-2">
      <button className="btn btn-outline btn-info btn-sm" onClick={() => onIgnore(report)}>Ignorar</button>
      <button className="btn btn-outline btn-error btn-sm" onClick={() => onDelete(report)}>Deletar</button>
    </div>
  </div>
);
