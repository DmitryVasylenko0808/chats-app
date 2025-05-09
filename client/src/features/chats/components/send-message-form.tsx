import { Button, Loader, TextField } from '@/shared/ui';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useSendMessage } from '../hooks';
import { Chat } from '../types';
import { SendMessageFormFields, sendMessageSchema } from '../validations';

type SendMessageFormProps = { chat: Chat };

export const SendMessageForm = ({ chat }: Readonly<SendMessageFormProps>) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<SendMessageFormFields>({
    resolver: zodResolver(sendMessageSchema),
  });
  const { mutateAsync, isPending } = useSendMessage();

  useEffect(() => setFocus('text'), [chat]);

  const submitHandler = (data: SendMessageFormFields) =>
    mutateAsync({ ...data, chatId: chat.id })
      .then(() => reset())
      .catch((err) => alert(err.message));

  return (
    <div className="border-t-body/10 flex h-24 items-center border-t-2 px-6">
      <form onSubmit={handleSubmit(submitHandler)} className="flex w-full gap-4">
        <TextField
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
    </div>
  );
};
