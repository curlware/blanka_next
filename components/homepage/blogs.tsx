import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../common";
import SocialIcon from "../ui/SocialIcon";

type TProps = {
    data: TeamSection | undefined
}

export default function BlogSection({ data = {} }: TProps) {
    const { members, title, subtitle, rightText, leftText } = data
    return (
        <section
            id="Blog"
            className={cn(
                "relative flex justify-center items-center py-16 md:py-20",
                "bg-[url('/images/team_bg.jpg')] bg-repeat md:bg-contain bg-fixed bg-center bg-cover",
                "bg-blend-overlay"
            )}
        >
            <div className="space-y-12 md:space-y-24 mx-auto px-4 max-w-6xl container">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="sm:gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-2">
                    {members?.map((data, index) => (
                        <div
                            key={index}
                            className="space-y-6 p-6 text-secondary-foreground/80 text-center"
                        >
                            <Image
                                src={data.image?.file || ""}
                                alt={data.name || ""}
                                className="rounded-full w-full"
                                width={275}
                                height={275}
                            />
                            <div className="">
                                <h3 className="font-light text-2xl uppercase">{data.name}</h3>
                                <p className="font-normal uppercase">{data.role}</p>
                            </div>
                            {!!data.socialLinks?.length &&
                                <div className="flex justify-center items-center space-x-3 mt-4">
                                    {data.socialLinks?.map((link, index) => {
                                        if (!link?.icon) return
                                        return (
                                            <Link
                                                key={index}
                                                href={link.link || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-secondary hover:bg-white p-2.5 rounded-full text-white hover:text-secondary transition-all duration-500 ease-in-out transform"
                                            >
                                                <SocialIcon network={link?.icon} size={18} />
                                            </Link>
                                        )
                                    })}

                                </div>
                            }

                            <p className="mt-2 font-light">{data.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}
