import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import toast, { Toaster } from "react-hot-toast";

interface Deletefunction {
  postId: string;
}

export default function DeletePost({ postId }: Deletefunction) {
  const handleDelete = async () => {
    try {
      alert("Do you want to delete the post ??");
      const response = await fetch("api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <DeleteOutlineOutlinedIcon
        className="text-red-500"
        style={{ fontSize: "30px" }}
        onClick={handleDelete}
      />
    </div>
  );
}
