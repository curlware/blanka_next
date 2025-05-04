import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type TProps = {
    data: HeroSection
}

export default function HeroSection({ data = {} }: TProps) {
    const { title, subtitle, ctaText, ctaLink, backgroundImage } = data
    return (
        <section
            className={cn("relative flex justify-center items-center bg-cover bg-fixed bg-center w-full h-svh", !backgroundImage && "bg-primary/90")}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage.file})` } : undefined}
        >
            <div className="mx-auto container">
                <div className="flex flex-col justify-center items-center space-y-10 md:space-y-12 mx-auto max-w-md md:max-w-xl h-full text-center">
                    <h1 className="font-league-script font-medium text-white text-8xl md:text-9xl">{title}</h1>
                    <p className="font-poppins font-light text-white text-xl md:text-3xl leading-relaxed">{subtitle}</p>
                    <Link href={ctaLink || '/'} className="group flex items-center gap-2 bg-secondary shadow-[0px_0px_50px_0px_rgba(230,37,164,0.65)] mt-14 px-10 py-5 rounded-full font-normal text-white transition-all duration-300 ease-in-out transform">
                        {ctaText}
                        <ArrowRight size={18} strokeWidth={4} className="group-hover:rotate-90 transition-all duration-300 ease-in-out transform" />
                    </Link>
                </div>
                <span className="bottom-6 left-1/2 absolute shadow-inner shadow-white rounded-full w-9 h-16 -translate-x-1/2 scroll-icon" />
            </div>
        </section>
    )
}
