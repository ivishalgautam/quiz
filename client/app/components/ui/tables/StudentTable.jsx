"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { getCookie } from "@/app/lib/cookies";

import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";

registerAllModules();
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  async function getStudents() {
    const resp = await adminRequest.get("/students", {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    console.log(resp.data);
    setStudents(resp.data);
  }

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = confirm("Please confirm to delete.");

    if (confirmation) {
      const resp = await adminRequest.delete(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setStudents((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  async function generateCredentials(studentId) {
    try {
      const resp = await adminRequest.post(`/credentials/${studentId}`, null, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
        console.log(resp.data);
        setStudents((prev) =>
          prev.map((item) => {
            if (item.id === studentId) {
              return { ...item, is_subscribed: true };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStudent({ id, data }) {
    setStudents((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, is_disabled: data.is_disabled };
        }
        return item;
      })
    );

    try {
      const resp = await adminRequest.put(
        `/students/${id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred while updating!");
      setStudents((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, is_subscribed: !data.is_subscribed };
          }
          return item;
        })
      );
    }
  }

  const data = [
    { id: 1, name: "Ted Right", address: "" },
    { id: 2, name: "Frank Honest", address: "" },
    { id: 3, name: "Joan Well", address: "" },
    { id: 4, name: "Gail Polite", address: "" },
    { id: 5, name: "Michael Fair", address: "" },
  ];

  return (
    <>
      <div className="mb-4 flex justify-between">
        <div>
          <div className="inputGroup">
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              placeholder="search"
              name="search"
            />
          </div>
        </div>
        <div>
          <Link
            href={`/admin/students/add`}
            className="bg-emerald-500 rounded-md py-1 px-3 text-white"
          >
            Add Student
          </Link>
        </div>
      </div>
      <HotTable
        data={students}
        rowHeaders={true}
        filters={true}
        colHeaders={[
          "Company name",
          "Name",
          "Sell date",
          "In stock",
          "Qty",
          "Progress",
          "Rating",
          "Order ID",
          "Country",
          "asdasdasd",
        ]}
        height="auto"
        dropdownMenu={true}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      />
      {/* <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Disable</Table.ColumnHeaderCell>
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
            students?.map((student, key) => {
              return (
                <Table.Row key={student.id}>
                  <Table.RowHeaderCell>{key + 1}</Table.RowHeaderCell>
                  <Table.Cell>{`${student.firstname} ${student.lastname}`}</Table.Cell>
                  <Table.Cell>{student.email}</Table.Cell>
                  <Table.Cell>{student.phone}</Table.Cell>
                  <Table.Cell>{student.city}</Table.Cell>
                  <Table.Cell>
                    {new Date(student.created_at).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={student.is_disabled}
                        onChange={(e) => {
                          updateStudent({
                            id: student.id,
                            data: { is_disabled: e.target.checked },
                          });
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                  </Table.Cell>
                  <Table.Cell>
                    {student.credentials_created ? (
                      <button className="bg-primary px-3 py-1 rounded text-white">
                        Already created
                      </button>
                    ) : (
                      <button
                        type="button"
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
      </Table.Root> */}
    </>
  );
}
