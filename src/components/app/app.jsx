import { Component } from "react";
import Footer from "../footer";
import NewTaskForm from "../newTaskForm";
import TaskList from "../taskList";

export default class App extends Component {
  taskId = 1;

  createTask = (description, taskState = "", id = this.taskId++) => {
    return {
      id,
      taskState,
      description,
      created: Date.now(),
    };
  };

  state = {
    todos: [
      this.createTask("Completed task", "completed"),
      this.createTask("Editing task", "editing"),
      this.createTask("Active task", ""),
    ],

    taskFilter: "all",
  };

  addTask = (description) => {
    this.setState(({ todos }) => {
      return {
        todos: [...todos, this.createTask(description)],
      };
    });
  };

  onComplite = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (id === todo.id) {
          todo.taskState = todo.taskState === "" ? "completed" : "";
        }
        return todo;
      }),
    }));
  };

  onDelite = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => todo.id !== id),
    }));
  };

  onEdit = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.taskState === "editing") todo.taskState = "";
        if (todo.id === id && todo.taskState !== "completed")
          todo.taskState = "editing";
        return todo;
      }),
    }));
  };

  editInputHandler = (id, value) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id === id) todo.description = value;
        return todo;
      }),
    }));
  };

  editSubmit = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id === id) todo.taskState = "";
        return todo;
      }),
    }));
  };

  onFilterSelect = (selectedFilter) => {
    this.setState({
      taskFilter: selectedFilter,
    });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => todo.taskState !== "completed"),
    }));
  };

  render() {
    const { todos, taskFilter } = this.state;

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
            itemsLeft={
              todos.filter((todo) => todo.taskState !== "completed").length
            }
          />
        </section>
      </section>
    );
  }
}
