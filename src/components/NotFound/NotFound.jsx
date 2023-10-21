import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg md:text-2xl text-gray-600 mb-8">Page Not Found</p>
      <p className="text-gray-500 text-center px-4">
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        className="bg-blue-500 hover:bg-blue-700 transition mt-5 w-44 text-center duration-300 ease-linear shadow-md p-2 rounded-sm text-white no-underline h-10 "
        to="/"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
