import { Button, Centered, Typograpghy } from '@/shared';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { TbMoodSad } from 'react-icons/tb';
import { useNavigate } from 'react-router';

type UserProfileErrorProps = { errorMessage?: string };
export const UserProfileError = ({ errorMessage }: Readonly<UserProfileErrorProps>) => {
  const navigate = useNavigate();

  const handleClickBack = () => navigate(-1);

  return (
    <Centered>
      <div className="">
        <div className="mb-2 flex justify-center">
          <TbMoodSad size={72} className="text-center" />
        </div>
        <Typograpghy tagVariant="h2" className="mb-1 text-center">
          Ooops... something went wrong
        </Typograpghy>
        <Typograpghy tagVariant="p" className="mb-4 text-center">
          Cannot get the user profile
        </Typograpghy>
        <div className="flex justify-center">
          <Button variant="primary" className="gap-2" onClick={handleClickBack}>
            <AiOutlineArrowLeft size={20} /> Go back
          </Button>
        </div>
      </div>
    </Centered>
  );
};
