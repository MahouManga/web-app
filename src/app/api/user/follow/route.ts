import { getSerie } from '@/services/serieService';
import { followUser, unfollowUser } from '@/services/socialService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userId, followId, follow } = await request.json();

        if (!userId || !followId) {
            return NextResponse.json({ error: 'Série não encontrada.' }, { status: 200 });
        }

        let userFollowing;
        if (follow) {
            userFollowing = await unfollowUser(userId, followId);
        } else {
            userFollowing = await followUser(userId, followId);
        }

        return NextResponse.json(userFollowing, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao atualizar os dados!' }, { status: 500 });
    }
}