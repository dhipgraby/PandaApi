// models/conversationStorageDB.ts
import { PrismaClient, Conversation } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function createConversationDB(userId: number): Promise<Conversation> {
  const uniqueId = uuidv4();
  return await prisma.conversation.create({
    data: {
      uniqueId: uniqueId,
      userId,
    },
  });
}

export async function getConversationDB(uniqueId: string, userId: number): Promise<Conversation | null> {
  return await prisma.conversation.findFirst({
    where: {
      uniqueId,
      userId
    },
  });
}

export async function getAllConversationsDB(userId: number): Promise<Conversation[]> {
  return await prisma.conversation.findMany({
    where: {
      userId,
    },
  });
}

export async function updateConversationDB(uniqueId: string, updatedAt: Date): Promise<Conversation> {
  return await prisma.conversation.update({
    where: {
      uniqueId,
    },
    data: {
      updatedAt,
    },
  });
}

export async function deleteConversationDB(uniqueId: string): Promise<void> {
  await prisma.conversation.delete({
    where: {
      uniqueId,
    },
  });
}
