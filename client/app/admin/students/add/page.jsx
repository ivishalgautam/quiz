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
    guardian_name: "",
    gender: "",
    dob: "",
    city: "",
    pincode: "",
    subject: "",
    grade: "",
    package: "",
  });
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const resp = await adminRequest.get("/grades", {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        setGrades(resp.data);
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

          {/* grade */}
          <div className="relative flex flex-col justify-end">
            <select
              name="grade"
              id="grade"
              onChange={handleOnChange}
              className="my-input"
            >
              <option disabled>Select grade</option>
              {grades.length <= 0 ? (
                <option disabled>No grade found</option>
              ) : (
                grades?.map((grade) => {
                  return (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  );
                })
              )}
            </select>
            <label htmlFor="grade" className="my-label">
              Grade
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
              <option value="dashboard">Dashboard</option>
              <option value="olympiad">Olympiad</option>
              <option value="polympiad">Practice Olympiad</option>
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

          {/* gender */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="gender"
              name="gender"
              className="my-input peer"
              placeholder=""
              autoComplete="off"
              onChange={handleOnChange}
            />
            <label htmlFor="gender" className="my-label">
              Gender
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

          {/* guardian name */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="guardian_name"
              name="guardian_name"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="guardian_name" className="my-label">
              Guardian Name
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

          {/* pincode */}
          <div className="relative flex flex-col justify-end">
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="my-input peer"
              placeholder=""
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="pincode" className="my-label">
              Pincode
            </label>
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button className="bg-emerald-500 rounded-md mt-4 py-3 text-white w-full">
            Create Student
          </button>
        </div>
      </form>
    </section>
  );
}
