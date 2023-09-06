import React from "react";
import { publicRequest } from "../lib/requestMethods";

const page = async () => {
  const { data } = await publicRequest.get("/tests");
  return (
    <section>
      {data?.map((test) => {
        return (
          <>
            <p>{JSON.stringify(test)}</p>
            <div className="bg-white p-6 w-[30rem] rounded-md">
              <div className="pb-4 flex items-center justify-between font-bold text-xl">
                <div className="capitalize">{`${test.test_type} test`}</div>
                <div>{`Time duration: ${test.duration}`}</div>
              </div>
              <table className="w-full">
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
                    <th className="py-2 bg-gray-300 w-[30%]">Test date time</th>
                    <td className="p-2 w-[70%]">
                      {new Date(test.start_time).toUTCString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </section>
  );
};

export default page;
