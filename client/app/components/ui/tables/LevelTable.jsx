"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest, publicRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { getCookie } from "@/app/lib/cookies";

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
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Level</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {levels?.length <= 0 ? (
            <Table.Row>
              <Table.Cell>No data found!</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ) : (
            levels?.map((level) => {
              return (
                <Table.Row key={level.id}>
                  <Table.RowHeaderCell>{level.id}</Table.RowHeaderCell>
                  <Table.Cell>{level.name}</Table.Cell>
                  <Table.Cell>
                    {new Date(level.created_at).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <button>
                      <AiOutlineDelete
                        size={20}
                        className="text-rose-500"
                        onClick={() => handleDelete(level.id)}
                      />
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
}
