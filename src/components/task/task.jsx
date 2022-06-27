import { Component } from "react";

import PropTypes from "prop-types";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default class Task extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    taskState: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    onDelite: PropTypes.func.isRequired,
    onComplite: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    inputHandler: PropTypes.func.isRequired,
    editSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      id,
      taskState,
      description,
      created,
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
            <span className="created">
              created {formatDistanceToNow(created)}
            </span>
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
