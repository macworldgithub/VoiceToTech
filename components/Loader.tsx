export default function Loader() {
  return (
    <div className=" from-pink-600 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-10 h-10 border-4 border-pink-500/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-10 h-10 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-white text-xl font-semibold">Loading...</div>
      </div>
    </div>
  );
}
