import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'matthiebl | About',
  description: "matthiebl's about me",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
