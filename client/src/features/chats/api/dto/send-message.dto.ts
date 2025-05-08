export type SendMessageDto = {
  id: number;
  senderId: number | null;
  chatId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};
