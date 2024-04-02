import EditNoteIcon from "@mui/icons-material/EditNote";
import ImageIcon from "@mui/icons-material/Image";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

interface EditNote {
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

export default function EditPost({
  postId,
  name,
  description,
  userEmail,
  location,
  image,
  date,
  time,
  price,
}: EditNote) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(name);
  const [postImage, setPostImage] = useState(image);
  const [changedImage, setChangedImage] = useState<File | null>(null);
  const [postDescription, setPostDescription] = useState(description);
  const [address, setAddress] = useState(location);
  const [foodPrice, setFoodPrice] = useState<number>(price);
  const [specifiedDate, setSpecifiedDate] = useState<string>(date);
  const [requiredTime, setRequiredTime] = useState<string>(time);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setChangedImage(file);
      setPostImage(URL.createObjectURL(file)); // Update postImage with the URL
    } else {
      setPostImage(""); // Reset postImage if no file is selected
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postId,
          name: title,
          description: postDescription,
          location: address,
          price: foodPrice,
          date: specifiedDate,
          time: requiredTime,
          userEmail,
          image: postImage,
        }),
      });

      if (!response.ok) {
        throw new Error("There was an error while creating a new post");
      }

      const responseData = await response.json();
      toast.success("The data added successfully");

      window.location.reload();
      console.log(responseData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <EditNoteIcon
            className="text-blue-400"
            style={{ fontSize: "35px" }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-3xl">
          <form className="grid gap-4 p-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="food">
                Food
              </Label>
              <Input
                id="food"
                placeholder="E.g. Spaghetti Bolognese"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="image">
                Image
                <ImageIcon className="ml-2" />
              </Label>
              <div className="flex items-center">
                {image && (
                  <img
                    src={postImage}
                    alt="Previous Image"
                    className="w-16 h-16 mr-2 rounded"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter a description for your food."
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label
                  className="text-sm font-medium leading-none"
                  htmlFor="location"
                >
                  Add location (optional)
                </Label>
              </div>
              <Input
                id="location"
                placeholder="E.g. 123 Main St, Springfield, IL"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="Price">
                Price (optional)
              </Label>
              <Input
                type="number"
                id="Price"
                placeholder="$ 9.99"
                value={foodPrice.toString()}
                onChange={(e) => setFoodPrice(Number(e.target.value))}
                disabled={loading}
              />
            </div>
            <div className="flex gap-1 mt-4">
              <div>
                <h1 className="text-sm font-medium">Add Date</h1>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarMonthIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(new Date(date), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(specifiedDate)}
                      onSelect={(date: any) =>
                        setSpecifiedDate(date.toISOString())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mt-[-4px]">
                <Label className="text-sm font-medium" htmlFor="Time">
                  Time
                </Label>
                <Input
                  type="time"
                  id="Time"
                  value={requiredTime}
                  onChange={(e) => setRequiredTime(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            Update post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
