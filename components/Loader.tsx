import Image from "next/image";
import loader from "@/public/loader.svg";
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={loader} alt="loader" />
    </div>
  );
}
