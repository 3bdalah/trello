import { useSelector, useDispatch } from "react-redux";
import { getAllMyTasks } from "../../Redux/TasksSlice";
import { useEffect, useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ColumnTask from "../ColumnTask/ColumnTask";

function MyTasks() {
  const defaultColumns = [
    { title: "To Do", status: "toDo", tasks: [] },
    { title: "Doing", status: "doing", tasks: [] },
    { title: "Done", status: "done", tasks: [] },
  ];
  //   const [status, setStatus] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [columns, setColumns] = useState([...defaultColumns]);
  const dispatch = useDispatch();

  let tasks = useSelector((state) => state.tasksRed.tasksAssignedMe);

  useEffect(() => {
    dispatch(getAllMyTasks());
  }, [dispatch]);

  const updateTasks = useCallback((id, newStatus) => {
    setCreatedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  useEffect(() => {
    if (
      tasks.allTasksAssignedToUser &&
      tasks.allTasksAssignedToUser.length > 0
    ) {
      setCreatedTasks(tasks.allTasksAssignedToUser);
    }
  }, [tasks.allTasksAssignedToUser]);

  useEffect(() => {
    const toDo = createdTasks.filter((task) => task.status === "toDo");
    const doing = createdTasks.filter((task) => task.status === "doing");
    const done = createdTasks.filter((task) => task.status === "done");

    setColumns([
      { title: "To Do", status: "toDo", tasks: toDo },
      { title: "Doing", status: "doing", tasks: doing },
      { title: "Done", status: "done", tasks: done },
    ]);
  }, [createdTasks]);

  const handleAddColumn = () => {
    const newColumn = {
      title: "New Column",
      tasks: [],
      status: "new",
    };
    setColumns([...columns, newColumn]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-start justify-center">
        {columns.map((column, index) => (
          <ColumnTask
            key={index}
            tasks={column.tasks}
            status={column.status}
            updateTasks={updateTasks}
          />
        ))}
      </div>
      <button onClick={handleAddColumn}>Add Column</button>
    </DndProvider>
  );
}

export default MyTasks;
