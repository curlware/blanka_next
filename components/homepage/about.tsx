import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatedButton, SectionHeading } from "../common";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

type TProps = {
    data: AboutSection | undefined
}

export default function AboutSection({ data = {} }: TProps) {
    const { title, subtitle, heading, ctaLink, ctaText, description, media, } = data
    return (
        <section
            id="About"
            className={cn("relative flex justify-center items-center py-30 bg-gray-50")}
        >
            <div className="space-y-20 mx-auto px-4 max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="flex md:flex-row flex-col justify-center items-center gap-16 pb-2 text-center md:text-start">
                    <div className="space-y-16 w-full md:w-1/2">
                        <h2 className="font-light text-secondary-foreground text-4xl">{heading}</h2>
                        <p className="text-secondary-foreground/70 whitespace-pre-wrap">{description}</p>
                        <div className="block">
                            {ctaText && ctaLink && <AnimatedButton title={ctaText} url={ctaLink} />}
                        </div>
                    </div>

                    <div className="group relative flex justify-center items-center w-full md:w-1/2 h-full aspect-square">
                        {media?.thumbnail && <Image src={media?.thumbnail} alt={title || ''} width={450} height={450} className="shadow-lg rounded-full w-full h-full object-cover" />}
                        <Dialog>
                            <DialogTrigger>
                                <span className="top-1/2 left-1/2 absolute flex justify-center items-center bg-white/30 group-hover:opacity-80 backdrop-blur-sm rounded-full w-24 h-24 text-white transition-all -translate-x-1/2 -translate-y-1/2 duration-300 cursor-pointer">
                                    <Image src="/images/play_btn.png" alt="play" fill />
                                </span>
                            </DialogTrigger>

                            <DialogContent className="p-0 border-0 min-w-6xl aspect-video overflow-hidden">
                                <DialogTitle className="hidden">Video</DialogTitle>
                                <video controls autoPlay loop muted className="w-full h-full object-cover">
                                    <source src="/about.mp4" type="video/mp4" />
                                    <source src="/about.mp4" type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>


        </section>
    )
}
