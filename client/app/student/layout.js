"use client";
import React, { useEffect } from "react";
import StudentSidebar from "../components/sidebar/StudentSidebar";
import { clearAllCookies, getCookie } from "../lib/cookies";
import { useRouter } from "next/navigation";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  // display: "swap",
});

export default function StudentLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("student_id")) {
      clearAllCookies();
      return router.push("/auth/login/student");
    }
  }, []);

  return (
    <main className={`${poppins.className} h-screen`}>
      <section className="grid grid-cols-5 h-full">
        <div className="col-span-1">
          <StudentSidebar />
        </div>
        <div className="col-span-4 bg-gray-100 p-8">{children}</div>
      </section>
    </main>
  );
}
