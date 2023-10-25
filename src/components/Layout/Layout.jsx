import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useContext } from "react";
import { TokenContext } from "../../Context/UserContext";
export default function Layout() {
  const { token } = useContext(TokenContext);
  return (
    <div className="bg-slate-50 w-full">
      {token && <Header />}
      {token && <SideBar />}
      <Outlet />
    </div>
  );
}
