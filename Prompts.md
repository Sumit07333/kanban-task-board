# 📑 Prompts.md - AI Engineering & Architecture Log

This document tracks the prompts, design decisions, architectural considerations, and React concepts used to construct the **Kanban Task Board** for Sprint 05.

---

## 🏗️ 1. Architecture & State Management Planning

### Architectural Prompt
> "Design a clean, modular React application for a Trello-style Kanban board. Separate component responsibilities according to the single responsibility principle: App owns state, Board manages DnD layout, Column renders card lists, and TaskCard handles individual card interactions."

### Key Engineering Decisions
1. **Lifting State Up**: `App.jsx` acts as the single source of truth for the `tasks` state. All mutations (add, edit, delete, move, reorder) occur via callback functions passed downward as props.
2. **Immutable Updates**: Used Array methods (`map()`, `filter()`, spread operator) to ensure React state is never mutated directly.
3. **Data Persistence**: Created a custom `useLocalStorage` hook to handle JSON parsing, serialization, and fallback recovery without imperative DOM manipulation.

---

## 🎨 2. Component Hierarchy & Flow

```
App (State & Persistence Owner)
 │
 ├── Navbar (Theme Toggle & Reset)
 ├── StatsSummary (Analytics Metrics)
 ├── TaskInput (Add Task Controlled Form)
 ├── SearchBar (Controlled Filter Inputs)
 ├── Board (DndContext & Column Grid)
 │    └── Column (SortableContext)
 │         └── TaskCard (useSortable Item)
 ├── Footer
 └── NotificationToast
```

---

## 💡 3. Key React Concepts Demonstrated

- **React `useState`**: Used for controlled form inputs, search queries, inline edit flags, and toast triggers.
- **React `useEffect`**: Used for dark mode document root class toggling and toast auto-dismissal timers.
- **Controlled Components**: All input fields synchronize bi-directionally with React state.
- **Custom Hooks**: Encapsulated `localStorage` operations inside `useLocalStorage.js`.
- **Drag & Drop Integration**: Integrated `@dnd-kit/core` and `@dnd-kit/sortable` for accessible drag and drop.

---

## 🐛 4. Edge Case Handling & Validations

- **Empty / Whitespace Titles**: Input titles are sanitized with `sanitizeTitle()`. Whitespace-only submissions are blocked with instant visual user feedback.
- **Unique IDs**: Automatically generated via timestamp + random alphanumeric string to prevent key collision bugs in mapped lists.
- **Corrupted LocalStorage**: `useLocalStorage` catches JSON parse errors safely and restores initial fallback tasks.
