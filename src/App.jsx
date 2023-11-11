import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
// import Home from "./components/Home/Home";
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
import Accordion from "./components/Accordion/Accordion";
function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/login", element: <Login /> },
        { index: true, element: <AboutHeader /> },
        { path: "/register", element: <Register /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/add-task",
          element: (
            <ProtectedRoutes>
              <CreateTask />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/created-tasks",
          element: (
            <ProtectedRoutes>
              <CreatedTasks />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/my-tasks",
          element: (
            <ProtectedRoutes>
              <MyTasks />
            </ProtectedRoutes>
          ),
        },
        { path: "/about", element: <AboutHeader /> },
        {
          path: "/notifications",
          element: (
            <ProtectedRoutes>
              <Notifications />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/employees",
          element: (
            <ProtectedRoutes>
              <EmployeeList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/setting",
          element: (
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/chats",
          element: (
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/tasks",
          element: (
            <ProtectedRoutes>
              <TasksList />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/help",
          element: (
            <ProtectedRoutes>
              <Accordion />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "/about", element: <AboutHeader /> },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
