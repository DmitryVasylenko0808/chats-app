import { Message } from '@/entities/message';
import { Button, Loader, Modal, ModalProps, TextField, Typograpghy, useAlerts } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';

import { useReplyMessage } from '../lib/hooks/use-reply-message';
import { ReplyMessageFormFields, replyMessageSchema } from '../model/reply-message-validation';

type ReplyMessageModalProps = ModalProps & {
  message: Message;
};
export const ReplyMessageModal = ({ message, ...modalProps }: Readonly<ReplyMessageModalProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyMessageFormFields>({
    resolver: zodResolver(replyMessageSchema),
  });
  const { mutateAsync: replyMessage, isPending: isPendingReply } = useReplyMessage();
  const { notify } = useAlerts();

  const submitHandler = (data: ReplyMessageFormFields) => {
    replyMessage({ chatId: message.chatId, messageId: message.id, ...data })
      .then(() => {
        modalProps.onClose();
        notify({ variant: 'success', text: 'Message is replied' });
      })
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  return (
    <Modal className="w-xl" {...modalProps}>
      <Typograpghy tagVariant="h2" className="mb-6">
        Replying Message
      </Typograpghy>
      <ReplyingToMessage message={message} />
      <form onSubmit={handleSubmit(submitHandler)} className="flex w-full items-end gap-4">
        <TextField
          placeholder="Enter message..."
          error={errors.text?.message}
          {...register('text')}
        />
        <Button variant="primary" className="min-w-max px-4">
          {isPendingReply ? <Loader variant="secondary" size="sm" /> : <AiOutlineSend size={24} />}
        </Button>
      </form>
    </Modal>
  );
};

type RepliedMessageProps = { message: Message };
const ReplyingToMessage = ({ message }: RepliedMessageProps) => {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <img src={message.sender?.avatar} alt="sender-avatar" className="h-10 w-10 rounded-full" />
        <Typograpghy tagVariant="h5">{message.sender?.name || 'Deleted Account'}</Typograpghy>
      </div>
      <Typograpghy>{message.text}</Typograpghy>
    </div>
  );
};
