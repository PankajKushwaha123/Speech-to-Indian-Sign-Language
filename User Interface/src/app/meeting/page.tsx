"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { FloatingDock } from "@/components/ui/floatingdock";
import { Mic, MicOff, Video,LogOut,MoreVertical,Subtitles } from "lucide-react";
export default function Meeting() {
  const items=[{title:"Mic",href:"https://www.youtube.com", Icon:Mic},{title:"Video",href:"https://www.youtube.com", Icon:Video},{title:"Subtitles",href:"https://www.youtube.com", Icon:Subtitles},{title:"More details",href:"https://www.youtube.com", Icon:MoreVertical},{title:"Exit",href:"https://www.youtube.com", Icon:LogOut}]
  return (
   <div className="h-screen w-screen  p-5">
    <div className="relative w-[100%] h-[100%] bg-red-300 ">
        <div className="absolute bottom-2 inset-x-1/3">
        <div className=" flex flex-row w-full">
            <FloatingDock items={items}/>
        </div>
        </div>
    </div>

   </div>
     
  );
}
