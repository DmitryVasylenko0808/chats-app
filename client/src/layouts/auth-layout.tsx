import { Logo, ThemeSwitcher } from '@/shared/components';
import { Typograpghy } from '@/shared/ui';

import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <main className="bg-secondary-200 dark:bg-dark-300 flex min-h-screen flex-col items-center justify-center">
      <div className="fixed top-8 right-8">
        <ThemeSwitcher />
      </div>
      <div className="w-sm p-4">
        <Typograpghy tagVariant="h1" className="mb-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Logo />
            Chats App
          </Link>
        </Typograpghy>
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
