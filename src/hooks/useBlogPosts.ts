import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { db } from '../lib/firebase'
import type { BlogPost } from '../types'

interface UseBlogPostsOptions {
  featuredOnly?: boolean
  excludeFeatured?: boolean
}

interface UseBlogPostsResult {
  posts: BlogPost[]
  loading: boolean
  error: Error | null
  refresh: () => void
}

export function useBlogPosts({
  featuredOnly = false,
  excludeFeatured = false,
}: UseBlogPostsOptions = {}): UseBlogPostsResult {
  const { isAdmin } = useAdmin()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => setRefreshKey(k => k + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'))

    getDocs(q)
      .then(snapshot => {
        if (cancelled) return
        let results = snapshot.docs.map(
          d => ({ id: d.id, ...d.data() }) as BlogPost,
        )
        if (!isAdmin) results = results.filter(p => p.published)
        if (featuredOnly) results = results.filter(p => p.featured)
        if (excludeFeatured) results = results.filter(p => !p.featured)
        setPosts(results)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        setError(err)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isAdmin, featuredOnly, excludeFeatured, refreshKey])

  return { posts, loading, error, refresh }
}
