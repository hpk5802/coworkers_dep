import { useMutation } from '@tanstack/react-query';
import instance from '../instance';

interface PatchTaskRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
  name?: string;
  description?: string | null;
  done?: boolean;
}

interface PatchTaskOrderRequest {
  groupId: number;
  taskListId: number;
  id: number;
  displayIndex: number;
}

// 할 일 수정
export const editTask = async ({
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: PatchTaskRequest) => {
  const res = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { name, description, done },
  );

  return res.data;
};

export const useEditTaskMutation = () => {
  return useMutation({
    mutationFn: editTask,
  });
};

// 할 일 순서 수정
export const editTaskOrder = async ({
  groupId,
  taskListId,
  id,
  displayIndex,
}: PatchTaskOrderRequest) => {
  const res = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`,
    { displayIndex },
  );

  return res.data;
};

export const useEditTaskOrderMutation = () => {
  return useMutation({
    mutationFn: editTaskOrder,
  });
};
