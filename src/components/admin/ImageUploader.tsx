import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'

interface ImageUploaderProps {
  label: string
  url: string
  uploading: boolean
  onUpload: (file: File) => Promise<void>
  onClear: () => void
}

const MAX_SIZE_MB = 20

export function ImageUploader({
  label,
  url,
  uploading,
  onUpload,
  onClear,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return
    await onUpload(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      {url ? (
        <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <img src={url} alt="" className="h-32 w-full object-cover" />
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove image"
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 py-6 text-sm text-zinc-400 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-wait dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-500 dark:hover:border-zinc-600"
        >
          <PhotoIcon className="h-7 w-7" aria-hidden="true" />
          <span>{uploading ? 'Uploading…' : 'Click or drag to upload'}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={handleInputChange}
      />
    </div>
  )
}
