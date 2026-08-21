import { permanentRedirect } from 'next/navigation'

export default async function PortfolioRedirectPage({ params: paramsPromise }) {
  const params = await paramsPromise
  const id = params?.id
  permanentRedirect(`/projects/${id || ''}`)
}
