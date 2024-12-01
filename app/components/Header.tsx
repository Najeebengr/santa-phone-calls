"use client";
import React, { useState } from "react";
import Image from "next/image";
import { nav_items } from "../lib/constants";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IoMenu } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "./Loader";

interface HeaderProps {
  className?: string;
}

function Header({ className = "" }: HeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const path = usePathname();
  return (
    <header
      className={`flex px-6 xl:px-0 justify-between items-center pt-2 md:pt-12 container mx-auto z-50 ${className}`}
    >
      <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="Santa Phone Calls Logo"
          className="dark:invert w-[120px] md:w-[160px]"
          width={160}
          height={24}
          priority
        />
      </Link>
      <div className=" gap-8 text-2xl hidden md:flex text-white font-harmonia">
        {nav_items.map((item) =>
          item.id === "how-it-works" ? (
            <Dialog
              key={item.id}
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <DialogTrigger asChild>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className={`${path === item.href ? "font-bold" : ""} transition-all duration-300 hover:scale-110 hover:text-[#D7C798] relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#D7C798] after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  {item.name}
                </button>
              </DialogTrigger>
              <DialogContent className="p-0 border-none w-[90%] xl:w-full">
                <DialogHeader className="p-0 rounded-xl">
                  <DialogTitle className="sr-only">
                    How It Works Video
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Watch our video to learn how Santa Phone Calls work
                  </DialogDescription>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
                    {!isLoaded && <Loader />}
                    <iframe
                      src="https://player.vimeo.com/video/1026689821?h=5a5d6352e4"
                      className={`absolute top-0 left-0 w-full h-full ${isLoaded ? "block" : "hidden"}`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      onLoad={() => setIsLoaded(true)}
                    ></iframe>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <Link
              key={item.name}
              id={`nav-${item.id}`}
              href={item.href}
              className={`${path === item.href ? "font-bold" : ""} transition-all duration-300 hover:scale-110 hover:text-[#D7C798] relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#D7C798] after:transition-transform after:duration-300 hover:after:scale-x-100`}
            >
              {item.name}
            </Link>
          ),
        )}
      </div>
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <IoMenu className="text-4xl text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gradient-to-r from-[#D7C798] via-[#EDE4CC] to-[#D7C798] relative right-[20%] z-[100]">
            {nav_items.map((item) => (
              <DropdownMenuItem
                key={item.name}
                className="font-bold border-b-2 border-[#D7C798]/30 px-8 text-xl py-4 focus:outline-none font-seasons group"
              >
                {item.id === "how-it-works" ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setIsDialogOpen(true)}
                        className="w-full text-left transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#8B7355]"
                      >
                        {item.name}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 border-none w-[90%] xl:w-full">
                      <DialogHeader className="p-0 rounded-xl">
                        <DialogTitle className="sr-only">
                          How It Works Video
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                          Watch our video to learn how Santa Phone Calls work
                        </DialogDescription>
                        <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
                          {!isLoaded && <Loader />}
                          <iframe
                            src="https://player.vimeo.com/video/1026689821?h=5a5d6352e4"
                            className={`absolute top-0 left-0 w-full h-full ${isLoaded ? "block" : "hidden"}`}
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            onLoad={() => setIsLoaded(true)}
                          ></iframe>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Link
                    href={item.href}
                    className={`${path === item.href ? "font-bold" : ""} transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#8B7355] w-full block`}
                  >
                    {item.name}
                  </Link>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="insta-icon text-3xl hidden md:block text-white">
        <a target="_blank" href="https://www.instagram.com/santaphonecalls/">
          <FaInstagram />
        </a>
      </div>
    </header>
  );
}

export default Header;
