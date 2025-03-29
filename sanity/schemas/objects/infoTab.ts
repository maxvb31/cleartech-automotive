// ./sanity/schemas/documents/sections/hero.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import { ColorWheelIcon } from '@sanity/icons'
import colorPicker from '../fields/colorPicker'

export default defineType({
  name: 'infoTab',
  title: 'Info Tab',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
