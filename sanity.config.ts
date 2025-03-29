'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import button from './sanity/schemas/objects/button'
import colorPicker from './sanity/schemas/fields/colorPicker'
import hero from './sanity/schemas/sections/hero'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import service from './sanity/schemas/documents/service'
import customImage from './sanity/schemas/objects/customImage'
// Import the custom desk structure
import { deskStructure } from './sanity/deskStructure'
import largeProductShowcase from './sanity/schemas/sections/largeProductShowcase'
import infoTabs from './sanity/schemas/sections/infoTabs'
import infoBlock from './sanity/schemas/sections/infoBlock'
import infoTab from './sanity/schemas/objects/infoTab'
import contact from './sanity/schemas/sections/contact'
const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Max Burrows Studio'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      page,
      project,
      service,

      // Sections
      hero,
      largeProductShowcase,
      infoTabs,
      infoBlock,
      // Objects
      milestone,
      timeline,
      button,
      customImage,
      infoTab,
      contact,
      //Fields
      colorPicker,
    ],
  },
  plugins: [
    structureTool({
      structure: deskStructure, // Use custom desk structure here
    }),

    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    simplerColorInput(),

    media(),

    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
