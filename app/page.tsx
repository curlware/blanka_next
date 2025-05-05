import { AboutSection, HeroSection, ServiceSection } from "@/components/homepage";
import ClientSection from "@/components/homepage/clients";
import TeamSection from "@/components/homepage/teams";
import TestimonialSection from "@/components/homepage/testimonials";

type TProps = {}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-data`, { next: { tags: ['data'] } })
  const data: any = await res.json()
  if (!data) null
  return data
}

export default async function page({ }: TProps) {
  const data = await getData()
  const homeData: SiteContentData = data?.data

  // console.log('data :>> ', data);
  return (
    <>
      <HeroSection data={homeData?.hero} />
      <ServiceSection data={homeData?.services} />
      <AboutSection data={homeData?.about} />
      <ClientSection data={homeData?.clients} />
      <TestimonialSection data={homeData?.testimonials} />
      <TeamSection data={homeData?.team} />
    </>
  )
}
