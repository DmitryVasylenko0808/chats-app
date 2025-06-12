import { EmptyChat } from '@/features/chats/components';

const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-md px-6">
        <EmptyChat />
      </div>
    </div>
  );
};

export default HomePage;
