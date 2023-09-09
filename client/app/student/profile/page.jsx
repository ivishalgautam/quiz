"use client";
import { getCookie } from "@/app/lib/cookies";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [details, setDetails] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(
          `/students/${getCookie("student_id")}`
        );
        setDetails(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="h-full">
      <div className="grid grid-cols-2 gap-4 grid-rows-7 h-full">
        <div className="col-span-2 bg-white row-span-3 shadow-md rounded-md flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h5 className="text-2xl text-primary font-bold capitalize">{`${details?.firstname} ${details?.lastname}`}</h5>
            <p className="text-sm">{details?.email}</p>
            <button className="text-white bg-primary rounded p-1 px-3 mt-3">
              Change password
            </button>
          </div>
        </div>
        <div className="col-span-1 bg-white shadow-md rounded-md p-8">
          <h3 className="border-b pb-6 mb-6 font-bold text-lg">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-primary">Firstname</h4>
              <p className="text-sm capitalize">{details?.firstname}</p>
            </div>
            <div>
              <h4 className="font-bold text-primary">Lastname</h4>
              <p className="text-sm capitalize">{details?.lastname}</p>
            </div>
            <div>
              <h4 className="font-bold text-primary">Email</h4>
              <p className="text-sm">{details?.email}</p>
            </div>
            <div>
              <h4 className="font-bold text-primary">Phone</h4>
              <p className="text-sm">{details?.phone}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white shadow-md rounded-md p-8">
          <h3 className="border-b pb-6 mb-6 font-bold text-lg">
            Education Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-primary">Package</h4>
              <p className="text-sm capitalize">{details?.package}</p>
            </div>
            <div>
              <h4 className="font-bold text-primary">Level</h4>
              <p className="text-sm capitalize">{details?.level_id}</p>
            </div>
            <div>
              <h4 className="font-bold text-primary">Reg. date</h4>
              <p className="text-sm capitalize">
                {new Date(details?.created_at).toDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary">Course</h4>
              <p className="text-sm capitalize">{details?.course}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
