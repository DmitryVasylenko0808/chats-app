import { Button, Loader, TextField, Typograpghy, useAlerts } from '@/shared';
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
  const { mutateAsync, isPending } = useRegisterUser();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const submitHandler = (fields: RegisterFormFields) => {
    const { passwordConfirmation, ...data } = fields;

    mutateAsync(data)
      .then(() => {
        navigate('/auth/sign-in');
        notify({ variant: 'success', title: 'Success', text: 'Success' });
      })
      .catch((error) => notify({ variant: 'error', title: 'Error', text: error.message }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-12">
        <Typograpghy tagVariant="h2" className="mb-3 text-center">
          Register
        </Typograpghy>
        <Typograpghy tagVariant="p" className="text-center font-normal">
          Get your Chats-App account now.
        </Typograpghy>
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
        <Button variant="primary" type="submit" fullWidth>
          {isPending ? <Loader variant="secondary" size="sm" /> : 'Register'}
        </Button>
      </div>
      <WithAccount />
    </form>
  );
};
