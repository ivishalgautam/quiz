"use client";
import React, { useEffect } from "react";
import StudentSidebar from "../components/sidebar/StudentSidebar";
import { getCookie } from "../lib/cookies";
import { useRouter } from "next/navigation";

export default function StudentLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("student_id")) {
      return router.push("/auth/login");
    }
  }, []);

  return (
    <main className="h-screen">
      <section className="grid grid-cols-5 h-full">
        <div className="col-span-1">
          <StudentSidebar />
        </div>
        <div className="col-span-4 bg-gray-100 p-8">{children}</div>
      </section>
    </main>
  );
}
