import { HeroSection } from '@/components/homepage'

type TProps = {}

async function getPost() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-data`, { next: { tags: ['data'] } })
  const data: any = await res.json()
  // if (!post) notFound()
  return data
}

export default async function page({ }: TProps) {
  const data: any = await getPost()
  return (
    <>
      <HeroSection data={data?.data?.hero} />
    </>
  )
}
