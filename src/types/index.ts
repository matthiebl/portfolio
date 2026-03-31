import type { Timestamp } from 'firebase/firestore'

export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  /** Small compressed thumbnail (~20KB) stored inline — used on cards */
  thumbLight?: string
  thumbDark?: string
  previewLines?: number
  tags: string[]
  featured: boolean
  published: boolean
  publishedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

/** Stored in blog_post_images/{postId} — only fetched when viewing a post page */
export interface BlogPostImages {
  coverLight?: string
  coverDark?: string
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
