"use client";
import { getCookie } from "@/app/lib/cookies";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await publicRequest.get(
          `/results/${getCookie("student_id")}`
        );
        setResults(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section>
      <div>
        {results?.map((result) => {
          return (
            <table className="w-full my-4" key={result?.id}>
              <tbody className="flex flex-col items-start">
                <tr className="w-full flex border-b">
                  <th className="py-2 bg-gray-300 w-[30%]">Your points</th>
                  <td className="p-2 w-[70%]">{result?.student_points}</td>
                </tr>
                <tr className="w-full flex border-b">
                  <th className="py-2 bg-gray-300 w-[30%]">Total points</th>
                  <td className="p-2 w-[70%]">{result?.total_points}</td>
                </tr>
                <tr className="w-full flex border-b">
                  <th className="py-2 bg-gray-300 w-[30%]">
                    Question attempted
                  </th>
                  <td className="p-2 w-[70%]">{result?.student_attempted}</td>
                </tr>
                <tr className="w-full flex border-b">
                  <th className="py-2 bg-gray-300 w-[30%]">Total questions</th>
                  <td className="p-2 w-[70%]">{result?.total_questions}</td>
                </tr>
                <tr className="w-full flex border-b">
                  <th className="py-2 bg-gray-300 w-[30%]">Date and time</th>
                  <td className="p-2 w-[70%]">
                    {new Date(result?.created_at).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </section>
  );
}
