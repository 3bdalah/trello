/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
export default function CardTask({
  task,
  formattedDeadline,

  getAllCreatedTasks,
}) {
  const location = useLocation();
  console.log("location", location.pathname);
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [openComments, setOpenComments] = useState(false);

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
      if (data.message === "Task updated successfully") {
        toast.success(`Task Successed edit`);
        setOpen(!open);
        getAllCreatedTasks();
      }
    } catch (error) {
      console.log("error to update", error);
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
      if (data.message === "Task deleted successfully") {
        toast.success(`Task Successed Removed`);
        getAllCreatedTasks();
      }
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
      console.log("data ");
      setEmployees(data.users);
    } catch (error) {
      console.log("errors get all users", error);
    }
  };

  const handleToggleComments = () => {
    setOpenComments(!openComments);
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status task is required"),
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

  console.log("tasks comments", task);
  let formik = useFormik({
    initialValues: {
      title: task.title,
      status: task.status,
      description: task.description,
      deadline: moment(task.deadline).format("YYYY-MM-DD"),
      assignedTo: task.assignedTo._id,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleEditeTask(values);
      resetForm();
    },
  });
  useEffect(() => {
    handleGetAllEmployee();
  }, []);

  {
    task.comments.length >= 2 ? console.log("body comment", task.comments) : "";
  }
  const handleSendComment = async (values) => {
    try {
      let { data } = await axios.post(
        "https://trello-backend-tlg1.onrender.com/addTaskComments",
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.message === "comment added successfully") {
        // notifySuccess();
        toast.success("comment added successfully");
        getAllCreatedTasks();
        handleToggleComments();
        // setOpenComments(false);
      }

      console.log("data response comment", data);
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const removeComment = async (id) => {
    let { data } = await axios.delete(
      `https://trello-backend-tlg1.onrender.com/deleteTaskComments/${id}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    if (data.message === "comment deleted successfully: ") {
      notifySuccess("comment deleted successfully");
      getAllCreatedTasks();
      handleToggleComments();
    }
    // console.log("data removee comment", data);
  };
  const validationCommentSchema = Yup.object({
    taskID: Yup.string(),
    text: Yup.string().required("Please provide text to comment"),
  });

  let formikComment = useFormik({
    initialValues: {
      taskID: task._id,
      text: "",
    },
    validationSchema: validationCommentSchema, // Fixed the name of the validation schema
    onSubmit: (values, { resetForm }) => {
      handleSendComment(values);
      resetForm();
    },
  });
  // useEffect(() => {
  //   setOpenComments(!openComments);
  // }, [openComments]);
  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-gray-900 bg-opacity-40  z-10 fixed top-0 left-0 flex content-center justify-center items-center">
          {/* <div className="w-screen h-screen bg-gray-600 opacity-5 "></div> */}
          <div className="flex justify-center content-center z-30 w-2/4 opacity-100 bg-slate-50  px-10  h-3/4 border-t-8 border-blue-500  rounded-md fixed top-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-start  mt-4">
                <label
                  htmlFor="title"
                  className="text-gray-500  lowercase mb-2 first-letter:capitalize"
                >
                  title task:
                </label>
                <input
                  className="bg-white  p-2 w-96 opacity-100 border-1 border-gray-300 rounded-md text-gray-500 text-sm capitalize"
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
              <div className="flex flex-col items-start mt-2">
                <label
                  htmlFor="title"
                  className="text-gray-500 lowercase mb-2 first-letter:capitalize"
                >
                  description task:
                </label>

                <textarea
                  className="bg-white p-2 w-96 opacity-100 border-1 border-gray-300 rounded-md text-gray-500  first-letter:capitalize"
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
              <div className="flex flex-col items-start mt-2">
                <label
                  htmlFor="deadline"
                  className="text-gray-500 capitalize mb-2"
                >
                  Deadline
                </label>
                <input
                  className="bg-white p-2 w-96 opacity-100 border-1 border-gray-300 rounded-md text-gray-500 capitalize"
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
                <label
                  htmlFor="assignedTo"
                  className="text-gray-500 first-letter:capitalize lowercase"
                >
                  Assigned To
                </label>
                <select
                  name="assignedTo"
                  defaultValue={
                    formik.values.assignedTo && formik.values.assignedTo._id
                      ? formik.values.assignedTo._id
                      : ""
                  }
                  onChange={formik.handleChange}
                  className="bg-white p-2 w-96 opacity-100 text-gray-500"
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
                  className="w-8 shadow-md   m-2 h-8 bg-red-400 transition duration-200 hover:bg-red-600 text-white  rounded-md  absolute top-0 right-0"
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster />
      {openComments && (
        <div className="w-screen fixed min-h-screen  p-0 m-0 top-0 left-0 rounded-md shadow-sm  z-30">
          <div className="bg-black opacity-25 w-full m-0 h-full absolute top-0 left-0 z-40"></div>
          <div className="flex justify-center content-center items-center mt-4">
            <div className=" bg-slate-200 p-10  relative list-comments min-h-96 w-96 mt-2 m-0 border-0 border-gray-500 z-50 rounded-md">
              <button
                className="text-center absolute top-2 right-2 bg-slate-100 shadow-sm w-8 h-8 flex content-center justify-center items-center rounded-full"
                onClick={handleToggleComments}
              >
                <i className="fa fa-close "></i>
              </button>
              <ul className=" list-none text-black ">
                {/* <li className="text-gray-600 ">comment one </li> */}
                {task.comments.map((comment, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-slate-100 border-1 border-gray-300 rounded-md my-2 p-1 px-2"
                    >
                      <span className="text-gray-700 font-mono capitalize block m-0 font-semibold">
                        from: {comment.creatorID.userName}
                      </span>
                      <span className="text-gray-500 m-0"> {comment.text}</span>
                      <span
                        className="float-right text-red-700 cursor-pointer mx-2 "
                        onClick={() => removeComment(comment._id)}
                      >
                        <i className="fa fa-trash"></i>{" "}
                      </span>
                    </li>
                  );
                })}
                {/* <li className="text-gray-100 border-1 border-white rounded-md "></li> */}
                <form onSubmit={formikComment.handleSubmit}>
                  <div className="w-full">
                    <label className="text-gray-600 text-sm mt-4 first-letter:capitalize">
                      write comment :
                    </label>
                    <input
                      type="text"
                      name="text"
                      onChange={formikComment.handleChange}
                      value={formikComment.values.text} // Changed to specify the 'text' field of formikComment.values
                      placeholder="Write your comment" // Corrected placeholder text
                      className="bg-gray-200 border-1 mt-2 border-gray-300 p-2 rounded-md w-full" // Added a basic border and padding for visual clarity
                    />
                    {formikComment.errors.text && formikComment.touched.text ? (
                      <div className="alert alert-danger">
                        {formikComment.errors.text}
                      </div>
                    ) : (
                      ""
                    )}
                    <button
                      type="submit"
                      className="transition font-semibold font-mono  duration-300  bg-blue-500 hover:bg-blue-700 text-white hover:shadow-md py-2 px-4 rounded mt-2"
                    >
                      Comment
                    </button>{" "}
                  </div>
                </form>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div
        ref={drag}
        // onClick={handleTogglePop}
        className="  z-1 card-task bg-slate-50 m-2 rounded-md px-0 py-0 border-1 border-solid hover:shadow-md transition duration-300 ease-linear  border-gray-200"
        key={task._id}
      >
        {location.pathname === "/created-tasks" ? (
          <span className="text-gray-500 font-mono text-md border-b-0.5  w-full border-gray-200 block bg-white p-2 rounded-t-xl mb-2">
            To: {task.assignedTo ? task.assignedTo.email : "No Email Available"}
          </span>
        ) : (
          <span className="text-gray-500 font-mono text-md border-b-0.5  w-full border-gray-200 block bg-white p-2 rounded-t-xl mb-2">
            from: {task.creatorID ? task.creatorID.email : "No Email Available"}
          </span>
        )}

        <h5 className="font-mono text-gray-600 capitalize text-sm font-bold  ml-2">
          Title: {task.title}
        </h5>

        <p className="text-gray-500 font-meduim first-letter:capitalize ml-2">
          {task.description}
        </p>
        <p className=" text-gray-400 ml-2 mb-0 flex flex-row items-center  ">
          <i className="fa fa-clock mr-2"></i> {formattedDeadline}
          <p
            onClick={() => handleToggleComments()}
            className="my-0 mx-2 text-gray-500 cursor-pointer"
          >
            <i className="fa fa-comments"></i> {task.comments.length}
          </p>
        </p>
        <div className="w-full flex items-center justify-center content-center mb-2 ">
          {location.pathname === "/created-tasks" ? (
            <>
              {" "}
              <button
                onClick={handleTogglePop}
                className="bg-white border-1 rounded-md  w-32 px-3 py-1 mt-3 text-sm capitalize text-gray-600 border-gray-300 "
              >
                edite
              </button>
              <button
                onClick={handleRemoveTask}
                className="bg-white border-1 rounded-md  w-32 ml-2 px-3 py-1 mt-3 text-sm capitalize text-gray-600 border-gray-300 "
              >
                remove
              </button>
            </>
          ) : (
            <button
              onClick={handleTogglePop}
              className="bg-white border-1 rounded-md  w-64 px-3 py-1 mt-3 text-sm capitalize text-gray-600 border-gray-300 "
            >
              edite
            </button>
          )}
        </div>
      </div>
    </>
  );
}
