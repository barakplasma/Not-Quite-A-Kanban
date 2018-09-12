import SymbolTree from 'symbol-tree';

export enum StatusMessage {
  todo = 'ToDo',
  in_progress = 'In Progress',
  done = 'Done'
}

class TaskEntity {
  public name: string;
  public status: { display: StatusMessage };
  public workflow: SymbolTree;

  constructor(name: string) {
    this.name = name.slice(0, 29);

    this.workflow = new SymbolTree();

    const todo = { display: StatusMessage.todo };
    const inProgress = { display: StatusMessage.in_progress };
    const done = { display: StatusMessage.done };

    this.workflow.insertBefore(inProgress, todo);
    this.workflow.insertAfter(inProgress, done);
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
export interface InterfaceForTaskEntityBusinessLogic {
  name: string;
  status: { display: StatusMessage };
  workflow: SymbolTree;
  makeProgress(): void;
  moveBackwards(): void;
  startProgress(): void;
  finish(): void;
}

export default TaskEntity;
