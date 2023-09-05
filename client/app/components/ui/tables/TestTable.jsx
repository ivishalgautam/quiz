"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { publicRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function TestTable() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const resp = await publicRequest.get("/tests");
      console.log(resp.data);
      setTests(resp.data);
    }
    getStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = confirm("Please confirm to delete.");

    if (confirmation) {
      const resp = await publicRequest.delete(`/tests/${id}`);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setStudents((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  async function updateTest({ id, data }) {
    console.log(data);
    try {
      const resp = await publicRequest.put(`/tests/${id}`, { ...data });
      if (resp.status === 200) {
        setTests((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              return { ...item, is_disabled: data.is_disabled };
            }
            return item;
          })
        );
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/questions/add-questions`}
          className="bg-emerald-500 rounded-md py-1 px-3 text-white"
        >
          Add question
        </Link>
        <Link
          href={`/tests/add`}
          className="bg-emerald-500 rounded-md py-1 px-3 text-white"
        >
          Add new test
        </Link>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Level</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Disabled</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tests?.length <= 0 ? (
            <Table.Row>
              <Table.Cell>No data found!</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ) : (
            tests?.map((test) => {
              return (
                <Table.Row key={test.id}>
                  <Table.RowHeaderCell>{test.id}</Table.RowHeaderCell>
                  <Table.Cell>{test.name}</Table.Cell>
                  <Table.Cell>{test.level}</Table.Cell>
                  <Table.Cell>{test.test_type}</Table.Cell>
                  <Table.Cell>
                    {new Date(test.start_time).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(test.created_at).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked={test.is_disabled}
                        onChange={(e) => {
                          updateTest({
                            id: test.id,
                            data: { is_disabled: e.target.checked },
                          });
                        }}
                      />
                      <span class="slider"></span>
                    </label>
                  </Table.Cell>
                  <Table.Cell>
                    <button>
                      <AiOutlineDelete
                        size={20}
                        className="text-rose-500"
                        onClick={() => handleDelete(student.id)}
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
