"use client";
import Chart from "@/app/components/template/Chart";
import { getCookie } from "@/app/lib/cookies";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";

export default function page() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    getResults(getCookie("student_id"));
  }, []);

  async function getResults(studentId) {
    try {
      const resp = await publicRequest.get(`/results/${studentId}`);
      console.log(resp.data);
      setPoints(resp.data.map((item) => item.student_points));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      <Chart points={points} />
    </section>
  );
}
