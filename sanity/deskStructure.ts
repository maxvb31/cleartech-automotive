import { HomeIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const deskStructure = (S) =>
  S.list()
    .title('Site Content')
    .items([
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.editor()
            .schemaType('home')
            .documentId('7911dfe1-d8f9-48db-bb78-894a6c09be22'),
        ),

      S.listItem()
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages')),

      S.listItem()
        .title('Settings')
        .child(S.editor().schemaType('settings').documentId('settings')),
    ])
