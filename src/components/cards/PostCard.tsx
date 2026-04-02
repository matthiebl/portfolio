import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link } from 'react-router'
import { useAdmin } from '../../context/AdminContext'
import { useTheme } from '../../context/ThemeContext'
import { deleteBlogPost } from '../../lib/firestore'
import type { BlogPost } from '../../types'

interface PostCardProps {
  post: BlogPost
  variant?: 'default' | 'featured'
  onEdit: (post: BlogPost) => void
  onDeleted?: () => void
}

export function PostCard({ post, variant = 'default', onEdit, onDeleted }: PostCardProps) {
  const { isAdmin } = useAdmin()
  const { theme } = useTheme()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const coverImage =
    theme === 'dark'
      ? post.imageDark || post.imageLight
      : post.imageLight || post.imageDark

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

  return (
    <article
      aria-label={post.title}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl border bg-white
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-0.5
        dark:bg-zinc-900
        ${!post.published && isAdmin
          ? 'border-dashed border-amber-300 opacity-75 dark:border-amber-700'
          : 'border-zinc-200 dark:border-zinc-800'}
        ${variant === 'featured' && post.published ? 'ring-1 ring-indigo-200 dark:ring-indigo-900' : ''}
      `}
    >
      {/* Cover image */}
      <div className="block aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {coverImage ? (
          <img
            src={coverImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 opacity-40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col p-5">
        {/* Tags + draft badge */}
        {(post.tags.length > 0 || (!post.published && isAdmin)) && (
          <div
            className="mb-3 flex flex-wrap gap-1.5"
            role="list"
            aria-label="Tags"
          >
            {!post.published && isAdmin && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Draft
              </span>
            )}
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                role="listitem"
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          <Link
            to={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {post.title}
          </Link>
        </h3>

        {/* Preview */}
        {preview && (
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {preview}
          </p>
        )}

        {/* Footer: date + read more */}
        <div className="mt-auto flex items-center justify-between gap-4">
          {dateStr && (
            <time
              dateTime={publishedDate?.toISOString()}
              className="font-mono text-xs text-zinc-400 dark:text-zinc-500"
            >
              {dateStr}
            </time>
          )}
          <Link
            to={`/blog/${post.slug}`}
            className="relative z-20 ml-auto inline-flex items-center gap-1.5 self-start rounded-lg border border-zinc-300 bg-transparent px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Read more
          </Link>
        </div>
      </div>

      {/* Admin overlay — pointer-events-none so the stretch link stays clickable */}
      {isAdmin && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-end gap-2 p-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
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
