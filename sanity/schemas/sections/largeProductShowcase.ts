// ./sanity/schemas/documents/sections/hero.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import { ColorWheelIcon } from '@sanity/icons'
import colorPicker from '../fields/colorPicker'

export default defineType({
  name: 'largeProductShowcase',
  title: 'Large Product Showcase',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'customImage',
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
