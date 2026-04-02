import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate, useParams } from 'react-router'
import rehypeHighlight from 'rehype-highlight'
import { PostForm } from '../components/admin/PostForm'
import { useAdmin } from '../context/AdminContext'
import { useTheme } from '../context/ThemeContext'
import { getBlogPostBySlug } from '../lib/firestore'
import type { BlogPost } from '../types'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isAdmin } = useAdmin()
  const { theme } = useTheme()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getBlogPostBySlug(slug)
      .then(result => {
        if (!result || (!result.published && !isAdmin)) {
          setNotFound(true)
          return
        }
        setPost(result)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug, isAdmin])

  if (loading) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-6 py-24 lg:px-10"
      >
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="aspect-video rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="h-4 rounded bg-zinc-200 dark:bg-zinc-800"
              style={{ width: `${75 + i * 5}%` }}
            />
          ))}
        </div>
      </main>
    )
  }

  if (notFound || !post) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-[60vh] flex-col items-center justify-center px-6"
      >
        <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Post not found
        </h1>
        <p className="mb-8 text-zinc-500">
          This post doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <button
          onClick={() => navigate('/')}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Back to home
        </button>
      </main>
    )
  }

  const coverImage =
    theme === 'dark'
      ? post.imageDark || post.imageLight
      : post.imageLight || post.imageDark

  const publishedDate = post.publishedAt?.toDate?.()
  const dateStr = publishedDate?.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-6 pt-28 pb-20 lg:px-10"
      >
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>

        <header className="mb-8">
          {post.tags.length > 0 && (
            <div
              className="mb-4 flex flex-wrap gap-2"
              role="list"
              aria-label="Tags"
            >
              {post.tags.map(tag => (
                <span
                  key={tag}
                  role="listitem"
                  className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
              {!post.published && isAdmin && (
                <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  Draft
                </span>
              )}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center justify-between">
            {dateStr && (
              <time
                dateTime={publishedDate?.toISOString()}
                className="font-mono text-sm text-zinc-400 dark:text-zinc-500"
              >
                {dateStr}
              </time>
            )}
            {isAdmin && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
              >
                <PencilIcon className="h-4 w-4" aria-hidden="true" />
                Edit post
              </button>
            )}
          </div>
        </header>

        {coverImage && (
          <div className="relative mb-8 w-screen max-w-7xl left-1/2 -translate-x-1/2 px-6 lg:px-10">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={coverImage}
                alt=""
                className="w-full max-h-[60vh] object-cover"
              />
            </div>
          </div>
        )}

        <article className="prose">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </main>

      {editing && <PostForm post={post} onClose={() => setEditing(false)} />}
    </>
  )
}
