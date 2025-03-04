"use client";

import { navItems, servicesLinks } from "@/constant";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import Search from "@/components/search";
import { Separator } from "../ui/separator";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    return (
        <header
            className={cn(
                "sticky z-50 lg:h-16 h-14 inset-[0%_0%_auto] top-0 w-full custom-transition-for-header bg-[rgba(250,250,252,0.4)] dark:bg-[#e2e8f003] backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] transition-all",
            )}
        >
            <Container className="flex items-center justify-between h-full">
                <div className="flex items-center space-x-6">
                    <Logo showIcon={true} showLogoText={true} />
                    <nav
                        className={cn("hidden lg:flex items-center", {
                            hidden: isOpen,
                        })}
                    >
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-[15px] font-medium text-foreground">
                                        Services
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-popover text-popover-foreground">
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[0.7fr_1fr]">
                                            <li className="row-span-3 bg-gradient-to-br from-primary/10 via-primary/[0.07] to-primary/[0.03] rounded-lg p-6">
                                                <NavigationMenuLink asChild>
                                                    <div className="flex h-full w-full select-none flex-col justify-end space-y-2">
                                                        <div className="text-lg font-medium text-primary">
                                                            Our Services
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Explore our comprehensive range of development and
                                                            hosting solutions tailored to your needs.
                                                        </p>
                                                        <Link href={"/services"} className="w-full mt-6 underline text-sm text-primary">
                                                            View All Services
                                                        </Link>
                                                    </div>
                                                </NavigationMenuLink>
                                            </li>
                                            {servicesLinks.map((service) => (
                                                <li key={service.title}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={service.href}
                                                            className="block select-none space-y-2 rounded-md py-5 px-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                                        >
                                                            <div className="text-sm font-medium leading-none text-foreground">
                                                                {service.title}
                                                            </div>
                                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                {service.description}
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-[15px] font-medium transition-colors disabled:pointer-events-none text-foreground hover:text-primary -tracking-[.01em]">
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Search />
                    <div className="hidden lg:flex items-center space-x-4">
                        <Button variant="outline" >Sign In</Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Get Started
                        </Button>
                    </div>
                    <div className="lg:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <div
                                    className="z-50 w-[20px] flex flex-wrap flex-col justify-end mt-[5px] cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className="bg-foreground mb-[5px] h-[2px] w-full" />
                                    <span className="bg-foreground mb-[5px] h-[2px] w-full" />
                                </div>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full h-full transition-all bg-background text-foreground">
                                <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col">
                                    <ScrollArea className="relative h-[calc(100vh-4rem)] flex-1 overflow-auto">
                                        <div className="flex justify-between">
                                            <div className="transition-all w-full mt-7">
                                                <div
                                                    className="lg:hidden border-none outline-none cursor-pointer"
                                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                                >
                                                    <span className="transition-colors text-lg font-bold flex items-center text-foreground hover:text-primary tracking-[.007em]">
                                                        Our Services
                                                        <ChevronDown
                                                            className={cn(
                                                                "ml-2 mt-1 h-4 w-4 transition-transform duration-200",
                                                                {
                                                                    "transform rotate-180": isServicesOpen,
                                                                }
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                                <AnimatePresence>
                                                    {isServicesOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pl-4 space-y-2 py-2">
                                                                {servicesLinks.map((service, index) => (
                                                                    <SheetClose asChild key={index}>
                                                                        <Link
                                                                            href={service.href}
                                                                            className="block text-base transition-colors hover:text-primary"
                                                                        >
                                                                            {service.title}
                                                                        </Link>
                                                                    </SheetClose>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <div className="space-y-2">
                                                    <Separator className=" ml-[0] mr-[0] my-[10px]" />
                                                    {navItems.map((item) => (
                                                        <SheetClose
                                                            asChild
                                                            key={item.title}
                                                            className={"flex"}
                                                        >
                                                            <Link
                                                                href={item.href}
                                                                className="block transition-colors text-lg font-bold text-foreground hover:text-primary tracking-[.007em]"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </SheetClose>
                                                    ))}
                                                    <Separator className="!mt-[13px] mx-0 !mb-[20px]" />
                                                    <div className="space-y-4">
                                                        <Button variant="outline" className="w-full">
                                                            Sign In
                                                        </Button>
                                                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                    <SheetClose className="absolute right-5 top-5">
                                        <X className="h-[26px] w-[26px]" />
                                        <span className="sr-only">Close</span>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </Container>
        </header>
    );
}