import { Button, Loader, TextField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useRegisterUser } from '../hooks';
import { RegisterFormFields, registerSchema } from '../validations';
import { WithAccount } from './with-account';

export const RegisterUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });
  const { registerUserAccount, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const submitHandler = (fields: RegisterFormFields) => {
    const { passwordConfirmation, ...data } = fields;

    registerUserAccount(data)
      .then(() => {
        navigate('/auth/sign-in');
        alert('Success');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-12">
        <h2 className="mb-3 text-center text-xl font-semibold">Register</h2>
        <p className="text-body text-center font-normal">Get your Chats-App account now.</p>
      </div>
      <div className="mb-6">
        <TextField
          label="Username"
          className="mb-4"
          error={errors.username?.message}
          {...register('username')}
        />
        <TextField
          label="Name"
          className="mb-4"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextField
          label="Email"
          className="mb-4"
          error={errors.email?.message}
          type="email"
          {...register('email')}
        />
        <TextField
          label="Password"
          className="mb-4"
          error={errors.password?.message}
          type="password"
          {...register('password')}
        />
        <TextField
          label="Confirm Password"
          className="mb-6"
          error={errors.passwordConfirmation?.message}
          type="password"
          {...register('passwordConfirmation')}
        />
        <Button type="submit" fullWidth>
          {isPending ? <Loader /> : 'Register'}
        </Button>
      </div>
      <WithAccount />
    </form>
  );
};
