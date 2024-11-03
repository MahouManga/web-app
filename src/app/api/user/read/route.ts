import { NextResponse } from 'next/server';
import { toggleChapterReadStatus, unmarkChapterAsRead, chaptersReaded } from '@/services/libraryService'

export async function GET(request: Request) {
    try {
        const { userId, serieID } = await request.json();
        
        if (!userId || !serieID) {
            return NextResponse.json({ error: 'Missing userId or serieID' }, { status: 400 });
        }

        const chapters = await chaptersReaded(userId, serieID);
        return NextResponse.json({ ok: true, data: chapters });
    } catch (error) {
        console.error('Error fetching read chapters:', error);
        return NextResponse.json({ error: 'Failed to fetch read chapters' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId, serieID, chapterID } = await request.json();

        if (!userId || !serieID || !chapterID) {
            return NextResponse.json({ error: 'Missing userId, serieID, or chapterID' }, { status: 400 });
        }

        const readHistory = await toggleChapterReadStatus(userId, serieID, chapterID);
        return NextResponse.json({ ok: true, data: readHistory });
    } catch (error) {
        console.error('Error marking chapter as read:', error);
        return NextResponse.json({ error: 'Failed to mark chapter as read' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { userId, chapterID } = await request.json();

        if (!userId || !chapterID) {
            return NextResponse.json({ error: 'Missing userId or chapterID' }, { status: 400 });
        }

        const deleteResult = await unmarkChapterAsRead(userId, chapterID);
        return NextResponse.json({ ok: true, data: deleteResult });
    } catch (error) {
        console.error('Error unmarking chapter as read:', error);
        return NextResponse.json({ error: 'Failed to unmark chapter as read' }, { status: 500 });
    }
}
