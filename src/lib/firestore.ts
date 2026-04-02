import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import type { BlogPost, BlogPostInput } from '../types'
import { db } from './firebase'

const POSTS = 'blog_posts'

// ── Posts ──────────────────────────────────────────────────────────────────

export async function getBlogPosts(
  includeUnpublished = false,
): Promise<BlogPost[]> {
  const q = includeUnpublished
    ? query(collection(db, POSTS), orderBy('createdAt', 'desc'))
    : query(
        collection(db, POSTS),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
      )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as BlogPost)
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const q = query(collection(db, POSTS), where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const d = snapshot.docs[0]
  return { id: d.id, ...d.data() } as BlogPost
}

export async function createBlogPost(data: BlogPostInput): Promise<string> {
  const ref = await addDoc(collection(db, POSTS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPostInput>,
): Promise<void> {
  await updateDoc(doc(db, POSTS, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, POSTS, id))
}
