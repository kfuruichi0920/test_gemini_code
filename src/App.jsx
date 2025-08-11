// React本体とフックをインポート
import React, { useEffect, useState } from 'react';
// タスクリスト表示用コンポーネント
import TaskList from './components/TaskList';
// タスク追加・編集フォーム用コンポーネント
import TaskForm from './components/TaskForm';
// ライト/ダークモード切替トグル
import ThemeToggle from './components/ThemeToggle';

// アプリのメインコンポーネント
const App = () => {
  // タスク一覧の状態
  const [tasks, setTasks] = useState([]);
  // 編集中タスクの状態
  const [editingTask, setEditingTask] = useState(null);

  // 初回マウント時にタスク一覧を取得
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  // タスク追加処理
  const handleAdd = (task) => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(newTask => setTasks([...tasks, newTask]));
  };

  // タスク更新処理
  const handleUpdate = (id, updates) => {
    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(updated => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };

  // タスク削除処理
  const handleDelete = (id) => {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  // UI描画
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">タスク管理ツール</h1>
        <ThemeToggle />
      </header>
      <main className="p-4 max-w-2xl mx-auto">
        <TaskForm onAdd={handleAdd} editingTask={editingTask} onUpdate={handleUpdate} />
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
      </main>
    </div>
  );
};

export default App;
