import prisma from '@/lib/db';

interface ReportData {
    userId: string;
    reason: string;
    details?: string;
    postId?: string;
    commentId?: string;
    chapterId?: string;
}

export async function createReport(data: ReportData) {
    return prisma.report.create({
        data: {
            userId: data.userId,
            reason: data.reason,
            details: data.details,
            status: 'pending',
            postId: data.postId || null,
            commentId: data.commentId || null,
            chapterId: data.chapterId || null,
        },
    });
}

// Função para buscar todas as denúncias categorizadas
export async function fetchReports() {
    // Buscar contagem de denúncias e dados para cada tipo de conteúdo
    const postReports = await prisma.report.findMany({
        where: { postId: { not: null } },
        include: {
            post: {
                include: { user: true },
            },
        },
    });

    const commentReports = await prisma.report.findMany({
        where: { commentId: { not: null } },
        include: {
            comment: {
                include: { user: true },
            },
        },
    });

    const chapterReports = await prisma.report.findMany({
        where: { chapterId: { not: null } },
    });

    // Agrupar e contar denúncias para cada tipo
    const groupedPosts = groupAndCountReports(postReports, 'postId');
    const groupedComments = groupAndCountReports(commentReports, 'commentId');
    const groupedChapters = groupAndCountReports(chapterReports, 'chapterId');

    return {
        posts: groupedPosts,
        comments: groupedComments,
        chapters: groupedChapters,
    };
}

function groupAndCountReports(reports: any[], idField: string) {
    const grouped = reports.reduce((acc: Record<string, any>, report: any) => {
        const id = report[idField];
        if (!id) return acc; // Ignora se não houver ID

        if (!acc[id]) {
            // Inicializa o objeto se não existe no acumulador
            acc[id] = {
                ...report,
                _count: 1, // Inicia o contador
            };
        } else {
            acc[id]._count += 1; // Incrementa o contador
        }
        return acc;
    }, {});

    return Object.values(grouped); // Retorna como lista de objetos
}

export async function handleReportAction(id: string, action: "delete" | "ignore") {
    try {
        const report = await prisma.report.findFirst({
            where: { id },
            select: {
                postId: true,
                commentId: true,
                chapterId: true,
            },
        });

        if (!report) {
            console.error("Denúncia não encontrada.");
            return false;
        }

        if (action === "delete") {
            // Deletar conteúdo ou atualizar para "<content deleted>"
            if (report.postId) {
                await prisma.threadPost.update({ where: { id: report.postId }, data: { content: "<p>content deleted<p>" } });
            } else if (report.commentId) {
                await prisma.comments.update({ where: { id: report.commentId }, data: { content: "<p>content deleted<p>" } });
            } else if (report.chapterId) {
                await prisma.chapter.delete({ where: { id: report.chapterId } });
            }
        } else if (action === "ignore") {
            // Marcar a denúncia como ignorada
            await prisma.report.update({ where: { id }, data: { status: 'ignored' } });
        }

        // Deletar a denúncia após a ação ser processada
        await prisma.report.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Erro ao processar a ação da denúncia:", error);
        return false;
    }
}


// Função para ignorar uma denúncia (exemplo: mudar status para "ignored")
export async function ignoreReport(id: string) {
    try {
        await prisma.report.update({
            where: { id },
            data: { status: 'ignored' },
        });
        return true;
    } catch (error) {
        console.error("Erro ao ignorar denúncia:", error);
        return false;
    }
}