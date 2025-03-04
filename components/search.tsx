"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { advanceSearch, cn } from "@/lib/utils";
import { CommandIcon, FileIcon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Anchor from "./anchor";
import { Badge } from "./ui/badge";

export default function Search() {
  const [searchedInput, setSearchedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<"mac" | "windows">("windows");

  // Detect platform (macOS or Windows)
  useEffect(() => {
    const DetectPlatform = () => {
      const platform = navigator.platform.toLowerCase()
      const userAgent = navigator.userAgent.toLowerCase()
      if (platform.includes("mac") || userAgent.includes("mac")) {
        setPlatform("mac")
      } else if (platform.includes("win") || userAgent.includes("win")) {
        setPlatform("windows")
      }
    }
    DetectPlatform();
  }, [])
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })
  const filteredResults = useMemo(
    () => advanceSearch(searchedInput.trim()),
    [searchedInput]
  );

  return (
    <div className="w-full max-w-[2rem] sm:max-w-sm md:max-w-md">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setSearchedInput("");
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <div>
            <span className="lg:hidden flex items-center cursor-pointer">
              <SearchIcon className="h-5 w-5 text-gray-950 dark:text-gray-100" />
            </span>
            <button className="group hidden lg:flex w-full items-center gap-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-950 bg-[rgba(250,250,252,0.3)] dark:bg-background/60 backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] px-3 py-2 text-left text-sm transition-colors">
              <SearchIcon className="h-5 w-5 text-gray-950 dark:text-gray-100 hidden lg:flex" />
              <span className="flex-1 hidden xl:flex text-gray-600 dark:text-gray-300">Search documentation...</span>
              <span className="flex-1 hidden lg:flex xl:hidden text-gray-600 dark:text-gray-300">Search docs...</span>
              <kbd className="hidden rounded bg-gray-200 p-1 text-xs text-gray-500 dark:text-gray-300 dark:bg-neutral-950 sm:inline-block font-semibold">
                {platform === "mac" ? "⌘ K" : "Ctrl K"}
              </kbd>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent aria-labelledby="search-dialog-title" className="p-0 w-full max-w-lg sm:max-w-2xl top-[34%] md:top-[45%] !rounded-md">
          <DialogTitle id="search-dialog-title" className="sr-only">Search</DialogTitle>
          <DialogHeader>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" />
              <div className="flex justify-between items-center">
                <input
                  value={searchedInput}
                  onChange={(e) => setSearchedInput(e.target.value)}
                  placeholder="Type to search..."
                  autoFocus
                  className="h-14 pl-12 w-full pr-4 bg-transparent border-none text-base outline-none"
                />
                <DialogClose>
                  <Badge
                    className="bg-[#e8e8e8e6] py-[1px] px-1.5 text-sm hover:bg-[#e4e4e4e6] absolute right-4 top-4 text-black rounded-md"
                  >
                    Esc
                  </Badge>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>
          {filteredResults.length == 0 && searchedInput && (
            <p className="text-muted-foreground mx-auto mt-4 text-sm px-4">
              No results found for{" "}
              <span className="text-primary">{`"${searchedInput}"`}</span>
            </p>
          )}
          <ScrollArea className="max-h-[60vh] overflow-y-auto">
            <div className="flex flex-col items-start overflow-y-auto px-2 pb-4">
              {filteredResults.map((item) => {
                const level = (item.href.split("/").slice(1).length - 1) as keyof typeof paddingMap;
                const paddingClass = paddingMap[level];
                return (
                  <DialogClose key={item.href} asChild>
                    <Anchor
                      className={cn(
                        "dark:hover:bg-[#ffffff0f] hover:bg-[#0000000f] w-full px-3 rounded-sm text-sm flex items-center gap-2.5",
                        paddingClass
                      )}
                      href={`/docs${item.href}`}
                    >
                      <div
                        className={cn(
                          "flex items-center w-fit h-full py-3 gap-1.5 px-2",
                          level > 1 && "border-l pl-4"
                        )}
                      >
                        <FileIcon className="h-[1.1rem] w-[1.1rem] mr-1" />{" "}
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    </Anchor>
                  </DialogClose>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const paddingMap = {
  1: "pl-2",
  2: "pl-4",
  3: "pl-6",
  4: "pl-8",
} as const;
