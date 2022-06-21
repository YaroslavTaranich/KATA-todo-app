import Footer from "../footer";
import NewTaskForm from "../newTaskForm";
import TaskList from "../taskList";

export default function App() {
  const todos = [
    { state: "completed", description: "Completed task" },
    { state: "editing", description: "Editing task" },
    { state: "", description: "Active task" },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todos} />
        <Footer />
      </section>
    </section>
  );
}
