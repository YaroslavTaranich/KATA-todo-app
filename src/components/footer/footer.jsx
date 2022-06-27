import TaskFilter from "../taskFilter";

import PropTypes from "prop-types";

export default function Footer({
  filter,
  onFilterSelect,
  clearCompleted,
  itemsLeft,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter filter={filter} onFilterSelect={onFilterSelect} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  itemsLeft: 0,
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  itemsLeft: PropTypes.number,
};
