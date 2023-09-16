"use client";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest } from "@/app/lib/requestMethods";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export default function ResultTable() {
  const [results, setResults] = useState([]);

  async function getResults() {
    try {
      const resp = await adminRequest.get("/results", {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      setResults(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getResults();
  }, []);

  function handleSearch(e) {
    const inputValue = e.target.value.toLowerCase();

    if (inputValue === "") {
      getResults();
    } else {
      const data = results?.filter((item) =>
        item.fullname.toLowerCase().includes(inputValue)
      );
      setResults(data);
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
      selector: (row) => new Date(row.created_at).toDateString(),
      width: "10rem",
    },
    {
      name: "All Results",
      selector: (row) => (
        <Link href={`/admin/results/${row.student_id}`}>
          <FiExternalLink className="text-sky-500" size={20} />
        </Link>
      ),
      width: "10rem",
    },
  ];

  return (
    <div className="rounded">
      <div className="mb-4 flex justify-start">
        <div className="inputGroup">
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="search"
            name="search"
          />
        </div>
      </div>
      <div className="rounded-lg overflow-hidden">
        <DataTable columns={columns} data={results} pagination />
      </div>
    </div>
  );
}
