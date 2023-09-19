import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'matthiebl | Projects',
  description: "matthiebl's projects",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
