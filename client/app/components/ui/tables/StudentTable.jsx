"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-hot-toast";

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const resp = await adminRequest.get("/students");
      console.log(resp.data);
      setStudents(resp.data);
    }
    getStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = confirm("Please confirm to delete.");

    if (confirmation) {
      const resp = await adminRequest.delete(`/students/${id}`);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setStudents((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const generateCredentials = async (studentId) => {
    try {
      const resp = await adminRequest.post(`/credentials/${studentId}`);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mb-4 flex justify-end">
        <Link
          href={`/admin/students/add`}
          className="bg-emerald-500 rounded-md py-1 px-3 text-white"
        >
          Add Student
        </Link>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Credentials</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {students?.length <= 0 ? (
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
            students?.map((student) => {
              return (
                <Table.Row key={student.id}>
                  <Table.RowHeaderCell>{student.id}</Table.RowHeaderCell>
                  <Table.Cell>{`${student.firstname} ${student.lastname}`}</Table.Cell>
                  <Table.Cell>{student.email}</Table.Cell>
                  <Table.Cell>{student.phone}</Table.Cell>
                  <Table.Cell>{student.city}</Table.Cell>
                  <Table.Cell>
                    {new Date(student.created_at).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {student.credentials_created ? (
                      <button className="bg-primary px-3 py-1 rounded text-white">
                        Already created
                      </button>
                    ) : (
                      <button
                        className="bg-primary px-3 py-1 rounded text-white"
                        onClick={() => generateCredentials(student.id)}
                      >
                        Create
                      </button>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/admin/students/update/${student.id}`}>
                        <BsPencilSquare size={20} />
                      </Link>
                      <button>
                        <AiOutlineDelete
                          size={20}
                          className="text-rose-500"
                          onClick={() => handleDelete(student.id)}
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
