// import UnderProgress from "../UnderProgress/UnderProgress";

import { useEffect } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllEmployee } from "./../../Redux/EmployeesSlice";
import { useState } from "react";

export default function EmployeeList() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  let { allEmployees } = useSelector((state) => state.employeesRed);
  console.log("all employees state ", allEmployees);
  useEffect(() => {
    dispatch(handleGetAllEmployee());
  }, [dispatch]);
  // Filter employees based on the search term
  const filteredEmployees = allEmployees.filter((employee) =>
    employee.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container min-h-screen">
        <h2 className="text-gray-500 text-center font-mono my-10">
          {" "}
          All Employees
        </h2>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded-md w-full lg:w-1/3  md:w-2/4  sm:w-4/4 outline-none"
        />
        <div className="flex flex-wrap pb-10 min-h-full">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <EmployeeCard key={index} employee={employee} />
            ))
          ) : (
            <div className="text-center m-auto font-mono text-2xl text-gray-500">
              Not Found User
            </div>
          )}
        </div>
      </div>
    </>
  );
}
