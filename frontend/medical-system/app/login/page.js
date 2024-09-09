"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(email, password);
      console.log(response.data);
      alert("Login successful");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[500px] h-[600px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-2xl font-bold">
            Log In to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
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
            </div>
          </form>
          <div className="flex justify-between mt-5">
            <Link href="/signup" className="text-sm text-gray-800">
              No account? Create one here
            </Link>
            <Link href="/forgot-password" className="text-sm text-gray-80">
              Forgot password?
            </Link>
          </div>
        </CardContent>

        <CardFooter>
          {!email.includes("@") || !password ? (
            <Button type="submit" className="w-full" disabled>
              Login
            </Button>
          ) : (
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default LogIn;
