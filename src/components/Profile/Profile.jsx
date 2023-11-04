import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../../Redux/UserSlice";
import { useEffect, useState } from "react";
import { settings } from "../../Utils/Consts";
import toast, { Toaster } from "react-hot-toast";
export default function Profile() {
  const user = useSelector((state) => state.userRed.user);
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = useState({});
  const underDevelop = () => {
    toast.success("this part under developing ");
  };
  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);

  useEffect(() => {
    setDataProfile(user.user);
    console.log("user data", user.user);
  }, [user]);

  return (
    <div>
      <Toaster />
      {dataProfile && (
        <div className="bg-white shadow-md p-6 rounded-md text-center flex content-center justify-center  items-center flex-col">
          <div className="h-32 w-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full capitalize bg-blue-400 flex items-center justify-center text-white border-2 border-slate-400 md:border-4 text-3xl md:text-4xl lg:text-5xl shadow-sm mb-5">
            {dataProfile.userName ? dataProfile.userName.substring(0, 1) : ""}
          </div>
          <div className="mt-3 md:mt-5 text-gray-500 rounded-full font-bold font-mono relative text-xl md:text-2xl">
            {dataProfile.fName ? dataProfile.fName : ""}{" "}
            <sub className="text-green-600 bg-white rounded-full shadow-md px-1 py-1 absolute md:px-2 md:py-2">
              <i className="fa-solid fa-check"></i>
            </sub>
          </div>

          <form>
            <div className="mt-3 text-gray-500 rounded-full flex flex-col font-bold font-mono text-sm sm:flex-row sm:space-x-2">
              <div className="card-input w-full sm:w-96">
                <label htmlFor="fname" className="mb-1 float-left">
                  First Name
                </label>
                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="First Name"
                  value={dataProfile.fName}
                  disabled
                />
              </div>
              <div className="card-input w-full sm:w-96">
                <label htmlFor="lname" className="mb-1 float-left">
                  Last Name
                </label>
                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Last Name"
                  value={dataProfile.lName}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 text-gray-500 rounded-full flex flex-col font-bold font-mono text-sm sm:flex-row sm:space-x-2">
              <div className="card-input w-full sm:w-96">
                <label htmlFor="fname" className="mb-1 float-left">
                  User Name
                </label>
                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="User Name"
                  value={dataProfile.userName}
                  disabled
                />
              </div>
              <div className="card-input w-full sm:w-96">
                <label htmlFor="lname" className="mb-1 float-left">
                  Email
                </label>
                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="email"
                  name="fname"
                  id="fname"
                  placeholder="Email"
                  value={dataProfile.email}
                  disabled
                />
              </div>
            </div>

            <div className="mt-3 text-gray-500 rounded-full flex flex-col font-bold font-mono text-sm">
              <div className="card-input w-full">
                <label htmlFor="fname" className="mb-1 float-left">
                  Password
                </label>
                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="password"
                  name="fname"
                  id="fname"
                  placeholder="Password"
                  value={dataProfile.password}
                  disabled
                />
              </div>
            </div>
          </form>

          <span className="w-96 p-0.5  bg-gray-100  rounded-full my-5 "></span>
          {/* <div className="container"> */}

          <div className="w-full sm:w-3/5 sm:text-lg text-xs">
            <h4 className="text-gray-600 font-mono text-left mb-4 font-bold capitalize">
              Notification Setting
            </h4>
            {settings.map((sett, index) => (
              <div
                key={index}
                className="flex justify-between items-center h-10 mb-2 "
              >
                <span className="capitalize text-gray-500 font-mono font-semibold ">
                  {sett.text}
                </span>{" "}
                <span className="cursor-pointer" onClick={() => underDevelop()}>
                  {sett.isOn ? sett.iconeOn : sett.iconeOff}{" "}
                  {sett.isOn ? "On" : "Off"}
                </span>
              </div>
            ))}
          </div>

          <span className="w-96 p-0.5  bg-gray-100  rounded-full my-5 "></span>
          <div className="button-edite ">
            <button
              onClick={() => underDevelop()}
              className="w-44 bg-blue-600 text-white font-mono font-bold rounded-md p-2 cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out shadow-md"
            >
              Edite Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
