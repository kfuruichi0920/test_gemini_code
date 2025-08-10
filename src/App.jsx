import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const handleAdd = (task) => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(newTask => setTasks([...tasks, newTask]));
  };

  const handleUpdate = (id, updates) => {
    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(updated => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };

  const handleDelete = (id) => {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

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
