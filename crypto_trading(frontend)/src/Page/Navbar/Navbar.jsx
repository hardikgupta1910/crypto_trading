import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { GripHorizontal, SearchIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { auth } = useSelector((store) => store);

  return (
    <div
      className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky
     top-0 left-0 right-0 flex  items-center  bg-white/5 backdrop-blur-sm rounded-md p-2"
    >
      <div className="flex items-center gap-3 ">
        <Sheet>
          {/* <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Menu className="text-foreground scale-150" />
            </Button>
          </SheetTrigger> */}

          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Menu className="text-foreground scale-150" />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-72 flex flex-col bg-white/5 backdrop-blur-md transition-transform duration-100 ease-in-out"
            side="left"
            style={{ transform: "translateZ(0)" }}
          >
            <SheetHeader className="p-0">
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <Avatar className=" w-15 h-15 ">
                    <AvatarImage
                      src="/images/trans_bg.png"
                      className="scale-140"
                    />
                  </Avatar>
                  <div>
                    <span
                      className="font-bold text-xl"
                      style={{ color: "#E0A02F" }}
                    >
                      Cryptrix
                    </span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <p className="text-xl lg:text-base cursor-pointer ">Cryptrix</p>
        <div className="p-0 ml-10">
          <Button
            variant="outline"
            className="flex items-center gap-8 w-40  hover:bg-white/20 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30
             transition-all duration-100"
          >
            <SearchIcon className="scale-125" />
            <span className="text-xl"> Search</span>
          </Button>
        </div>
      </div>
      <div className="flex ml-auto border rounded-2xl bg-gray-700 text-">
        <Avatar>
          <AvatarFallback>{auth.user.fullName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
