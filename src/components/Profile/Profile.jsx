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
          <div className="h-32 w-32 rounded-full  capitalize bg-blue-400 flex items-center justify-center text-white border-1 border-slate-400 text-3xl shadow-sm">
            {dataProfile.userName ? dataProfile.userName.substring(0, 1) : ""}
          </div>
          <div className="mt-5 text-gray-500 rounded-full  font-bold font-mono relative text-2xl">
            {dataProfile.fName ? dataProfile.fName : ""}{" "}
            <sub className="text-green-600 bg-white rounded-full shadow-md px-1 py-1 absolute ">
              <i className="fa-solid fa-check"></i>
            </sub>
          </div>
          <form>
            <div className="mt-5 text-gray-500 rounded-full flex flex-row font-bold font-mono  text-sm">
              <div className="card-input  w-96 flex flex-col place-items-start m-2">
                <label htmlFor="fname" className="mb-1">
                  first name
                </label>

                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="first name"
                  value={dataProfile.fName}
                  disabled
                />
              </div>
              <div className="card-input  w-96 flex flex-col place-items-start m-2">
                <label htmlFor="lname" className="mb-1">
                  last name
                </label>

                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="first name"
                  value={dataProfile.lName}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 text-gray-500 rounded-full flex flex-row font-bold font-mono  text-sm">
              <div className="card-input  w-96 flex flex-col place-items-start m-2">
                <label htmlFor="fname" className="mb-1">
                  user name
                </label>

                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="first name"
                  value={dataProfile.userName}
                  disabled
                />
              </div>
              <div className="card-input  w-96 flex flex-col place-items-start m-2">
                <label htmlFor="lname" className="mb-1">
                  email
                </label>

                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="email"
                  name="fname"
                  id="fname"
                  placeholder="first name"
                  value={dataProfile.email}
                  disabled
                />
              </div>
            </div>

            <div className="mt-3 text-gray-500 rounded-full flex flex-row font-bold font-mono  text-sm">
              <div className="card-input  w-96 flex flex-col place-items-start m-2">
                <label htmlFor="fname" className="mb-1">
                  password
                </label>

                <input
                  className="p-2 rounded-md border-1 w-full border-gray-200"
                  type="password"
                  name="fname"
                  id="fname"
                  placeholder="first name"
                  value={dataProfile.password}
                  disabled
                />
              </div>
            </div>
          </form>

          <span className="w-96 p-0.5  bg-gray-100  rounded-full my-5 "></span>
          {/* <div className="container"> */}

          <div className="  w-3/5">
            <h4 className="text-gray-600 font-mono text-left  mb-4 font-bold capitalize">
              notification Setting
            </h4>
            {settings.map((sett, index) => {
              return (
                <div
                  key={index}
                  className="flex  justify-between  content-center h-10"
                >
                  <span className=" capitalize text-gray-500 font-mono font-semibold">
                    {sett.text}
                  </span>{" "}
                  <span
                    className=" cursor-pointer "
                    onClick={() => underDevelop()}
                  >
                    {sett.isOn ? sett.iconeOn : sett.iconeOff}{" "}
                    {sett.isOn ? "On" : "Off"}
                  </span>
                </div>
              );
            })}
            {/* </div> */}
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
