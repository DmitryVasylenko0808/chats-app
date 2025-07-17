import { Message } from '@/entities';
import { ReplyMessageFormFields, replyMessageSchema } from '@/features/messages/validations';
import { Button, Loader, Modal, ModalProps, TextField, Typograpghy } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';

type ReplyMessageModalProps = ModalProps & {
  message: Message;
  onSubmitReply: (message: Message, data: ReplyMessageFormFields) => void;
  isPending?: boolean;
};
export const ReplyMessageModal = ({
  message,
  onSubmitReply,
  isPending,
  ...modalProps
}: Readonly<ReplyMessageModalProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyMessageFormFields>({
    resolver: zodResolver(replyMessageSchema),
  });

  const submitHandler = (data: ReplyMessageFormFields) => onSubmitReply(message, data);

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
          {isPending ? <Loader variant="secondary" size="sm" /> : <AiOutlineSend size={24} />}
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
