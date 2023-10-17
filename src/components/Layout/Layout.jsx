import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

export default function Layout() {
  return (
    <>
      <div className=" bg-stone-50">
        <Header />
        <SideBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
