import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import {
  getDashboardStats,
  getSeriesData,
  DashboardStats,
  SeriesData,
} from '@/services/dashboardService';

interface DashboardProps {
  stats: DashboardStats;
  seriesData: SeriesData;
  viewsData: Record<string, number>;
}

export default async function Dashboard() {
  // Obtém os dados diretamente usando o serviço
  const stats = await getDashboardStats();
  const seriesData = await getSeriesData();
  const viewsData = stats.views;

  return (
    <>
      <Breadcrumb pageName="Dashboard" />

      <main className="flex flex-col space-y-5">
        {/* Seções do dashboard */}
        <section className="grid lg:grid-cols-4 mt-2 md:grid-cols-3 grid-cols-2 gap-6">
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Series</div>
              <div className="stat-value">{stats.series}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Capítulos</div>
              <div className="stat-value">{stats.chapters}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Criações</div>
              <div className="stat-value">{stats.creators}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Gêneros</div>
              <div className="stat-value">{stats.genres}</div>
            </div>
          </div>
        </section>

        <h2 className="text-xl font-semibold">Visualizações Totais</h2>
        <section className="stats stats-vertical lg:stats-horizontal shadow bg-base-300">
          <div className="stat place-items-center">
            <div className="stat-title">Totais</div>
            <div className="stat-value text-primary">{viewsData.total}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Mensal</div>
            <div className="stat-value text-secondary">{viewsData.monthly}</div>
            <div className="stat-desc">08/2024 - 09/2024</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Semanal</div>
            <div className="stat-value">{viewsData.weekly}</div>
            <div className="stat-desc">05/08/2024 - 12/08/2024</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Diário</div>
            <div className="stat-value">{viewsData.daily}</div>
            <div className="stat-desc">08/08/2024</div>
          </div>
        </section>

        <h2 className="text-xl font-semibold">Usuários</h2>
        <section className="grid lg:grid-cols-4 mt-2 md:grid-cols-3 grid-cols-2 gap-6">
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Usuários</div>
              <div className="stat-value">{stats.users}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Capítulos lidos no total</div>
              <div className="stat-value">
                {stats.userLibrary.totalReadChapters}
              </div>
            </div>
          </div>
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title">Favoritos</div>
              <div className="stat-value">{stats.userLibrary.favorited}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-300">
            <div className="stat-title">Bookmarks</div>
            <div className="stat-value">{stats.userLibrary.bookmarked}</div>
          </div>
        </section>

        {/* Tabela de Séries por Subtipo */}
        <div className="card bg-base-100 shadow-md mt-4">
          <div className="card-body">
            <h2 className="card-title">Séries por Subtipo</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>SubTipo</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(seriesData.subTypes).map(
                    ([subType, count]) => (
                      <tr key={subType}>
                        <td>{subType}</td>
                        <td>{count}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
