import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function Task({
  id,
  taskState,
  description,
  created,
  onDelite,
  onComplite,
  onEdit,
  inputHandler,
  editSubmit,
}) {
  const onSubmitHandler = (e) => {
    e.preventDefault()
    editSubmit(id)
  }

  const taskInput =
    taskState === 'editing' ? (
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input type="text" className="edit" value={description} onChange={(e) => inputHandler(id, e.target.value)} />
      </form>
    ) : (
      ''
    )

  const htmlLabel = `task-${id}`

  return (
    <li className={taskState}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={taskState === 'completed'}
          onChange={() => onComplite(id)}
          id={htmlLabel}
        />
        <label htmlFor={htmlLabel}>
          <span className="description">{description}</span>
          <span className="created">created {formatDistanceToNow(created)}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdit(id)} type="button" aria-label="edit" />
        <button className="icon icon-destroy" onClick={() => onDelite(id)} type="button" aria-label="delite" />
      </div>
      {taskInput}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  taskState: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  onDelite: PropTypes.func.isRequired,
  onComplite: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  editSubmit: PropTypes.func.isRequired,
}
