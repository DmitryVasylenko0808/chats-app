import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockMessage } from '@/common/test-utils/factories/message.factory';
import { createMockReaction } from '@/common/test-utils/factories/reaction.factory';

import { MessagesService } from '@/modules/messages/messages.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { ReactionsRepository } from '../reactions-repository';
import { ReactionsService } from '../reactions.service';

describe('ReactionsService', () => {
  let reactionsService: ReactionsService;
  let reactionsRepositories: DeepMockProxy<ReactionsRepository>;
  let messagesService: DeepMockProxy<MessagesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReactionsService,
        { provide: ReactionsRepository, useValue: mockDeep<ReactionsRepository>() },
        { provide: MessagesService, useValue: mockDeep<MessagesService>() },
      ],
    }).compile();

    reactionsService = module.get<ReactionsService>(ReactionsService);
    reactionsRepositories = module.get(ReactionsRepository);
    messagesService = module.get(MessagesService);
  });

  it('should be defined', () => {
    expect(reactionsService).toBeDefined();
  });

  describe('addReaction', () => {
    it('should add reaction', async () => {
      const messageId = 1;
      const userId = 1;
      const emoji = 'emoji-text';
      const mockFoundedMessage = createMockMessage(1, 1, 1);
      const mockReaction = createMockReaction(1, messageId, userId, { emoji });

      messagesService.findMessageByIdOrThrow.mockResolvedValueOnce(mockFoundedMessage);
      reactionsRepositories.upsert.mockResolvedValueOnce(mockReaction);
      messagesService.refreshChatMessages.mockResolvedValueOnce();

      await expect(reactionsService.addReaction(messageId, userId, emoji)).resolves.toEqual(
        mockReaction
      );
      expect(messagesService.findMessageByIdOrThrow).toHaveBeenCalled();
      expect(reactionsRepositories.upsert).toHaveBeenCalled();
      expect(messagesService.refreshChatMessages).toHaveBeenCalled();
    });

    it('should throw error add reaction (Message is not found)', async () => {
      const messageId = 999;
      const userId = 1;
      const emoji = 'emoji-text';

      messagesService.findMessageByIdOrThrow.mockRejectedValueOnce(new NotFoundException());

      await expect(reactionsService.addReaction(messageId, userId, emoji)).rejects.toThrow(
        NotFoundException
      );
      expect(messagesService.findMessageByIdOrThrow).toHaveBeenCalled();
      expect(reactionsRepositories.upsert).not.toHaveBeenCalled();
      expect(messagesService.refreshChatMessages).not.toHaveBeenCalled();
    });
  });

  describe('deleteReaction', () => {
    it('should delete reaction', async () => {
      const messageId = 1;
      const userId = 1;
      const emoji = 'emoji-reaction';
      const mockFoundedMessage = createMockMessage(messageId, 1, 1);
      const mockFoundedReaction = createMockReaction(1, messageId, userId, { emoji });

      messagesService.findMessageByIdOrThrow.mockResolvedValueOnce(mockFoundedMessage);
      reactionsRepositories.findOne.mockResolvedValueOnce(mockFoundedReaction);
      reactionsRepositories.delete.mockResolvedValueOnce(mockFoundedReaction);
      messagesService.refreshChatMessages.mockResolvedValueOnce();

      await expect(reactionsService.deleteReaction(messageId, userId, emoji)).resolves.toEqual(
        mockFoundedReaction
      );
      expect(messagesService.findMessageByIdOrThrow).toHaveBeenCalled();
      expect(reactionsRepositories.findOne).toHaveBeenCalled();
      expect(reactionsRepositories.delete).toHaveBeenCalled();
      expect(messagesService.refreshChatMessages).toHaveBeenCalled();
    });

    it('should throw error delete reaction (Message is not found)', async () => {
      const messageId = 999;
      const userId = 1;
      const emoji = 'emoji-reaction';

      messagesService.findMessageByIdOrThrow.mockRejectedValueOnce(new NotFoundException());

      await expect(reactionsService.deleteReaction(messageId, userId, emoji)).rejects.toThrow(
        NotFoundException
      );
      expect(messagesService.findMessageByIdOrThrow).toHaveBeenCalled();
      expect(reactionsRepositories.findOne).not.toHaveBeenCalled();
      expect(reactionsRepositories.delete).not.toHaveBeenCalled();
      expect(messagesService.refreshChatMessages).not.toHaveBeenCalled();
    });

    it('should throw error delete reaction (Cannot delete reaction)', async () => {
      const messageId = 1;
      const userId = 1;
      const emoji = 'emoji-reaction';
      const mockFoundedMessage = createMockMessage(messageId, 1, 1);

      messagesService.findMessageByIdOrThrow.mockResolvedValueOnce(mockFoundedMessage);
      reactionsRepositories.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(reactionsService.deleteReaction(messageId, userId, emoji)).rejects.toThrow(
        NotFoundException
      );
      expect(messagesService.findMessageByIdOrThrow).toHaveBeenCalled();
      expect(reactionsRepositories.findOne).toHaveBeenCalled();
      expect(reactionsRepositories.delete).not.toHaveBeenCalled();
      expect(messagesService.refreshChatMessages).not.toHaveBeenCalled();
    });
  });
});
