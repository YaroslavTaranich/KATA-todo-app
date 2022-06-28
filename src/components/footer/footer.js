import PropTypes from 'prop-types'

import TaskFilter from '../taskFilter'

export default function Footer({ filter, onFilterSelect, clearCompleted, itemsLeft }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter filter={filter} onFilterSelect={onFilterSelect} />
      <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  clearCompleted: () => {},
  itemsLeft: 0,
}

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  itemsLeft: PropTypes.number,
}
