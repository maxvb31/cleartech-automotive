import { defineType, defineField, defineArrayMember } from 'sanity'
import { TextIcon } from '@sanity/icons'
import colorPicker from '../fields/colorPicker'

export default defineType({
  name: 'textContent',
  title: 'Text Content',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      description: 'Choose how you want the content aligned',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
          { title: 'Split', value: 'split' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      description: 'Rich text content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
              {
                name: 'color',
                type: 'object',
                title: 'Text Color',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Color',
                    options: {
                      list: colorPicker.options.colorList.map((color) => ({
                        title: color.label,
                        value: color.value,
                      })),
                    },
                  },
                ],
              },
            ],
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
              { title: 'Underline', value: 'underline' },
            ],
          },
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'button' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'colorPicker',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Text Content',
        subtitle: 'Text content block',
      }
    },
  },
})
