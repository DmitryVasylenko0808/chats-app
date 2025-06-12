import { EditingUserProfile } from '@/features/users/components';

const EditingProfilePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-md px-6">
        <EditingUserProfile />
      </div>
    </div>
  );
};

export default EditingProfilePage;
