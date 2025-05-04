import { connectToDatabase } from '@/configs/dbConnect'
import { defaultData } from '@/configs/reset-data'
import SiteContent from '@/models/SiteContent'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase()

    // Delete existing content
    await SiteContent.deleteMany({})

    // Create new content
    const result = await SiteContent.create({ content: defaultData })

    // Revalidate the homepage path to update the cache
    revalidatePath('/')

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    console.error('Error saving homepage content:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to save homepage content'
      },
      { status: 500 }
    )
  }
}
