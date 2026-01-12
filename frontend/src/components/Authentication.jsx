import { useSelector } from "react-redux";

export default function Authentication() {
  const { isAuthChecked } = useSelector((state) => state.auth);
  return (
    <div className={`w-full h-screen fixed z-40 top-0 bg-slate-50 dark:bg-slate-950 text-2xl font-medium text-rose-600 ${!isAuthChecked ? 'flex' : 'hidden'} items-center justify-center`}>
      <h4>{!isAuthChecked && 'Authenticating...'}</h4>
    </div>
  );
}