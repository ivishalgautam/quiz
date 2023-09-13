"use client";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest, publicRequest } from "@/app/lib/requestMethods";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

export default function StudentUpdate({ params: { studentId } }) {
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
    subject: "",
    level_id: "",
    package: "",
  });
  const [levels, setLevels] = useState([]);
  //   console.log(inputVals);

  useEffect(() => {
    (async function () {
      try {
        const resp = await adminRequest.get(`/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        for (const [key, value] of Object.entries(resp.data)) {
          if (key in inputVals) {
            setInputVals((prev) => ({ ...prev, [key]: value }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();

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

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const resp = await adminRequest.put(
        `/students/${studentId}`,
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
        toast.success("Student updated successfully.");
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

  const handleDelete = async (id) => {
    const confirmation = confirm("Please confirm to delete.");

    if (confirmation) {
      const resp = await adminRequest.delete(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
        router.push("/admin/students");
      }
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="section-heading">Update Student</h2>
        <button onClick={() => handleDelete(studentId)}>
          <AiFillDelete
            className="text-rose-500 hover:scale-110 transition-transform"
            size={30}
          />
        </button>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-3 gap-2">
          {/* subject */}
          <div className="relative flex flex-col justify-end">
            <select
              name="subject"
              id="subject"
              onChange={handleOnChange}
              className="my-input"
              value={inputVals.subject}
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
              value={inputVals.level_id}
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
              value={inputVals.package}
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

          {/* firstname */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="my-input peer"
              placeholder="firstname"
              autoComplete="off"
              value={inputVals.firstname}
              onChange={handleOnChange}
            />
            <label htmlFor="firstname" className="my-label">
              Firstname
            </label>
          </div>

          {/* lastname */}
          <div className="relative flex flex-col justify-end">
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="my-input peer"
              placeholder=""
              autoComplete="off"
              value={inputVals.lastname}
              onChange={handleOnChange}
            />
            <label htmlFor="lastname" className="my-label">
              Lastname
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
              value={inputVals.email}
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
              value={inputVals.phone}
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
              value={inputVals.father_name}
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
              value={inputVals.mother_name}
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
              value={inputVals.dob.split("T")[0]}
              //   min={new Date()}
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
              value={inputVals.city}
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
              value={inputVals.state}
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
              value={inputVals.address}
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="Address" className="my-label">
              Address
            </label>
          </div>
        </div>

        <div className="mb-4">
          <button className="bg-emerald-500 rounded-md w-full mt-4 py-3 text-white">
            Update
          </button>
        </div>
      </form>
    </section>
  );
}
