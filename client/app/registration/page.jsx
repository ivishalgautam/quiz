"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { publicRequest } from "../lib/requestMethods";
import toast from "react-hot-toast";

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
        router.push("/registration/thank-you");
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="p-8 flex items-center justify-center h-full">
      <div>
        <h2 className="section-heading text-center text-emerald-800 mb-10 uppercase relative after:absolute after:-bottom-2 after:left-0 after:w-32 after:h-2 after:bg-primary">
          Registration form
        </h2>

        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto">
          <div className="grid grid-cols-1 gap-2">
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
                Fullname <span className="text-red-500">*</span>
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
                Email <span className="text-red-500">*</span>
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
                Phone <span className="text-red-500">*</span>
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
                Gaurdian Name <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button className="bg-emerald-500 rounded-md py-3 mt-4 text-white w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
