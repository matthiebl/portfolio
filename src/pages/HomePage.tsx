import { AboutSection } from '../components/sections/AboutSection'
import { BlogSection } from '../components/sections/BlogSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ShowcaseSection } from '../components/sections/ShowcaseSection'

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <ShowcaseSection />
      <BlogSection />
      <AboutSection />
    </main>
  )
}
