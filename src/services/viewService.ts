import { Prisma, ViewLog } from '@prisma/client';
import prisma from '@/lib/db';

function getNextDay(date: Date): Date {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay;
}

function getNextTuesday(date: Date): Date {
  const dayOfWeek = date.getDay();
  const daysUntilTuesday = (2 + 7 - dayOfWeek) % 7;
  const nextTuesday = new Date(date);
  nextTuesday.setDate(date.getDate() + daysUntilTuesday);
  return nextTuesday;
}

function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export async function registerView(serieID: number): Promise<void> {
  const now = new Date();
  const dailyExpiry = getNextDay(now);
  const weeklyExpiry = getNextTuesday(now);
  const monthlyExpiry = getEndOfMonth(now);

  // Transferir e excluir logs antigos, se necessário
  await transferAndDeleteOldLogs(serieID, 'daily');
  await transferAndDeleteOldLogs(serieID, 'weekly');
  await transferAndDeleteOldLogs(serieID, 'monthly');

  // Registrar a visualização nos logs diários, semanais e mensais
  await Promise.all([
    prisma.viewLog.upsert({
      where: { serieID_type_expiryDate: { serieID, type: 'daily', expiryDate: dailyExpiry } },
      update: { views: { increment: 1 } },
      create: { serieID, type: 'daily', views: 1, expiryDate: dailyExpiry },
    }),
    prisma.viewLog.upsert({
      where: { serieID_type_expiryDate: { serieID, type: 'weekly', expiryDate: weeklyExpiry } },
      update: { views: { increment: 1 } },
      create: { serieID, type: 'weekly', views: 1, expiryDate: weeklyExpiry },
    }),
    prisma.viewLog.upsert({
      where: { serieID_type_expiryDate: { serieID, type: 'monthly', expiryDate: monthlyExpiry } },
      update: { views: { increment: 1 } },
      create: { serieID, type: 'monthly', views: 1, expiryDate: monthlyExpiry },
    }),
  ]);
}

async function transferAndDeleteOldLogs(serieID: number, type: 'daily' | 'weekly' | 'monthly'): Promise<void> {
  let expiryDate: Date;

  if (type === 'daily') {
    const today = new Date();
    expiryDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  } else if (type === 'weekly') {
    const lastTuesday = getNextTuesday(new Date());
    lastTuesday.setDate(lastTuesday.getDate() - 7);
    expiryDate = lastTuesday;
  } else if (type === 'monthly') {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    expiryDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
  } else {
    throw new Error('Invalid type for transfer');
  }

  const log = await prisma.viewLog.findFirst({
    where: { serieID, type, expiryDate: { lte: expiryDate } },
  });

  if (log) {
    // Transferir as visualizações mensais para o total da novel antes de excluir
    if (type === 'monthly') {
      await prisma.serie.update({
        where: { id: serieID },
        data: { views: { increment: log.views } },
      });
    }

    // Excluir o log antigo
    await prisma.viewLog.delete({
      where: { id: log.id },
    });
  }
}

type Period = 'daily' | 'weekly' | 'monthly';

export interface TopSerie {
  id: number;
  slug: string;
  title: string;
  status: number;
  posterImage: string | null;
  views: number;
}

export const getTopSeries = async (period: Period, limit: number = 10): Promise<TopSerie[]> => {
  try {
    const periodStartDate = getPeriodStartDate(period);

    // Obtenha os logs de visualizações para o período especificado
    const viewLogs = await prisma.viewLog.findMany({
      where: {
        type: period,
        expiryDate: {
          gte: periodStartDate,
        },
      },
      select: {
        serieID: true,
        views: true,
      },
    });

    // Sumarize as visualizações por serieID
    const viewCounts: { [key: string]: number } = {};
    viewLogs.forEach(log => {
      if (!viewCounts[log.serieID]) {
        viewCounts[log.serieID] = 0;
      }
      viewCounts[log.serieID] += log.views;
    });

    // Ordene os novels pelo número de visualizações e limite o resultado
    const topserieIDs = Object.keys(viewCounts)
      .sort((a, b) => viewCounts[b] - viewCounts[a])
      .slice(0, limit)
      .map(id => parseInt(id)); // Converter IDs para número

    // Obtenha os detalhes das novels baseando-se nos IDs obtidos
    const novels = await prisma.serie.findMany({
      where: {
        id: { in: topserieIDs },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        posterImage: true,
      },
    });

    // Mapear os detalhes das novels com as visualizações somadas
    return topserieIDs.map(serieID => {
      const novel = novels.find(n => n.id === serieID);
      return {
        id: serieID,
        slug: novel?.slug || '',
        title: novel?.title || '',
        status: novel?.status || 0,
        posterImage: novel?.posterImage || null,
        views: viewCounts[serieID] || 0,
      };
    });
  } catch (error) {
    console.error("Erro ao obter as novels mais populares:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};


function getPeriodStartDate(period: Period): Date {
  const now = new Date();
  if (period === 'daily') {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === 'weekly') {
    const dayOfWeek = now.getDay();
    const daysUntilLastTuesday = (dayOfWeek + 6) % 7 + 1; // Número de dias desde a última terça-feira
    now.setDate(now.getDate() - daysUntilLastTuesday);
    return now;
  } else if (period === 'monthly') {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return now;
}