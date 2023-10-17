import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import TasksList from "./components/TasksList/TasksList";
import NotFound from "./components/NotFound/NotFound";
import CreateTask from "./components/CreateTask/CreateTask";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/add-task", element: <CreateTask /> },
        { path: "/employees", element: <EmployeeList /> },
        { path: "/tasks", element: <TasksList /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
