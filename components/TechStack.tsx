"use client"
import { cn } from "@/lib/utils";
import { CodeXml, Database, GitBranch, Ruler } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Container from "./Container";
import { Separator } from "./ui/separator";

const TechStack = () => {
    return (
        <section className="py-24 md:py-32 lg:py-40">
            <Container className="flex flex-col items-center">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
                        Our Technology Suite
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        We leverage a robust technology stack to deliver high-quality, scalable, and innovative digital experiences.
                    </p>
                </div>
                <div className="grid gap-12 md:gap-16 lg:gap-20 mt-10 max-w-[38rem] w-full">
                    <TechCard
                        src="/figma.svg"
                        title="Figma"
                        description="Design & Prototyping"
                        descriptionTwo="Collaborative design and prototyping for intuitive user experiences."
                        icon={<Ruler className="w-6 h-6 text-muted-foreground" />} srcDark={"/figma.svg"} />
                    <BigTechCard
                        src="/react.svg"
                        srcTwo="/next.svg"
                        title="React.js"
                        titleTwo="Next.js"
                        description="Frontend Development"
                        descriptionTwo={<span className="leading-relaxed text-muted-foreground">
                            Building performant and user-friendly interfaces with React.js and the power of Next.js for server-side rendering and optimized performance.
                        </span>}
                        icon={<CodeXml className="w-6 h-6 text-muted-foreground" />} srcDark={"/react.svg"} srcDarkTwo={"/next.svg"} />
                    <BigTechCard
                        src="/ruby.png"
                        srcTwo="/java.svg"
                        title="Ruby"
                        titleTwo="Java"
                        description="Backend Development"
                        descriptionTwo={<span className="leading-relaxed text-muted-foreground">
                            Robust backend solutions with Ruby for rapid development and Java for high-performance, enterprise-grade applications.
                        </span>}
                        icon={<Database className="w-6 h-6 text-muted-foreground" />} srcDark={"/ruby.png"} srcDarkTwo={"/java.svg"} />
                    <BigTechCard
                        src="/cloudways.svg"
                        srcTwo="/vercel.svg"
                        title="Cloudways"
                        titleTwo="Vercel"
                        description="Hosting & Deployment"
                        descriptionTwo={<span className="leading-relaxed text-muted-foreground">
                            Reliable and scalable hosting on Cloudways and optimized deployments with Vercel for fast loading times and a seamless user experience.
                        </span>}
                        icon={<Database className="w-6 h-6 text-muted-foreground" />} srcDark={"cloudways.svg"} srcDarkTwo={"vercel-light.svg"}
                    />
                    <TechCard
                        src="/github.svg"
                        title="GitHub"
                        description="Version Control & Collaboration"
                        descriptionTwo="Streamlined development with Git for efficient version control and seamless collaboration among team members."
                        icon={<GitBranch className="w-6 h-6 text-muted-foreground" />}
                        srcDark={"/github-white.svg"}
                    />
                    <TechCard
                        src="/amazon-payment-2.png"
                        title="Amazon Payment Services"
                        description="Secure Payments"
                        descriptionTwo="Seamless and secure payment processing for a smooth user checkout experience."
                        icon={<GitBranch className="w-6 h-6 text-muted-foreground" />} srcDark={"/amazon-payment-2.png"} />
                </div>
            </Container>
        </section>
    );
};

const TechCard = ({
    src,
    title,
    description,
    icon,
    descriptionTwo,
    className,
    srcDark,
}: {
    src: string;
    title: string;
    description: string;
    icon: ReactNode;
    descriptionTwo: ReactNode;
    className?: string;
    srcDark: string;
}) => {
    return (
        <div className="px-8 py-10 bg-card border border-border rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-6 w-full">
            <div className="flex items-center space-x-4">
                <div>{icon}</div>
                <h3 className="text-lg md:text-xl font-semibold">
                    {description}
                </h3>
            </div>
            <Separator orientation="horizontal" className="w-full h-[1px] bg-border" />
            <div className="flex items-start sm:flex-row flex-col sm:space-x-6 space-x-0 space-y-4">
                <Image
                    src={src}
                    alt={title}
                    width={50}
                    height={50}
                    quality={100}
                    className={cn("md:w-20 md:h-20 w-16 h-16 object-contain dark:hidden", className)}
                />
                {
                    srcDark && (
                        <Image
                            src={srcDark}
                            alt={title}
                            width={50}
                            height={50}
                            quality={100}
                            className={cn("md:w-20 md:h-20 w-16 h-16 object-contain dark:block hidden", className)}
                        />
                    )
                }
                <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-medium text-foreground">
                        {title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {descriptionTwo}
                    </p>
                </div>
            </div>
        </div>
    )
};

const BigTechCard = ({
    src,
    title,
    titleTwo,
    srcTwo,
    description,
    icon,
    descriptionTwo,
    className,
    srcDark,
    srcDarkTwo
}: {
    src: string;
    titleTwo: string;
    srcTwo: string;
    title: string;
    description: string;
    icon: ReactNode;
    descriptionTwo: ReactNode;
    className?: string;
    srcDark: string;
    srcDarkTwo: string;
}) => {
    return (
        <div className="px-8 py-10 bg-card border border-border rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-6 w-full">
            <div className="flex items-center space-x-4">
                <div>{icon}</div>
                <h3 className="text-lg md:text-xl font-semibold">
                    {description}
                </h3>
            </div>
            <Separator orientation="horizontal" className="w-full h-[1.5px] bg-border" />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-muted shadow-sm">
                    <Image
                        src={src}
                        alt={title}
                        width={50}
                        height={50}
                        quality={100}
                        className={cn("md:w-20 md:h-20 w-16 h-16 object-contain dark:hidden", className)}
                    />
                    {srcDark && (
                        <Image
                            src={srcDark}
                            alt={title}
                            width={50}
                            height={50}
                            quality={100}
                            className={cn("md:w-20 md:h-20 w-16 h-16 object-contain dark:block hidden ", className)}
                        />
                    )}
                    <h3 className="text-lg md:text-xl font-medium mt-4 text-foreground">
                        {title}
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-muted shadow-sm">
                    <Image
                        src={srcTwo}
                        alt={titleTwo}
                        width={50}
                        height={50}
                        quality={100}
                        className={cn("md:w-20 md:h-20 w-16 h-16 object-contain dark:hidden", className)}
                    />
                    {srcDarkTwo && (
                        <Image
                            src={srcDarkTwo}
                            alt={title}
                            width={50}
                            height={50}
                            quality={100}
                            className={cn("md:w-20 md:h-20 w-16 h-16 object-contain dark:block hidden", className)}
                        />
                    )}
                    <h3 className="text-lg md:text-xl font-medium mt-4 text-foreground">
                        {titleTwo}
                    </h3>
                </div>
            </div>
            <div className="text-sm md:text-base text-muted-foreground mt-4">{descriptionTwo}</div>
        </div>
    )
};

export default TechStack;