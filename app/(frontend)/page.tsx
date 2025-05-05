'use client'
import { AboutSection, HeroSection, ServiceSection } from "@/components/homepage";
import BlogSection from "@/components/homepage/blogs";
import ClientSection from "@/components/homepage/clients";
import ContactSection from "@/components/homepage/contact";
import TeamSection from "@/components/homepage/teams";
import TestimonialSection from "@/components/homepage/testimonials";
import { useSiteData } from "@/lib/dataContext";

type TProps = {}

// async function getData() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-data`, { next: { tags: ['data'] } })
//   const data: any = await res.json()
//   if (!data) null
//   return data
// }

export default function page({ }: TProps) {
  // const data = await getData()
  // const homeData: SiteContentData = data?.data

  const { siteData } = useSiteData()
  return (
    <>
      <HeroSection data={siteData?.hero} />
      <ServiceSection data={siteData?.services} />
      <AboutSection data={siteData?.about} />
      <ClientSection data={siteData?.clients} />
      <TestimonialSection data={siteData?.testimonials} />
      <TeamSection data={siteData?.team} />
      <BlogSection data={siteData?.team} />
      <ContactSection data={siteData?.contact} />
    </>
  )
}
