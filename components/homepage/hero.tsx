import { cn } from "@/lib/utils";
import { AnimatedButton } from "../common";

type TProps = {
    data: HeroSection | undefined
}

export default function HeroSection({ data = {} }: TProps) {
    const { title, subtitle, ctaText, ctaLink, backgroundImage } = data
    return (
        <section
            id="Home"
            className={cn("relative flex justify-center items-center bg-cover bg-fixed bg-center w-full h-svh", !backgroundImage && "bg-primary/90")}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage.file})` } : undefined}
        >
            <div className="mx-auto container">
                <div className="flex flex-col justify-center items-center space-y-10 md:space-y-12 mx-auto max-w-md md:max-w-xl h-full text-center">
                    <h1 className="font-league-script font-medium text-white text-8xl md:text-9xl">{title}</h1>
                    <p className="font-poppins font-light text-white text-xl md:text-3xl leading-relaxed">{subtitle}</p>

                    {ctaText && ctaLink && <AnimatedButton title={ctaText} url={ctaLink} />}
                </div>
                <span className="bottom-6 left-1/2 absolute shadow-inner shadow-white rounded-full w-9 h-16 -translate-x-1/2 scroll-icon" />
            </div>
        </section>
    )
}
