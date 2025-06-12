import { UserSettings } from '@/features/users/components';

const SettingsPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-sm px-6">
        <UserSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
