import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "./../../Context/UserContext";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
  // let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  // const [token, setToken] = useState("");
  let { setToken } = useContext(TokenContext);
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://trello-backend-tlg1.onrender.com/signup",
        values
      );
      console.log(res);
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
        notifySuccess("success loged in");
        setToken(res.data.token);
      }

      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    console.log("token changed", dataUser);

    if (dataUser) {
      handleGoogleLogin();
      // navigate("/");
    }
  }, [dataUser]);

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z-0-9]{3,8}$/, "Your Password Wrong")
      .required("Password is required"),
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
            <div className="flex items-center justify-center flex-col">
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
            <div className="mt-9 flex items-center justify-center flex-col">
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
            <div className="flex items-center justify-center">
              <button
                className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
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
