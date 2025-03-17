import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useToast from './useToast';

const useRedirectIfNotFound = (isNotFound: boolean) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (isNotFound) {
      if (!isToastShown) {
        setIsRedirecting(true);
        router.replace('/notfound');
        showToast({
          message: '유효하지 않은 페이지입니다👀',
          type: 'error',
        });
        setIsToastShown(true);
      }
    }
  }, [isNotFound, router, showToast, isToastShown]);

  return { isRedirecting };
};

export default useRedirectIfNotFound;
