"use client";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function SignUp() {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-5 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">SignUp</h1>
        {/* Sign up with Google */}
        <button
          onClick={() => signIn("google")}
          className="flex gap-2 px-6 sm:px-0 items-center justify-center p-4 bg-red-600 text-white sm:w-[400px] rounded-lg font-semibold"
        >
          SignUp with Google
          <GoogleIcon />
        </button>

        {/* Sign up with Facebook */}
        <button className="flex gap-2 items-center justify-center p-4 bg-blue-600 text-white sm:w-[400px] rounded-lg font-semibold">
          SignUp with Facebook
          <FacebookIcon />
        </button>
      </div>
    );
  }
}
