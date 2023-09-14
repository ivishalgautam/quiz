"use client";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest } from "@/app/lib/requestMethods";
import React, { useEffect } from "react";

export default function Results() {
  useEffect(() => {
    (async function () {
      try {
        const resp = await adminRequest.get("/results", {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return <section>Results</section>;
}
