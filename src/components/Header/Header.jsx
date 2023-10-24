import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDataUser } from "../../Redux/UserSlice";
export default function Header() {
  const user = useSelector((state) => state.userRed.user);
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = useState({});

  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);

  useEffect(() => {
    setDataProfile(user.user);
    console.log("user data", user.user);
  }, [user]);
  return (
    <>
      {dataProfile && (
        <nav className=" bg-slate-100 font-semibold font-sans   h-14 w-full  flex flex-row z-1 border-1 mb-0 border-gray-200 ">
          <div className="container flex justify-between content-center items-center ">
            <div className="flex flex-row items-start justify-center">
              <span className="mx-4">
                <Link
                  to="/created-tasks"
                  className="capitalize no-underline text-gray-700"
                >
                  Created tasks
                </Link>
              </span>
              <span>
                <Link
                  to="my-tasks "
                  className=" capitalize no-underline font-semibold font-sans text-gray-700"
                >
                  My tasks
                </Link>
              </span>
            </div>
            <div className="flex flex-row justify-center content-center items-center">
              <span className="mr-3">
                <Link
                  to="/notifications"
                  className="capitalize no-underline text-gray-600 text-lg"
                >
                  <i className="fa fa-bell"></i>
                </Link>
              </span>
              <span>
                <Link
                  to="/profile"
                  className=" capitalize no-underline w-12 h-12"
                >
                  {/* <img
                  src="../../../public/user.webp"
                  alt="user-avatar"
                  className=" w-12 h-12 border-1 border-gray-200 rounded-full bg-white"
                /> */}

                  <div className="h-10 w-10 rounded-full  capitalize bg-blue-400 flex items-center justify-center text-white border-1 border-white ">
                    {dataProfile.userName
                      ? dataProfile.userName.substring(0, 1)
                      : ""}
                  </div>
                </Link>
              </span>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
