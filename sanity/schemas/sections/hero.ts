// ./sanity/schemas/documents/sections/hero.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      description:
        'Upload a video file (MP4 recommended) with dimensions 1920x1080',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'button' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'video',
    },
  },
})
