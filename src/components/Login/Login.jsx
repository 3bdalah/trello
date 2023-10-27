import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "./../../Context/UserContext";
import toast, { Toaster } from "react-hot-toast";
// import { useHistory } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";

export default function Login() {
  // let history = useHistory();
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  // const [token, setToken] = useState("");
  let { setToken } = useContext(TokenContext);
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const notifyError = (message) => {
    toast.error(message);
  };
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://trello-backend-tlg1.onrender.com/login",
        values
      );
      console.log(res);
      if (res.data.message == "logged in successfully") {
        const { token } = res.data;
        localStorage.setItem("token", token);
        notifySuccess("Success!");
        setToken(token);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
        console.log(res);
      } else if (
        res.data.message == "password not correct" ||
        res.data.message == "User not found, You have to register first"
      ) {
        notifyError("Invalid email or password!");
        console.log("faild to login ", res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    let valuesUser = {
      fName: dataUser.given_name,
      lName: dataUser.family_name,
      email: dataUser.email,
      sub: dataUser.sub,
    };

    try {
      const res = await axios.post(
        "https://trello-backend-tlg1.onrender.com/loginGoogle",
        valuesUser
      );
      console.log("res google ", res.data.message);

      if (res.data.message === "logged in successfully") {
        notifySuccess("Logged in successfully!");
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }

      // localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    console.log("token changed", dataUser);

    if (dataUser) {
      handleGoogleLogin();
    }
  }, [dataUser]);

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(
      /^(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Invalid password. Password must have at least one uppercase letter, one digit, and be at least 6 characters long."
    ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleLogin(values);
      console.log("loading", isLoading);
    },
  });
  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center">
        <Toaster />
        <div className="m-auto w-full max-w-xs border-t-4 border-blue-600 rounded-md">
          <form
            className="bg-white shadow-md   rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="text-center capitalize font-mono text-3xl  text-stone-600 mb-5">
              {" "}
              Login
            </h3>
            <div className="flex items-start   justify-center flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-gray-400 font-mono capitalize"
              >
                email:
              </label>
              <input
                type="email"
                className="h-10 p-2 w-full bg-stone-50 border-y border-x  border-slate-100 rounded-md"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />

              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-4 flex items-start justify-center flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-gray-400 font-mono capitalize"
              >
                password:
              </label>
              <input
                type="password"
                className="h-10 p-2 w-full bg-stone-50  border-y border-x  border-slate-100 rounded-md"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />

              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-full mt-4 bg-blue-500 transition duration-200 ease-linear hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link
                to="/register"
                className="text-center w-full no-underline hover:shadow-md transition duration-200 ease-linear my-2 bg-gray-500 hover:bg-gray-800 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </Link>
            </div>
            <div className="flex items-center justify-center flex-col lowercase">
              <h5 className="mb-4 text-gray-500 text-center font-serif  text-sm capitalize">
                {" "}
                login by Google
              </h5>
              <GoogleLogin
                className=""
                onSuccess={(CredentialsResponse) => {
                  const credentialResponDecode = jwt_decode(
                    CredentialsResponse.credential
                  );
                  setDataUser(credentialResponDecode);
                  console.log("credentail decoded", credentialResponDecode);
                  console.log("repsonse Credential", CredentialsResponse);
                }}
                onError={() => {
                  console.log("login failed");
                }}
              ></GoogleLogin>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
