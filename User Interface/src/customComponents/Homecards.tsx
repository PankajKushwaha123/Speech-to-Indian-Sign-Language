import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface HomeCardProps {
  icon: React.ElementType;
  description: string;
  topic: string;
  link?: string;
}

export const HomeCard: React.FC<HomeCardProps> = ({ icon: Icon, description, topic, link = "/" }) => {
  return (
    <Link href={link}>
      <Card className="bg-red-400 w-full">
        <CardHeader>
          <CardTitle>
            <Icon size={50} color="white" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <CardDescription className="text-white">{description}</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm">{topic}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};
