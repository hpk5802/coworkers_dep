import { useMutation } from '@tanstack/react-query';
import instance from '../instance';

interface DeleteTaskRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface DeleteRecurringRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
  recurringId: number;
}

// 할 일 삭제
export const deleteTask = async ({
  groupId,
  taskListId,
  taskId,
}: DeleteTaskRequest) => {
  const res = await instance.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
  return res.data;
};

export const useDeleteTaskMutation = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return useMutation({
    mutationFn: () => deleteTask({ groupId, taskListId, taskId }),
  });
};

// 할 일의 반복만 삭제
export const deleteRecurring = async ({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: DeleteRecurringRequest) => {
  const res = await instance.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );

  return res.data;
};

export const useDeleteRecurringMutation = () => {
  return useMutation({
    mutationFn: deleteRecurring,
  });
};
