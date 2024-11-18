import prisma from '@/lib/db';

export interface DashboardStats {
  series: number;
  chapters: number;
  creators: number;
  genres: number;
  users: number;
  views: {
    total: number;
    monthly: number;
    weekly: number;
    daily: number;
  };
  userLibrary: {
    totalReadChapters: number;
    favorited: number;
    bookmarked: number;
  };
}

export interface SeriesData {
  subTypes: Record<string, number>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    seriesCount,
    chaptersCount,
    creatorsCount,
    genresCount,
    usersCount,
    totalViewsResult,
    totalReadChapters,
    favoritedCount,
    bookmarkedCount,
  ] = await Promise.all([
    prisma.serie.count(),
    prisma.chapter.count(),
    prisma.author.count(),
    prisma.genre.count(),
    prisma.user.count(),
    prisma.serie.aggregate({ _sum: { views: true } }),
    prisma.userReadHistory.count(),
    prisma.userLibrary.count({ where: { status: 2 } }), // Ajuste o status conforme sua lógica
    prisma.userLibrary.count({ where: { bookmark: true } }),
  ]);

  const totalViews = totalViewsResult._sum.views || 0;

  // Datas para cálculos de visualizações
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [dailyViewsResult, weeklyViewsResult, monthlyViewsResult] =
    await Promise.all([
      prisma.viewLog.aggregate({
        _sum: { views: true },
        where: {
          createdAt: {
            gte: startOfDay,
          },
        },
      }),
      prisma.viewLog.aggregate({
        _sum: { views: true },
        where: {
          createdAt: {
            gte: startOfWeek,
          },
        },
      }),
      prisma.viewLog.aggregate({
        _sum: { views: true },
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ]);

  const dailyViews = dailyViewsResult._sum.views || 0;
  const weeklyViews = weeklyViewsResult._sum.views || 0;
  const monthlyViews = monthlyViewsResult._sum.views || 0;

  const views = {
    total: totalViews,
    monthly: monthlyViews,
    weekly: weeklyViews,
    daily: dailyViews,
  };

  const stats: DashboardStats = {
    series: seriesCount,
    chapters: chaptersCount,
    creators: creatorsCount,
    genres: genresCount,
    users: usersCount,
    views,
    userLibrary: {
      totalReadChapters,
      favorited: favoritedCount,
      bookmarked: bookmarkedCount,
    },
  };

  return stats;
}

export async function getSeriesData(): Promise<SeriesData> {
  const subTypeCounts = await prisma.serie.groupBy({
    by: ['subtype'],
    _count: {
      _all: true,
    },
  });

  const subTypes: Record<string, number> = {};
  subTypeCounts.forEach((item) => {
    subTypes[item.subtype] = item._count._all;
  });

  return { subTypes };
}
