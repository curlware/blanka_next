'use client'

import { createBlog, updateBlog } from '@/actions/blogs'
import { FormError } from '@/components/shared/form-error'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Blog, BlogCreateUpdateData } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import ImageUploader from './ImageUploader'

interface BlogFormProps {
  blog?: Blog | null
  onSuccess?: () => void
}

// Define the Zod schema for blog data validation
const blogSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title is too long' }),
  shortDescription: z
    .string()
    .min(1, { message: 'Short description is required' })
    .max(300, { message: 'Short description is too long' }),
  content: z.string().min(1, { message: 'Content is required' }),
  published: z.boolean().optional()
})

type FormValues = z.infer<typeof blogSchema>

export default function BlogForm({ blog, onSuccess }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | undefined>()
  const [blogImage, setBlogImage] = useState<MediaFile | undefined>(
    blog?.image
      ? {
          thumbnail: blog.image.thumbnail || '',
          file: blog.image.file || '',
          fileId: blog.image.fileId || ''
        }
      : undefined
  )

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || '',
      shortDescription: blog?.shortDescription || '',
      content: blog?.content || '',
      published: blog?.published || false
    }
  })

  const onSubmit = async (data: FormValues) => {
    if (!blogImage || !blogImage.file || !blogImage.thumbnail || !blogImage.fileId) {
      setServerError('Please upload a complete featured image for the blog post')
      return
    }

    setIsSubmitting(true)
    setServerError(undefined)

    try {
      // Ensure all required fields for BlogCreateUpdateData are present
      const blogData: BlogCreateUpdateData = {
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content, // Map content field to body as expected by the API
        published: data.published || false,
        date: new Date(), // Use current date
        image: {
          thumbnail: blogImage.thumbnail,
          file: blogImage.file,
          fileId: blogImage.fileId
        }
      }

      let result

      if (blog) {
        // Update existing blog - use Partial type for updates
        result = await updateBlog(blog._id, blogData)
      } else {
        // Create new blog
        result = await createBlog(blogData)
      }

      if (result.success) {
        toast.success(blog ? 'Blog post updated successfully' : 'Blog post created successfully')
        if (onSuccess) onSuccess()
      } else {
        setServerError(result.error || 'An error occurred')
        toast.error(result.error || 'An error occurred')
      }
    } catch (error: any) {
      console.error('Error submitting blog:', error)
      setServerError(error.message || 'An unexpected error occurred')
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // The rest of the component remains unchanged
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {serverError && <FormError message={serverError} />}

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-4'>
            {/* Blog Title */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter blog title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blog Short Description */}
            <FormField
              control={form.control}
              name='shortDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter a brief description (appears in lists and previews)'
                      className='resize-none h-32'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Published Status */}
            <FormField
              control={form.control}
              name='published'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Publish this blog?</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <div>
                      <input
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        className='peer h-4 w-4 rounded border-gray-300 focus:ring-primary'
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Blog Image */}
          <div className='space-y-4'>
            <FormLabel>Featured Image</FormLabel>

            {blogImage?.file && (
              <div className='mb-4 relative'>
                <div className='border rounded-md overflow-hidden relative aspect-video w-full'>
                  <Image
                    src={blogImage.file}
                    alt='Blog image preview'
                    fill
                    className='object-cover'
                  />
                </div>
                <p className='text-xs text-muted-foreground mt-1'>Current image</p>
              </div>
            )}

            <ImageUploader fileId={blogImage?.fileId} setFile={(file) => setBlogImage(file)} />
            <p className='text-xs text-muted-foreground'>
              Upload a featured image for your blog post. Recommended ratio: 16:9.
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter the full content of your blog post...'
                  className='min-h-[400px] resize-y'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Saving...' : blog ? 'Update Blog Post' : 'Create Blog Post'}
        </Button>
      </form>
    </Form>
  )
}
