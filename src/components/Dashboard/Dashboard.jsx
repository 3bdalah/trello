import { calculateTimeRemaining } from "../../Utils/Consts";
import { handleGetAllEmployee } from "../../Redux/EmployeesSlice";
import { getAllMyTasksCreated, getAllMyTasks } from "../../Redux/TasksSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Dashboard() {
  let { allEmployees, counterEmployees } = useSelector(
    (state) => state.employeesRed
  );
  let myTasksAssignMe = useSelector(
    (state) => state.tasksRed.tasksAssignedMe.allTasksAssignedToUser
  );
  let createdTasksLength = useSelector(
    (state) => state.tasksRed.createdTasksLength
  );

  console.log("data from employees redux ", allEmployees);
  console.log("data from employees redux myTasksAssignMe", myTasksAssignMe);
  console.log(
    "data from counter tasks createdTasksLength ",
    createdTasksLength,
    "assignendTasksLength"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetAllEmployee());
    dispatch(getAllMyTasks());
    dispatch(getAllMyTasksCreated());
  }, [dispatch]);
  const tasksData = [
    { text: "tasks done", num: counterEmployees, color: "bg-blue-300" },
    { text: "tasks doing", num: 0, color: "bg-yellow-300" },
    { text: "all employees ", num: counterEmployees, color: "bg-green-300" },
    {
      text: "all tasks",
       num: myTasksAssignMe && myTasksAssignMe.length + createdTasksLength,
      color: "bg-red-400",
    },
  ];

  return (
    <>
      <div className=" min-h-screen  bg-white p-3 mt-10">
        <div className="container">
          <div className="flex flex-row ">
            {tasksData.map((dataCard, index) => {
              return (
                <>
                  <div
                    className={`w-full h-52 flex flex-col items-center justify-center
                      text-center  p-2 rounded-md hover:shadow-md ${dataCard.color} text-gray-800 font-semibold m-1 first-letter:capitalize lowercase`}
                    key={index}
                  >
                    <span className="text-3xl capitalize">{dataCard.text}</span>
                    <span className="mt-3 text-2xl ">{dataCard.num}</span>
                  </div>
                </>
              );
            })}
          </div>
          {/* all tasks assignd to me  */}
          <section className="section mt-5">
            <h2> History All tasks Assigned to me </h2>
            <div className="flex text-center capitalize tasks mt-2 justify-between text-gray-500">
              <span className="w-1/6 border-1 rounded-md border-gray-200 p-2 m-0.5">
                number
              </span>
              <span className="w-2/6 border-1 rounded-md border-gray-200 p-2 m-0.5">
                email Creator
              </span>
              <span className="w-1/6 border-1 rounded-md border-gray-200 p-2 m-0.5">
                status
              </span>
              <span className="w-2/6 border-1 rounded-md border-gray-200 p-2 m-0.5">
                title
              </span>
              <span className="w-2/6 border-1 rounded-md border-gray-200 p-2 m-0.5">
                time remaining
              </span>
              <span className="w-1/6 border-1 rounded-md border-gray-200 p-2 m-0.5">
                defaculty Task
              </span>
            </div>
            {myTasksAssignMe &&
              myTasksAssignMe.map((task, index) => {
                return (
                  <div
                    key={index}
                    className="flex text-center capitalize tasks mt-2 justify-between text-gray-500 border-1 border-gray-200"
                  >
                    <span className="w-1/6  rounded-md p-2 m-0.5 ">
                      <span className="bg-gray-50 py-1 px-2 rounded-md">
                        {" "}
                        {++index}
                      </span>
                    </span>
                    <span className="w-2/6  rounded-md border-gray-100 p-2 m-0.5">
                      {task.creatorID.email}
                    </span>
                    <span className="w-1/6  rounded-md border-gray-100 p-2 m-0.5">
                      {task.status === "toDo" ? (
                        <span className="bg-yellow-400 p-1 px-3 rounded-md text-gray-700 font-mono">
                          {task.status}
                        </span>
                      ) : task.status === "done" ? (
                        <span className="bg-green-400 p-1 px-3 rounded-md text-gray-700 font-mono">
                          {task.status}
                        </span>
                      ) : (
                        <span className="bg-blue-400 p-1 px-3 rounded-md text-gray-700 font-mono">
                          {task.status}
                        </span>
                      )}
                    </span>
                    <span className="w-2/6  rounded-md border-gray-100 p-2 m-0.5">
                      {task.title}
                    </span>
                    <span className="w-2/6  rounded-md border-gray-100 p-2 m-0.5">
                      {calculateTimeRemaining(task.deadline)}
                    </span>
                    <span className="w-1/6  rounded-md border-gray-100 p-2 m-0.5">
                      Easy
                    </span>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </>
  );
}
