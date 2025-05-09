import { useAuth } from '@/features/auth/hooks';
import { Button, Loader, TextArea, TextField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useEditProfile } from '../hooks';
import { User } from '../types';
import { EditingProfileFormFields, editingProfileSchema } from '../validations';

type EditingUserProfileFormProps = { user: User };

export const EditingUserProfileForm = ({ user }: Readonly<EditingUserProfileFormProps>) => {
  const { currentUser } = useAuth();
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
  const navigate = useNavigate();

  const submitHandler = (fields: EditingProfileFormFields) => {
    const editProfileData = { id: user.id, ...fields };

    editProfileData.avatar = fields.avatar?.[0];

    mutateAsync(editProfileData)
      .then(() => {
        alert('Profile is successfully edited');
        navigate(`/profile/${currentUser?.id}`);
      })
      .catch((error) => alert(error.message));
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
