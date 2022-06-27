import { Component } from "react";
import Task from "../task";

export default class TaskList extends Component {
  render() {
    const {
      todos,
      onDelite,
      onComplite,
      onEdit,
      inputHandler,
      editSubmit,
      filter,
    } = this.props;

    function filterTasks(tasks, filter) {
      switch (filter) {
        case "active":
          return tasks.filter((task) => task.taskState === "");
        case "completed":
          return tasks.filter((task) => task.taskState === "completed");
        default:
          return tasks;
      }
    }

    const tasks = filterTasks(todos, filter).map((todo) => {
      return (
        <Task
          {...todo}
          onDelite={onDelite}
          onComplite={onComplite}
          onEdit={onEdit}
          inputHandler={inputHandler}
          editSubmit={editSubmit}
          key={todo.id}
        />
      );
    });

    return <ul className="todo-list">{tasks} </ul>;
  }
}
