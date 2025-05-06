import { SearchUsers } from '@/features/users/components';

const ChatsPage = () => {
  return (
    <div>
      <div className="px-6 pt-6 pb-3">
        <h3 className="text-xl font-semibold">Chats</h3>
      </div>
      <SearchUsers />
    </div>
  );
};

export default ChatsPage;
