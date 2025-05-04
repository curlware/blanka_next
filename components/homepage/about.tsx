import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionHeading } from "../common";
import AnimatedButton from "../common/animated-btn";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

type TProps = {
    data: AboutSection
}

export default function AboutSection({ data = {} }: TProps) {
    console.log('data :>> ', data);
    const { title, subtitle, heading, ctaLink, ctaText, description, media, } = data
    return (
        <section
            className={cn("relative flex justify-center items-center py-30 bg-gray-50")}
        >
            <div className="space-y-20 mx-auto max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="justify-between items-center gap-16 grid grid-cols-1 md:grid-cols-2 pb-2">
                    <div className="space-y-16">
                        <h2 className="font-light text-secondary-foreground text-4xl">{heading}</h2>
                        <p className="text-secondary-foreground/70 whitespace-pre-wrap">{description}</p>
                        <div className="block">
                            {ctaText && ctaLink && <AnimatedButton title={ctaText} url={ctaLink} />}
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="group relative h-full aspect-square">
                            {media?.thumbnail && <Image src={media?.thumbnail} alt={title || ''} width={450} height={450} className="shadow-lg rounded-full" />}
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
            </div>


        </section>
    )
}
