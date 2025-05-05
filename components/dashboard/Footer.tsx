'use client'

import { updateHomepageSection } from '@/actions/data/homepage'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type TProps = {
  data?: FooterSection
}

// Define the Zod schema for footer links
const footerLinkSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(50, { message: 'Title is too long' }),
  link: z.string().min(1, { message: 'Please enter a valid URL' }),
  _id: z.string().optional() // For unique identification
})

// Define the Zod schema for the footer section
const footerSchema = z.object({
  copyright: z.string().min(1, { message: 'Copyright text is required' }),
  socialLinks: z.array(footerLinkSchema).optional()
})

type FooterFormValues = z.infer<typeof footerSchema>

export default function Footer({ data }: TProps) {
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create form with default values from data prop
  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerSchema),
    defaultValues: {
      copyright: data?.copyright || '© 2025 Your Company. All rights reserved.',
      socialLinks: data?.socialLinks?.map((link) => ({
        title: link.title || '',
        link: link.link || '',
        _id: Math.random().toString(36).substring(2, 9)
      })) || [
        {
          title: 'Facebook',
          link: 'https://facebook.com',
          _id: Math.random().toString(36).substring(2, 9)
        }
      ]
    },
    mode: 'onBlur' // Better performance by validating only on blur
  })

  // Set up field array for managing social links
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialLinks'
  })

  // Add a new social link
  const addSocialLink = () => {
    append({
      title: '',
      link: '',
      _id: Math.random().toString(36).substring(2, 9)
    })
  }

  // Submit handler
  const onSubmit = async (values: FooterFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Map form values to FooterSection format
      const footerData: FooterSection = {
        copyright: values.copyright,
        // Map title to icon in the SocialLink type
        socialLinks: values.socialLinks?.map((link) => ({
          title: link.title,
          link: link.link
          // Intentionally omit _id to prevent MongoDB validation errors
        }))
      }

      // Call the server action to update the footer section
      const result = await updateHomepageSection('footer', footerData)

      if (result.success) {
        toast.success('Footer section updated successfully')
      } else {
        toast.error(result.error || 'An error occurred while updating the footer section')
        setError(result.error || 'An error occurred while updating the footer section')
      }
    } catch (err) {
      console.error('Error updating footer section:', err)
      toast.error('An unexpected error occurred')
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className='text-lg my-5 font-semibold lg:text-3xl'>Footer Section</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Display error message */}
          {error && <FormError message={error} />}

          {/* Copyright Text */}
          <FormField
            control={form.control}
            name='copyright'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copyright Text</FormLabel>
                <FormControl>
                  <Input placeholder='© 2025 Your Company. All rights reserved.' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Footer Links */}
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-medium'>Footer Links</h2>
              <Button type='button' onClick={addSocialLink} variant='success' size='sm'>
                <Plus className='h-4 w-4 mr-2' />
                Add Link
              </Button>
            </div>

            <div className='space-y-3'>
              {fields.map((field, index) => (
                <div key={field._id} className='flex gap-3 items-end'>
                  {/* Link Title */}
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.title`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>Link Title</FormLabel>
                        <FormControl>
                          <Input placeholder='About Us, Services, etc.' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Link URL */}
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.link`}
                    render={({ field }) => (
                      <FormItem className='flex-[2]'>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder='https://example.com/about' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove Button */}
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='h-10 w-10 text-destructive'
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}

              {fields.length === 0 && (
                <div className='text-center py-4 text-muted-foreground border rounded-md'>
                  No links added yet. Click the "Add Link" button to add one.
                </div>
              )}
            </div>
          </div>

          <Button type='submit' disabled={isSubmitting} className='mt-6'>
            {isSubmitting ? 'Saving...' : 'Save Footer Section'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
