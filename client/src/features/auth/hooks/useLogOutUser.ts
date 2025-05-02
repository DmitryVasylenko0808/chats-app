import { useNavigate } from 'react-router';

export const useLogOutUser = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('access_token');
    navigate('/auth/sign-in');
  };

  return logOut;
};
