import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "./../Navbar/Navbar";
export default function Register() {
  const navigate = useNavigate();
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const notifyError = (message) => {
    toast.error(message);
  };

  const submitRegister = async (values) => {
    try {
      let { data } = await axios.post(
        "https://trello-backend-tlg1.onrender.com/signup",
        values
      );
      console.log(data);
      if (data.message == "added successfully") {
        notifySuccess("Success!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        notifyError("Failed to signup!");
        console.log(data);
      }
    } catch (error) {
      notifyError("Failed to signup!");
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    fName: Yup.string()
      .max(15, "Maximum name chars are 15 characters")
      .min(3, "Minimum name chars are 3 characters")
      .required("First name is required"),
    lName: Yup.string()
      .max(15, "Maximum name chars are 15 characters")
      .min(3, "Minimum name chars are 3 characters")
      .required("Last name is required"),
    userName: Yup.string().required("user required"),
    email: Yup.string().email("Invalid format").required("Email is required"),
    phone: Yup.string(),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{6,}$/,
        "Invalid password. Password must have at least one uppercase letter, one digit, and be at least 6 characters long."
      )
      .required("password is required"),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    age: Yup.number()
      .min(10, "min is 10")
      .max(100, "max is 100")
      .required("age is required"),
    gender: Yup.string().oneOf(["male", "female"], "should be male or female"),
    isDeleted: Yup.boolean(),
    isVerified: Yup.boolean(),
  });

  let formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      userName: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      age: "",
      gender: "",
      isDeleted: false,
      isVerified: true,
    },
    validationSchema,
    onSubmit: (values) => {
      delete values["rePassword"];
      submitRegister(values);
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex h-full justify-center pt-10">
        <Toaster />
        <div className="m-auto rounded-md  border-t-4  border-blue-800 ">
          <form
            className="bg-white shadow-md  w-96 rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="font-mono text-center mb-5 text-gray-600 ">
              {" "}
              Register
            </h2>
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              placeholder="Enter your First Name"
              type="text"
              name="fName"
              value={formik.values.fName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.fName && formik.touched.fName ? (
              <div className="alert alert-danger">{formik.errors.fName}</div>
            ) : (
              ""
            )}
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              placeholder="Enter your Last Name"
              type="text"
              name="lName"
              value={formik.values.lName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.lName && formik.touched.lName ? (
              <div className="alert alert-danger">{formik.errors.lName}</div>
            ) : (
              ""
            )}
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              placeholder="Enter your User Name"
              type="text"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.userName && formik.touched.userName ? (
              <div className="alert alert-danger">{formik.errors.userName}</div>
            ) : (
              ""
            )}
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              placeholder="Enter your Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4 border-y border-x rounded-md"
              placeholder="Password Confirmation"
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}

            <select
              className="h-10 p-2 text-gray-400  w-full border-1 border-gray-100 mb-4 border-y border-x rounded-md"
              name="gender"
              id="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option>Gender....</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formik.errors.gender && formik.touched.gender ? (
              <div className="alert alert-danger">{formik.errors.gender}</div>
            ) : (
              ""
            )}

            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your phone number"
              pattern="[0-9]+"
              required
            />
            <input
              className="h-10 p-2 w-full  border-1 border-gray-100  mb-4  border-y border-x rounded-md"
              placeholder="Age"
              type="number"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? (
              <div className="alert alert-danger">{formik.errors.age}</div>
            ) : (
              ""
            )}
            <div className="flex flex-col items-start justify-center content-center">
              <button
                type="submit"
                className="h-10 p-2 w-full  font-mono bg-blue-700 hover:bg-blue-800 transition duration-200 text-slate-50 border-1 border-gray-100  mb-1  border-y border-x rounded-md"
              >
                Register
              </button>
              <Link
                className="text-center  w-full  no-underline hover:shadow-md transition duration-200 ease-linear my-2 bg-gray-500 hover:bg-gray-800 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to={"/login"}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
