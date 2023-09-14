"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { publicRequest } from "../lib/requestMethods";

export default function Registration() {
  const router = useRouter();

  const [inputVals, setInputVals] = useState({
    fullname: "",
    email: "",
    phone: "",
    gaurdian_name: "",
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post("/leads", {
        ...inputVals,
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
        // router.push("/admin/students");
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section>
      <h2 className="section-heading">Create Student</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-3 gap-2">
          {/* fullname */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="my-input peer"
              placeholder=""
              autoComplete="off"
              onChange={handleOnChange}
            />
            <label htmlFor="fullname" className="my-label">
              Fullname
            </label>
          </div>

          {/* email */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="email"
              name="email"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="email" className="my-label">
              Email
            </label>
          </div>

          {/* phone */}
          <div className="relative flex flex-col justify-end">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="phone" className="my-label">
              Phone
            </label>
          </div>

          {/* Gaurdian name */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="gaurdian_name"
              name="gaurdian_name"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="gaurdian_name" className="my-label">
              Gaurdian Name
            </label>
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button className="bg-emerald-500 rounded-md py-1 mt-4 px-3 text-white">
            Create Student
          </button>
        </div>
      </form>
    </section>
  );
}
