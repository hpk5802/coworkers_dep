import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import Button from '@/app/components/common/button/Button';
import Input from '@/app/components/common/input/Input';
import ProfileUploader from '@/app/components/team/ProfileUploader';
import { PropsWithChildren, useEffect } from 'react';
import { teamNameValidation } from '@/app/utils/validationRules';

interface TeamFormProps {
  initialImage?: string;
  initialName?: string;
  onSubmit: (data: FieldValues) => void;
  isLoading: boolean;
}

function TeamForm({
  children,
  initialImage,
  initialName,
  onSubmit,
  isLoading,
}: PropsWithChildren<TeamFormProps>) {
  const method = useForm<FieldValues>({
    defaultValues: { profile: initialImage, name: initialName },
  });
  const { handleSubmit, setValue } = method;

  useEffect(() => {
    setValue('profile', initialImage);
    setValue('name', initialName);
  }, [initialImage, initialName, setValue]);

  return (
    <FormProvider {...method}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <ProfileUploader initialImage={initialImage} setValue={setValue} />
        <Input
          name="name"
          title="팀 이름"
          type="text"
          placeholder="팀 이름을 입력해주세요."
          validationRules={teamNameValidation}
          autoComplete="off"
        />
      </form>
      <Button
        variant="primary"
        className="mt-10 w-full text-white"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {children}
      </Button>
    </FormProvider>
  );
}

export default TeamForm;
