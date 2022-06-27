export default function TaskFilter({ filter, onFilterSelect }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === "all" ? "selected" : ""}
          onClick={() => onFilterSelect("all")}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === "active" ? "selected" : ""}
          onClick={() => onFilterSelect("active")}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === "completed" ? "selected" : ""}
          onClick={() => onFilterSelect("completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
