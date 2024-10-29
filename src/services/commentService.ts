import prisma from '@/lib/db';
import { PrismaClient, Comments, User } from '@prisma/client';

export async function createComment(
  itemId: string,
  userId: string,
  type: 'serie' | 'chapter' | 'profile',
  parentId: string | null = null,
  content: string
): Promise<Comments> {
  const comment = await prisma.comments.create({
    data: {
      userId,
      parentID: parentId,
      content,
      ...(type === 'serie' ? { serieID: parseInt(itemId) } : {}),
      ...(type === 'chapter' ? { chapterID: itemId } : {}),
    },
  });

  if (type === 'profile') {
    await prisma.userProfileComment.create({
      data: {
        profileUserId: itemId, // ID do usuário cujo perfil está sendo comentado
        commentId: comment.id,
      },
    });
  }

  return comment;
}

/**
 * Busca comentários com paginação e inclui todas as respostas aninhadas.
 *
 * @param {string} itemId - O ID do item (série, capítulo ou perfil de usuário).
 * @param {'serie' | 'chapter' | 'profile'} type - O tipo do item.
 * @param {number} limit - O número de comentários principais a serem buscados por página.
 * @param {number} page - O número da página atual.
 * @returns {Promise<(Comments & { replies: Comments[]; user: User })[]>} - Um array de comentários com respostas aninhadas.
 */
export async function getCommentsWithReplies(
  itemId: string,
  type: 'serie' | 'chapter' | 'profile',
  limit: number = 20,
  page: number = 1
): Promise<(Comments & { replies: any[]; user: User })[]> {
  // Calcula o deslocamento com base na página e no limite
  const offset = (page - 1) * limit;

  // Determina a condição de busca com base no tipo
  let whereCondition: any = {};

  if (type === 'serie') {
    whereCondition = { serieID: parseInt(itemId) };
  } else if (type === 'chapter') {
    whereCondition = { chapterID: itemId };
  } else if (type === 'profile') {
    // Busca os IDs dos comentários associados ao perfil do usuário
    const profileComments = await prisma.userProfileComment.findMany({
      where: { profileUserId: itemId },
      select: { commentId: true },
    });
    const commentIds = profileComments.map((pc) => pc.commentId);

    whereCondition = { id: { in: commentIds } };
  } else {
    throw new Error("Tipo inválido. 'type' deve ser 'serie', 'chapter' ou 'profile'.");
  }

  // Busca os comentários raiz (parentID: null) com paginação
  const rootComments = await prisma.comments.findMany({
    where: {
      ...whereCondition,
      parentID: null,
    },
    orderBy: { createdAt: 'asc' },
    skip: offset,
    take: limit,
    include: {
      user: true, // Inclui informações do autor do comentário
    },
  });

  // Se não houver comentários raiz, retorna um array vazio
  if (rootComments.length === 0) {
    return [];
  }

  // Lista de IDs dos comentários raiz
  const rootCommentIds = rootComments.map((comment) => comment.id);

  // Busca todas as respostas associadas aos comentários raiz
  const allReplies = await prisma.comments.findMany({
    where: {
      ...whereCondition,
      parentID: { not: null },
    },
    include: {
      user: true,
    },
  });

  // Constrói a árvore de comentários
  const commentsTree = buildCommentsTree(rootComments, allReplies);

  return commentsTree;
}

/**
 * Constrói uma árvore de comentários a partir de um array plano.
 *
 * @param {Array<Comments & { user: User }>} rootComments - Os comentários raiz.
 * @param {Array<Comments & { user: User }>} allReplies - Todas as respostas.
 * @returns {Array<Comments & { replies: any[]; user: User }>} - Um array de comentários com respostas aninhadas.
 */
function buildCommentsTree(
  rootComments: Array<Comments & { user: User }>,
  allReplies: Array<Comments & { user: User }>
): Array<Comments & { replies: any[]; user: User }> {
  // Mapa para armazenar os comentários por ID
  const commentsById: { [key: string]: Comments & { replies: any[]; user: User } } = {};

  // Inicializa o mapa com todos os comentários (raiz e respostas)
  [...rootComments, ...allReplies].forEach((comment) => {
    commentsById[comment.id] = { ...comment, replies: [] };
  });

  // Associa cada resposta ao seu comentário pai
  allReplies.forEach((comment) => {
    if (comment.parentID) {
      const parent = commentsById[comment.parentID];
      if (parent) {
        parent.replies.push(commentsById[comment.id]);
      }
    }
  });

  // Extrai os comentários raiz com suas respostas aninhadas
  const tree = rootComments.map((comment) => commentsById[comment.id]);

  return tree;
}