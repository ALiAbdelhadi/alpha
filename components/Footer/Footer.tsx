import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Container from "../Container";
import Logo from "../Logo";
import { ModeToggle } from "../theme-toggle";
import { FooterItemsCompany, FooterItemsLegal } from "@/constant";
const Footer: React.FC = () => {
    return (
        <footer className="relative bg-gradient-to-br from-background from-0% via-background via-35% to-primary/90 to-100% text-[#333] py-6 md:py-12 lg:py-16 xl:py-24 z-10">
            <Container className="flex flex-col md:flex-row justify-between items-start">
                <div className="mb-12 md:mb-0">
                    <div className="flex items-center mb-6">
                        <Logo className="text-2xl" showIcon={false} showLogoText={true} />
                    </div>
                    <p className="max-w-xs text-sm text-muted-foreground mb-6">
                        Transforming ideas into digital realities. Your vision, our
                        expertise.
                    </p>
                    <Button
                        variant="default"
                    >
                        Contact Us
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-8 md:gap-16">
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Company</h3>
                        <ul className="space-y-3">
                            {FooterItemsCompany.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="hover:underline transition-transform">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Legal</h3>
                        <ul className="space-y-3">
                            {FooterItemsLegal.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="hover:underline transition-transform">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
            <Container>
                <div className="mt-16 pt-8 border-t border-primary/30 text-sm text-[#555] flex justify-between items-center">
                    <p>
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="transition-colors" target="_blank">
                            <span className="sr-only">Facebook</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        <Link href="#" className="transition-colors" target="_blank">
                            <span className="sr-only">Twitter</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </Link>
                        <Link href="https://github.com/ALiAbdelhadi/alpha" className="transition-colors" target="_blank">
                            <span className="sr-only">Github</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="lucide lucide-github"
                            >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </Container>
        </footer>
    );
};
export default Footer;
