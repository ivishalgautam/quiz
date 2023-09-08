"use client";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";

export default function ResultPage({ params: { studentId } }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/results/${studentId}`);
        setResults(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <section>
      {results?.splice(0, 1).map((result) => {
        return (
          <table className="w-full my-4" key={result.id}>
            <tbody className="flex flex-col items-start">
              <tr className="w-full flex border-b">
                <th className="py-2 bg-gray-300 w-[30%]">Your points</th>
                <td className="p-2 w-[70%]">{result.student_points}</td>
              </tr>
              <tr className="w-full flex border-b">
                <th className="py-2 bg-gray-300 w-[30%]">Total points</th>
                <td className="p-2 w-[70%]">{result.total_points}</td>
              </tr>
              <tr className="w-full flex border-b">
                <th className="py-2 bg-gray-300 w-[30%]">Question attempted</th>
                <td className="p-2 w-[70%]">{result.student_attempted}</td>
              </tr>
              <tr className="w-full flex border-b">
                <th className="py-2 bg-gray-300 w-[30%]">Total questions</th>
                <td className="p-2 w-[70%]">{result.total_questions}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </section>
  );
}
