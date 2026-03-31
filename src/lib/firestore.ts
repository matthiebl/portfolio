import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import type { BlogPost, BlogPostImages, BlogPostInput } from '../types'
import { db } from './firebase'

const POSTS = 'blog_posts'
const IMAGES = 'blog_post_images'

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
  await Promise.all([
    deleteDoc(doc(db, POSTS, id)),
    deleteDoc(doc(db, IMAGES, id)),
  ])
}

// ── Post images (cover only — fetched on post page) ────────────────────────

export async function getBlogPostImages(id: string): Promise<BlogPostImages> {
  const d = await getDoc(doc(db, IMAGES, id))
  if (!d.exists()) return {}
  return d.data() as BlogPostImages
}

export async function saveBlogPostImages(
  id: string,
  images: BlogPostImages,
): Promise<void> {
  await setDoc(doc(db, IMAGES, id), images, { merge: true })
}
