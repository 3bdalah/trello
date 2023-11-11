/* eslint-disable react/prop-types */

const FilterDashboard = ({ setStatusFilter }) => {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    // Call the provided setStatusFilter function to update the filter value
    setStatusFilter(selectedValue);
  };

  return (
    <div className="mt-2">
      <label htmlFor="filterSelect" className="mr-2 text-gray-700">
        Filter by Status:
      </label>
      <select
        id="filterSelect"
        className="border rounded-md p-2 w-2/6"
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="toDo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default FilterDashboard;
