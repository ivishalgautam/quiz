"use client";
import React, { useEffect } from "react";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useRouter } from "next/navigation";
import { clearAllCookies, getCookie } from "../lib/cookies";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  // display: "swap",
});

export default function AdminLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("token")) {
      clearAllCookies();
      return router.push("/auth/login/admin");
    }
  }, []);

  return (
    <main className={`${poppins.className} h-screen`}>
      <section className="grid grid-cols-5 h-full">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4 bg-gray-100 p-8">{children}</div>
      </section>
    </main>
  );
}
