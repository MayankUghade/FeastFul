import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Like {
  postId: string;
  userEmail: string;
}

export default function Like({ postId }: Like) {
  const { data } = useSession();
  const [like, setLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const currentUserEmail = data?.user?.email;

  //function to check if the user is already liked the post or not
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/postLikes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
          }),
        });

        if (response.ok) {
          const likesData = await response.json();
          console.log(likesData); // Read response body once
          const currentUserLiked = likesData.some(
            (like: any) => like.userEmail === currentUserEmail
          );
          setLike(currentUserLiked);

          setTotalLikes(likesData.length);
        } else {
          console.error("Failed to fetch like status:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    fetchData();
  }, [like]);

  //handle like functionality
  const handleLike = async () => {
    try {
      const response = await fetch("api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userEmail: currentUserEmail,
        }),
      });

      if (response.ok) {
        setLike(true);
        setTotalLikes((prevLikes) => prevLikes + 1);
      } else {
        console.error("Failed to like the post:", response.statusText);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  //function to handle unlike functionality
  const handleUnlike = async () => {
    try {
      const body = {
        postId,
        userEmail: currentUserEmail,
      };

      const response = await fetch("api/like", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setLike(false);
        setTotalLikes((prevLikes) => prevLikes - 1);
      } else {
        console.error("Failed to unlike the post:", response.statusText);
      }
    } catch (error) {
      console.error("Error unliking the post:", error);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      {like ? (
        <FavoriteIcon
          style={{ fontSize: "30px", color: "red" }}
          onClick={handleUnlike}
        />
      ) : (
        <FavoriteBorderIcon style={{ fontSize: "30px" }} onClick={handleLike} />
      )}

      <h1>{totalLikes}</h1>
    </div>
  );
}
