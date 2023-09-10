"use client";
import Question from "@/app/components/template/Question";
import { adminRequest } from "@/app/lib/requestMethods";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function page({ params: { testId } }) {
  const [options, setOptions] = useState({});
  const [inputs, setInputs] = useState({
    answer: null,
  });

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

  // console.log(inputs, options);

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <div className="flex flex-col">
        <div className="mt-4">
          <div className="flex flex-col gap-y-2 col-span-1">
            <Question />
            <button className="bg-primary text-white rounded-md py-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
