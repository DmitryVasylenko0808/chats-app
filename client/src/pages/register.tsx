import { Link } from 'react-router';

import { RegisterUserForm } from '../features/auth/components';

const RegisterPage = () => {
  return (
    <main className="bg-secondary flex min-h-screen flex-col items-center justify-center">
      <div className="w-sm p-4">
        <h1 className="mb-12 text-center text-2xl font-semibold">
          <Link to="/">Chats App</Link>
        </h1>
        <RegisterUserForm />
      </div>
    </main>
  );
};

export default RegisterPage;
