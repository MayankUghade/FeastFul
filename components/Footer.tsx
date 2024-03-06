import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-md text-gray-500 dark:text-gray-400 md:ml-10">
        © 2024 FeastFul Inc. All rights reserved.
      </p>
      <div className="sm:ml-auto flex gap-3 sm:gap-6 md:mr-10">
        <InstagramIcon />
        <XIcon />
        <FacebookIcon />
        <RedditIcon />
      </div>
    </footer>
  );
}
