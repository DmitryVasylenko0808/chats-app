import { useAlerts } from '@/shared/hooks';
import { Button, Loader, TextField, Typograpghy } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useSignInUser } from '../hooks';
import { SignInFormFields, signInSchema } from '../validations';
import { WithoutAccount } from './without-account';

export const SignInUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });
  const { mutateAsync, isPending } = useSignInUser();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const submitHandler = (fields: SignInFormFields) => {
    mutateAsync(fields)
      .then(() => navigate('/'))
      .catch((error) => notify({ variant: 'error', title: 'Error', text: error.message }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-12">
        <Typograpghy tagVariant="h2" className="mb-3 text-center">
          Sign In
        </Typograpghy>
        <Typograpghy tagVariant="p" className="text-center font-normal">
          Sign in to continue to Chats-App.
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
          label="Password"
          className="mb-4"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button variant="primary" type="submit" fullWidth>
          {isPending ? <Loader variant="secondary" size="sm" /> : 'Sign In'}
        </Button>
      </div>
      <WithoutAccount />
    </form>
  );
};
