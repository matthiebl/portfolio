import { useEffect, useRef } from 'react'
import { about } from '../../content'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}


export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal')
              .forEach(el => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      ref={sectionRef}
      className="bg-zinc-50 dark:bg-zinc-900/50 py-24 px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal">
          <p className="font-mono text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            {about.label}
          </p>
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-12"
          >
            {about.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <div className="reveal space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com/matthiebl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-zinc-300 dark:hover:text-indigo-400"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/matthew-hiebl-330544266/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-zinc-300 dark:hover:text-indigo-400"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="reveal">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {about.technologies.heading}
            </h3>
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Skills"
            >
              {about.technologies.skills.map(skill => (
                <span
                  key={skill}
                  role="listitem"
                  className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
