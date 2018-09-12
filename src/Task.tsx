import * as React from "react";
import TaskEntity, { StatusMessage } from "./Business_Logic_Model/TaskEntity";

interface Props {
  TaskEntity: { display: StatusMessage; workflow: any };
  update: () => void;
}

const boxSideSize = "1fr";
const taskStyle: React.CSSProperties = {
  width: boxSideSize,
  height: boxSideSize,
  margin: "1rem",
  paddingBottom: `1rem`
};

export default ({ TaskEntity, update }: Props) => {
  const previous = TaskEntity.workflow.previousSibling(TaskEntity.status);
  const next = TaskEntity.workflow.nextSibling(TaskEntity.status);
  let color = "5px solid color";
  switch (TaskEntity.status.display) {
    case StatusMessage.in_progress:
      color = color.replace(`color`, `pink`);
      break;
    case StatusMessage.done:
      color = color.replace(`color`, `lightblue`);
      break;
    default:
      color = color.replace(`color`, `yellow`);
      break;
  }
  return (
    <div style={{ ...taskStyle, border: color }}>
      <h3>Task Title: {TaskEntity.name}</h3>
      <h4>Task Status: {TaskEntity.status.display}</h4>
      <button
        hidden={previous === null || previous.display === StatusMessage.todo}
        onClick={() => {
          TaskEntity.moveBackwards();
          update();
        }}
      >
        {previous && previous.display !== StatusMessage.todo
          ? `to ${previous.display} ⏮`
          : "disabled"}
      </button>
      <button
        hidden={next === null}
        onClick={() => {
          TaskEntity.makeProgress();
          update();
        }}
      >
        {next ? `to ${next.display} ⏭` : "disabled"}
      </button>
    </div>
  );
};
