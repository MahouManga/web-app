import prisma from '@/lib/db';

export interface LibraryRatingsData {
    bookmarks: number;
    averageRating: string;
    monthlyViews: number;
    ratingsCount: number;
}

export const getLibraryRatings = async (serieID: number) => {
    const statistics = await prisma.userLibrary.aggregate({
        _avg: {
            rating: true,
        },
        _count: {
            bookmark: true,
            rating: true,
        },
        where: {
            serieID,
            rating: {
                gte: 0,
            }
        },
    });

    // Pega os dados de views e ratings da novel
    const monthlyViews = await prisma.viewLog.aggregate({
        _sum: {
            views: true,
        },
        where: {
            serieID,
            type: 'monthly',
        },
    });

    // Se monthlyViews._sum.views for null, substitua por 0
    const monthlyViewsSum = monthlyViews._sum.views ?? 0;

    const averageRating = statistics._avg.rating ? statistics._avg.rating.toFixed(1) : '0.0';

    return {
        bookmarks: statistics._count.bookmark,
        averageRating,
        monthlyViews: monthlyViewsSum,
        ratingsCount: statistics._count.rating,
    };
}