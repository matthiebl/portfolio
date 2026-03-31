import { useAdmin } from '../../context/AdminContext'

export function AdminToolbar() {
  const { isAdmin, dismissAdmin } = useAdmin()

  if (!isAdmin) return null

  return (
    <div
      role="status"
      aria-label="Admin mode active"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full bg-indigo-600 pl-4 pr-2 py-2 shadow-xl text-white text-sm font-semibold"
    >
      <span>Admin</span>
      <button
        onClick={dismissAdmin}
        className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
      >
        Sign out
      </button>
    </div>
  )
}
