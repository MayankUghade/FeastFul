"use client";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Dashboard from "@/components/Dashboard/Dashboard";
import Mainpage from "@/components/Mainpage";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      <div>
        <Navbar />
        <Mainpage />
        <Footer />
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}
