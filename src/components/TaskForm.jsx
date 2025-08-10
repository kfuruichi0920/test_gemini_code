import React, { useState, useEffect } from 'react';

const initialState = { title: '', description: '', dueDate: '', priority: '', status: 'pending' };

const TaskForm = ({ onAdd, editingTask, onUpdate }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingTask) setForm(editingTask);
    else setForm(initialState);
  }, [editingTask]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingTask) {
      onUpdate(editingTask.id, form);
    } else {
      onAdd(form);
    }
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="mb-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="タイトル" className="w-full p-2 rounded" required />
      </div>
      <div className="mb-2">
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="説明" className="w-full p-2 rounded" />
      </div>
      <div className="mb-2">
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="p-2 rounded" />
      </div>
      <div className="mb-2">
        <select name="priority" value={form.priority} onChange={handleChange} className="p-2 rounded">
          <option value="">優先度</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>
      <div className="mb-2">
        <select name="status" value={form.status} onChange={handleChange} className="p-2 rounded">
          <option value="pending">未完了</option>
          <option value="completed">完了</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingTask ? '更新' : '追加'}
      </button>
    </form>
  );
};

export default TaskForm;
