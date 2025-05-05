'use server'

import { connectToDatabase } from '@/configs/dbConnect'
import { BlogCreateUpdateData } from '@/lib/types'
import Blog from '@/models/Blog'
import { revalidatePath } from 'next/cache'

/**
 * Get all blogs with pagination
 */
export async function getBlogs(page = 1, limit = 10) {
  try {
    await connectToDatabase()

    const skip = (page - 1) * limit
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    const totalBlogs = await Blog.countDocuments({})
    const totalPages = Math.ceil(totalBlogs / limit)

    return {
      success: true,
      blogs: JSON.parse(JSON.stringify(blogs)),
      pagination: {
        page,
        limit,
        total: totalBlogs,
        pages: totalPages
      }
    }
  } catch (error: any) {
    console.error('Error getting blogs:', error)
    return { success: false, error: error.message || 'Failed to get blogs' }
  }
}

/**
 * Get a single blog by ID
 */
export async function getBlogById(id: string) {
  try {
    await connectToDatabase()
    const blog = await Blog.findById(id).lean()

    if (!blog) {
      return { success: false, error: 'Blog not found' }
    }

    return { success: true, blog }
  } catch (error: any) {
    console.error('Error getting blog:', error)
    return { success: false, error: error.message || 'Failed to get blog' }
  }
}

/**
 * Create a new blog
 */
export async function createBlog(blogData: BlogCreateUpdateData) {
  try {
    await connectToDatabase()

    const blog = await Blog.create({
      ...blogData,
      date: new Date()
    })

    revalidatePath('/dashboard/blogs')
    revalidatePath('/blog')

    return { success: true }
  } catch (error: any) {
    console.error('Error creating blog:', error)
    return { success: false, error: error.message || 'Failed to create blog' }
  }
}

/**
 * Update a blog
 */
export async function updateBlog(id: string, blogData: Partial<BlogCreateUpdateData>) {
  try {
    await connectToDatabase()

    const blog = await Blog.findByIdAndUpdate(id, { ...blogData })

    if (!blog) {
      return { success: false, error: 'Blog not found' }
    }

    revalidatePath('/dashboard/blogs')
    revalidatePath('/blog')
    revalidatePath(`/blog/${id}`)

    return { success: true }
  } catch (error: any) {
    console.error('Error updating blog:', error)
    return { success: false, error: error.message || 'Failed to update blog' }
  }
}

/**
 * Delete a blog
 */
export async function deleteBlog(id: string) {
  try {
    await connectToDatabase()

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return { success: false, error: 'Blog not found' }
    }

    revalidatePath('/dashboard/blogs')
    revalidatePath('/blog')

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    return { success: false, error: error.message || 'Failed to delete blog' }
  }
}

/**
 * Toggle blog publish status
 */
export async function toggleBlogPublishStatus(id: string, published: boolean) {
  try {
    await connectToDatabase()

    const blog = await Blog.findByIdAndUpdate(id, { published }, { new: true, runValidators: true })

    if (!blog) {
      return { success: false, error: 'Blog not found' }
    }

    revalidatePath('/dashboard/blogs')
    revalidatePath('/blog')
    revalidatePath(`/blog/${id}`)

    return { success: true }
  } catch (error: any) {
    console.error('Error updating blog publish status:', error)
    return { success: false, error: error.message || 'Failed to update blog publish status' }
  }
}
