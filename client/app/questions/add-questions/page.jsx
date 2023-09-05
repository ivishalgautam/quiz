"use client";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdAddCircleOutline } from "react-icons/md";

export default function page() {
  const [inputLength, setInputLength] = useState(2);
  const [tests, setTests] = useState([]);
  const [options, setOptions] = useState({});
  const [inputs, setInputs] = useState({
    answer: null,
    testId: null,
  });
  // const [answer, setAnswer] = useState(null);
  console.log(inputs.values);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (inputs.answer === null && typeof inputs.answer !== "number") {
      return toast.error("Please enter valid answer!");
    }

    try {
      const resp = await publicRequest.post("/questions", {
        question: Object.values(options),
        answer: inputs.answer,
        testId: inputs.testId,
      });

      if (resp.status === 200) {
        toast.success(resp.data.message);
        setInputLength(1);
        setOptions({});
        setInputs({
          answer: null,
          testId: null,
        });
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async function () {
      const resp = await publicRequest.get("/tests");
      setTests(resp.data);
      // console.log(resp.data);
    })();
  }, []);

  console.log(inputs, Object.values(options));

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <div className="flex flex-col">
        <div className="relative">
          <select
            className="my-input w-full"
            name="testId"
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, testId: e.target.value }))
            }
          >
            <option disabled defaultValue>
              Select test
            </option>
            {tests?.map((test) => {
              return (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="testId" className="my-label">
            Select test
          </label>
        </div>

        <div className="grid grid-cols-6 mt-4">
          <div className="flex flex-col gap-y-2 col-span-1">
            <button
              type="button"
              onClick={() => setInputLength((prev) => prev + 1)}
              className="flex items-center justify-end"
            >
              <MdAddCircleOutline size={30} />
            </button>

            {Array.from({ length: inputLength }).map((_, i) => {
              return (
                <div className="relative flex flex-col justify-end">
                  <input
                    key={i}
                    name={i}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    type="text"
                    className="my-input bg-white text-gray-950"
                    placeholder="type here"
                  />
                  <label htmlFor={i} className="my-label">
                    Value
                  </label>
                </div>
              );
            })}
            <div className="relative flex flex-col justify-end">
              <input
                type="text"
                id="answer"
                name="answer"
                className="my-input peer"
                placeholder=""
                autoComplete="off"
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    answer: parseInt(e.target.value),
                  }))
                }
              />
              <label htmlFor="answer" className="my-label">
                Answer
              </label>
            </div>
            <button className="bg-primary text-white rounded-md py-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
