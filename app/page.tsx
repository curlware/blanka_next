import { AboutSection, HeroSection, ServiceSection } from "@/components/homepage";
import ClientSection from "@/components/homepage/clients";

type TProps = {}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-data`, { next: { tags: ['data'] } })
  const data: any = await res.json()
  if (!data) null
  return data
}

export default async function page({ }: TProps) {
  const data: any = await getData()

  // console.log('data :>> ', data);
  return (
    <>
      <HeroSection data={data?.data?.hero} />
      <ServiceSection data={data?.data?.services} />
      <AboutSection data={data?.data?.about} />
      <ClientSection data={data?.data?.clients} />
    </>
  )
}
