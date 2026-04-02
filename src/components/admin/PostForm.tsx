import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Timestamp } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { createBlogPost, updateBlogPost } from '../../lib/firestore'
import { uploadImage } from '../../lib/blobUpload'
import type { BlogPost } from '../../types'
import { ImageUploader } from './ImageUploader'

interface PostFormProps {
  post?: BlogPost
  onClose: (saved?: boolean) => void
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface FormState {
  title: string
  slug: string
  summary: string
  content: string
  previewLines: number
  tags: string
  imageLight: string
  imageDark: string
  projectUrl: string
  publishedDate: string
  featured: boolean
  published: boolean
}

function initialState(post?: BlogPost): FormState {
  if (post) {
    return {
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content,
      previewLines: post.previewLines ?? 0,
      tags: post.tags.join(', '),
      imageLight: post.imageLight ?? '',
      imageDark: post.imageDark ?? '',
      projectUrl: post.projectUrl ?? '',
      publishedDate: post.publishedAt
        ? post.publishedAt.toDate().toISOString().split('T')[0]
        : '',
      featured: post.featured,
      published: post.published,
    }
  }
  return {
    title: '',
    slug: '',
    summary: '',
    content: '',
    previewLines: 0,
    tags: '',
    imageLight: '',
    imageDark: '',
    projectUrl: '',
    publishedDate: '',
    featured: false,
    published: false,
  }
}

export function PostForm({ post, onClose }: PostFormProps) {
  const [form, setForm] = useState<FormState>(() => initialState(post))
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!post)
  const [saving, setSaving] = useState(false)
  const [uploadingLight, setUploadingLight] = useState(false)
  const [uploadingDark, setUploadingDark] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!post

  useEffect(() => {
    setTimeout(() => firstInputRef.current?.focus(), 50)
  }, [])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleTitleChange = (value: string) => {
    setForm(f => ({
      ...f,
      title: value,
      ...(slugManuallyEdited ? {} : { slug: slugify(value) }),
    }))
  }

  const handleUpload = async (variant: 'light' | 'dark', file: File) => {
    const setUploading = variant === 'light' ? setUploadingLight : setUploadingDark
    const field = variant === 'light' ? 'imageLight' : 'imageDark'
    setUploading(true)
    try {
      const url = await uploadImage(file, variant, form.slug || 'draft')
      setForm(f => ({ ...f, [field]: url }))
    } catch (e) {
      setError('Image upload failed. Please try again.')
      console.error(e)
    } finally {
      setUploading(false)
    }
  }

  const handleClear = (variant: 'light' | 'dark') => {
    const field = variant === 'light' ? 'imageLight' : 'imageDark'
    setForm(f => ({ ...f, [field]: '' }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) {
      setError('Title and slug are required.')
      return
    }
    setError(null)
    setSaving(true)

    const postData = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim(),
      content: form.content,
      previewLines: form.previewLines || 0,
      tags: form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      imageLight: form.imageLight,
      imageDark: form.imageDark,
      featured: form.featured,
      published: form.published,
      ...(form.projectUrl.trim() ? { projectUrl: form.projectUrl.trim() } : {}),
      publishedAt: (form.publishedDate
        ? new Date(form.publishedDate + 'T00:00:00')
        : form.published && !post?.publishedAt
          ? new Date()
          : (post?.publishedAt ?? null)) as unknown as Timestamp,
    }

    try {
      if (isEditing) {
        await updateBlogPost(post.id, postData)
      } else {
        await createBlogPost(postData)
      }

      setSuccess(true)
      setTimeout(() => onClose(true), 800)
    } catch (e) {
      setError('Failed to save. Please try again.')
      console.error(e)
      setSaving(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-form-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8"
      onKeyDown={handleKeyDown}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onClose()}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2
            id="post-form-title"
            className="text-base font-semibold text-zinc-900 dark:text-zinc-50"
          >
            {isEditing ? 'Edit post' : 'New post'}
          </h2>
          <button
            onClick={() => onClose()}
            aria-label="Close"
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:hover:bg-zinc-800"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="pf-title"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Title *
            </label>
            <input
              ref={firstInputRef}
              id="pf-title"
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              required
              className="input-field"
              placeholder="My awesome post"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="pf-slug"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Slug *
            </label>
            <input
              id="pf-slug"
              type="text"
              value={form.slug}
              onChange={e => {
                setSlugManuallyEdited(true)
                set('slug', e.target.value)
              }}
              required
              className="input-field font-mono"
              placeholder="my-awesome-post"
            />
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="pf-summary"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Summary
            </label>
            <textarea
              id="pf-summary"
              value={form.summary}
              onChange={e => set('summary', e.target.value)}
              rows={2}
              className="input-field resize-none"
              placeholder="A short description shown on cards…"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="pf-content"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Content (Markdown)
            </label>
            <textarea
              id="pf-content"
              value={form.content}
              onChange={e => set('content', e.target.value)}
              rows={12}
              className="input-field resize-y font-mono text-xs"
              placeholder={'# My Post\n\nWrite your content here…'}
            />
          </div>

          {/* Preview lines */}
          <div>
            <label
              htmlFor="pf-preview"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Card preview lines{' '}
              <span className="text-zinc-400">(0 = use summary)</span>
            </label>
            <input
              id="pf-preview"
              type="number"
              min={0}
              value={form.previewLines}
              onChange={e => set('previewLines', Number(e.target.value))}
              className="input-field w-24"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="pf-tags"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Tags <span className="text-zinc-400">(comma-separated)</span>
            </label>
            <input
              id="pf-tags"
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              className="input-field"
              placeholder="react, typescript, firebase"
            />
          </div>

          {/* Images */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Cover images
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImageUploader
                label="Light mode"
                url={form.imageLight}
                uploading={uploadingLight}
                onUpload={file => handleUpload('light', file)}
                onClear={() => handleClear('light')}
              />
              <ImageUploader
                label="Dark mode"
                url={form.imageDark}
                uploading={uploadingDark}
                onUpload={file => handleUpload('dark', file)}
                onClear={() => handleClear('dark')}
              />
            </div>
          </div>

          {/* Project URL */}
          <div>
            <label
              htmlFor="pf-project-url"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Project URL <span className="text-zinc-400">(optional)</span>
            </label>
            <input
              id="pf-project-url"
              type="url"
              value={form.projectUrl}
              onChange={e => set('projectUrl', e.target.value)}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>

          {/* Published date */}
          <div>
            <label
              htmlFor="pf-published-date"
              className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Published date <span className="text-zinc-400">(leave blank to auto-set on publish)</span>
            </label>
            <input
              id="pf-published-date"
              type="date"
              value={form.publishedDate}
              onChange={e => set('publishedDate', e.target.value)}
              className="input-field w-48"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => set('featured', e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Featured
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => set('published', e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Published
              </span>
            </label>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}
          {success && (
            <p
              role="status"
              className="text-sm text-green-600 dark:text-green-400"
            >
              Saved!
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => onClose()}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || success}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Create post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
