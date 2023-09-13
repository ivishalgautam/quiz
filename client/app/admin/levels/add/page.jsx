"use client";
import { getCookie } from "@/app/lib/cookies";
import { publicRequest } from "@/app/lib/requestMethods";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";

export default function AddLevelPage() {
  const inputRef = useRef();
  const router = useRouter();
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return toast.error("Please enter level!");
    }
    try {
      const resp = await publicRequest.post(
        "/levels",
        {
          name: inputRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(resp);
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  return (
    <section>
      <h2 className="section-heading">Add Level</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="relative flex flex-col justify-end">
          <input
            type="name"
            id="name"
            className="my-input peer"
            placeholder="Level"
            autoComplete="off"
            ref={inputRef}
          />
          <label htmlFor="name" className="my-label">
            Level
          </label>
        </div>
        <div className="mb-4 flex justify-end">
          <button className="bg-emerald-500 rounded-md py-1 mt-4 px-3 text-white">
            Create level
          </button>
        </div>
      </form>
    </section>
  );
}
