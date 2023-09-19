"use client";
import React, { useEffect } from "react";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useRouter } from "next/navigation";
import { clearAllCookies, getCookie } from "../lib/cookies";
import { IoIosArrowBack } from "react-icons/io";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  // display: "swap",
});

export default function AdminLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return router.push("/auth/login/admin");
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={`${poppins.className} h-screen`}>
      <section className="grid grid-cols-5 h-full">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4 bg-gray-100 p-8">
          <div className="flex items-center justify-start mb-4">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-1 bg-primary rounded text-white px-2 py-1"
            >
              <IoIosArrowBack size={20} /> Go Back
            </button>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
