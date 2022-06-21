export default function Task({ state, description }) {
  return (
    <li className={state}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit" type="button" />
        <button className="icon icon-destroy" type="button" />
      </div>
      {state === "editing" ? (
        <input type="text" class="edit" value="Editing task" />
      ) : (
        ""
      )}
    </li>
  );
}
