import type { Timestamp } from 'firebase/firestore'

export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  /** Vercel Blob CDN URL — used on cards and post pages */
  imageLight?: string
  imageDark?: string
  previewLines?: number
  tags: string[]
  featured: boolean
  published: boolean
  publishedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
