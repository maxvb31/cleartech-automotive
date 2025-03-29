import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import colorPicker from '../fields/colorPicker'
import { ColorWheelIcon } from '@sanity/icons'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your service.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      description: 'This field is the number of the service.',
      title: 'Number',
      type: 'string',
    }),

    defineField({
      name: 'overview',
      description: 'A rich text body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          lists: [],
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
                title: 'Text Color (applies on published site)',
                icon: ColorWheelIcon,
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
              { title: 'Strike', value: 'strike-through' },
            ],
          },
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'divider',
          title: 'Divider',
          fields: [
            {
              name: 'height',
              title: 'Height',
              type: 'string',
              options: {
                list: [
                  { title: '8px', value: '8' },
                  { title: '12px', value: '12' },
                  { title: '16px', value: '16' },
                  { title: '24px', value: '24' },
                ],
              },
              description: 'Select the height of the divider',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              height: 'height',
            },
            prepare({ height }) {
              return {
                title: `Divider - ${height}px`,
              }
            },
          },
        }),
      ],
    }),
  ],
})
