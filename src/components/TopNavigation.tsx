"use client";

import * as React from "react";
import { PlusCircle, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/utilities/ThemeToggleButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Sidebar from "@/components/Sidebar";

export default function TopNavigation() {
  const [position, setPosition] = React.useState("bottom")
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')     
      toast.success("Logout success")
      setTimeout(()=>{
        router.push("/login")
      }, 1000);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  };

  return (
    <div className="flex">
    {/* Sidebar */}
    <Sidebar />
      {/* Main content */}
      <div className="w-full">
      <div className="w-full flex items-center justify-between py-1 px-4">
      <Button className="gap-16" variant="secondary">
        Search Everywhere
        <SearchIcon className="ml-2 h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-2">
        <Button className="ml-2">
          <PlusCircle className="h-4 w-4 mr-1" />
          Add New
        </Button>

        <ThemeToggleButton />

      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">
                <Link href="/profile">Profile</Link>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom" onClick={logout}>Logout</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
    </DropdownMenu>
    </div>

    </div>
    </div>    
    </div>
  );
}
