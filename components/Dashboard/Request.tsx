import { Console } from "console";

interface postIdProps {
  postId: string;
  userEmail: string;
}

export default function Request({ postId, userEmail }: postIdProps) {
  //Handel click function to create a new join request
  const handleClick = async () => {
    try {
      const response = await fetch("api/join-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userEmail }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Successfully sent join request");

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);

      alert("Failed to send the join request");
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="p-2 bg-blue-600 rounded-lg text-white text-sm"
      >
        Request to join
      </button>
    </div>
  );
}
