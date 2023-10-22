/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import { useDrag } from "react-dnd";
export default function CardTask({ task, formattedDeadline }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log("dragging ? ", isDragging);
  return (
    <>
      <div
        ref={drag}
        className="card-task  bg-slate-50 m-2 rounded-md p-2 border-1 border-dashed hover:shadow-md transition duration-300 ease-linear cursor-pointer relative"
        key={task._id}
      >
        {task.assignedTo ? task.assignedTo.email : "No Email Available"}
        <br />
        <h5 className="font-mono text-gray-700 capitalize  ">{task.title}</h5>

        <p className="text-gray-500 font-meduim first-letter:capitalize">
          {task.description}
        </p>
        <p className="">
          <i className="fa fa-clock"></i> {formattedDeadline}
        </p>
      </div>
    </>
  );
}
