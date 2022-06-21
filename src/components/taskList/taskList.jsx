import Task from "../task";

export default function TaskList({ todos }) {
  const tasks = todos.map((todo) => {
    return <Task {...todo} />;
  });

  return <ul className="todo-list">{tasks}</ul>;
}
