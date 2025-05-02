import { Link } from 'react-router';

export const WithAccount = () => {
  return (
    <p className="text-body text-center text-[15px] font-normal">
      Have an account?{' '}
      <Link
        to="/auth/sign-in"
        className="text-primary hover:text-primary-hovered font-medium duration-100"
      >
        Sign In
      </Link>
    </p>
  );
};
