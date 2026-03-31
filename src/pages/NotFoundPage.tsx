import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-mono text-sm font-medium tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
        Page not found
      </h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Go home
      </Link>
    </main>
  )
}
