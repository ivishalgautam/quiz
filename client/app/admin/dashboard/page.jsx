"use client";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";

export default function page() {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const resp = await adminRequest.get("/dashboard/details", {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        console.log(resp.data);
        setDetails(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="h-full">
      <div className="rounded-md bg-white shadow h-full">
        <div className="grid grid-cols-3 gap-4 p-4 text-white">
          <div className="dashboard-mini-card bg-blue-400">
            <h2>Total students:</h2>
            <p>{details?.total_students}</p>
          </div>
          <div className="dashboard-mini-card bg-emerald-400">
            <h2>Abacus students:</h2>
            <p>{details?.abacus_students}</p>
          </div>
          <div className="dashboard-mini-card bg-rose-400">
            <h2>Vedic students:</h2>
            <p>{details?.vedic_students}</p>
          </div>
          <div className="dashboard-mini-card bg-indigo-400">
            <h2>Subscribed students:</h2>
            <p>{details?.subscribed_students}</p>
          </div>
          <div className="dashboard-mini-card bg-orange-400">
            <h2>Golden students:</h2>
            <p>{details?.golden_students}</p>
          </div>
          <div className="dashboard-mini-card bg-violet-400">
            <h2>Diamond students:</h2>
            <p>{details?.diamond_students}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
