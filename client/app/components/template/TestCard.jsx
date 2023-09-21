"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function TestCard({ test }) {
  const router = useRouter();
  function handleNavigate(id) {
    router.replace(`/student/my-tests/instructions/${id}`);
  }
  return (
    <div className="bg-white p-6 max-w-[30rem] rounded-md gap-y-4">
      <div className="flex items-center justify-between font-bold text-xl">
        <div className="capitalize text-sm">{`${test.test_type} test`}</div>
        <div className="text-sm">{`Time duration: ${test.duration}`}</div>
      </div>
      <table className="w-full my-4">
        <tbody className="flex flex-col items-start">
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Id</th>
            <td className="p-2 w-[70%]">{test.id}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Name</th>
            <td className="p-2 w-[70%]">{test.name}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Grade</th>
            <td className="p-2 w-[70%]">{test.grade}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Type</th>
            <td className="p-2 w-[70%]">{test.test_type}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Test date time</th>
            <td className="p-2 w-[70%]">
              {new Date(test.start_time).toUTCString()}
            </td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Total questions</th>
            <td className="p-2 w-[70%]">{test.total_questions}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handleNavigate(test.id)}
          className="bg-primary hover:brightness-90 w-full rounded p-2 inline-block text-center text-white  font-bold"
        >
          Start test
        </button>
      </div>
    </div>
  );
}
