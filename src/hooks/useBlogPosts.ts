import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type QueryConstraint,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { db } from '../lib/firebase'
import type { BlogPost } from '../types'

interface UseBlogPostsOptions {
  featuredOnly?: boolean
}

interface UseBlogPostsResult {
  posts: BlogPost[]
  loading: boolean
  error: Error | null
}

export function useBlogPosts({
  featuredOnly = false,
}: UseBlogPostsOptions = {}): UseBlogPostsResult {
  const { isAdmin } = useAdmin()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

    if (!isAdmin) {
      constraints.unshift(where('published', '==', true))
    }
    if (featuredOnly) {
      constraints.unshift(where('featured', '==', true))
    }

    const q = query(collection(db, 'blog_posts'), ...constraints)

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        setPosts(
          snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as BlogPost),
        )
        setLoading(false)
      },
      err => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [isAdmin, featuredOnly])

  return { posts, loading, error }
}
