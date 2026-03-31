import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { compressTwoSizes } from '../../lib/imageUtils'

interface ImageUploaderProps {
  label: string
  thumbValue: string
  coverValue: string
  onChange: (data: { thumb: string; cover: string }) => void
}

const MAX_SIZE_MB = 20

export function ImageUploader({
  label,
  thumbValue,
  coverValue,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [compressing, setCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB.`)
      return
    }

    setCompressing(true)
    try {
      const result = await compressTwoSizes(file)
      onChange(result)
    } catch (e) {
      setError('Failed to process image. Please try another file.')
      console.error(e)
    } finally {
      setCompressing(false)
    }
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

  const clear = () => {
    onChange({ thumb: '', cover: '' })
    if (inputRef.current) inputRef.current.value = ''
  }

  // Show the thumb preview (small version), fall back to cover
  const preview = thumbValue || coverValue

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <img src={preview} alt="" className="h-32 w-full object-cover" />
          <button
            type="button"
            onClick={clear}
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
          disabled={compressing}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 py-6 text-sm text-zinc-400 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-wait dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-500 dark:hover:border-zinc-600"
        >
          <PhotoIcon className="h-7 w-7" aria-hidden="true" />
          <span>
            {compressing ? 'Compressing…' : 'Click or drag to upload'}
          </span>
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

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
