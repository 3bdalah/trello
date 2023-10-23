import { Link } from "react-router-dom";

export default function AboutHeader() {
  return (
    <nav className="z-0 font-mono capitalize  bg-white shadow-md h-12 flex flex-row items-center content-center  justify-between">
      <div className="container flex flex-row items-center content-center  justify-between">
        <div className="logo ">
          <h5 className="font-mono text-stone-500 ">
            {" "}
            <Link to="/" className="text-gray-500 no-underline">
              trello
            </Link>
          </h5>
        </div>
        <ul className=" list-none flex flex-row w-96 items-center mb-0 justify-center content-center">
          <li className="no-underline mx-3">
            <Link to="/about" className=" no-underline">
              about
            </Link>
          </li>
          <li className="no-underline mx-3">
            <Link to="/register" className=" capitalize no-underline">
              sign Up
            </Link>
          </li>
          <li className="no-underline mx-3">
            <Link to="/login" className=" no-underline">
              sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
