// ./sanity/schemas/documents/sections/hero.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import { ColorWheelIcon } from '@sanity/icons'
import colorPicker from '../fields/colorPicker'

export default defineType({
  name: 'infoTabs',
  title: 'Info Tabs',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'customImage',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [{ type: 'infoTab' }],
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
