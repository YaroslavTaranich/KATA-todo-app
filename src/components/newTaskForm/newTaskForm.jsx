import { Component } from "react";

import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  static propTypes = {
    addTask: PropTypes.func,
  };

  state = {
    inputValue: "",
  };

  submitHandler = (e) => {
    const { addTask } = this.props;
    e.preventDefault();
    addTask(this.state.inputValue);
    this.setState(() => ({
      inputValue: "",
    }));
  };

  inputHandler = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.inputValue}
          onChange={(e) => this.inputHandler(e.target.value)}
        />
      </form>
    );
  }
}
