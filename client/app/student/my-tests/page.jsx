"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { publicRequest } from "@/app/lib/requestMethods";
import { getCookie } from "@/app/lib/cookies";

const page = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await publicRequest.get(
          `/tests/${getCookie("student_id")}`
        );
        console.log(data);
        setTests(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <section className="grid grid-cols-2">
        {tests.length <= 0 ? (
          <div>You don't have any test</div>
        ) : (
          tests?.map((test) => {
            return (
              <div
                key={test.id}
                className="bg-white p-6 max-w-[30rem] rounded-md gap-y-4"
              >
                <div className="flex items-center justify-between font-bold text-xl">
                  <div className="capitalize">{`${test.test_type} test`}</div>
                  <div>{`Time duration: ${test.duration}`}</div>
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
                      <th className="py-2 bg-gray-300 w-[30%]">Level</th>
                      <td className="p-2 w-[70%]">{test.level}</td>
                    </tr>
                    <tr className="w-full flex border-b">
                      <th className="py-2 bg-gray-300 w-[30%]">Type</th>
                      <td className="p-2 w-[70%]">{test.test_type}</td>
                    </tr>
                    <tr className="w-full flex border-b">
                      <th className="py-2 bg-gray-300 w-[30%]">
                        Test date time
                      </th>
                      <td className="p-2 w-[70%]">
                        {new Date(test.start_time).toUTCString()}
                      </td>
                    </tr>
                    <tr className="w-full flex border-b">
                      <th className="py-2 bg-gray-300 w-[30%]">
                        Total number questions
                      </th>
                      <td className="p-2 w-[70%]">{test.total_questions}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <Link
                    href={`/student/my-tests/${test.id}`}
                    className="bg-primary hover:brightness-90 w-full rounded p-2 inline-block text-center text-white  font-bold"
                  >
                    Start test
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
};

export default page;
