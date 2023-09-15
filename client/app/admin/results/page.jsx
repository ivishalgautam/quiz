"use client";
import ResultTable from "@/app/components/ui/tables/ResultTable";
import { getCookie } from "@/app/lib/cookies";
import { adminRequest } from "@/app/lib/requestMethods";
import React, { useEffect } from "react";

export default function Results() {
  return (
    <section>
      <h2 className="section-heading">Results</h2>
      <ResultTable />
    </section>
  );
}
