import Logo from '@/components/dashboard/Logo'

export default async function DashboardPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/get-data`, {
    next: { tags: ['data'] }
  })

  const data: ResponseData = await response.json()
  if (!data?.data) {
    return <div>No data available</div>
  }

  return (
    <div className='grid gap-4'>
      <div id='logo'>
        <Logo data={data.data.logo} />
      </div>
    </div>
  )
}
