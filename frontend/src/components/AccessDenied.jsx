export default function AccessDenied() {
  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
      <h4 className="text-slate-900 dark:text-slate-300">Access <span className="text-rose-500 dark:text-rose-600">Denied</span></h4>
    </div>
  );
}