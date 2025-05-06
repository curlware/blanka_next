import { cn } from "@/lib/utils";
import { Earth, Mail, MapPin, Smartphone } from "lucide-react";
import { AnimatedButton, SectionHeading } from "../common";

type TProps = {
    data: ContactSection | undefined
}

export default function ContactSection({ data = {} }: TProps) {
    const { title, subtitle, address, description, email, heading, mapLocation, phone, website
    } = data
    return (
        <section
            id="Contact"
            className={cn("relative flex justify-center items-center py-20 bg-gray-200")}
        >
            <div className="z-10 relative space-y-12 md:space-y-20 mx-auto px-4 max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="flex md:flex-row flex-col rounded-[3rem] w-full h-full overflow-hidden">
                    {/* Contact Information */}
                    <div className="space-y-16 bg-primary-foreground px-10 sm:px-16 lg:px-20 py-12 sm:py-20 lg:py-28 w-full md:w-1/2 text-white">
                        <h4 className="font-light text-2xl">{heading}</h4>
                        <p className="font-light">{description}</p>

                        <div className="space-y-8 font-light">
                            <div className="flex items-start gap-12">
                                <span><MapPin /></span>
                                <span>{address}</span>
                            </div>
                            <div className="flex items-start gap-12">
                                <span><Smartphone /></span>
                                <span>{phone}</span>
                            </div>
                            <div className="flex items-start gap-12">
                                <span><Mail /></span>
                                <span>{email}</span>
                            </div>
                            <div className="flex items-start gap-12">
                                <span><Earth /></span>
                                <span>{website}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white px-10 sm:px-16 lg:px-20 py-12 sm:py-20 lg:py-28 w-full md:w-1/2">
                        <form action="#" className="space-y-12">
                            <input placeholder="Your Name" className="py-2 border-b border-black focus:outline-0 focus:ring-0 w-full" />
                            <input placeholder="Your Email" className="py-2 border-b border-black focus:outline-0 focus:ring-0 w-full" />
                            <input placeholder="Your Subject" className="py-2 border-b border-black focus:outline-0 focus:ring-0 w-full" />
                            <textarea placeholder="Message" rows={6} className="py-2 border-b border-black focus:outline-0 focus:ring-0 w-full" />

                            <AnimatedButton title={"Send"} url={""} />
                        </form>
                    </div>
                </div>
            </div>


            {/* <!-- Google Map iframe as background --> */}
            <iframe
                src={`https://www.google.com/maps?q=${mapLocation?.lat},${mapLocation?.lng}&hl=es;z=14&output=embed`}
                className="bottom-0 left-0 z-0 absolute brightness-90 grayscale w-full h-[60%] pointer-events-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    )
}
