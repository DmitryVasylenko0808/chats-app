import { useAlerts } from '@/shared/hooks';
import { Button, FilesUploadButton, Loader, TextArea } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';

import { useSendMessage } from '../hooks';
import { Chat } from '../types';
import { SendMessageFormFields, sendMessageSchema } from '../validations';
import { ChatEmojiPicker } from './chat-emoji-picker';
import { PreviewMessageImages } from './preview-message-images';

type SendMessageFormProps = { chat: Chat };

export const SendMessageForm = ({ chat }: Readonly<SendMessageFormProps>) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SendMessageFormFields>({
    resolver: zodResolver(sendMessageSchema),
  });
  const { mutateAsync, isPending } = useSendMessage();
  const { notify } = useAlerts();

  useEffect(() => setFocus('text'), [chat]);

  const handleEmojiClick = (emoji: string) => {
    setValue('text', getValues('text') + emoji);
  };
  const handleClosePreview = () => setValue('images', []);

  const submitHandler = (data: SendMessageFormFields) =>
    mutateAsync({ ...data, chatId: chat.id })
      .then(() => reset())
      .catch((err) => notify({ variant: 'error', text: err.message }));

  const files = watch('images');

  return (
    <div className="border-t-body/10 relative flex h-24 items-center border-t-2 px-6">
      <form onSubmit={handleSubmit(submitHandler)} className="flex w-full gap-4">
        <TextArea
          rows={1}
          placeholder="Enter message..."
          error={errors.text?.message}
          {...register('text')}
        />
        <div className="flex items-center gap-4">
          <Controller
            name="images"
            control={control}
            render={({ field, fieldState }) => (
              <FilesUploadButton
                type="file"
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(Array.from(e.target.files ?? []))}
                attachedFilesCount={files?.length}
                error={fieldState.error?.message}
                multiple
              />
            )}
          />
          <ChatEmojiPicker onClickEmoji={handleEmojiClick} />
          <Button type="submit" variant="primary" className="min-w-max px-4">
            {isPending ? <Loader variant="secondary" size="sm" /> : <AiOutlineSend size={24} />}
          </Button>
        </div>
      </form>
      <PreviewMessageImages images={files} onClose={handleClosePreview} />
    </div>
  );
};
