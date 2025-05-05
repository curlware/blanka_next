'use client'

import { updateHomepageSection } from '@/actions/data/homepage'
import { FormError } from '@/components/shared/form-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import TeamMembers from './TeamMember'

type TProps = {
  data?: TeamSection
}

// Define the Zod schema for the team section
const teamSectionSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title is too long' }),
  subtitle: z
    .string()
    .min(1, { message: 'Subtitle is required' })
    .max(300, { message: 'Subtitle is too long' }),
  leftText: z.string().max(500, { message: 'Left text is too long' }).optional(),
  rightText: z.string().max(500, { message: 'Right text is too long' }).optional()
})

export type TeamFormValues = z.infer<typeof teamSectionSchema>

// Team member card component

export default function Team({ data }: TProps) {
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // State for team member images (separate from form state to handle file uploads)

  // Create form with default values from data prop and optimize validation
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSectionSchema),
    defaultValues: {
      title: data?.title || '',
      subtitle: data?.subtitle || '',
      leftText: data?.leftText || '',
      rightText: data?.rightText || ''
    },
    mode: 'onSubmit', // Changed from onBlur to onSubmit for better performance
    shouldUnregister: false, // Keep fields registered when they unmount
    reValidateMode: 'onSubmit' // Changed from onBlur to onSubmit for better performance
  })

  const { control } = form

  // Submit handler
  const onSubmit = async (values: TeamFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Combine form data with image data
      const teamData: TeamSection = {
        title: values.title,
        subtitle: values.subtitle,
        leftText: values.leftText,
        rightText: values.rightText,
        members: data?.members || [] // Keep existing members
      }

      // Call the server action to update the team section
      const result = await updateHomepageSection('team', teamData)

      if (result.success) {
        toast.success('Team section updated successfully')
      } else {
        toast.error(result.error || 'An error occurred while updating the team section')
        setError(result.error || 'An error occurred while updating the team section')
      }
    } catch (err) {
      console.error('Error updating team section:', err)
      toast.error('An unexpected error occurred')
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className='text-lg my-5 font-semibold lg:text-3xl'>Team Section</h1>

      <Card>
        <CardContent className='pt-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Display error message */}
              {error && <FormError message={error} />}

              {/* Section title and subtitle */}
              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  control={control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Our Team' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name='subtitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Subtitle</FormLabel>
                      <FormControl>
                        <Input placeholder='Meet the experts behind our success' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optional text columns */}
              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  control={control}
                  name='leftText'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Left Column Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Additional information about your team...'
                          className='h-24'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name='rightText'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Right Column Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Additional information about your team...'
                          className='h-24'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type='submit' disabled={isSubmitting} className='mt-6'>
                {isSubmitting ? 'Saving...' : 'Save Team Section'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <TeamMembers data={data} />
    </div>
  )
}
