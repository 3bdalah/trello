/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment/moment";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { TokenContext } from "../../Context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
export default function CardTask({
  task,
  formattedDeadline,

  getAllCreatedTasks,
}) {
  const { token } = useContext(TokenContext);
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const notifySuccess = (message) => {
    toast.success(message);
  };
  const handleTogglePop = () => {
    setOpen(!open);
  };
  const [, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleEditeTask = async (values) => {
    try {
      let { data } = await axios.put(
        "https://trello-backend-tlg1.onrender.com/updatetask",
        { id: task._id, ...values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      notifySuccess(`Task Successed edit`);
      setOpen(!open);
      console.log("respone to update task ", data);
      getAllCreatedTasks();
    } catch (error) {
      console.log("error to update", error);
      console.log("token", token);
    }
  };

  const handleRemoveTask = async () => {
    try {
      let { data } = await axios.delete(
        `https://trello-backend-tlg1.onrender.com/deletetask/${task._id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      notifySuccess(`Task Removed`);
      // setOpen(!open);
      console.log("respone to update task ", data);
      getAllCreatedTasks();
    } catch (error) {
      console.log("error to remove", error);
    }
  };

  const handleGetAllEmployee = async () => {
    try {
      let { data } = await axios.get(
        "https://trello-backend-tlg1.onrender.com/getAllUsers",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setEmployees(data.users);
    } catch (error) {
      console.log("errors get all users", error);
    }
  };
  const validationSchema = Yup.object({
    // id: Yup.string().required("ID REquired"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status task is required"),
    // // creatorID: Yup.string().required("Your ID is required"),
    assignedTo: Yup.string().required(
      "You should assign the task to an employee"
    ),
    deadline: Yup.string()
      .matches(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "Invalid date format, please use yyyy-mm-dd format"
      )
      .required("Deadline is required and should be a valid date"),
  });

  // const id = task._id;
  let formik = useFormik({
    initialValues: {
      // id: id,
      title: task.title,
      status: task.status,
      description: task.description,
      deadline: moment(task.deadline).format("YYYY-MM-DD"),
      assignedTo: task.assignedTo._id,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // handleSendPost(values);
      handleEditeTask(values);
      resetForm();
    },
  });
  useEffect(() => {
    // setOpen(!open);
    handleGetAllEmployee();
  }, [employees]);
  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-blue-200  z-40 fixed top-0 left-0 flex content-center justify-center items-center">
          {/* <div className="w-screen h-screen bg-gray-600 opacity-5 "></div> */}
          <div className="flex justify-center content-center z-30 w-3/4 opacity-100 bg-slate-100  px-10  h-3/4 border-t-8 border-blue-800  rounded-md fixed top-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-start  mt-4">
                <label
                  htmlFor="title"
                  className="text-gray-500 capitalize mb-2"
                >
                  title Task:
                </label>
                <input
                  className="bg-white p-2 w-96 opacity-100 border-1 border-gray-300 rounded-md text-gray-700 capitalize"
                  type="text"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title ? (
                  <div className="alert alert-danger">
                    {formik.errors.title}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col items-start mt-4">
                <label
                  htmlFor="title"
                  className="text-gray-500 capitalize mb-2"
                >
                  description task:
                </label>

                <textarea
                  className="bg-white p-2 w-96 opacity-100 border-1 border-gray-300 rounded-md text-gray-700 capitalize"
                  type="textarea"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                ></textarea>
                {formik.errors.description && formik.touched.description ? (
                  <div className="alert alert-danger">
                    {formik.errors.description}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col items-start mt-4">
                <label
                  htmlFor="deadline"
                  className="text-gray-500 capitalize mb-2"
                >
                  Deadline
                </label>
                <input
                  className="bg-white p-2 w-96 opacity-100 border-1 border-gray-300 rounded-md text-gray-700 capitalize"
                  type="date"
                  name="deadline"
                  // defaultValue={moment(task.deadline).format("YYYY-MM-DD")}
                  onChange={formik.handleChange}
                  // value={formik.values.deadline}

                  value={moment(task.deadline).format("YYYY-MM-DD")}
                />
                {formik.errors.deadline && formik.touched.deadline ? (
                  <div className="alert alert-danger">
                    {formik.errors.deadline}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col items-start mt-4">
                <label htmlFor="assignedTo">Assigned To</label>
                <select
                  name="assignedTo"
                  defaultValue={
                    formik.values.assignedTo && formik.values.assignedTo._id
                      ? formik.values.assignedTo._id
                      : ""
                  }
                  onChange={formik.handleChange}
                  className="bg-white p-2 w-96 opacity-100"
                >
                  {task.assignedTo ? (
                    <option value={task.assignedTo._id}>
                      {task.assignedTo.email}
                    </option>
                  ) : (
                    <option value="">No Employee Assigned</option>
                  )}
                  {employees.map((emp, index) => (
                    <option key={index} value={emp._id}>
                      {emp.email}
                    </option>
                  ))}
                </select>

                {formik.errors.assignedTo && formik.touched.assignedTo ? (
                  <div className="alert alert-danger">
                    {formik.errors.assignedTo}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-row  justify-around content-center mt-3">
                <button
                  disabled={!formik.dirty}
                  type="submit"
                  className="btn btn-primary w-44 text-2xl "
                >
                  save
                </button>
                <button
                  onClick={() => handleTogglePop(!open)}
                  className="w-44 h-10 bg-red-700 text-white  rounded-md "
                >
                  close{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster />
      <div
        ref={drag}
        // onClick={handleTogglePop}
        className="z-1 card-task bg-white m-2 rounded-md px-3 py-1 border-1 border-solid hover:shadow-md transition duration-300 ease-linear cursor-pointer relative"
        key={task._id}
      >
        <span className="text-gray-500 font-mono text-md">
          To: {task.assignedTo ? task.assignedTo.email : "No Email Available"}
        </span>
        <br />
        <h5 className="font-mono text-gray-600 capitalize text-sm font-bold ">
          Title: {task.title}
        </h5>

        <p className="text-gray-500 font-meduim first-letter:capitalize my-0">
          {task.description}
        </p>
        <p className="m-0 text-gray-400 mt-1">
          <i className="fa fa-clock"></i> {formattedDeadline}
        </p>
        <div className="w-full flex items-center justify-around content-center mb-2">
          <button
            onClick={handleTogglePop}
            className="bg-white border-1 rounded-md  w-full px-3 py-1 mt-3 text-sm capitalize text-gray-600 border-gray-300 "
          >
            edite
          </button>
          <button
            onClick={handleRemoveTask}
            className="bg-white border-1 rounded-md  w-full ml-2 px-3 py-1 mt-3 text-sm capitalize text-gray-600 border-gray-300 "
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
}
