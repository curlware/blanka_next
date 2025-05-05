'use client'
import { useSiteData } from "@/lib/dataContext";
import Link from "next/link";

export default function Footer() {
    const { siteData } = useSiteData()
    return (
        <footer className="bg-primary py-9 text-white text-center">
            <div className="mx-auto container">
                <div className="flex md:flex-row flex-col justify-center md:justify-evenly items-center w-full">
                    <p>&copy; {new Date().getFullYear()} {siteData?.footer?.copyright}</p>

                    <ul className="inline-flex">
                        {siteData?.footer?.socialLinks?.map((item) =>
                            <li key={item.title}>
                                <Link href={item?.link || '#'} target="_blank" className="p-2.5 hover:text-primary-foreground">{item?.title}</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
