"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DockItem {
  title: string;
  href: string;
  icon: string;
}

const items: DockItem[] = [
  { title: "Chrome", href: "https://www.youtube.com", icon: "safari" },
  { title: "Safari", href: "https://www.youtube.com", icon: "chrome" },
];


export default function Home() {
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className="flex flex-row h-screen bg-white">
      <div className="flex justify-center basis-1/3 pl-4 bg-amber-100 h-screen">
        <h1 className="text-xl font-bold">Welcome To Video Calling `{baseUrl}`App</h1>
      </div>
      <div className="flex justify-center basis-2/3 bg-amber-50 h-screen">
        <Tabs defaultValue="account" className="w-full p-[15%]">
          <TabsList className="ml-[35%]">
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="account">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your login details below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </CardContent>
              <CardContent>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Password" />
              </CardContent>
              <CardFooter>
                <Link href="/welcome">
                  <Button>Login</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="name">Full Name</Label>
                <Input type="text" id="name" placeholder="Full Name" />
              </CardContent>
              <CardContent>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </CardContent>
              <CardContent>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="New Password" />
              </CardContent>
              <CardContent>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" id="confirmPassword" placeholder="Confirm Password" />
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
