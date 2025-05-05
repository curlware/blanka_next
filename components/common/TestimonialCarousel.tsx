"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type TProps = {
    data: TestimonialItem[] | undefined;
};

export default function TestimonialCarousel({ data = [] }: TProps) {
    const testimonials = data.map((item) => ({
        quote: item.message,
        name: item.name,
        role: item.role,
        image: item.image?.file,
    }));

    // Check if testimonials are available
    if (testimonials.length === 0) {
        return null; // or a fallback UI
    }
    // State to track the current testimonial index
    // State to track the current testimonial index
    const [current, setCurrent] = useState(0);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    useEffect(() => setHasLoadedOnce(true), []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <div className="relative text-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={hasLoadedOnce ? { opacity: 0.3 } : false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.3 }}
                    // transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.56], delay: 0.3 }}
                    transition={{
                        type: "spring",
                        stiffness: 35,
                        damping: 10,
                    }}
                    className="space-y-2 md:space-y-6 mx-auto max-w-3xl text-white"
                >
                    <h4 className="min-h-32 overflow-hidden font-light text-lg md:text-2xl line-clamp-4 md:line-clamp-3 leading-relaxed">{testimonials[current].quote}</h4>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="relative flex justify-center items-center min-w-60">
                            <div className="relative rounded-full w-28 h-28 overflow-hidden">
                                <Image
                                    fill
                                    src={testimonials[current].image || ""}
                                    alt={testimonials[current].name || ""}
                                />
                            </div>

                            {/* Controls */}
                            <div className="top-1/2 left-0 absolute -translate-y-1/2">
                                <button onClick={prevSlide} className="opacity-35 hover:opacity-100 transition-all duration-300 ease-in-out">
                                    <ArrowLeft className="text-white" strokeWidth={4} />
                                </button>
                            </div>
                            <div className="top-1/2 right-0 z-50 absolute -translate-y-1/2">
                                <button onClick={nextSlide} className="opacity-35 hover:opacity-100 transition-all duration-300 ease-in-out">
                                    <ArrowRight className="text-white" strokeWidth={4} />
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <div className="font-medium text-base uppercase tracking-widest">{testimonials[current].name}</div>
                            <div className="font-light text-purple-200 text-sm uppercase tracking-[5px]">{testimonials[current].role}</div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>


        </div>
    );
}
