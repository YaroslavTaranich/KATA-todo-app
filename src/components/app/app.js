import { Component } from 'react'

import Footer from '../footer'
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'

export default class App extends Component {
  constructor() {
    super()

    this.taskId = 0

    this.createTask = (description, taskState = '', min = 0, sec = 0) => {
      this.taskId += 1
      return {
        id: this.taskId,
        taskState,
        description,
        created: Date.now(),
        time: {
          min,
          sec,
        },
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

    this.addTask = (description, min, sec) => {
      this.setState(({ todos }) => ({
        todos: [...todos, this.createTask(description, '', min, sec)],
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

    this.timerUpdate = (id) => {
      this.setState(({ todos }) => {
        const {
          time: { min, sec },
        } = todos.find((todo) => todo.id === id)
        const newTime = { min, sec }
        if (sec === 59) {
          newTime.min = min + 1
          newTime.sec = 0
        } else {
          newTime.sec += 1
        }
        return {
          todos: todos.map((todo) => {
            if (todo.id === id) return { ...todo, time: newTime }
            return todo
          }),
        }
      })
    }
  }

  render() {
    const { todos, taskFilter } = this.state

    // this.timerUpdate(2)

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
            timerUpdate={this.timerUpdate}
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
