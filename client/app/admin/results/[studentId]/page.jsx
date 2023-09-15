"use client";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest } from "@/app/lib/requestMethods";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";

export default function StudentResultTable({ params: { studentId } }) {
  const [results, setResults] = useState([]);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  async function getResults(id) {
    try {
      const resp = await adminRequest.get(`/results/${id}`, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      setResults(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getResults(studentId);
  }, []);

  async function handleSearch(id) {
    try {
      const resp = await adminRequest.get(`/results/${id}`, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      const filtereData = resp.data
        .filter(
          (item) =>
            new Date(item.created_at).toLocaleDateString() >=
            new Date(date.startDate).toLocaleDateString()
        )
        .filter(
          (item) =>
            new Date(item.created_at).toLocaleDateString() <=
            new Date(date.endDate).toLocaleDateString()
        );
      setResults(filtereData);
      console.log(filtereData);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      name: "Id",
      selector: (row, key) => key + 1,
      width: "4rem",
      sortable: true,
    },
    {
      name: "Student Name",
      selector: (row) => row.fullname,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Test Name",
      selector: (row) => row.test_name,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Questions Attempted",
      selector: (row) => row.student_attempted,
      width: "10rem",
    },
    {
      name: "Total Questions",
      selector: (row) => row.total_questions,
      width: "10rem",
    },
    {
      name: "Student Points",
      selector: (row) => row.student_points,
    },
    {
      name: "Total Points",
      selector: (row) => row.total_points,
    },
    {
      name: "Created On",
      selector: (row) => new Date(row.created_at).toLocaleDateString(),
      width: "10rem",
    },
    {
      name: "Actions",
      selector: (row) => (
        <button className="bg-rose-500 group p-1 rounded hover:bg-white transition-all border hover:border-rose-500">
          <AiOutlineDelete
            size={20}
            className="text-white group-hover:text-rose-500"
            onClick={() => handleDelete(row.id)}
          />
        </button>
      ),
    },
  ];

  return (
    <div className="rounded">
      <div className="mb-4 flex items-center justify-between">
        <div className="inputGroup">
          <input
            type="date"
            onChange={(e) =>
              setDate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            name="startDate"
          />
        </div>
        <div className="inputGroup">
          <input
            type="date"
            onChange={(e) =>
              setDate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            name="endDate"
          />
        </div>
        <button onClick={() => handleSearch(studentId)}>Search</button>
      </div>

      <DataTable columns={columns} data={results} pagination />
    </div>
  );
}
