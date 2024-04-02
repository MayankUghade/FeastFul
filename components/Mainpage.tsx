import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Image from "next/image";
import FoodImage from "@/public/food.jpg";
import food2 from "@/public/food2.jpg";
import Link from "next/link";

export default function Mainpage() {
  return (
    <div className="flex flex-col gap-[80px] mb-10">
      <div className="sm:p-10 flex-1 flex-col p-3 h-screen items-center justify-between border-t-2 ">
        {/* This is the main title */}
        <div className="flex flex-col gap-3 lg:ml-[45px] mt-[20px]">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800 w-fit">
            Introducing
          </div>

          <h1 className="font-bold lg:text-7xl md:text-5xl text-3xl">
            Share Food 🍜 Share Love ❤️
          </h1>

          <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            <span className="text-green-500">FeastFul</span>: Where homemade
            creations unite, flavors abound, and communities thrive. Discover
            culinary treasures, share homemade delights, and join the feast to
            celebrate the joy of food together.
          </p>

          <Link
            href="/signup"
            className="px-5 py-2 bg-green-500 w-fit rounded-lg"
          >
            Explore
          </Link>
        </div>

        {/* This is the display image */}
        <div className="flex items-center justify-center mt-10">
          <Image
            className=" rounded-xl"
            src={FoodImage}
            alt="Food image"
            width="850"
            height="510"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        {/* the text description */}
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800 w-fit">
            Easy to use
          </div>

          <h1 className="font-bold lg:text-7xl md:text-5xl text-3xl">
            Discover the <span className="text-green-500">Delights</span>
          </h1>

          <p className="max-w-[800px] text-center text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
            FeastFul fosters connections among food enthusiasts, sharing
            homemade dishes, and discovering local culinary wonders.
          </p>
        </div>

        {/* image and features */}

        <div className="mt-10 mb-10 flex md:flex-row flex-col items-center justify-between gap-10 md:gap-[40] p-4">
          {/* features */}
          <div className="flex gap-5 md:gap-[50px] flex-col">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <CheckCircleOutlinedIcon className="text-green-500" />
                <h1 className="text-2xl font-bold">Sharing</h1>
              </div>

              <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
                Facilitate seamless sharing of homemade dishes among users
              </p>
            </div>

            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <CheckCircleOutlinedIcon className="text-green-500" />
                <h1 className="text-2xl font-bold">Discovery</h1>
              </div>
              <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
                Explore local culinary wonders and new homemade delights.
              </p>
            </div>

            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <CheckCircleOutlinedIcon className="text-green-500" />
                <h1 className="text-2xl font-bold">Community</h1>
              </div>
              <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
                Build a vibrant community of food lovers passionate about
                sharing and reducing food waste.
              </p>
            </div>
          </div>

          {/* image */}
          <div>
            <Image
              className="rounded-xl"
              src={food2}
              alt="food 2"
              width="510"
              height="510"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
