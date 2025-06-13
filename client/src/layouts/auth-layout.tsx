import { Logo } from '@/shared/components';

import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <main className="bg-secondary-200 flex min-h-screen flex-col items-center justify-center">
      <div className="w-sm p-4">
        <h1 className="mb-12 text-center text-2xl font-semibold">
          <Link to="/" className="inline-flex items-center gap-2">
            <Logo />
            Chats App
          </Link>
        </h1>
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
