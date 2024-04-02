import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { CreatePost } from "./CreatePost";
import { useEffect, useState } from "react";

import Post from "./Post";

export default function Content() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPostData(data.reverse());
    };

    fetchData();
  }, [postData]);

  return (
    <div className="lg:p-10 p-5 flex flex-col gap-2 items-center justify-center">
      <div className="lg:hidden fixed bottom-5 right-5">
        <CreatePost />
      </div>

      <div className="p-2 border-2 border-gray-500 rounded-xl w-full md:w-[600px] lg:w-[790px] flex items-center">
        <SearchRoundedIcon className="mr-2" />
        <input
          className="p-2 flex-1 focus:outline-none bg-transparent"
          type="text"
          placeholder="Search"
        />
        <button className="p-2 bg-green-500 rounded-lg text-white">
          <SendRoundedIcon />
        </button>
      </div>

      <div className="w-full mt-5 flex flex-col gap-2 items-center justify-center">
        {postData.map((items: any) => (
          <Post
            key={items.id}
            postId={items.id}
            name={items.name}
            description={items.description}
            userEmail={items.userEmail}
            location={items.location}
            image={items.image}
            time={items.time}
            date={items.date}
            price={items.price}
          />
        ))}
      </div>
    </div>
  );
}
