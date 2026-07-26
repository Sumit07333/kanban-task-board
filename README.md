# 🚀 Kanban Task Board (Sprint 05)

A professional, Trello-style **Kanban Task Board** built with **React**, **Vite**, **Tailwind CSS**, and **@dnd-kit**. Designed to manage sprint deliverables, organize workflow pipelines, and persist user state seamlessly in `localStorage`.

---

## 🌟 Key Features

### 📋 Core Task Management
- **Task Creation**: Add tasks with titles and configurable priority levels (*High*, *Medium*, *Low*).
- **Automated Column Assignment**: All newly created tasks land in the **To Do** column with unique generated IDs.
- **Task Deletion**: Immediate task removal with real-time state and storage synchronization.
- **Inline Task Editing**: Edit titles and priorities directly on task cards with keyboard shortcuts (`Enter` to save, `Esc` to cancel).
- **Movement Controls**:
  - `To Do` ➔ `In Progress`
  - `In Progress` ➔ `Done` or `To Do`
  - `Done` ➔ `In Progress`

### 🎨 Priority System
- Visual indicators on every card:
  - **High Priority**: Red accent border & badge
  - **Medium Priority**: Amber accent border & badge
  - **Low Priority**: Emerald accent border & badge

### 🎯 Drag & Drop Pipeline
- Drag cards across columns or reorder within a column using `@dnd-kit`.
- Smooth physics, touch support, and celebratory confetti trigger upon completing tasks in **Done**.

### 🔍 Real-Time Global Search & Filters
- Live query search across task titles and priorities simultaneously.
- Priority filter dropdown (*All*, *High*, *Medium*, *Low*).
- Empty state fallbacks when no matching tasks are found.

### 💾 Data Persistence & UX
- Automatic synchronization with browser `localStorage`.
- Includes initial seed tasks for instant first-time hydration.
- Responsive design for Desktop, Laptop, Tablet, and Mobile devices.
- Dark / Light mode theme switcher.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/), [@dnd-kit/sortable](https://dndkit.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Board.jsx             # Column grid & DnD context container
│   ├── Column.jsx            # Droppable column wrapper (To Do, In Progress, Done)
│   ├── TaskCard.jsx          # Individual sortable task item with inline editing
│   ├── TaskInput.jsx         # Creation form with title validation
│   ├── SearchBar.jsx         # Query search and priority filter bar
│   ├── StatsSummary.jsx      # Analytics header & sprint completion bar
│   ├── Navbar.jsx            # Branding, reset board, and dark mode toggle
│   ├── Footer.jsx            # App footer and tech badges
│   └── NotificationToast.jsx # Feedback toast notifications
├── hooks/
│   └── useLocalStorage.js    # State sync with localStorage
├── utils/
│   ├── constants.js          # Columns, priorities, and default tasks
│   └── helpers.js            # ID generator, formatters, and status logic
├── App.jsx                   # Master state owner & component orchestrator
├── main.jsx                  # React entry point
└── index.css                 # Tailwind CSS imports
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Local Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📦 Vercel Deployment

This project is pre-configured for zero-config Vercel deployment:
1. Push repository to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Select **Vite** as framework preset and click **Deploy**.

---

## 📹 QA Demonstration Checklist

When presenting or reviewing this application:
1. **Add Task**: Type a title, choose "High", click "Add Task". Verify it appears in "To Do".
2. **Move Task**: Click the "Move" button on a card to shift it from "To Do" ➔ "In Progress" ➔ "Done".
3. **Drag & Drop**: Grab a card's drag handle and drop it into another column or reorder.
4. **Inline Edit**: Click the pencil icon on a card, update text, press Enter or click Save.
5. **Search & Filter**: Type a keyword in SearchBar or pick "High Priority" in the filter.
6. **Persistence**: Refresh the browser page; verify all tasks, edits, and states remain intact.
