"use client";
import Question from "@/app/components/Question";
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

export default function page() {
  const [inputLength, setInputLength] = useState(1);

  return (
    <div className="grid grid-cols-6">
      <div className="flex flex-col gap-y-2 col-span-1">
        <button
          onClick={() => setInputLength((prev) => prev + 1)}
          className="flex items-center justify-end"
        >
          <MdAddCircleOutline />
        </button>
        {Array.from({ length: inputLength }).map((_, i) => {
          return (
            <input
              type="text"
              className="bg-white text-gray-950"
              placeholder="type here"
            />
          );
        })}
      </div>
    </div>
  );
}
