import { useEffect, useState } from "react";
import axios from "axios";
import ColumnTask from "../ColumnTask/ColumnTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function CreatedTasks() {
  const [createdTasks, setCreatedTasks] = useState([]);
  const [toDoTasks, setToDo] = useState([]);
  const [doingTasks, setDoing] = useState([]);
  const [doneTasks, setDone] = useState([]);
  const [status, setStatus] = useState([]);
  const getAllCreatedTasks = async () => {
    try {
      let { data } = await axios.get(
        "https://trello-backend-tlg1.onrender.com/getaAllTasksForUser",
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNmMWFmODJiZTI0N2EwMzI5NDQzNiIsImlhdCI6MTY5NzkwMzE2Nn0.YCmU1HAIIEH-20ZMBVb90bgt8VOgPSD_ChjIjTjJ72M",
          },
        }
      );

      setCreatedTasks(data.allTasksWithUserData);
    } catch (error) {
      console.log("errors get all users", error);
    }
  };

  useEffect(() => {
    getAllCreatedTasks();
  }, []);
  useEffect(() => {
    // console.log("data get Created Tasks", data.allTasksWithUserData);
    if (createdTasks.length > 0) {
      const unique = [...new Set(createdTasks.map((task) => task.status))];
      setStatus(unique);
    }
    const toDo = createdTasks.filter((task) => task.status === "toDo");
    const doning = createdTasks.filter((task) => task.status === "doing");
    const done = createdTasks.filter((task) => task.status === "done");

    setToDo(toDo);
    setDoing(doning);
    setDone(done);
    console.log(toDoTasks, doingTasks, doneTasks, status);
  }, [createdTasks]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex items-start justify-center">
          <ColumnTask tasks={toDoTasks} status={"toDo"} key={"todo"} />
          <ColumnTask tasks={doingTasks} status={"doing"} key={"doing"} />
          <ColumnTask tasks={doneTasks} status={"done"} key={"done"} />
          {/* {status.length > 0 &&
            status.map((status) => {
              if (status === "toDo")
                return (
                  <ColumnTask tasks={toDoTasks} status={"toDo"} key={"todo"} />
                );
              if (status === "doing")
                return (
                  <ColumnTask
                    tasks={doingTasks}
                    status={"doing"}
                    key={"doing"}
                  />
                );
              if (status === "done")
                return (
                  <ColumnTask tasks={doneTasks} status={"done"} key={"done"} />
                );
            })} */}
        </div>
      </DndProvider>
    </>
  );
}

export default CreatedTasks;
