import * as React from "react";
import { render } from "react-dom";
import Task from "./Task";
import TaskEntity, { StatusMessage } from "./Business_Logic_Model/TaskEntity";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const columns = {
  display: "grid",
  gridTemplateRows: "auto",
  gridTemplateColumns: "1fr 1fr 1fr"
};

class App extends React.Component<
  {},
  { tasks: TaskEntity[]; update: boolean; newTaskName: string }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [new TaskEntity(`Task 1`)],
      update: false,
      newTaskName: ``
    };
    this.updateFromModel = this.updateFromModel.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleSubmitNewTask = this.handleSubmitNewTask.bind(this);
  }
  updateFromModel() {
    this.setState({ update: !this.state.update });
  }
  displayType(statusMessage: StatusMessage, icon: string) {
    return this.state.tasks
      .filter(task => task.status.display === statusMessage)
      .map((task, i) => (
        <Task update={() => this.updateFromModel()} TaskEntity={task} key={task.name + i}/>
      ));
  }

  handleTaskNameChange(event) {
    this.setState({ newTaskName: event.target.value });
  }

  handleSubmitNewTask(event) {
    event.preventDefault();
    this.setState({
      tasks: [...this.state.tasks, new TaskEntity(this.state.newTaskName)],
      newTaskName: ""
    });
  }

  render() {
    return (
      <div style={styles}>
        <h1>
          {"\u2728"} Kanban Demo {"\u2728"}
        </h1>
        <div>
          <form onSubmit={this.handleSubmitNewTask}>
            <label>
              Add Task:
              <input
                type="text"
                value={this.state.newTaskName}
                placeholder="new Task Title goes here"
                onChange={this.handleTaskNameChange}
                maxLength={30}
                minLength={1}
              />
            </label>
            <input type="submit" value="Add Task" />
          </form>
        </div>
        <div style={columns}>
          <div>
            <h2 style={{ backgroundColor: "yellow" }}>ToDo</h2>
            {this.displayType(StatusMessage.todo)}
          </div>
          <div>
            <h2 style={{ backgroundColor: "pink" }}>In Progress</h2>
            {this.displayType(StatusMessage.in_progress)}
          </div>
          <div>
            <h2 style={{ backgroundColor: "lightblue" }}>Done</h2>
            {this.displayType(StatusMessage.done)}
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
