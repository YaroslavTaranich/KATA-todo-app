import PropTypes from 'prop-types'
import { Component } from 'react'

import Task from '../task'

export default class TaskList extends Component {
  render() {
    const { todos, onDelite, onComplite, onEdit, inputHandler, editSubmit, filter } = this.props

    function filterTasks(tasks, taskFilter) {
      switch (taskFilter) {
        case 'active':
          return tasks.filter((task) => task.taskState === '')
        case 'completed':
          return tasks.filter((task) => task.taskState === 'completed')
        default:
          return tasks
      }
    }

    const tasks = filterTasks(todos, filter).map((todo) => (
      <Task
        {...todo}
        onDelite={onDelite}
        onComplite={onComplite}
        onEdit={onEdit}
        inputHandler={inputHandler}
        editSubmit={editSubmit}
        key={todo.id}
      />
    ))

    return <ul className="todo-list">{tasks} </ul>
  }
}

TaskList.defaultProps = {
  filter: 'all',
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))).isRequired,
  filter: PropTypes.string,
}
