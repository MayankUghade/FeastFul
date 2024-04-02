import Link from "next/link";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import { ModeToggle } from "./Modeswitch";

export default function Navbar() {
  return (
    <div className="p-3 flex items-center justify-between">
      {/* Logo for the application */}
      <div className="flex items-center">
        <div className="flex items-center gap-3 p-6 ">
          <FastfoodOutlinedIcon
            className="text-green-500"
            style={{ fontSize: 30 }}
          />
          <h1 className="font-bold text-3xl">FeastFul</h1>
        </div>

        <ModeToggle />
      </div>

      {/* sighUp button for the application */}
      <Link
        href="/signup"
        className="lg:mr-[80px] py-2 px-3 text-sm bg-green-500 rounded-lg text-white cursor-pointer"
      >
        Sign up
      </Link>
    </div>
  );
}
