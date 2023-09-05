"use client";
import { postData } from "@/app/hooks/postData";
import { publicRequest } from "@/app/lib/requestMethods";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Datetime from "react-datetime";
import EditorJS from "@editorjs/editorjs";
import "react-datetime/css/react-datetime.css";

export default function AddTestPage() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const router = useRouter();
  const [levels, setLevels] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    name: "",
    level: "",
    test_type: "",
    start_time: null,
  });

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
    const resp = await publicRequest.post("/tests", { ...inputs });

    console.log(resp.data);
    if (resp.status === 200) {
      router.push("/tests");
    }
  }

  function handleDateChange(e) {
    const date = new Date(e._d).toISOString();
    setSelectedDate(new Date(e._d).setSeconds(0));
    setInputs((prev) => ({
      ...prev,
      start_time: date,
    }));
    // console.log(date);
  }
  console.log(inputs);

  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editorjs",

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {},
  });
  return (
    <section>
      <h2 className="section-heading">Add new test</h2>
      <form onSubmit={handleFormSubmit}>
        <div id="editorjs"></div>
        <div className="grid grid-cols-3 gap-2">
          <div className="relative flex flex-col justify-end">
            <input
              type="name"
              id="name"
              name="name"
              className="my-input peer"
              placeholder="Name"
              autoComplete="off"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label htmlFor="name" className="my-label">
              Test Name
            </label>
          </div>

          <div className="relative flex flex-col justify-end">
            <select
              id="level"
              name="level"
              className="my-input"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
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
            <select
              name="test_type"
              id="test_type"
              className="my-input"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
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
