"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function TestTable() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function getTests() {
      const resp = await adminRequest.get("/tests");
      console.log(resp.data);
      setTests(resp.data);
    }
    getTests();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = confirm("Please confirm to delete.");

    if (confirmation) {
      const resp = await adminRequest.delete(`/tests/${id}`);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setTests((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  async function updateTest({ id, data }) {
    setTests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, is_published: data.is_published };
        }
        return item;
      })
    );
    try {
      const resp = await adminRequest.put(`/tests/${id}`, { ...data });

      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred while updating!");
      setTests((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, is_published: !data.is_published };
          }
          return item;
        })
      );
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <Link
          href={`/admin/tests/add`}
          className="bg-emerald-500 rounded-md py-1 px-3 text-white"
        >
          Add new test
        </Link>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Level</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Published</Table.ColumnHeaderCell>
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
                  <Table.Cell>{test.subject}</Table.Cell>
                  <Table.Cell>
                    {new Date(test.start_time).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(test.created_at).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={test.is_published}
                        onChange={(e) => {
                          updateTest({
                            id: test.id,
                            data: { is_published: e.target.checked },
                          });
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/questions/add/${test.id}`}
                        className="bg-primary rounded px-2 text-white"
                      >
                        Add questions
                      </Link>
                      <button>
                        <AiOutlineDelete
                          size={20}
                          className="text-rose-500"
                          onClick={() => handleDelete(test.id)}
                        />
                      </button>
                    </div>
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
