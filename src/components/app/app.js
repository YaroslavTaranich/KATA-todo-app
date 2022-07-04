import { Component } from 'react'

import Footer from '../footer'
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'

export default class App extends Component {
  constructor() {
    super()

    this.taskId = 1

    this.createTask = (description, taskState = '', id = this.taskId) => {
      this.taskId += 1
      return {
        id,
        taskState,

        description,
        created: Date.now(),
      }
    }

    this.state = {
      todos: [
        this.createTask('Completed task', 'completed'),
        this.createTask('Editing task', 'editing'),
        this.createTask('Active task', ''),
      ],
      taskFilter: 'all',
    }

    this.addTask = (description) => {
      this.setState(({ todos }) => ({
        todos: [...todos, this.createTask(description)],
      }))
    }

    this.onComplite = (id) => {
      this.setState(({ todos }) => ({
        todos: todos.map((todo) => {
          if (id === todo.id) {
            const taskState = todo.taskState === '' ? 'completed' : ''
            return { ...todo, taskState }
          }
          return todo
        }),
      }))
    }

    this.onDelite = (id) => {
      this.setState(({ todos }) => {
        const index = todos.findIndex((todo) => todo.id === id)
        return {
          todos: [...todos.slice(0, index), ...todos.slice(index + 1)],
        }
      })
    }

    this.onEdit = (id) => {
      this.setState(({ todos }) => ({
        todos: todos.map((todo) => {
          if (todo.taskState === 'editing') return { ...todo, taskState: '' }
          if (todo.id === id && todo.taskState !== 'completed') return { ...todo, taskState: 'editing' }
          return todo
        }),
      }))
    }

    this.editInputHandler = (id, value) => {
      this.setState(({ todos }) => ({
        todos: todos.map((todo) => {
          if (todo.id === id) return { ...todo, description: value }
          return todo
        }),
      }))
    }

    this.editSubmit = (id) => {
      this.setState(({ todos }) => ({
        todos: todos.map((todo) => {
          if (todo.id === id) return { ...todo, taskState: '' }
          return todo
        }),
      }))
    }

    this.onFilterSelect = (selectedFilter) => {
      this.setState({
        taskFilter: selectedFilter,
      })
    }

    this.clearCompleted = () => {
      this.setState(({ todos }) => ({
        todos: todos.filter((todo) => todo.taskState !== 'completed'),
      }))
    }
  }

  render() {
    const { todos, taskFilter } = this.state

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todos}
            onComplite={this.onComplite}
            onDelite={this.onDelite}
            onEdit={this.onEdit}
            inputHandler={this.editInputHandler}
            editSubmit={this.editSubmit}
            filter={taskFilter}
          />
          <Footer
            filter={taskFilter}
            onFilterSelect={this.onFilterSelect}
            clearCompleted={this.clearCompleted}
            itemsLeft={todos.filter((todo) => todo.taskState !== 'completed').length}
          />
        </section>
      </section>
    )
  }
}
