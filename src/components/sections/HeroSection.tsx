function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative w-full px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="animate-fade-up font-mono text-sm font-medium tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4">
            Hey there, I&apos;m
          </p>
          <h1
            id="hero-heading"
            className="animate-fade-up-delay-1 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl lg:text-8xl"
          >
            Matthew Hiebl
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 text-2xl font-semibold text-zinc-500 dark:text-zinc-400 sm:text-3xl">
            Software Engineer
          </p>
          <p className="animate-fade-up-delay-3 mt-6 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            I enjoy all aspects of web development and have a passion for
            turning ideas into usable, responsive, and well-crafted websites.
          </p>

          <div className="animate-fade-up-delay-4 mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('showcase')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Explore my work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollTo('blog')}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
            >
              Read my blog
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
