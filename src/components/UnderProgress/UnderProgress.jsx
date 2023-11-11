// UnderDevelopment.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UnderProgress = () => {
  return (
    <div className="text-center mt-10 min-h-screen">
      <FontAwesomeIcon icon={faTools} size="5x" color="black" />
      <h2 className="text-2xl mt-4">Under Development</h2>
      <p className="text-gray-600 mt-2">
        This page is currently under development. Check back later!
      </p>
      <Link
        className=" mt-16 flex items-center justify-center mx-auto bg-blue-500 hover:bg-blue-700 transition  w-44 text-center duration-300 ease-linear shadow-md p-2 rounded-sm text-white no-underline h-10 "
        to="/"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default UnderProgress;
