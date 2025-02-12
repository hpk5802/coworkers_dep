'use client';

import { useState } from 'react';
import DatePicker from '@/app/components/tasklist/DatePicker';
import TaskCardList from '@/app/components/tasklist/TaskCardList';
import CreateTaskModal from '@/app/components/tasklist/CreateTaskModal';
import useModal from '@/app/hooks/useModal';
import Button from '@/app/components/common/button/Button';
import CreateListModal from '@/app/components/tasklist/CreateListModal';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getGroupById from '@/app/lib/group/getGroupById';
import Link from 'next/link';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';

function TaskListPage() {
  const { isLoading: isALoading } = useAuthRedirect();
  const { teamid, tasklist } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<'list' | 'task' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const { data, isLoading } = useQuery({
    queryKey: ['tasklists', Number(teamid)],
    queryFn: () => getGroupById(Number(teamid)),
  });

  const handleOpenModal = (type: 'task' | 'list') => {
    setModalType(type);
    openModal();
  };

  if (isALoading) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto mt-24 flex w-full max-w-[75rem] flex-col gap-6 px-3.5 tablet:px-6">
      <p className="text-xl">할 일</p>
      <div className="flex justify-between">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={(date: Date) => {
            const localDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000,
            );
            setSelectedDate(localDate.toISOString().split('T')[0]);
          }}
        />
        <button
          className="text-md text-brand-primary hover:text-interaction-hover"
          onClick={() => handleOpenModal('list')}
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {data?.taskLists &&
          data?.taskLists.map((list) => {
            const isActive = tasklist === String(list.id);

            return (
              <Link
                key={list.id}
                href={`/${teamid}/${list.id}`}
                className={`whitespace-nowrap transition ${
                  isActive
                    ? 'text-text-tertiary underline underline-offset-8'
                    : 'text-text-default'
                } hover:text-text-tertiary`}
              >
                {list.name}
              </Link>
            );
          })}
      </div>
      <TaskCardList
        groupId={Number(teamid)}
        taskListId={Number(tasklist)}
        date={selectedDate}
      />
      <Button
        variant="plus"
        size="plus"
        className="fixed bottom-6 right-6 z-20 text-text-inverse"
        onClick={() => handleOpenModal('task')}
      >
        + 할 일 추가
      </Button>
      <CreateListModal
        isOpen={isOpen && modalType === 'list'}
        onClose={closeModal}
        groupId={Number(teamid)}
      />
      <CreateTaskModal
        isOpen={isOpen && modalType === 'task'}
        onClose={closeModal}
      />
    </div>
  );
}

export default TaskListPage;
