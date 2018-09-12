import * as SymbolTree from "symbol-tree";

export enum StatusMessage {
  todo = "ToDo",
  in_progress = "In Progress",
  done = "Done"
}

class TaskEntity {
  public name: string;
  public status: { display: StatusMessage };
  public workflow: any;

  constructor(name: string) {
    this.name = name.slice(0, 29);

    this.workflow = new SymbolTree();

    const todo = { display: StatusMessage.todo };
    const in_progress = { display: StatusMessage.in_progress };
    const done = { display: StatusMessage.done };

    this.workflow.insertBefore(in_progress, todo);
    this.workflow.insertAfter(in_progress, done);
    this.status = todo;
  }
  makeProgress() {
    this.status = this.workflow.nextSibling(this.status);
  }
  moveBackwards() {
    const previous = this.workflow.previousSibling(this.status);
    // should not go back to todo from in progress
    this.status =
      previous.display === StatusMessage.todo ? this.status : previous;
  }
  startProgress() {
    this.makeProgress();
  }
  finish() {
    this.makeProgress();
  }
}
export default TaskEntity;
