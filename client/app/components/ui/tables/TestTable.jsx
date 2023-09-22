"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";

export default function TestTable() {
  const [tests, setTests] = useState([]);
  async function getTests() {
    const resp = await adminRequest.get("/tests");
    // console.log(resp.data);
    setTests(resp.data);
  }

  useEffect(() => {
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

      // console.log(resp.data);
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "3rem",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "15%",
    },
    {
      name: "Questions",
      selector: (row) => row.total_questions ?? 0,
      width: "5.6rem",
    },
    {
      name: "Grade",
      selector: (row) => row.grade,
      width: "4rem",
    },
    {
      name: "Test type",
      selector: (row) => row.test_type,
      width: "7rem",
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      width: "5rem",
    },
    {
      name: "Start time",
      selector: (row) => new Date(row.start_time).toLocaleString(),
      width: "11rem",
    },
    {
      name: "End time",
      selector: (row) => new Date(row.end_time).toLocaleString(),
      width: "11rem",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toDateString(),
      width: "8rem",
    },
    {
      name: "Published",

      selector: (row) => (
        <label className="switch">
          <input
            type="checkbox"
            checked={row.is_published}
            onChange={(e) => {
              updateTest({
                id: row.id,
                data: { is_published: e.target.checked },
              });
            }}
          />
          <span className="slider"></span>
        </label>
      ),
      width: "6rem",
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/admin/questions/add/${row.id}`}
            className="bg-primary rounded px-2 py-1 text-white"
          >
            Add questions
          </Link>
          <Link
            href={`/admin/tests/update/${row.id}`}
            className="bg-primary rounded px-2 py-1 text-white"
          >
            update
          </Link>
          <button className="bg-rose-500 group p-1 rounded hover:bg-white transition-all border hover:border-rose-500">
            <AiOutlineDelete
              size={20}
              className="text-white group-hover:text-rose-500"
              onClick={() => handleDelete(row.id)}
            />
          </button>
        </div>
      ),
      width: "30%",
    },
  ];

  const customStyles = {
    title: {
      style: {
        fontSize: "32px",
        fontWeight: 700,
      },
    },
    rows: {
      style: {
        fontSize: "12px",
        fontWeight: 500,
        minHeight: "50px",
        width: "auto",
      },
    },
  };

  function handleSearch(value) {
    const inputValue = value.toLowerCase();

    if (inputValue === "") {
      getTests();
    } else {
      const data = tests.filter((item) =>
        item.name.toLowerCase().includes(inputValue)
      );
      setTests(data);
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="relative">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="search"
              name="search"
              className="my-input peer"
            />
            <label htmlFor="search" className="my-label">
              Search
            </label>
          </div>
        </div>
        <div>
          <Link
            href={`/admin/tests/add`}
            className="bg-emerald-500 rounded-md py-1 px-3 text-white"
          >
            Add new test
          </Link>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={tests}
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
}
