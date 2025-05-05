import { getHomepageContent } from '@/actions/data/homepage'

export default async function getData() {
  const data = await getHomepageContent()
  return JSON.stringify(data?.data)
}
