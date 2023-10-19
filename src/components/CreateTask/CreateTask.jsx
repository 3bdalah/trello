import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useState } from "react";
// import jwt_decode from "jwt-decode";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
export default function CreateTask() {
  const [employees, setEmployees] = useState([]);

  /*  
  token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmZlZTZlNGQyMmVhYmNlYzUwNjJlNCIsImlhdCI6MTY5NzY0MTMzMn0.QZdbhYW4RBrvB-NrAPL5fdMzsFPNs3FDTHRIFeNck24
  */
  const queryClient = useQueryClient();
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const notifyError = (message) => {
    toast.error(message);
  };

  const handleSendPost = async (values) => {
    try {
      await axios.post(
        "https://trello-backend-tlg1.onrender.com/addtask",
        values,
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmZlZTZlNGQyMmVhYmNlYzUwNjJlNCIsImlhdCI6MTY5NzY0MTMzMn0.QZdbhYW4RBrvB-NrAPL5fdMzsFPNs3FDTHRIFeNck24",
          },
        }
      );
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const handleGetAllEmployee = async () => {
    try {
      let { data } = await axios.get(
        "https://trello-backend-tlg1.onrender.com/getAllUsers",
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmZlZTZlNGQyMmVhYmNlYzUwNjJlNCIsImlhdCI6MTY5NzY0MTMzMn0.QZdbhYW4RBrvB-NrAPL5fdMzsFPNs3FDTHRIFeNck24",
          },
        }
      );
      setEmployees(data.users);
    } catch (error) {
      console.log("errors get all users", error);
    }
  };
  const mutation = useMutation(handleSendPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      notifySuccess("sucesse added task ");
    },
    onError: () => {
      notifyError("Error occurred while adding the task");
    },
  });

  const handleMutatePost = (values) => {
    mutation.mutate(values);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status task is required"),
    // creatorID: Yup.string().required("Your ID is required"),
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

  let formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "todo",
      // creatorID: "652fee6e4d22eabcec5062e4",
      assignedTo: "",
      deadline: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // handleSendPost(values);
      handleMutatePost(values);
      resetForm();
    },
  });

  useEffect(() => {
    handleGetAllEmployee();
  }, []);
  return (
    <section className="add-task bg-slate-100 text-gray py-8 h-auto">
      <Toaster />
      <div className="container mx-auto px-4">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          {formik.errors.createID && formik.touched.createID ? (
            <div className="alert alert-danger">{formik.errors.createID}</div>
          ) : (
            ""
          )}
          <label htmlFor="title" className="block mb-2">
            Title Task
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Title task"
            className="w-full border-1 rounded-md px-3 py-2 mb-4"
          />
          {formik.errors.title && formik.touched.title ? (
            <div className="alert alert-danger">{formik.errors.title}</div>
          ) : (
            ""
          )}
          <label htmlFor="description" className="block mb-2">
            Description Task
          </label>
          <textarea
            className="w-full border-1 rounded-md px-3 py-2 mb-4"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger">
              {formik.errors.description}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="deadline" className="block mb-2">
            Deadline Task
          </label>
          <input
            type="date"
            name="deadline"
            value={formik.values.deadline}
            onChange={formik.handleChange}
            className="w-full border-1 shadow-transparent rounded-md px-3 py-2 mb-4"
          />
          {formik.errors.deadline && formik.touched.deadline ? (
            <div className="alert alert-danger">{formik.errors.deadline}</div>
          ) : (
            ""
          )}
          <label htmlFor="user" className="block mb-2">
            Assign User
          </label>
          <select
            name="assignedTo"
            value={
              formik.values.assignedTo ||
              (employees.length > 0 ? employees[0]._id : "")
            }
            onChange={formik.handleChange}
            className="w-full border-1 shadow-transparent rounded-md px-3 py-2 mb-4"
          >
            {employees.map((emp, index) => {
              return (
                <option key={index} value={emp._id}>
                  {emp.email}
                </option>
              );
            })}
          </select>
          {formik.errors.assignedTo && formik.touched.assignedTo ? (
            <div className="alert alert-danger">{formik.errors.assignedTo}</div>
          ) : (
            ""
          )}

          <select
            className="w-full border-1 shadow-transparent rounded-md px-3 py-2 mb-4"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <option value="toDo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Task
          </button>

          {formik.errors.status && formik.touched.status ? (
            <div className="alert alert-danger">{formik.errors.status}</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </section>
  );
}
