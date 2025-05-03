import { Button, Loader, TextArea, TextField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useEditProfile } from '../hooks';
import { User } from '../types';
import { EditingProfileFormFields, editingProfileSchema } from '../validations';

type EditingUserProfileFormProps = { user: User };

export const EditingUserProfileForm = ({ user }: Readonly<EditingUserProfileFormProps>) => {
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
  const { editProfile, isPending } = useEditProfile();
  const navigate = useNavigate();

  const submitHandler = (fields: EditingProfileFormFields) => {
    const editProfileData = { id: user.id, ...fields };

    editProfile(editProfileData)
      .then(() => {
        alert('Profile is successfully edited');
        navigate('/profile');
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
      <Button type="submit" variant="primary" fullWidth>
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Edit Profile'}
      </Button>
    </form>
  );
};
