import { useFormik } from "formik";
import * as Yup from "yup";
export default function FilterDashboard() {
  let validationSchema = Yup.object({
    queryFilter: Yup.string(),
    statusTask: Yup.string(),
  });

  let initialValuesFilter = {
    queryFilter: "",
    statusTask: "",
  };

  let formikFilter = useFormik({
    initialValues: initialValuesFilter,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  return (
    <>
      <div className="bg-white border border-gray-200 p-2 m-2 h-fit shadow-sm rounded-md pb-4">
        {/* <div></div> */}
        <div className="container">
          <div>
            <form
              onSubmit={formikFilter.handleSubmit}
              className="flex flex-row items-end justify-center content-center"
            >
              <div className="group-input  w-1/3  flex flex-col items-start content-start m-2">
                <label className="text-gray-500 capitalize text-left mb-2">
                  search
                </label>
                <input
                  className="h-10 bg-slate-100 border p-2 rounded-md w-full border-gray-400"
                  type="search"
                  placeholder="search"
                  name="search"
                  onChange={formikFilter.handleChange}
                />
              </div>
              <div className="group-input  w-1/3  flex flex-col items-start content-start m-2">
                <label className="text-gray-500 capitalize text-left mb-2">
                  status
                </label>
                <select
                  className="h-10 bg-slate-100 border p-2 cursor-pointer rounded-md w-full border-gray-400"
                  name="statusTask"
                  value={formikFilter.values.statusTask}
                  onChange={formikFilter.handleChange}
                >
                  <option value={"all"}>All</option>
                  <option value={"toDo"}>todo</option>
                  <option value={"doing"}>doing</option>
                  <option value={"done"}>done</option>
                </select>
              </div>
              <div className="group-input  w-1/3  flex flex-col items-end justify-end content-end m-2">
                {/* <label className="text-gray-500 capitalize text-left mb-2">
                  clear :
                </label> */}
                <button className="hover:bg-red-700 hover:text-white h-10 font-semibold bg-red-100 text-red-800 cursor-pointer hover:shadow-md duration-300  transition border p-2 rounded-md w-full border-gray-400">
                  Clear Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
