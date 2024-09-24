"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HomeIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react";
// import ObjectId from "mongodb";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import axios from "axios";
// import { Label } from "@/components/ui/label"

const frameworks = [
  {
    value: "New Project",
    label: "New Project",
    type: "button", // Mark this object as a button
  },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // const [projectstate, setprojectstate] = React.useState()

  const handleCreateProject = async (event: any) =>{
    event.preventDefault();
    const name = event.target.elements.name.value;
    const description = event.target.elements.username.value;
    try{
      const res = await axios.post("/api/users/me")

      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, description}),        
      });
      const responseData = await response.json();
      console.log(responseData);

      if(!response.ok){
        throw new Error(`Failed to create project: ${response.status} ${responseData.error}`);
      }

      console.log("Project Created:", responseData);
      setOpen(false);  
    } catch (error){
      console.error("Error Creating project:", error);
      
    }
  };


  return (
    <div className="h-screen w-64 bg-neutral-100 dark:bg-slate-900 flex flex-col py-4">
      <nav className="flex flex-col gap-2 px-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Select framework..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      onSelect={() => {
                        if (framework.type !== "button") {
                          setValue(
                            framework.value === value ? "" : framework.value
                          );
                          setOpen(false);
                        }
                      }}
                    >
                      {framework.type === "button" ? (

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full text-left ">
                              {framework.label}
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-[425px]">

                            <DialogHeader>
                              <DialogTitle>
                                Here We Can Create A New Project.
                              </DialogTitle>
                            </DialogHeader>
                          {/* Form Wrapper */}
                          <form  onSubmit={handleCreateProject}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="name" className="text-right">
                                    Name
                                  </label>
                                  <Input
                                    id="name"
                                    defaultValue="ServiceKnow"
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="username" className="text-right">
                                    Description
                                  </label>
                                  <Input
                                    id="username"
                                    defaultValue="@peduarte"
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Create Project</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        
                      ) : (
                        <>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Link
          href="/dashboard"
          className={cn(
            "flex mt-2 items-center text-sm gap-2 p-2 hover:bg-neutral-200 rounded"
          )}
        >
          <HomeIcon className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/dashboard/members"
          className={cn(
            "flex items-center text-sm gap-2 p-2 hover:bg-neutral-200  rounded"
          )}
        >
          <UserIcon className="h-4 w-4" />
          Members
        </Link>
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center text-sm gap-2 p-2 hover:bg-neutral-200  rounded"
          )}
        >
          <SettingsIcon className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </div>
  );
}
