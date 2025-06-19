import { User } from '@/entities';
import { useAlerts } from '@/shared/hooks';
import { Button, Loader, TextArea, TextField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useEditProfile } from '../hooks';
import { EditingProfileFormFields, editingProfileSchema } from '../validations';

type EditingUserProfileFormProps = { user: User; onSubmit?: () => void };

export const EditingUserProfileForm = ({
  user,
  onSubmit,
}: Readonly<EditingUserProfileFormProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditingProfileFormFields>({
    resolver: zodResolver(editingProfileSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      description: user.description || '',
    },
  });
  const { mutateAsync, isPending } = useEditProfile();
  const { notify } = useAlerts();

  const submitHandler = (fields: EditingProfileFormFields) => {
    const editProfileData = { id: user.id, ...fields };

    editProfileData.avatar = fields.avatar?.[0];

    mutateAsync(editProfileData)
      .then(() => {
        notify({
          variant: 'success',
          title: 'Profile is edited',
          text: 'Profile is successfully edited',
        });
        onSubmit?.();
      })
      .catch((error) => notify({ variant: 'error', text: error.message }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextField
        label="Username"
        className="mb-6"
        error={errors.username?.message}
        {...register('username')}
      />
      <TextField label="Name" className="mb-6" error={errors.name?.message} {...register('name')} />
      <TextField
        label="Email"
        className="mb-6"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextArea
        label="Description"
        rows={5}
        className="mb-6"
        error={errors.description?.message}
        {...register('description')}
      />
      <TextField
        label="Avatar"
        className="mb-6 cursor-pointer"
        type="file"
        {...register('avatar')}
      />
      <Button type="submit" variant="primary" fullWidth>
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Edit Profile'}
      </Button>
    </form>
  );
};
