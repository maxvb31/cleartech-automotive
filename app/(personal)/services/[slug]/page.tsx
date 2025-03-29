import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/pages/service/ServicePage' // Import your service page component
import { loadService } from '@/sanity/loader/loadQuery' // Import loadService
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { toPlainText } from 'next-sanity'

import { ProjectPage } from '@/components/pages/project/ProjectPage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadProject } from '@/sanity/loader/loadQuery'
const ServicePreview = dynamic(
  () => import('@/components/pages/service/ServicePreview'),
) // Optional: Handle preview mode

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: service } = await loadService(params.slug)
  return {
    title: service?.title,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('service') // Generate static slugs for services
}

export default async function ServiceSlugRoute({ params }: Props) {
  const initial = await loadService(params.slug)

  if (draftMode().isEnabled) {
    return <ServicePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound() // If no service is found, show 404
  }

  return <ServicePage data={initial.data} /> // Render service page with the fetched data
}
