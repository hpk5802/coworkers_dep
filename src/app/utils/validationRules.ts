import { RegisterOptions } from 'react-hook-form';

export const teamNameValidation: RegisterOptions = {
  required: '이름을 입력해주세요.',
  minLength: {
    value: 1,
    message: '이름은 최소 1글자 이상입니다.',
  },
  maxLength: {
    value: 30,
    message: '이름은 최대 30글자까지 입력 가능합니다.',
  },
  validate: (value) =>
    value.trim() !== '' || '팀 이름에 공백만 입력할 수 없습니다.',
};

export const profileImageValidation = {
  validate: {
    fileType: (file: File) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return (
        validTypes.includes(file.type) ||
        'JPEG, PNG, GIF 형식의 이미지만 업로드할 수 있습니다.'
      );
    },
  },
};
