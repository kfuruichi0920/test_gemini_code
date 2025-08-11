// タスク一覧表示用コンポーネント
import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => (
  <div className="mt-6">
    {/* タイトル */}
    <h2 className="text-xl font-semibold mb-2">タスク一覧</h2>
    <ul>
      {/* タスクごとにリスト表示 */}
      {tasks.map(task => (
        <li key={task.id} className="flex justify-between items-center p-2 border-b">
          <div>
            {/* 完了タスクは取り消し線 */}
            <span className={task.status === 'completed' ? 'line-through' : ''}>{task.title}</span>
            <span className="ml-2 text-xs text-gray-500">{task.dueDate}</span>
          </div>
          <div>
            {/* 編集・削除ボタン */}
            <button className="mr-2 text-blue-500" onClick={() => onEdit(task)}>編集</button>
            <button className="text-red-500" onClick={() => onDelete(task.id)}>削除</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;
