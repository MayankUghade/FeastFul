import { useState, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

//Icons import
import ImageIcon from "@mui/icons-material/Image";
import AddOutlined from "@mui/icons-material/AddOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

//Ui imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreatePost() {
  const { data } = useSession();
  const userEmail = data?.user?.email;

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (loading === true) {
        toast.loading("Adding data to the database....");
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          description: description,
          location: address,
          price: price,
          date: date?.toISOString(),
          time: time,
          userEmail: userEmail,
          image: image,
        }),
      });

      if (!response.ok) {
        throw new Error("There was an error while creating a new post");
      }

      await response.json();
      toast.success("The data added successfully");

      setLoading(false);
      setDialogOpen(false);
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setTitle("");
    setImage("");
    setDescription("");
    setAddress("");
    setPrice(0);
    setDate(undefined);
    setTime("");
  };

  return (
    <Dialog>
      {/* Button to trigger the create post feature */}
      <DialogTrigger>
        <div>
          <button
            className="p-3 bg-green-500 mt-5 w-full lg:flex hidden items-center text-white justify-center gap-2 rounded-lg"
            onClick={() => setDialogOpen(true)}
          >
            Create post
            <AddOutlined />
          </button>
          <div className="p-3 lg:hidden flex rounded-full bg-green-500 text-white">
            <AddOutlined />
          </div>
        </div>
      </DialogTrigger>

      {/* The content in the form */}
      <DialogContent className="sm:max-w-[425px]">
        {/* The title for form */}
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        {/* main form  */}
        <div className="w-full max-w-3xl">
          <form className="grid gap-4 p-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="food">
                Food
              </Label>
              <Input
                id="food"
                placeholder="E.g. Spaghetti Bolognese"
                required
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex flex-col">
              <div>
                <Label className="text-sm font-medium" htmlFor="image">
                  Image
                </Label>
              </div>

              <div className="flex items-center">
                {image && (
                  <img
                    src={image}
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
                required
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-">
              <Label className="text-sm font-medium" htmlFor="Price">
                Price (optional)
              </Label>
              <Input
                type="number"
                id="Price"
                placeholder="$ 9.99"
                onChange={(e) => setPrice(Number(e.target.value))}
                disabled={loading}
              />

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
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
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
                    onChange={(e) => setTime(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            Create post
          </Button>
        </DialogFooter>
        <Toaster position="top-center" reverseOrder={false} />
      </DialogContent>
    </Dialog>
  );
}
