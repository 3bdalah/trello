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
import CreatedTasks from "./components/CreatedTasks/CreatedTasks";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import MyTasks from "./components/MyTasks/MyTasks";
import Notifications from "./components/Notifications/Notifications";
import AboutHeader from "./components/About-header/About-header";
import Settings from "./components/Settings/Settings";
import Chat from "./components/Chat/Chat";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        { path: "/add-task", element: <CreateTask /> },
        { path: "/created-tasks", element: <CreatedTasks /> },
        { path: "/my-tasks", element: <MyTasks /> },
        { path: "/about", element: <AboutHeader /> },
        { path: "/notifications", element: <Notifications /> },
        { path: "/employees", element: <EmployeeList /> },
        { path: "/setting", element: <Settings /> },
        { path: "/chats", element: <Chat /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/tasks", element: <TasksList /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "/about", element: <AboutHeader /> },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
