"use client";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";

import { PiStudentFill } from "react-icons/pi";

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
          {/* total */}
          <div className="dashboard-mini-card bg-blue-400">
            <div>
              <PiStudentFill size={50} />
            </div>
            <div>
              <h2>Total Students</h2>
              <p>{details?.total_students}</p>
            </div>
          </div>

          {/* abacus */}
          <div className="dashboard-mini-card bg-emerald-400">
            <div>
              <PiStudentFill size={50} />
            </div>
            <div>
              <h2>Abacus Students</h2>
              <p>{details?.abacus_students}</p>
            </div>
          </div>

          {/* vedic */}
          <div className="dashboard-mini-card bg-rose-400">
            <div>
              <PiStudentFill size={50} />
            </div>
            <div>
              <h2>Vedic Students</h2>
              <p>{details?.vedic_students}</p>
            </div>
          </div>

          {/* subscribed */}
          <div className="dashboard-mini-card bg-indigo-400">
            <div>
              <PiStudentFill size={50} />
            </div>
            <div>
              <h2>Subscribed Students</h2>
              <p>{details?.subscribed_students}</p>
            </div>
          </div>

          {/* golden */}
          <div className="dashboard-mini-card bg-orange-400">
            <div>
              <PiStudentFill size={50} />
            </div>
            <div>
              <h2>Golden Students</h2>
              <p>{details?.golden_students}</p>
            </div>
          </div>

          {/* diamond */}
          <div className="dashboard-mini-card bg-violet-400">
            <div>
              <PiStudentFill size={50} />
            </div>
            <div>
              <h2>Diamond Students</h2>
              <p>{details?.diamond_students}</p>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 p-4 text-white">
          <div className="bg-primary rounded-md">x</div>
          <div className="bg-primary rounded-md">x</div>
        </div> */}
      </div>
    </section>
  );
}
