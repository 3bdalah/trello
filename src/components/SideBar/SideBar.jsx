import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideBar() {
  const [toggle, setToggle] = useState(false);
  const links = [
    { to: "/", text: "home", icone: <i className="fa fa-home"></i> },
    {
      to: "/add-task",
      text: "add-task",
      icone: <i className="fa fa-plus"></i>,
    },
    {
      to: "/notifications",
      text: "notification",
      icone: <i className="fa fa-bell"></i>,
    },
    {
      to: "/dashboard",
      text: "dashboard",
      icone: <i className="fa fa-dashboard"></i>,
    },
    { to: "/profile", text: "profile", icone: <i className="fa fa-user"></i> },
    {
      to: "/my-tasks",
      text: "My-Tasks",
      icone: <i className="fas fa-check fa-solid"></i>,
    },
    {
      to: "/employees",
      text: "employees",
      icone: <i className="fa fa-users"></i>,
    },
    {
      to: "/setting",
      text: "setting",
      icone: <i className="fa fa-gear"></i>,
    },
    {
      to: "/help",
      text: "help",
      icone: <i className="fa fa-question"></i>,
    },
  ];

  return (
    <>
      <div className="parent-side sidebar  ">
        <aside
          className={
            "side-bar h-screen bg-slate-100 w-48 fixed top-0 left-0  shadow-md rounded-md " +
            (toggle ? "open" : "close")
          }
        >
          <button
            className="bg-slate-100 w-12 rounded-sm h-10 absolute right-[-48px] top-14"
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
            <li className="logo bg-white">
              <h2 className=" font-medium text-3xl text-center text-slate-600 pt-3">
                Trello
              </h2>
            </li>
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
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
