'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import IconProfileEdit from '@/app/components/icons/IconProfileEdit';
import IconProfile from '@/app/components/icons/IconProfile';
import useToast from '@/app/hooks/useToast';
import { profileImageValidation } from '@/app/utils/validationRules';

interface ProfileUploaderProps {
  initialImage?: string;
  setValue: UseFormSetValue<FieldValues>;
}

function ProfileUploader({ initialImage, setValue }: ProfileUploaderProps) {
  const [profileImage, setProfileImage] = useState<string | null>(
    initialImage || '',
  );
  const { showToast } = useToast();

  const validateFile = (file: File) => {
    const typeValidation = profileImageValidation.validate.fileType(file);
    return typeValidation !== true ? typeValidation : null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // 유효성 검사 수행
      const validationErrors = validateFile(file);
      if (validationErrors) {
        showToast({ message: validationErrors, type: 'warning' });
        return;
      }

      const url = URL.createObjectURL(file); // 미리보기 URL 생성
      setProfileImage(url);
      setValue('profile', file);
    }
  };

  useEffect(() => {
    setProfileImage(initialImage || '');
  }, [initialImage]);

  return (
    <div>
      <span className="mb-3 inline-block">팀 프로필</span>
      <label
        htmlFor="profile"
        className="relative block h-16 w-16 cursor-pointer"
      >
        <input
          id="profile"
          className="sr-only"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {profileImage ? (
          <>
            <Image
              src={profileImage}
              className="rounded-full border-2 border-border-primary"
              fill
              alt="프로필 이미지"
            />
            <IconProfileEdit className="absolute bottom-0 right-0" />
          </>
        ) : (
          <IconProfile />
        )}
      </label>
    </div>
  );
}

export default ProfileUploader;
