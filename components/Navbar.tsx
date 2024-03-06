import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";

export default function Navbar() {
  return (
    <div className="sm:p-6 p-3 flex items-center justify-between">
      {/* Logo for the application */}
      <div className="lg:ml-[80px] flex items-center gap-3">
        <FastfoodOutlinedIcon className="w-[50px] h-[50px] text-green-500" />
        <h1 className="font-bold text-2xl">FeastFul</h1>
      </div>

      {/* sighUp button for the application */}
      <div className="lg:mr-[80px] py-2 px-3 bg-green-500 rounded-lg text-white cursor-pointer">
        Sign up
      </div>
    </div>
  );
}
