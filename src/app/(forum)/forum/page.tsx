// src/app/forum/page.tsx
import Link from 'next/link';
import { IoNotifications, IoMegaphone, IoPeople, IoBulb, IoWarning } from 'react-icons/io5';

export default function ForumHome() {
  const categories = [
    { title: "Atualizações", description: "Feedback das atualizações", icon: <IoNotifications />, path: "atualizacoes" },
    { title: "Avisos", description: "Avisos recentes", icon: <IoMegaphone />, path: "avisos" },
    { title: "Eventos da comunidade", description: "Eventos pela comunidade", icon: <IoPeople />, path: "eventos" },
    { title: "Sugestões", description: "Sugestões da comunidade", icon: <IoBulb />, path: "sugestoes" },
    { title: "Reporte", description: "Relatos gerais", icon: <IoWarning />, path: "reporte" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fóruns</h1>
      <div className="space-y-4"> {/* Alinha os itens verticalmente */}
        {categories.map((category, index) => (
          <Link href={`/forum/${category.path}`} key={index}>
            <div className="bg-base-200 p-4 rounded-lg shadow-lg hover:bg-base-300 transition flex items-center">
              <div className="text-3xl mr-4">{category.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}