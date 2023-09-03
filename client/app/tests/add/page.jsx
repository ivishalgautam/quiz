"use client";
import { postData } from "@/app/hooks/postData";
import { publicRequest } from "@/app/lib/requestMethods";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function AddTestPage() {
  const [levels, setLevels] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get("/levels");
        setLevels(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const resp = await postData("/tests", {
      name: inputRef.current.value,
    });

    if (resp.status === 200) {
      router.push("/tests");
    }
  }

  function handleDateChange(e) {
    console.log(new Date(e._d).toUTCString());
    console.log(e);
  }

  return (
    <section>
      <h2 className="section-heading">Add Level</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-3 gap-2">
          <div className="relative flex flex-col justify-end">
            <input
              type="name"
              id="name"
              className="my-input peer"
              placeholder="Name"
              autoComplete="off"
            />
            <label htmlFor="name" className="my-label">
              Test Name
            </label>
          </div>

          <div className="relative flex flex-col justify-end">
            <select name="level" id="level" className="my-input">
              <option hidden></option>
              {levels?.map((level) => {
                return (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="level" className="my-label">
              Level
            </label>
          </div>

          <div className="relative flex flex-col justify-end">
            <select name="test_type" id="level" className="my-input">
              <option hidden></option>
              <option value="practice">Practice</option>
              <option value="competition">Competition</option>
            </select>
            <label htmlFor="test_type" className="my-label">
              Test type
            </label>
          </div>

          <div className="relative flex flex-col justify-end">
            <Datetime
              value={selectedDate}
              onChange={handleDateChange}
              className=""
              utc={true}
            />
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button className="bg-emerald-500 rounded-md py-1 mt-4 px-3 text-white">
            Create Test
          </button>
        </div>
      </form>
    </section>
  );
}
