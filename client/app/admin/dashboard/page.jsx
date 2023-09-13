"use client";
import React from "react";

export default function page() {
  return (
    <section className="h-full">
      <div className="rounded-md bg-white shadow h-full">
        <div className="grid grid-cols-3 gap-4 p-4 text-white">
          <div className="dashboard-mini-card bg-blue-400">
            <h2>Total students:</h2>
            <p>100</p>
          </div>
          <div className="dashboard-mini-card bg-emerald-400">
            <h2>Abacus students:</h2>
            <p>100</p>
          </div>
          <div className="dashboard-mini-card bg-rose-400">
            <h2>Vedic students:</h2>
            <p>100</p>
          </div>
          <div className="dashboard-mini-card bg-indigo-400">
            <h2>Subscribed students:</h2>
            <p>100</p>
          </div>
          <div className="dashboard-mini-card bg-orange-400">
            <h2>Golden students:</h2>
            <p>100</p>
          </div>
          <div className="dashboard-mini-card bg-violet-400">
            <h2>Diamond students:</h2>
            <p>100</p>
          </div>
        </div>
      </div>
    </section>
  );
}
