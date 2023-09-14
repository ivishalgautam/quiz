"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { adminRequest, publicRequest } from "@/app/lib/requestMethods";
import { getCookie } from "@/app/lib/cookies";

export default function CreateStudentPage() {
  const [inputVals, setInputVals] = useState({
    fullname: "",
    email: "",
    phone: "",
    father_name: "",
    mother_name: "",
    dob: "",
    city: "",
    state: "",
    address: "",
    subject: "",
    level_id: "",
    package: "",
  });
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get("/admin/levels");
        setLevels(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const router = useRouter();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const resp = await adminRequest.post(
        "/students",
        {
          ...inputVals,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (resp.status === 200) {
        toast.success("Student created successfully.");
        router.push("/admin/students");
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

  console.log(inputVals);
  return (
    <section>
      <h2 className="section-heading">Create Student</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-3 gap-2">
          {/* subject */}
          <div className="relative flex flex-col justify-end">
            <select
              name="subject"
              id="subject"
              onChange={handleOnChange}
              className="my-input"
            >
              <option value="abacus">Abacus</option>
              <option value="vedic">Vedic</option>
            </select>
            <label htmlFor="subject" className="my-label">
              Subject
            </label>
          </div>

          {/* level */}
          <div className="relative flex flex-col justify-end">
            <select
              name="level_id"
              id="level_id"
              onChange={handleOnChange}
              className="my-input"
            >
              <option disabled>Select level</option>
              {levels.length <= 0 ? (
                <option disabled>Loading...</option>
              ) : (
                levels?.map((level) => {
                  return (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  );
                })
              )}
            </select>
            <label htmlFor="level_id" className="my-label">
              Level
            </label>
          </div>

          {/* package */}
          <div className="relative flex flex-col justify-end">
            <select
              name="package"
              id="package"
              onChange={handleOnChange}
              className="my-input"
            >
              <option disabled defaultValue>
                Select package
              </option>
              <option value="golden">Golden</option>
              <option value="diamond">Diamond</option>
            </select>
            <label htmlFor="package" className="my-label">
              Package
            </label>
          </div>

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

          {/* father name */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="father_name"
              name="father_name"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="father_name" className="my-label">
              Father Name
            </label>
          </div>

          {/* mother name */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="mother_name"
              name="mother_name"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="mother_name" className="my-label">
              Mother Name
            </label>
          </div>

          {/* dob */}
          <div className="relative flex flex-col justify-end">
            <input
              type="date"
              id="dob"
              name="dob"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="dob" className="my-label">
              Date Of Birth
            </label>
          </div>

          {/* city */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="city"
              name="city"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="city" className="my-label">
              City
            </label>
          </div>

          {/* state */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="state"
              name="state"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="state" className="my-label">
              State
            </label>
          </div>

          {/* address */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="Address"
              name="address"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="Address" className="my-label">
              Address
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
