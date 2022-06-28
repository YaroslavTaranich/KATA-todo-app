import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
    this.inputHandler = (value) => {
      this.setState({
        inputValue: value,
      })
    }
    this.submitHandler = (e) => {
      const { addTask } = this.props
      const { inputValue } = this.state
      e.preventDefault()
      addTask(inputValue)
      this.setState(() => ({
        inputValue: '',
      }))
    }
  }

  render() {
    const { inputValue } = this.state

    return (
      <form onSubmit={this.submitHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => this.inputHandler(e.target.value)}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}
