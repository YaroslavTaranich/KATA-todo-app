import TaskFilter from "../taskFilter";

export default function Footer() {
  return (
    <footer class="footer">
      <span class="todo-count">1 items left</span>
      <TaskFilter />
      <button class="clear-completed">Clear completed</button>
    </footer>
  );
}
