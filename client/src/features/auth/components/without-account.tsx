import { Link } from 'react-router';

export const WithoutAccount = () => {
  return (
    <p className="text-body text-center font-normal">
      Don't have an account?{' '}
      <Link
        to="/auth/register"
        className="text-primary hover:text-primary-hovered font-medium duration-100"
      >
        Sign Up
      </Link>
    </p>
  );
};
