import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ModeToggle } from "../Modeswitch";

export default function Horizontalnav() {
  const { data } = useSession();
  const profile = data?.user?.image;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelSignOut = () => {
    signOut();
  };

  return (
    <div className="w-screen p-1 border-b border-gray-500 dark:bg-gray-800/40 bg-gray-200 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center gap-3 p-6 ">
          <FastfoodOutlinedIcon
            className="text-green-500"
            style={{ fontSize: 25 }}
          />
          <h1 className="font-bold text-2xl">FeastFul</h1>
        </div>

        <ModeToggle />
      </div>

      <div className="gap-8 items-center md:flex hidden">
        <HomeRoundedIcon />
        <ChatBubbleRoundedIcon />
        <FavoriteRoundedIcon />
        <PeopleAltRoundedIcon />
        <LogoutRoundedIcon onClick={handelSignOut} />

        {profile && (
          <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        )}
      </div>

      <div className="md:hidden flex items-center gap-3 p-5">
        {isMenuOpen ? (
          <CloseRoundedIcon onClick={toggleMenu} style={{ fontSize: 30 }} />
        ) : (
          <MenuRoundedIcon onClick={toggleMenu} style={{ fontSize: 30 }} />
        )}

        {profile && (
          <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        )}
      </div>

      {/* Sliding menu */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="absolute dark:bg-gray-900 bg-gray-200 right-1 mt-[355px] flex-col p-2 rounded-xl md:hidden flex"
        >
          <div className="flex items-center gap-3 dark:hover:bg-gray-700 hover:bg-gray-300 p-3 rounded-lg">
            <HomeRoundedIcon />
            <h1 className="text-md">Home</h1>
          </div>
          <div className="flex items-center gap-3 dark:hover:bg-gray-700 hover:bg-gray-300 p-3 rounded-lg">
            <ChatBubbleRoundedIcon />
            <h1 className="text-md">Chats</h1>
          </div>
          <div className="flex items-center gap-3 dark:hover:bg-gray-700 hover:bg-gray-300 p-3 rounded-lg">
            <FavoriteRoundedIcon />
            <h1 className="text-md">Favourites</h1>
          </div>
          <div className="flex items-center gap-3 dark:hover:bg-gray-700 hover:bg-gray-300 p-3 rounded-lg">
            <PeopleAltRoundedIcon />
            <h1 className="text-lg">Profile</h1>
          </div>
          <div
            onClick={handelSignOut}
            className="flex items-center gap-3 dark:hover:bg-gray-700 hover:bg-gray-300 p-3 rounded-lg"
          >
            <LogoutRoundedIcon />
            <h1 className="text-md">Logout</h1>
          </div>
        </div>
      )}
    </div>
  );
}
