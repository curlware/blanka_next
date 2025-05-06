import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionHeading } from "../common";

type TProps = {
    data: BlogSection | undefined
}

export default function BlogSection({ data = {} }: TProps) {
    const { title, subtitle, blogs } = data

    if (!blogs?.length) return null

    return (
        <section
            id="Blog"
            className={cn(
                "relative flex justify-center items-center py-16 md:py-20 bg-white",
            )}
        >
            <div className="space-y-12 md:space-y-16 mx-auto px-4 max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {blogs?.map((data, index) => (
                        <div
                            key={index}
                            className="space-y-6 text-secondary-foreground/80"
                        >
                            <Image
                                src={data.image?.file || ""}
                                alt={data.title || ""}
                                className="rounded-md w-full object-cover aspect-video"
                                width={600}
                                height={400}
                            />
                            <div className="">
                                <h3 className="font-light text-2xl uppercase">{data.title}</h3>
                                <p className="mb-2 font-normal uppercase">{new Date(data?.date || Date.now()).toDateString()}</p>
                                <p className="font-light">{data.shortDescription}</p>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}
