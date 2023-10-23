const links = [
  {
    to: "/",
    text: "home",
    icone: <i className="fa fa-home"></i>,
  },
  {
    to: "/created-tasks",
    text: "Created Tasks",
    icone: <i className="fa fa-calendar-check"></i>,
  },
  {
    to: "/add-task",
    text: "add-task",
    icone: <i className="fa fa-plus"></i>,
  },
  {
    to: "/chats",
    text: "chats",
    icone: <i className="fa fa-comments"></i>,
  },
  {
    to: "/notifications",
    text: "notification",
    icone: <i className="fa fa-bell"></i>,
  },
  {
    to: "/dashboard",
    text: "dashboard",
    icone: <i className="fa fa-dashboard"></i>,
  },
  { to: "/profile", text: "profile", icone: <i className="fa fa-user"></i> },
  {
    to: "/my-tasks",
    text: "My-Tasks",
    icone: <i className="fas fa-check fa-solid"></i>,
  },
  {
    to: "/employees",
    text: "employees",
    icone: <i className="fa fa-users"></i>,
  },
  {
    to: "/setting",
    text: "setting",
    icone: <i className="fa fa-gear"></i>,
  },

  {
    to: "/logout",
    text: "logout",
    icone: <i className="fa fa-face-sad-tear text-red-800"></i>,
  },
  {
    to: "/help",
    text: "help",
    icone: <i className="fa fa-question"></i>,
  },
];

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export const settings = [
  {
    text: "push notifications ",
    isOn: true,
    iconeOn: <i className="fa fa-toggle-on fa-2xl text-green-600"></i>,
    iconeOff: <i className="fa fa-toggle-off fa-2xl"></i>,
  },
  {
    text: "Notify me by email if any chagees status my tasks ",
    isOn: false,
    iconeOn: <i className="fa fa-toggle-on fa-2xl  text-green-600"></i>,
    iconeOff: <i className="fa fa-toggle-off fa-2xl"></i>,
  },
  {
    text: "notify me by email if any changes at created tasks",
    isOn: true,
    iconeOn: <i className="fa fa-toggle-on fa-2xl text-green-600"></i>,
    iconeOff: <i className="fa fa-toggle-off fa-2xl"></i>,
  },
];

export default links;
