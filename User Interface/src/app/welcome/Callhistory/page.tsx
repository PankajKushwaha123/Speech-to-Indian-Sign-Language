"use client"
import { FC } from "react";
import  DemoPage  from "@/customComponents/history_table/page";


const CallHistory: FC = () => {
  return (
    <div className="flex flex-col bg-amber-50 h-[90%] w-full m-10 gap-y-4">
      <div className="basis-full  h-20"> <section className="text-2xl font-bold">Call History</section>

      </div>
      <DemoPage/>
    </div>
  );
};

export default CallHistory;
