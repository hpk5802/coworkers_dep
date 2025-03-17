import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useToast from '@/app/hooks/useToast';

const useAuthRedirect = () => {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isToastShown, setIsToastShown] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!accessToken) {
      if (!isToastShown) {
        showToast({ message: '로그인 후 이용할 수 있습니다.🧐', type: 'info' });
        setIsToastShown(true);
      }
      setTimeout(() => {
        router.replace('/login');
      }, 300);
    } else {
      setIsLoading(false);
      setIsToastShown(false);
    }
  }, [accessToken, router, showToast, isToastShown]);

  return { isLoading };
};

export default useAuthRedirect;
