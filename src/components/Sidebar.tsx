// components/Sidebar.tsx
"use client"
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HomeIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react";
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
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

export default function Sidebar() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
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
                    ? frameworks.find((framework) => framework.value === value)?.label
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
                        value={framework.value}
                        onSelect={(currentValue:any) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                        }}
                        >
                        <Check
                            className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {framework.label}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
                </Popover>


            <Link href="/dashboard" className={cn("flex mt-2 items-center text-sm gap-2 p-2 hover:bg-neutral-200 rounded")}>
                <HomeIcon className="h-4 w-4" />
                Dashboard
            </Link>
            <Link href="/dashboard/members" className={cn("flex items-center text-sm gap-2 p-2 hover:bg-neutral-200  rounded")}>
                <UserIcon className="h-4 w-4" />
                Members
            </Link>
            <Link href="/dashboard/settings" className={cn("flex items-center text-sm gap-2 p-2 hover:bg-neutral-200  rounded")}>
                <SettingsIcon className="h-4 w-4" />
                Settings
            </Link>
            </nav>      
    </div>
  );
}
