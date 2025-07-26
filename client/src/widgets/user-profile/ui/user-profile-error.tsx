import { Centered, Typograpghy } from '@/shared';

import { TbMoodSad } from 'react-icons/tb';

type UserProfileErrorProps = { errorMessage?: string };
export const UserProfileError = ({ errorMessage }: Readonly<UserProfileErrorProps>) => (
  <Centered>
    <div className="">
      <div className="mb-2 flex justify-center">
        <TbMoodSad size={72} className="text-center" />
      </div>
      <Typograpghy tagVariant="h2" className="mb-1 text-center">
        Ooops... something went wrong
      </Typograpghy>
      <Typograpghy tagVariant="p" className="text-center">
        Cannot get the user profile
      </Typograpghy>
    </div>
  </Centered>
);
