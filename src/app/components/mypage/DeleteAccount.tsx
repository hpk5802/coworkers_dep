'use client';

import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/stores/auth/authSlice';
import deleteUser, { DeleteUserResponse } from '@/app/lib/user/deleteUser';
import useModal from '@/app/hooks/useModal';
import ConfirmModal from '@/app/components/common/modal/ConfirmModal';
import IconSubtract from '@/app/components/icons/IconSubtract';

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const mutation = useMutation<DeleteUserResponse, Error>({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      dispatch(logout()); // Redux Store 초기화
      closeModal();
      window.location.href = '/';
    },
    onError: () => {
      alert('이미 탈퇴된 회원입니다.');
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex cursor-pointer items-center gap-[0.813rem] border-0 bg-transparent p-0 text-left"
      >
        <IconSubtract />
        <span className="text-lg font-light text-point-red">회원 탈퇴하기</span>
      </button>

      <ConfirmModal
        title={
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-lg font-light">
              회원 탈퇴를 진행하시겠어요?
            </h2>
            <p className="mb-4 text-center text-md font-thin">
              그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서
              나가집니다.
            </p>
          </div>
        }
        cancelLabel="취소"
        confirmLabel="회원 탈퇴"
        isModalOpen={isModalOpen}
        handleCancel={closeModal}
        handleConfirm={handleDelete}
      />
    </div>
  );
}
