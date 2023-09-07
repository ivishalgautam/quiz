"use client";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../lib/requestMethods";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateStudentPage() {
  const [inputVals, setInputVals] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    father_name: "",
    mother_name: "",
    dob: "",
    city: "",
    state: "",
    address: "",
    created_by: "",
    level_id: "",
  });
  const [levels, setLevels] = useState([]);

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

  const router = useRouter();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post("/students", { ...inputVals });
      if (resp.status === 200) {
        toast.success("Student created successfully.");
        router.push("/students");
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
          <div className="relative flex flex-col justify-end">
            <select
              name="created_by"
              id="created_by"
              onChange={handleOnChange}
              className="my-input"
            >
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
              <option value="student">Student</option>
            </select>
            <label htmlFor="created_by" className="my-label">
              Who are you?
            </label>
          </div>

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

          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="my-input peer"
              placeholder=""
              autoComplete="off"
              onChange={handleOnChange}
            />
            <label htmlFor="firstname" className="my-label">
              Firstname
            </label>
          </div>

          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="my-input peer"
              placeholder=""
              autoComplete="off"
              onChange={handleOnChange}
            />
            <label htmlFor="lastname" className="my-label">
              Lastname
            </label>
          </div>

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
