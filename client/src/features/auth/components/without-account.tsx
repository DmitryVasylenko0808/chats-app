import { Typograpghy } from '@/shared/ui';

import { Link } from 'react-router';

export const WithoutAccount = () => {
  return (
    <Typograpghy tagVariant="p" className="text-center font-normal">
      Don't have an account?{' '}
      <Link
        to="/auth/register"
        className="text-primary-200 hover:text-primary-300 font-medium duration-100"
      >
        Sign Up
      </Link>
    </Typograpghy>
  );
};
