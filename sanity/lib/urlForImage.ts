import imageUrlBuilder from '@sanity/image-url'
import { client } from './client' // Import the client from client.ts

// Create the image URL builder using the existing client
const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}
