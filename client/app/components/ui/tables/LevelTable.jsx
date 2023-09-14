"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest, publicRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { getCookie } from "@/app/lib/cookies";
import DataTable from "react-data-table-component";

export default function LevelTable() {
  const [levels, setlevels] = useState([]);
  useEffect(() => {
    async function getLevels() {
      const resp = await adminRequest.get("/levels");
      console.log(resp.data);
      setlevels(resp.data);
    }
    getLevels();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = confirm("Please confirm to delete.");

    if (confirmation) {
      const resp = await adminRequest.delete(`/levels/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setlevels((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Level",
      selector: (row) => row.name,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toDateString(),
    },
    {
      name: "Actions",
      selector: (row) => (
        <button>
          <AiOutlineDelete
            size={20}
            className="text-rose-500"
            onClick={() => handleDelete(row.id)}
          />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Link
          href={`/admin/levels/add`}
          className="bg-emerald-500 rounded-md py-1 px-3 text-white"
        >
          Add level
        </Link>
      </div>
      <DataTable columns={columns} data={levels} pagination />
    </>
  );
}
