import { generateRouteMetadata } from "@/lib/metadata"
import { HomeClient } from "./home-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return generateRouteMetadata(locale, "home", "")
}

export default function Home() {
  return (
    <>
      <HomeClient />
    </>
  )
}
