import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers } from "../features/authSlice";
import { Link } from "react-router-dom";
import { HiTrash, HiPencilSquare, HiCheckCircle, HiXCircle } from "react-icons/hi2";
import AccessDenied from "../components/AccessDenied";

export default function Users() {
  const dispatch = useDispatch();
  const {user, users} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  }

  if (!user?.is_superuser) return <AccessDenied />

  return (
    <table className="border-collapse w-full overflow-hidden text-left text-xs md:text-sm lg:text-base xl:text-md table-auto border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-950">
      <thead className="">
        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-300">
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">S.N.</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Name</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Email</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Staff</th>
          <th className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">Admin</th>
          <th className="px-2 py-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => (
        <tr key={user.id} className="border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300">
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{index + 1}</td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{user.full_name}</td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">{user.email}</td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">
            {user.is_staff ? (<HiCheckCircle className="text-base md:text-md lg:text-lg xl:text-lg text-green-500" />) : (<HiXCircle className="text-base md:text-md lg:text-lg xl:text-lg text-rose-500" />)}
          </td>
          <td className="px-2 py-1 border-r border-slate-200 dark:border-slate-700">
            {user.is_superuser ? (<HiCheckCircle className="text-base md:text-md lg:text-lg xl:text-lg text-green-500" />) : (<HiXCircle className="text-base md:text-md lg:text-lg xl:text-lg text-rose-500" />)}
          </td>
          <td className="px-2 py-1 flex flex-row items-center justify-center">
            <Link className="mr-1" to={`/users/edit/${user.id}`}>
              <HiPencilSquare className="text-base md:text-md lg:text-lg xl:text-xl text-slate-900 dark:text-slate-300 drop-shadow" />
            </Link>
            <button onClick={() => handleDelete(user.id)} className="ml-1 cursor-pointer">
              <HiTrash className="text-base md:text-md lg:text-lg xl:text-xl text-rose-500 dark:text-rose-600 drop-shadow" />
            </button>
          </td>  
        </tr>
      ))}
      </tbody>
    </table>
  );
}