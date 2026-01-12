import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiHome, HiPlusCircle, HiUserCircle, HiUserGroup, HiCog6Tooth } from "react-icons/hi2";

const links = [
  {
    id: 1,
    url: "/",
    name: "Home",
    icon: HiHome,
    border: "lg:border-t",
    roles: ["user", "admin"],
  },
  {
    id: 2,
    url: "/add-subject",
    name: "Add Subject",
    icon: HiPlusCircle,
    border: "lg:border-t",
    roles: ["admin"],

  },
  {
    id: 3,
    url: "/add-question",
    name: "Add Question",
    icon: HiPlusCircle,
    border: "lg:border-t",
    roles: ["admin"],
  },
  {
    id: 4,
    url: "/users",
    name: "All Users",
    icon: HiUserGroup,
    border: "lg:border-t",
    roles: ["admin"],
  },
  {
    id: 5,
    url: "/profile",
    name: "Profile",
    icon: HiUserCircle,
    border: "lg:border-t",
    adminView: true,
    roles: ["user", "admin"],
  },
  {
    id: 6,
    url: "/settings",
    name: "Settings",
    icon: HiCog6Tooth,
    border: "lg:border-t lg:border-b",
    roles: ["user", "admin"],
  },
]

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const role = user?.is_staff || user?.is_superuser ? "admin" : "user";

  return (
    <div className={`w-full lg:w-2/12 h-12 lg:h-screen border-t lg:border-t-0 dark:bg-slate-950 bottom-0 lg:top-0 lg:left-0 z-40 flex items-center fixed lg:border-r overflow-hidden border-slate-200 dark:border-slate-700 shadow-md`}>
      <ul className="w-full flex lg:block h-full lg:h-auto px-4 lg:px-0 items-center justify-between text-slate-900 dark:text-slate-100">
        {links
        .filter((link) => link.roles.includes(role))
        .map((link) => {
          const Icon = link.icon;
          return (
            <NavLink key={link.id} to={link.url} className={({ isActive }) => `${isActive && 'text-rose-500'}`}>
              <li className={`flex items-center lg:justify-start justify-center py-2 lg:px-6 ${link.border} border-slate-200 dark:border-slate-700 hover:lg:bg-slate-100 hover:lg:dark:bg-slate-900 hover:text-rose-500`}>
                <Icon className="lg:mr-2 text-2xl lg:text-xl" />
                <h5 className="hidden opacity-0 lg:block lg:opacity-100">{link.name}</h5>
              </li>
            </NavLink>
          )
        })}
      </ul>
    </div>
  );
}