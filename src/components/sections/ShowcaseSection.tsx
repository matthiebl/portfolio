import { useEffect, useRef, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useBlogPosts } from '../../hooks/useBlogPosts'
import { PostForm } from '../admin/PostForm'
import { PostCard } from '../cards/PostCard'

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="aspect-video bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="space-y-2">
          <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  )
}

export function ShowcaseSection() {
  const { isAdmin } = useAdmin()
  const { posts, loading } = useBlogPosts({ featuredOnly: true })
  const [addingNew, setAddingNew] = useState(false)
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
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      ref={sectionRef}
      className="py-24 px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3">
              Featured Work
            </p>
            <h2
              id="showcase-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              Selected projects
            </h2>
            <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
              A curated selection of things I&apos;ve built and written about.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setAddingNew(true)}
              className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              + New post
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="text-sm text-zinc-400">
              {isAdmin
                ? 'No featured posts yet. Create one above.'
                : 'Nothing here yet.'}
            </p>
          </div>
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Featured posts"
          >
            {posts.map((post, i) => (
              <div
                key={post.id}
                className={`reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
                role="listitem"
              >
                <PostCard post={post} variant="featured" />
              </div>
            ))}
          </div>
        )}
      </div>

      {addingNew && <PostForm onClose={() => setAddingNew(false)} />}
    </section>
  )
}
