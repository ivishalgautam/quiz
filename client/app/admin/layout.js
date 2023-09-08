import React from "react";
import AdminSidebar from "../components/sidebar/AdminSidebar";

export default function AdminLayout({ children }) {
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
