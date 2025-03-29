'use client'

import { useQuery } from '@/sanity/loader/useQuery'
import { ServicePayload } from '@/types'
import { serviceBySlugQuery } from '@/sanity/lib/queries'
import ServicePage from './ServicePage'

type Props = {
  params: { slug: string }
}

export default function ServicePreview({ params }: Props) {
  const { data } = useQuery<ServicePayload>(serviceBySlugQuery, params)

  return <ServicePage data={data!} />
}
