import { Component } from "react";

export default class Task extends Component {
  render() {
    const {
      id,
      taskState,
      description,
      onDelite,
      onComplite,
      onEdit,
      inputHandler,
      editSubmit,
    } = this.props;

    const onSubmitHandler = (e) => {
      e.preventDefault();
      console.log("submit");
      editSubmit(id);
    };

    const taskInput =
      taskState === "editing" ? (
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <input
            type="text"
            className="edit"
            value={description}
            onChange={(e) => inputHandler(id, e.target.value)}
          />
        </form>
      ) : (
        ""
      );

    return (
      <li className={taskState}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={taskState === "completed"}
            onChange={() => onComplite(id)}
            id={"task-" + id}
          />
          <label htmlFor={"task-" + id}>
            <span className="description">{description}</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={(e) => onEdit(id)}
            type="button"
          />
          <button
            className="icon icon-destroy"
            type="button"
            onClick={() => onDelite(id)}
          />
        </div>
        {taskInput}
      </li>
    );
  }
}
