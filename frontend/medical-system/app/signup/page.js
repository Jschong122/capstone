"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [gender, setGender] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/signup", {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data);
        setErrorMsg(error.response.data.message);
      } else {
        console.log("Something wrong when signup", error, error.status);
        setErrorMsg("Something wrong when signup");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[500px] h-[600px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-2xl font-bold ">
            Create an account
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* role */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="role">Are you a doctor or a patient?</Label>
                <select
                  className="bg-gray-100 p-2 rounded-md"
                  name=" role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value=""> Select your role </option>
                  <option value="doctor"> Doctor </option>
                  <option value="patient"> Patient </option>
                </select>
              </div>
              {/* doctor specialization */}
              <div className="flex flex-col space-y-1.5">
                {role === "doctor" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="specialization" className="flex flex-col">
                      Specialization
                      <select
                        className="flex flex-col space-y-1.5 p-3 bg-gray-100 rounded-md"
                        name="specialization"
                        id="specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                      >
                        <option value="">select your specialization</option>
                        <option value="Cardiologist"> Cardiologist </option>
                        <option value="Dermatologist"> Dermatologist </option>
                        <option value="Hematologist"> Hematologist </option>
                      </select>
                    </Label>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                {role === "Patient" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      className="flex flex-col space-y-1.5 p-3 bg-gray-100 rounded-md"
                      name="gender"
                      id="gender"
                      type="select"
                      placeholder="Enter your gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">select your gender</option>
                      <option value="Male"> Male </option>
                      <option value="Female"> Female </option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center">
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {!password ||
            !role ||
            !email.includes("@") ||
            (role === "patient" && role === "doctor") ? (
              <Button type="submit" className="w-full" disabled>
                create account
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                create account
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
