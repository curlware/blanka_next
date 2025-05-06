import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionHeading } from "../common";

type TProps = {
    data: TeamSection | undefined
}

export default function BlogSection({ data = {} }: TProps) {
    const { members, title, subtitle, rightText, leftText } = data
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
                    {members?.map((data, index) => (
                        <div
                            key={index}
                            className="space-y-6 text-secondary-foreground/80"
                        >
                            <Image
                                src={data.image?.file || ""}
                                alt={data.name || ""}
                                className="rounded-md w-full object-cover aspect-video"
                                width={600}
                                height={400}
                            />
                            <div className="">
                                <h3 className="font-light text-2xl uppercase">{data.name}</h3>
                                <p className="mb-2 font-normal uppercase">{new Date(Date.now()).toDateString()}</p>
                                <p className="font-light">{data.bio}</p>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}
