"use client";
import { adminRequest, publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdAddCircleOutline } from "react-icons/md";

export default function page({ params: { testId } }) {
  const [inputLength, setInputLength] = useState(2);
  const [options, setOptions] = useState({});
  const [inputs, setInputs] = useState({
    answer: null,
  });
  // const [answer, setAnswer] = useState(null);
  console.log(inputs.values);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (inputs.answer === null && typeof inputs.answer !== "number") {
      return toast.error("Please enter valid answer!");
    }

    try {
      const resp = await adminRequest.post("/questions", {
        question: Object.values(options),
        answer: inputs.answer,
        testId,
      });

      if (resp.status === 200) {
        toast.success(resp.data.message);
        setInputLength(1);

        setOptions((prev) => resetValues(prev));
        setInputs({
          answer: null,
        });
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  function resetValues(obj) {
    const resetObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        resetObj[key] = "";
      }
    }
    return resetObj;
  }

  console.log(inputs, options);

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <div className="flex flex-col">
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
                <div className="relative flex flex-col justify-end" key={i}>
                  <input
                    name={i}
                    value={options.i}
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
