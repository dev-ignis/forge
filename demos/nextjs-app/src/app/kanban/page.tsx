'use client';

import { useState } from 'react';
import { ForgeCard, ForgeBadge, ForgeButton, ForgeInput, ForgeAvatar } from '@nexcraft/forge-react';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Design new landing page', description: 'Create mockups for homepage', assignee: 'JD', priority: 'high', tags: ['design', 'urgent'] },
        { id: 2, title: 'Update documentation', description: 'Add API docs', assignee: 'SA', priority: 'medium', tags: ['docs'] },
      ],
    },
    {
      id: 'progress',
      title: 'In Progress',
      tasks: [
        { id: 3, title: 'Implement auth flow', description: 'OAuth integration', assignee: 'MB', priority: 'high', tags: ['dev', 'security'] },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        { id: 4, title: 'Fix responsive bugs', description: 'Mobile layout issues', assignee: 'EW', priority: 'medium', tags: ['bug', 'frontend'] },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 5, title: 'Setup CI/CD pipeline', description: 'Deploy automation', assignee: 'AC', priority: 'low', tags: ['devops'] },
      ],
    },
  ]);

  const priorityColors = {
    low: 'default',
    medium: 'warning',
    high: 'error',
  } as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Board</h1>
            <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
          </div>
          <ForgeButton variant="primary">+ Add Task</ForgeButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">{column.title}</h2>
                <ForgeBadge variant="default">{column.tasks.length}</ForgeBadge>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <ForgeCard key={task.id} className="p-4 cursor-grab hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <ForgeBadge variant={priorityColors[task.priority]} size="sm">
                        {task.priority}
                      </ForgeBadge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {task.tags.map((tag) => (
                          <ForgeBadge key={tag} variant="default" size="sm">{tag}</ForgeBadge>
                        ))}
                      </div>
                      <ForgeAvatar initials={task.assignee} size="sm" />
                    </div>
                  </ForgeCard>
                ))}

                {column.tasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed rounded-lg">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
