import { cn } from "@/lib/utils";
import { Earth, Mail, MapPin, Smartphone } from "lucide-react";
import { SectionHeading } from "../common";

type TProps = {
    data: ContactSection | undefined
}

export default function ContactSection({ data = {} }: TProps) {
    const { title, subtitle, address, description, email, heading, mapLocation, phone, website
    } = data
    return (
        <section
            className={cn("relative flex justify-center items-center py-20 bg-gray-200")}
        >
            <div className="z-10 relative space-y-12 mx-auto px-4 max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="flex md:flex-row flex-col rounded-[3rem] w-full h-full overflow-hidden">
                    <div className="space-y-16 bg-primary-foreground px-20 py-28 w-full md:w-1/2 text-white">
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
                    <div className="bg-white p-16 w-full md:w-1/2">
                        <h4>{JSON.stringify(mapLocation)}</h4>
                    </div>
                </div>
            </div>


            {/* <!-- Google Map iframe as background --> */}
            <iframe
                src="https://www.google.com/maps?q=23.7742514681378,90.36379221847676&hl=es;z=14&output=embed"
                className="bottom-0 left-0 z-0 absolute brightness-90 grayscale w-full h-[60%] pointer-events-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    )
}
