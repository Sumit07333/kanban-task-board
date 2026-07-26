# 🚀 Kanban Task Board (Sprint 05)

A professional, Trello-style **Kanban Task Board** built with **React**, **Vite**, **Tailwind CSS**, and **@dnd-kit**. It helps users organize tasks across workflow stages with drag-and-drop interactions, inline editing, search, filtering, and automatic persistence using `localStorage`.

---

## 🌐 Live Demo

- **🔗 Live Application:** https://kanban-task-board-seven-ashen.vercel.app/
- **💻 GitHub Repository:** https://github.com/Sumit07333/kanban-task-board

---

## ✨ Features

### 📋 Task Management

- ➕ Create new tasks with configurable priority levels (High, Medium, Low)
- ✏️ Edit task title and priority inline
- 🗑️ Delete tasks instantly
- 🚚 Move tasks between workflow columns
- 🆔 Automatic unique ID generation for every task

### 🎯 Drag & Drop

- Smooth drag-and-drop powered by **@dnd-kit**
- Move tasks seamlessly between Kanban columns
- Touch-friendly interactions
- 🎉 Confetti animation when a task reaches the **Done** column

### 🔍 Search & Filtering

- Live task search
- Filter tasks by priority
- Empty-state UI when no matching tasks are found

### 🎨 User Experience

- 🌙 Dark / Light Mode
- 📱 Fully Responsive Design
- 💾 Automatic localStorage persistence
- 🚀 Fast React + Vite performance
- 📊 Statistics dashboard with task counts

---

## 🛠️ Tech Stack

| Technology      | Purpose              |
| --------------- | -------------------- |
| React 19        | Frontend Framework   |
| Vite            | Build Tool           |
| Tailwind CSS v4 | Styling              |
| @dnd-kit        | Drag & Drop          |
| Lucide React    | Icons                |
| Canvas Confetti | Completion Animation |

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── NotificationToast.jsx
│   ├── SearchBar.jsx
│   ├── StatsSummary.jsx
│   ├── TaskCard.jsx
│   └── TaskInput.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
git clone https://github.com/Sumit07333/kanban-task-board.git

cd kanban-task-board

npm install

npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## ☁️ Deploy on Vercel

This project is ready for deployment on **Vercel**.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select the **Vite** framework preset.
4. Click **Deploy**.

---

## 🧪 QA Checklist

- ✅ Create Task
- ✅ Edit Task
- ✅ Delete Task
- ✅ Move Task Between Columns
- ✅ Drag & Drop
- ✅ Search Tasks
- ✅ Filter by Priority
- ✅ Dark / Light Mode
- ✅ Responsive Layout
- ✅ localStorage Persistence
- ✅ Confetti on Task Completion

---

## 👨‍💻 Author

**Sumit Kumar**

- GitHub: https://github.com/Sumit07333

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
