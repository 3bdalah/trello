import { useSelector, useDispatch } from "react-redux";
import { getAllMyTasks } from "../../Redux/TasksSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
export default function Notifications() {
  let tasks = useSelector(
    (state) => state.tasksRed.tasksAssignedMe.allTasksAssignedToUser
  );
  const dispatch = useDispatch();
  console.log("my tasks to notications", tasks);

  useEffect(() => {
    dispatch(getAllMyTasks());
  }, [dispatch]);
  return (
    <>
      <section className="min-h-sceen bg-blue-50 pb-5 pt-3">
        <div className="list-notifications  flex justify-center items-center flex-col content-center">
          {tasks &&
            tasks.map((task, index) => {
              return (
                <Link
                  to="/my-tasks"
                  className="bg-white w-96  h-full p-3  no-underline m-1  rounded-md border-1 hover:shadow-md transition duration-200 ease-linear cursor-pointer border-dashed border-gray-200  "
                  key={index}
                >
                  <div className=" flex items-center content-center ">
                    <span className=" h-10 w-10 rounded-full mr-3 capitalize bg-blue-400 flex items-center justify-center text-white border-1 border-gray-100 shadow-sm">
                      {task.creatorID.userName
                        ? task.creatorID.userName.substring(0, 1)
                        : ""}
                    </span>

                    <span className="text-md  text-gray-700 font-mono capitalize ">
                      {task.creatorID.userName} Assigned you
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm ml-12 mb-2 block">
                    {task.title}
                  </span>
                  <div className="text-gray-400 text-sm ml-1 ">
                    {moment(task.createdAt).fromNow()}
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
}
