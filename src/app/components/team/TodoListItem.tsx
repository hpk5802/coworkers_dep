import React from 'react';
import { PieChart, Pie } from 'recharts';
import Link from 'next/link';
import IconTaskDone from '@/app/components/icons/IconTaskDone';
import TaskListDropdown from '@/app/components/team/TaskListDropdown';
import { Task } from '@/app/lib/group/getTaskList';
import { GroupTask } from '@/app/types/grouptask';

interface TodoListItemProps {
  taskList: GroupTask;
  groupId: number;
  backgroundColor: string;
  taskListData: { tasks?: Task[] };
}

export default function TodoListItem({
  taskList,
  groupId,
  backgroundColor,
  taskListData,
}: TodoListItemProps) {
  const tasks = taskListData.tasks || [];
  const completedItems = tasks.filter((task) => task.doneAt !== null).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks
    ? (completedItems / totalTasks) * 100
    : 0;

  return (
    <div
      key={taskList.id}
      className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-4"
    >
      <div
        className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColor}`}
      />
      <Link
        href={`/${groupId}/tasklist/${taskList.id}`}
        className="text-base font-medium text-white"
      >
        {taskList.name}
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex w-14 items-center gap-1 rounded-xl bg-background-primary px-2 py-1">
          {completedItems === totalTasks ? (
            <IconTaskDone />
          ) : (
            <PieChart width={16} height={16}>
              <Pie
                data={[{ name: 'Background', value: 100 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={4}
                outerRadius={7}
                startAngle={90}
                endAngle={-270}
                fill="#F8FAFC"
                stroke="none"
              />
              <Pie
                data={[{ name: 'Completed', value: completionPercentage }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={4}
                outerRadius={7}
                startAngle={270}
                endAngle={270 + (completionPercentage * 360) / 100}
                fill="#10B981"
                stroke="none"
                cornerRadius={50}
              />
            </PieChart>
          )}
          <div className="text-sm font-medium text-brand-primary">
            {completedItems}/{totalTasks}
          </div>
        </div>
        <TaskListDropdown
          groupId={groupId}
          taskListId={taskList.id}
          taskListName={taskList.name}
        />
      </div>
    </div>
  );
}
