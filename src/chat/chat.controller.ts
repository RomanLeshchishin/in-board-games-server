import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('chats')
@UseGuards(AccessTokenGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() dto: CreateChatDto, @Request() req) {
    const userId = req.user.id;
    return this.chatService.createChat(userId, dto);
  }

  @Get('/:chatId/messages')
  async getMessages(@Param('chatId') chatId: string) {
    return this.chatService.getMessages(chatId);
  }
}
