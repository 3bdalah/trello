/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useDrop } from "react-dnd";
import { formatDate } from "../../Utils/Consts";
import CardTask from "../CardTask/CardTask";
import axios from "axios";
import { Link } from "react-router-dom";
function ColumnTask({ tasks, status, updateTasks, getAllCreatedTasks }) {
  const filteredTasks = tasks.filter((task) => task.status === status);

  // eslint-disable-next-line no-unused-vars
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToAnotherCol(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addItemToAnotherCol = async (id) => {
    try {
      let { data } = await axios.put(
        "https://trello-backend-tlg1.onrender.com/updatetask",
        {
          id,
          status: status,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("respone to update task ", data);
      updateTasks(id, status);
    } catch (error) {
      console.log("error to update", error);
    }
  };

  if (tasks.length === 0) {
    return (
      <div
        ref={drop}
        className=" bg-slate-50 p-2 border-1 border-gray-300 w-1/4 m-2 border-dashed rounded-sm h-44"
      >
        <div className="head-col flex justify-between items-center content-center">
          <h3 className="m-2 font-thin capitalize text-gray-600">{status}</h3>
          <span
            className={`bg-${
              status === "toDo"
                ? "orange"
                : status === "done"
                ? "green"
                : "blue"
            }-400 text-white shadow-sm border-dashed border-1 h-fit px-2 py-0 rounded-full`}
          >
            0
          </span>
        </div>
        {status === "toDo" && (
          <p className="text-gray-400 text-center">
            No tasks found. Start by creating a new task!
          </p>
        )}
        {status === "done" && (
          <p className="text-gray-400 text-center">
            No tasks found. Start by creating a new task!
          </p>
        )}
        {status === "doing" && (
          <p className="text-gray-400 text-center">
            No tasks found. Start by creating a new task!
          </p>
        )}
        {status != "remove" ? (
          <button className="my-2 w-full text-center bg-blue-100 h-10 leading-loose cursor-pointer font-semibold text-gray-800 capitalize rounded-md">
            <Link
              to="/add-task"
              className="text-gray-700 no-underline font-mono"
            >
              {" "}
              create Task
            </Link>
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
  return (
    <>
      <div
        ref={drop}
        className=" bg-slate-50 p-2  w-1/4 m-2 border-dashed  rounded-sm"
      >
        <div className="head-col flex justify-between items-center content-center   ">
          <h3 className="m-2 font-thin text-xl text-gray-600 lowercase">
            {status}
          </h3>
          {status === "toDo" && (
            <span className="bg-orange-300 text-white shadow-sm border-dashed border-1  h-fit px-2 py-0 rounded-full ">
              {tasks.length}
            </span>
          )}
          {status === "done" && (
            <span className="bg-green-300 text-white shadow-sm border-dashed border-1  h-fit px-2 py-0 rounded-full ">
              {tasks.length}
            </span>
          )}
          {status === "doing" && (
            <span className="bg-blue-300  text-white shadow-sm border-dashed border-1 h-fit px-2 py-0 rounded-full ">
              {tasks.length}
            </span>
          )}
        </div>
        <div
          className={tasks.length > 3 ? "overflow-y-scroll  h-screen" : "h-fit"}
        >
          {filteredTasks.map((task) => {
            const formattedDeadline = formatDate(task.deadline);

            return (
              <CardTask
                key={task._id}
                task={task}
                formattedDeadline={formattedDeadline}
                getAllCreatedTasks={getAllCreatedTasks}
              />
            );
          })}
        </div>
        {status != "remove" ? (
          <button className="my-2  w-full text-center bg-blue-100 h-10 leading-loose cursor-pointer font-semibold text-gray-800 capitalize rounded-md">
            <Link
              to="/add-task"
              className="text-gray-700 no-underline font-mono"
            >
              {" "}
              create Task
            </Link>
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ColumnTask;
