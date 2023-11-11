/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDataUser } from "../../Redux/UserSlice";

export default function EmployeeCard(employee) {
  console.log("employee", employee.employee);
  const { userName, createdTasks, assignedTasks, email } = employee.employee;
  //   const user = useSelector((state) => state.userRed.user);
  //   if (createdTasks.length === 0) {
  //   console.log("created tasks", createdTasks);
  //   }
  //   if (assignedTasks.length === 0) {
  //   console.log("assigned tasks", assignedTasks);
  //   }
  const dispatch = useDispatch();
  //   const [dataProfile, setDataProfile] = useState({});
  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);

  return (
    <>
      <div className="card-employee sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 w-full my-2 p-1">
        <div className="avatar-emp w-full border rounded-md border-gray-500 transition duration-200 hover:shadow-sm bg-slate-50">
          <div className="group-head-menu flex items-center content-center  bg-slate-100 ">
            <div className="m-2 h-10 w-10 rounded-md capitalize  font-mono text-2xl bg-blue-400 flex items-center justify-center text-white border-1 border-white ">
              {userName && userName ? userName.substring(0, 1) : " "}
            </div>
            <p className="flex flex-col text-sm  mt-3 text-gray-500 ">
              <span className="font-bold capitalize text-sm ">{userName}</span>

              <span className=" lowercase text-sm">{email}</span>
            </p>
          </div>

          <hr className=" border-slate-300 w-5/6 mx-auto "></hr>

          <div className="flex flex-col items-start capitalize p-1">
            <span className="w-full text-gray-500 font-mono  flex flex-row justify-between content-center items-center ">
              <span>tasks assigned </span>
              <span className="mr-4">
                {assignedTasks && assignedTasks ? assignedTasks.length : "0"}
              </span>
            </span>
            <span className="w-full text-gray-500 font-mono  flex flex-row justify-between content-center items-center ">
              <span>tasks Created </span>
              <span className="mr-4">
                {createdTasks && createdTasks ? createdTasks.length : "0"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
