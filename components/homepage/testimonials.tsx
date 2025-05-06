import { cn } from "@/lib/utils";
import { TestimonialCarousel } from "../common";

type TProps = {
    data: TestimonialItem[] | undefined
}

export default function TestimonialSection({ data = [] }: TProps) {

    if (!data?.length) return null

    return (
        <section
            id="Testimonial"
            className={cn(
                "relative flex justify-center items-center py-16 md:py-20",
                "bg-[url('/images/testimonial_bg.jpg')] bg-top bg-no-repeat bg-cover",
                "bg-blend-overlay"
                // "bg-[linear-gradient(to_top,#4b04a0,#4b04a0,#6f04a2),url('/images/service-bg.png')] bg-top bg-no-repeat bg-contain",
            )}
        >
            <div className="mx-auto px-4 max-w-6xl text-center container">
                <div className="block relative mx-auto w-auto before:font-montserrat before:font-extrabold md:before:text-[140px] before:text-secondary before:text-9xl before:content-['\201C'] before:leading-none" />

                <TestimonialCarousel data={data} />
            </div>
        </section >
    )
}
