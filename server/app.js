const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

// タスク一覧取得
app.get('/api/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  res.json(tasks);
});

// タスク詳細取得
app.get('/api/tasks/:id', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

// タスク新規作成
app.post('/api/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const newTask = { ...req.body, id: Date.now().toString() };
  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

// タスク編集
app.put('/api/tasks/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  tasks[idx] = { ...tasks[idx], ...req.body };
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.json(tasks[idx]);
});

// タスク削除
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = tasks.splice(idx, 1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
