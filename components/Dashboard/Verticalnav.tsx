import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ModeToggle } from "../Modeswitch";
import { CreatePost } from "./CreatePost";
import Link from "next/link";

export default function Verticlnav() {
  const { data } = useSession();
  const profile = data?.user?.image;

  const handelSignOut = () => {
    signOut();
  };

  return (
    <div className="w-[260px] border-r border-gray-500 dark:bg-gray-800/40 bg-gray-200 h-screen fixed">
      {/* Vertical navbar */}

      <div className="flex items-center justify-between border-b border-gray-500">
        <Link href="/" className="flex items-center gap-3 p-6 ">
          <FastfoodOutlinedIcon
            className="text-green-500"
            style={{ fontSize: 25 }}
          />
          <h1 className="font-bold text-2xl">FeastFul</h1>
        </Link>

        <div className="mr-5">
          <ModeToggle />
        </div>
      </div>

      {/* The links */}
      <div className="flex flex-col p-3 mt-7 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg">
          {profile && (
            <img
              src={profile}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <h1 className="text-lg">{data?.user?.name}</h1>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300 ">
          <HomeRoundedIcon />
          <h1 className="text-lg">Home</h1>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300 ">
          <ChatBubbleRoundedIcon />
          <h1 className="text-lg">Chats</h1>
        </div>

        <Link
          href="/favourites"
          className="flex items-center gap-3  p-3 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300 "
        >
          <FavoriteRoundedIcon />
          <h1 className="text-lg">Favourites</h1>
        </Link>

        <div className="flex items-center gap-3  p-3 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300 ">
          <PeopleAltRoundedIcon />
          <h1 className="text-lg">Profile</h1>
        </div>

        <div
          onClick={handelSignOut}
          className="flex items-center gap-3 p-3 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300 "
        >
          <LogoutRoundedIcon />
          <h1 className="text-lg">Logout</h1>
        </div>
        <CreatePost />
      </div>
    </div>
  );
}
