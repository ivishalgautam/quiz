import Link from "next/link";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { CgNotes } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { clearAllCookies } from "@/app/lib/cookies";

const navList = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Tests",
    path: "/admin/tests",
    icon: <HiOutlinePencilAlt />,
  },
  {
    name: "Levels",
    path: "/admin/levels",
    icon: <CgNotes />,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: <ImProfile />,
  },
  {
    name: "Results",
    path: "/admin/results",
    icon: <ImProfile />,
  },
];

const AdminSidebar = () => {
  const router = useRouter();
  function handleLogout() {
    clearAllCookies();
    router.push("/auth/login/admin");
  }
  return (
    <aside className="w-full h-full bg-white shadow text-gray-900 space-y-4 p-4">
      <div>
        <h2 className="font-bold text-4xl text-center">logo</h2>
      </div>
      <div>
        <ul className="px-4 space-y-3">
          {navList.map((list, key) => {
            return (
              <li key={key}>
                <Link
                  className="text-[1.2rem] text-gray-500 hover:text-blue-950 transition-colors flex gap-2 items-center"
                  href={list.path}
                >
                  {list.icon}
                  {list.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className="w-full bg-primary align-middle rounded py-2 text-white mt-6"
          onClick={handleLogout}
        >
          Logout
          <FiLogOut className="inline ml-2" size={20} />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
