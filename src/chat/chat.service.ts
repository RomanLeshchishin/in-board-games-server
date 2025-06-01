import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(userId: string, dto: CreateChatDto) {
    const chat = await this.prisma.chat.create({
      data: {
        title: dto.title,
        isGroup: dto.isGroup,
        participants: {
          create: [
            ...dto.userIds.map(id => ({
              user: { connect: { id } },
            })),
            {
              user: { connect: { id: userId } },
            },
          ],
        },
      },
      include: { participants: true },
    });

    return chat;
  }

  async sendMessage(userId: string, dto: SendMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        chatId: dto.chatId,
        senderId: userId,
        content: dto.content,
        fileId: dto.fileId || null,
      },
      include: { sender: true },
    });

    return message;
  }

  async getMessages(chatId: string) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true },
    });
  }
}
