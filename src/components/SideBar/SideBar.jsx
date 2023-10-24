import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import links, { linksOverview, linksAdmin } from "../../Utils/Consts";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../../Redux/UserSlice";
export default function SideBar() {
  const user = useSelector((state) => state.userRed.user);
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = useState({});
  const [toggle, setToggle] = useState(true);
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
        <div className="parent-side sidebar  z-50">
          <aside
            className={
              "side-bar h-full bg-slate-100 w-48 fixed top-0 left-0  shadow-md rounded-md " +
              (toggle ? "open" : "close")
            }
          >
            <button
              className="bg-slate-50 w-12 rounded-sm h-10 absolute right-[-48px] top-14 z-50 "
              onClick={() => {
                setToggle((prevToggle) => !prevToggle);
              }}
            >
              {toggle ? (
                <FontAwesomeIcon icon="fa-solid fa-lock" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-lock-open" />
              )}
            </button>
            <ul className="flex justify-center items-left flex-col pl-0 content-center ">
              <li className="w-full ml-16 mt-3 mb-2">
                <Link to="/profile" className=" no-underline w-fit ">
                  <div className="h-14 w-14  rounded-full  capitalize bg-blue-400 flex items-center justify-center text-white border-1 border-slate-400 text-3xl shadow-sm">
                    {dataProfile.userName
                      ? dataProfile.userName.substring(0, 1)
                      : ""}
                  </div>
                </Link>
                <Link to="/profile" className=" bg-black w-fit">
                  <div className="mt-1 text-gray-400 rounded-full  w-fit font-bold font-mono relative text-sm">
                    {dataProfile.fName ? dataProfile.fName : ""}{" "}
                  </div>
                </Link>
              </li>
              <span className=" bg-zinc-50 w-2/3 m-auto h-0.5 mb-0 "></span>

              <h6 className="font-mono text-gray-600 text-base ml-5 font-bold  mb-0">
                Overview{" "}
              </h6>
              {linksOverview.map((link, index) => {
                return (
                  <li
                    key={index}
                    className="h-9   w-full bg-slate-100   flex no-underline content-center items-center "
                  >
                    <NavLink
                      activeclassname="active"
                      to={link.to}
                      className="no-underline h-full w-full leading-8 relative flex text-gray-600"
                    >
                      <span className="mx-3 ">{link.icone}</span>
                      <span className=" capitalize"> {link.text}</span>
                    </NavLink>
                  </li>
                );
              })}

              <span className=" bg-zinc-50 w-2/3 m-auto h-0.5 mb-1 mt-1"></span>

              <h6 className="font-mono text-gray-600 text-base ml-5 font-bold mb-0">
                Manage{" "}
              </h6>
              {linksAdmin.map((link, index) => {
                return (
                  <li
                    key={index}
                    className="h-9   w-full bg-slate-100   flex no-underline content-center items-center "
                  >
                    <NavLink
                      activeclassname="active"
                      to={link.to}
                      className="no-underline h-full w-full leading-8 relative flex text-gray-600"
                    >
                      <span className="mx-3 ">{link.icone}</span>
                      <span className=" capitalize"> {link.text}</span>
                    </NavLink>
                  </li>
                );
              })}

              {links.map((link, index) => (
                <li
                  key={index}
                  className="h-10 my-0 w-full bg-slate-100   flex no-underline content-center items-center "
                >
                  <NavLink
                    activeclassname="active"
                    to={link.to}
                    className="no-underline h-full w-full leading-8 relative flex text-gray-600"
                  >
                    <span className="mx-3 ">{link.icone}</span>
                    <span className=" capitalize"> {link.text}</span>
                    {link.text === "notification" ? (
                      <span className="notification  text-sm bg-red-200 text-red-900 absolute px-1   rounded-md  right-3 top-2 text-center ">
                        322
                      </span>
                    ) : null}
                    {link.text === "chats" ? (
                      <span className="notification  text-sm bg-red-200 text-red-900 absolute px-1   rounded-md  right-3 top-2 text-center ">
                        2
                      </span>
                    ) : null}
                    {link.text.toLowerCase() === "setting" ? (
                      <span className="notification  text-sm bg-green-600  absolute p-1   rounded-md  right-3 top-3 text-center "></span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}
