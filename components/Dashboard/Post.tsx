import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSession } from "next-auth/react";

import DeletePost from "./Deletepost";
import EditPost from "./Editpost";
import { useState, useEffect } from "react";
import Like from "./Like";
import Request from "./Request";

interface PostDisplayPorops {
  postId: string;
  name: string;
  description: string;
  userEmail: string;
  location: string;
  time: string;
  image: string;
  date: string;
  price: number;
}

export default function Post({
  postId,
  name,
  description,
  userEmail,
  location,
  image,
  date,
  time,
  price,
}: PostDisplayPorops) {
  const [user, setUser] = useState({});

  const { data } = useSession();
  const currentUserEmail = data?.user?.email;

  const checkCurrentUser = () => {
    if (userEmail === currentUserEmail) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: postId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error("There was an error while fetching user data");
        }

        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="w-full flex flex-col gap-5 sm:p-5 p-3 border-[1px] rounded-lg border-gray-500">
      {/* first section */}
      <div className="flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between">
        {/* Profile, dishname and description */}
        <div className="flex items-center gap-4 ">
          <img
            src={user.image}
            className="w-[40px] h-[40px] md:w-[58px] md:h-[58px] rounded-full"
            alt="Alternative image"
          />

          <div className="flex flex-col">
            <h1 className="font-bold md:text-xl text-lg ">{name}</h1>
            <h3 className="md:text-sm text-xs">by @{user.name}</h3>
          </div>
        </div>

        {/* request to join and price */}
        <div>
          <Request postId={postId} userEmail={String(currentUserEmail)} />
        </div>
      </div>

      {/* second section */}
      <div className="flex sm:flex-row flex-col gap-4">
        {/* location */}
        <div className="flex gap-1">
          <LocationOnIcon className="w-[30px] h-[30px]" />
          <h1>{location}</h1>
        </div>

        {/* time  */}
        <div className="flex gap-1">
          <AccessTimeIcon className="w-[30px] h-[30px]" />
          <h1>{time}</h1>
        </div>

        {/* Price */}
        <div className="flex">
          <AttachMoneyIcon className="w-[30px] h-[30px]" />
          <h1>{price.toString()}</h1>
        </div>

        <div className="flex gap-1">
          <CalendarMonthIcon className="w-[30px] h-[30px]" />
          <h1>{date.toString().split("T")[0]}</h1>
        </div>
      </div>

      {/* The third sectiuon  */}
      <div className="min-w-full">
        <h1>{description}</h1>
      </div>

      {/* The fourth section */}
      <div className="w-full bg-black flex items-center justify-center">
        {image && typeof image === "string" && (
          <img className=" sm:h-[400px]" src={image} alt="Uploaded" />
        )}
      </div>

      {/* The fifth section */}
      <div className=" flex items-center justify-between">
        <div className="flex gap-5">
          <Like postId={postId} userEmail={userEmail} />
          <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
          <ShareIcon style={{ fontSize: "30px" }} />
        </div>

        <div className={`flex gap-2 ${checkCurrentUser() ? "flex" : "hidden"}`}>
          <DeletePost postId={postId} />
          <EditPost
            postId={postId}
            name={name}
            description={description}
            userEmail={userEmail}
            location={location}
            image={image}
            date={date}
            time={time}
            price={price}
          />
        </div>
      </div>
    </div>
  );
}
