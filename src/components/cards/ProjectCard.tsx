import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link } from 'react-router'
import { useAdmin } from '../../context/AdminContext'
import { useTheme } from '../../context/ThemeContext'
import { deleteBlogPost } from '../../lib/firestore'
import type { BlogPost } from '../../types'

interface ProjectCardProps {
  post: BlogPost
  onEdit: (post: BlogPost) => void
  onDeleted?: () => void
}

export function ProjectCard({ post, onEdit, onDeleted }: ProjectCardProps) {
  const { isAdmin } = useAdmin()
  const { theme } = useTheme()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const coverImage =
    theme === 'dark'
      ? post.imageDark || post.imageLight
      : post.imageLight || post.imageDark

  // True when the displayed image is the light variant — overlays need dark contrast
  const coverIsLight = !!post.imageLight && coverImage === post.imageLight

  const preview = (() => {
    if (post.previewLines && post.previewLines > 0) {
      const lines = post.content.split('\n').filter(l => l.trim())
      return lines
        .slice(0, post.previewLines)
        .join(' ')
        .replace(/[#*`_]/g, '')
    }
    return post.summary
  })()

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    try {
      await deleteBlogPost(post.id)
      onDeleted?.()
    } catch (e) {
      console.error(e)
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  const publishedDate = post.publishedAt?.toDate?.()
  const dateStr = publishedDate
    ? publishedDate.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
      })
    : null

  const projectHref = post.projectUrl || `/blog/${post.slug}`
  const isExternal = !!post.projectUrl

  return (
    <article
      aria-label={post.title}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5
        ${!post.published && isAdmin
          ? 'opacity-75 ring-2 ring-dashed ring-amber-400 dark:ring-amber-600'
          : ''}
      `}
    >
      {/* Image with gradient overlay */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-900">
        {coverImage ? (
          <img
            src={coverImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-indigo-900 via-purple-900 to-zinc-900" />
        )}

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-linear-to-t to-transparent ${coverIsLight ? 'from-black/50 via-black/10' : 'from-black/80 via-black/20'}`} />

        {/* Tags + draft badge — over the image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {!post.published && isAdmin && (
            <span className="rounded-full bg-amber-500/90 px-2.5 py-0.5 font-mono text-xs font-medium text-white backdrop-blur-sm">
              Draft
            </span>
          )}
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-medium text-white backdrop-blur-sm ${coverIsLight ? 'bg-black/50' : 'bg-white/15'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title over the image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold leading-snug text-white drop-shadow-sm">
            {post.title}
          </h3>
          {dateStr && (
            <time
              dateTime={publishedDate?.toISOString()}
              className="mt-1 block font-mono text-xs text-white/60"
            >
              {dateStr}
            </time>
          )}
        </div>
      </div>

      {/* Content area below */}
      <div className="flex flex-1 flex-col gap-4 rounded-b-2xl border border-t-0 border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        {preview && (
          <p className="line-clamp-3 flex-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {preview}
          </p>
        )}

        {/* CTA link */}
        <div className="flex flex-wrap gap-2">
          {isExternal ? (
            <a
              href={projectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              View project
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <Link
              to={projectHref}
              className="inline-flex items-center gap-1.5 self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Read more
            </Link>
          )}
          {isExternal && (
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Read more
            </Link>
          )}
        </div>
      </div>

      {/* Admin overlay */}
      {isAdmin && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-end gap-2 p-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          {confirmDelete ? (
            <div className="pointer-events-auto flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-md ring-1 ring-zinc-200 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-md hover:bg-red-500 disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Confirm'}
              </button>
            </div>
          ) : (
            <div className="pointer-events-auto flex gap-2">
              <button
                onClick={() => onEdit(post)}
                aria-label={`Edit ${post.title}`}
                className="rounded-lg bg-white p-2 shadow-md ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700"
              >
                <PencilIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
              </button>
              <button
                onClick={handleDelete}
                aria-label={`Delete ${post.title}`}
                className="rounded-lg bg-white p-2 shadow-md ring-1 ring-zinc-200 transition-colors hover:bg-red-50 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-red-900/30"
              >
                <TrashIcon className="h-4 w-4 text-red-500" />
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
