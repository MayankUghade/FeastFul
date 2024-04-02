"use client";

import Post from "@/components/Dashboard/Post";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LikedPosts() {
  const { data } = useSession();
  const [likedPosts, setlikedPosts] = useState([]);

  const userName = data?.user?.name;
  const userEmail = data?.user?.email;

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const response = await fetch(`api/postLikes?userEmail=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setlikedPosts(data);
    };
    fetchLikedPosts();
  }, [likedPosts]);

  return (
    <div className="p-5">
      <div className="flex flex-col gap-7">
        <h1 className="md:text-4xl text-2xl text-left lg:mt-7 md:ml-10 font-bold">
          Hey {userName}! These are your liked posts
        </h1>

        <div className="w-full mt-5 flex flex-col gap-2 items-center justify-center">
          {likedPosts.map((items: any) => (
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
    </div>
  );
}
