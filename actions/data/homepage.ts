'use server'

import { connectToDatabase } from '@/configs/dbConnect'
import { defaultData } from '@/configs/reset-data'
import SiteContent from '@/models/SiteContent'
import { revalidatePath } from 'next/cache'

/**
 * Create or update the homepage content
 * This function will create a new record if none exists, or update the existing one
 */
export async function saveHomepageContent(content: SiteContentData) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Find existing content or create new
    const existingContent = await SiteContent.findOne()

    let result

    if (existingContent) {
      // Update existing content
      existingContent.content = content
      result = await existingContent.save()
    } else {
      // Create new content
      result = await SiteContent.create({ content })
    }

    // Revalidate the homepage path to update the cache
    revalidatePath('/')

    return {
      success: true,
      data: result
    }
  } catch (error: any) {
    console.error('Error saving homepage content:', error)
    return {
      success: false,
      error: error.message || 'Failed to save homepage content'
    }
  }
}

/**
 * Get the homepage content
 */
export async function getHomepageContent(): Promise<{
  success: boolean
  data?: SiteContentData | null
  error?: string
}> {
  try {
    // Connect to the database
    await connectToDatabase()

    // Find existing content
    const content = await SiteContent.findOne()

    return {
      success: true,
      data: content?.content || null
    }
  } catch (error: any) {
    console.error('Error fetching homepage content:', error)
    return {
      success: false,
      error: error.message || 'Failed to fetch homepage content'
    }
  }
}

/**
 * Update a specific section of the homepage content
 */
export async function updateHomepageSection(section: string, data: any) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Find existing content
    const existingContent = await SiteContent.findOne()

    if (!existingContent) {
      // Create new content with this section
      const newContent = { [section]: data }
      const result = await SiteContent.create({ content: newContent })

      // Revalidate the homepage path
      revalidatePath('/')

      return {
        success: true,
        data: result
      }
    }

    // Update just the specified section
    existingContent.content[section] = data
    await existingContent.save()

    // Revalidate the homepage path
    revalidatePath('/')

    return {
      success: true,
      data: existingContent
    }
  } catch (error: any) {
    console.error(`Error updating ${section} section:`, error)
    return {
      success: false,
      error: error.message || `Failed to update ${section} section`
    }
  }
}

export async function resetHomepageContent() {
  try {
    // Connect to the database
    await connectToDatabase()

    // Delete existing content
    await SiteContent.deleteMany({})

    // Create new content
    await SiteContent.create({ content: defaultData })

    // Revalidate the homepage path to update the cache
    revalidatePath('/')

    return {
      success: true
    }
  } catch (error: any) {
    console.error('Error saving homepage content:', error)
    return {
      success: false,
      error: error.message || 'Failed to save homepage content'
    }
  }
}
