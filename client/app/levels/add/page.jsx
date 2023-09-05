"use client";
import { postData } from "@/app/hooks/postData";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";

export default function AddLevelPage() {
  const inputRef = useRef();
  const router = useRouter();
  async function handleFormSubmit(e) {
    e.preventDefault();
    const { message } = await postData("/levels", {
      name: inputRef.current.value,
    });
    if (message) {
      toast.success(message);
      router.push("/levels");
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
            autocomplete="off"
            ref={inputRef}
          />
          <label for="name" className="my-label">
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
