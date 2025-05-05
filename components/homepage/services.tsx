import { cn } from "@/lib/utils";
import Link from "next/link";
import { FadeUp, SectionHeading } from "../common";

type TProps = {
    data: ServicesSection | undefined
}

export default function ServiceSection({ data = {} }: TProps) {
    const { title, subtitle, items } = data
    return (
        <section
            id="Services"
            className={cn("relative flex justify-center items-center bg-contain bg-scroll bg-bottom py-20 bg-[url('/images/service-bg.png')] bg-no-repeat bg-white pb-40")}
        >
            <div className="space-y-12 mx-auto max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-2">
                    {items?.map((item, index) => (
                        <FadeUp delay={0.1 * index} duration={0.3 * index} key={index} className="group relative flex flex-col justify-center space-y-4 bg-white p-16 border hover:border-secondary-foreground/60 border-transparent rounded-4xl text-center transition-all duration-500 ease-in-out transform">
                            <img src={item?.icon?.file} alt={item?.title} className="mx-auto" />
                            <h3 className="font-light text-secondary-foreground text-4xl">{item?.title}</h3>
                            <p className="text-secondary-foreground/70">{item?.description}</p>

                            <Link href={item?.link || ''} className="top-3 right-3 absolute bg-secondary opacity-0 group-hover:opacity-100 shadow-[0px_0px_50px_0px_rgba(230,37,164,0.65)] p-3.5 rounded-full font-medium text-white hover:text-secondary text-sm transition-all duration-500 ease-in-out transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">
                                    <path d="M4.66667 8H11.3333M11.3333 8L8.00001 4.66667M11.3333 8L8.00001 11.3333" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    )
}
