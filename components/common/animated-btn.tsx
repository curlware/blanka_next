import { ArrowRight } from "lucide-react";
import Link from "next/link";

type TProps = {
    title: string
    url: string
}
export default function AnimatedButton({ title, url }: TProps) {
    const ctaText = title || 'Explore Now'
    const ctaLink = url || '/'
    return (
        <Link href={ctaLink || '/'} className="group inline-flex items-center gap-2 bg-secondary shadow-[0px_0px_50px_0px_rgba(230,37,164,0.65)] px-10 py-4 rounded-full w-auto font-normal text-white transition-all duration-300 ease-in-out transform">
            {ctaText}
            <ArrowRight size={18} strokeWidth={4} className="group-hover:rotate-90 transition-all duration-300 ease-in-out transform" />
        </Link>
    )
}
