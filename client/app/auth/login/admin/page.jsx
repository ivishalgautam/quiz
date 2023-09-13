"use client";
import { getCookie, setCookie } from "@/app/lib/cookies";
import { authRequest } from "@/app/lib/requestMethods";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { data, status } = await authRequest.post("/admin/login", {
        ...credentials,
      });

      if (status === 200) {
        toast.success("Logged in successfully");
        setCookie("email", data.email, 2);
        setCookie("token", data.access_token, 2);

        router.push("/admin/dashboard");
      }

      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  useEffect(() => {
    if (getCookie("token")) {
      return router.push("/admin/dashboard");
    }
  }, []);

  return (
    <section className="h-full flex items-center justify-center">
      <form onSubmit={handleFormSubmit}>
        <div className="max-w-lg bg-white shadow p-6 space-y-2 rounded-lg">
          {/* username */}
          <div className="relative">
            <input
              type="text"
              className="my-input peer"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
            <label htmlFor="email" className="my-label">
              Email
            </label>
          </div>

          {/* password */}
          <div className="relative">
            <input
              type="text"
              className="my-input peer"
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
            <label htmlFor="password" className="my-label">
              Password
            </label>
          </div>

          <button className="w-full py-3 rounded-md bg-primary">Login</button>
        </div>
      </form>
    </section>
  );
}
