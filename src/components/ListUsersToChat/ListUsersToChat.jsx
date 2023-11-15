import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListUsersToChat() {
  const { handleGetAllEmployee } = useSelector((state) => state.employeesRed);

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetAllEmployee);
  }, []);
  return (
    <>
      <div className="border border-gray-100 rounded-sm p-3  h-screen w-1/4 "></div>
    </>
  );
}
