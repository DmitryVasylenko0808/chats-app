import { Button, Loader, Modal, ModalProps, TextArea } from '@/shared/ui';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useEditMessage } from '../hooks';
import { Message } from '../types';
import { EditMessageFormFields, editMessageSchema } from '../validations';

type EditMessageModalProps = ModalProps & { message: Message };

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
  const { mutateAsync, isPending } = useEditMessage();

  const submitHandler = (data: EditMessageFormFields) =>
    mutateAsync({ chatId: message.chatId, messageId: message.id, ...data })
      .then(() => {
        modalProps.onClose();
        alert('Message is edited');
      })
      .catch((err) => alert(err.message));

  return (
    <Modal {...modalProps}>
      <h2 className="mb-6 text-xl font-semibold">Editing Message</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="flex w-full items-end gap-4">
        <TextArea
          placeholder="Enter message..."
          error={errors.text?.message}
          {...register('text')}
        />
        <Button variant="primary" className="min-w-max px-4">
          {isPending ? (
            <Loader variant="secondary" size="sm" />
          ) : (
            <PaperAirplaneIcon width={24} height={24} />
          )}
        </Button>
      </form>
    </Modal>
  );
};
