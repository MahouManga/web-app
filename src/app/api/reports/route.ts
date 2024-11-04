import { NextResponse } from 'next/server';
import { createReport, handleReportAction, fetchReports, ignoreReport } from '@/services/reportService';

export async function POST(request: Request) {
    try {
        const {
            userId,
            reason,
            details,
            postId,
            commentId,
            chapterId,
        } = await request.json();

        // Validação de campos obrigatórios
        if (!userId || !reason) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando!' }, { status: 400 });
        }

        // Verificar se ao menos um dos IDs foi fornecido
        if (!postId && !commentId && !chapterId) {
            return NextResponse.json({ error: 'Deve ser fornecido um postId, commentId ou chapterId.' }, { status: 400 });
        }

        // Criar a denúncia
        const newReport = await createReport({
            userId,
            reason,
            details,
            postId,
            commentId,
            chapterId,
        });

        return NextResponse.json(newReport, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar denúncia:', error);
        return NextResponse.json({ mensagem: 'Erro ao criar denúncia.', error: error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const reports = await fetchReports();
        return NextResponse.json(reports);
    } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
        return NextResponse.json({ error: "Erro ao buscar denúncias" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const success = await handleReportAction(id, "delete");
        if (success) {
            return NextResponse.json({ success: true });
        } else {
            throw new Error("Erro ao deletar denúncia.");
        }
    } catch (error) {
        console.error("Erro ao deletar denúncia:", error);
        return NextResponse.json({ error: "Erro ao deletar denúncia" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id } = await request.json();
        const success = await handleReportAction(id, "ignore");
        if (success) {
            return NextResponse.json({ success: true });
        } else {
            throw new Error("Erro ao ignorar denúncia.");
        }
    } catch (error) {
        console.error("Erro ao ignorar denúncia:", error);
        return NextResponse.json({ error: "Erro ao ignorar denúncia" }, { status: 500 });
    }
}