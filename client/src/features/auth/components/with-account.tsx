import { Link } from 'react-router';

export const WithAccount = () => {
  return (
    <p className="text-body text-center font-normal">
      Have an account?{' '}
      <Link
        to="/auth/sign-in"
        className="text-primary-200 hover:text-primary-300 font-medium duration-100"
      >
        Sign In
      </Link>
    </p>
  );
};
