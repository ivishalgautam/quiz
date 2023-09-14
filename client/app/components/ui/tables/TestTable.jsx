"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { adminRequest } from "@/app/lib/requestMethods";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { getCookie } from "@/app/lib/cookies";
import DataTable from "react-data-table-component";

export default function TestTable() {
  const [tests, setTests] = useState([]);
  async function getTests() {
    const resp = await adminRequest.get("/tests", {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    console.log(resp.data);
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
      const resp = await adminRequest.put(
        `/tests/${id}`,
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
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Questions",
      selector: (row) => row.total_questions ?? 0,
    },
    {
      name: "Level",
      selector: (row) => row.level,
    },
    {
      name: "Type",
      selector: (row) => row.test_type,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
    },
    {
      name: "Start time",
      selector: (row) => new Date(row.start_time).toLocaleString(),
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toDateString(),
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
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/admin/questions/add/${row.id}`}
            className="bg-primary rounded px-2 text-white"
          >
            Add questions
          </Link>
          <button>
            <AiOutlineDelete
              size={20}
              className="text-rose-500"
              onClick={() => handleDelete(row.id)}
            />
          </button>
        </div>
      ),
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
          <div className="inputGroup">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="search"
              name="search"
            />
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
      <DataTable
        columns={columns}
        data={tests}
        pagination
        customStyles={customStyles}
      />
    </>
  );
}
