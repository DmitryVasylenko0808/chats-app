import { Button, Loader, Modal, ModalProps, TextArea, TextField, Typograpghy } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';

import { Message } from '../types';
import { EditMessageFormFields, editMessageSchema } from '../validations';

type EditMessageModalProps = ModalProps & {
  message: Message;
  onEditSubmit: (message: Message, data: EditMessageFormFields) => void;
  isPending?: boolean;
};

export const EditMessageModal = ({
  message,
  isPending,
  onEditSubmit,
  ...modalProps
}: Readonly<EditMessageModalProps>) => {
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

  const submitHandler = (data: EditMessageFormFields) => onEditSubmit(message, data);

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
          {isPending ? <Loader variant="secondary" size="sm" /> : <AiOutlineSend size={24} />}
        </Button>
      </form>
    </Modal>
  );
};
