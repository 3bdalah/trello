import { Outlet } from "react-router-dom";
// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
export default function Layout() {
  return (
    <>
      <div className=" bg-slate-50 w-full">
        <Header />
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}
