import { put } from '@vercel/blob'

const TOKEN = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN as string

function ext(file: File): string {
  const match = file.name.match(/\.([^.]+)$/)
  return match ? match[1] : 'jpg'
}

export async function uploadImage(
  file: File,
  variant: 'light' | 'dark',
  slug: string,
): Promise<string> {
  const pathname = `blog-images/${slug}/${variant}-${Date.now()}.${ext(file)}`
  const result = await put(pathname, file, { access: 'public', token: TOKEN })
  return result.url
}

