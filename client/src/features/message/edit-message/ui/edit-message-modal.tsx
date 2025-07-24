import { Message } from '@/entities/message';
import { Button, Loader, Modal, ModalProps, TextField, Typograpghy, useAlerts } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';

import { useEditMessage } from '../lib/hooks/use-edit-message';
import { EditMessageFormFields, editMessageSchema } from '../model/edit-message-validation';

type EditMessageModalProps = ModalProps & {
  message: Message;
};

export const EditMessageModal = ({ message, ...modalProps }: Readonly<EditMessageModalProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMessageFormFields>({
    resolver: zodResolver(editMessageSchema),
    defaultValues: {
      text: message.text,
    },
  });
  const { mutateAsync: editMessage, isPending: isPendingEdit } = useEditMessage();
  const { notify } = useAlerts();

  const submitHandler = (data: EditMessageFormFields) => {
    editMessage({ chatId: message.chatId, messageId: message.id, ...data })
      .then(() => {
        modalProps.onClose();
        notify({ variant: 'success', text: 'Message is edited' });
      })
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  return (
    <Modal className="w-xl" {...modalProps}>
      <Typograpghy tagVariant="h2" className="mb-6">
        Editing Message
      </Typograpghy>
      <form onSubmit={handleSubmit(submitHandler)} className="flex w-full items-end gap-4">
        <TextField
          placeholder="Enter message..."
          error={errors.text?.message}
          {...register('text')}
        />
        <Button variant="primary" className="min-w-max px-4">
          {isPendingEdit ? <Loader variant="secondary" size="sm" /> : <AiOutlineSend size={24} />}
        </Button>
      </form>
    </Modal>
  );
};
