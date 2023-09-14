"use client";
import React, { useEffect } from "react";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useRouter } from "next/navigation";
import { clearAllCookies, getCookie } from "../lib/cookies";

export default function AdminLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("token")) {
      clearAllCookies();
      return router.push("/auth/login/admin");
    }
  }, []);

  return (
    <main className="h-screen">
      <section className="grid grid-cols-5 h-full">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4 bg-gray-100 p-8">{children}</div>
      </section>
    </main>
  );
}
