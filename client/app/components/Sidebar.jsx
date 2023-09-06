import Link from "next/link";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { CgNotes } from "react-icons/cg";

const navList = [
  {
    name: "Dashboard",
    path: "/",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Tests",
    path: "/tests",
    icon: <HiOutlinePencilAlt />,
  },
  {
    name: "Levels",
    path: "/levels",
    icon: <CgNotes />,
  },
  {
    name: "Students",
    path: "/students",
    icon: <ImProfile />,
  },
  {
    name: "My tests",
    path: "/my-tests",
    icon: <ImProfile />,
  },
];

const Sidebar = () => {
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
      </div>
    </aside>
  );
};

export default Sidebar;
