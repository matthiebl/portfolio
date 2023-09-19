'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { roboto_mono } from '@/app/fonts'

export function Navbar({}: {}) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav
      className={`${roboto_mono.className} w-full p-5 flex justify-between items-center`}
    >
      <Link href="/" className="rounded flex gap-4 py-0.5 pr-1">
        <Image src="/icon.png" alt="profile icon" width={28} height={28} />
        <h1 className="text-lg hidden sm:block">matthiebl</h1>
      </Link>
      <div className="flex gap-4 items-center">
        {[
          { href: '/projects', text: 'Projects' },
          { href: '/about', text: 'About' },
        ].map(({ href, text }) => (
          <Link
            href={href}
            className="px-2 py-[5px] rounded text-sm sm:text-base"
          >
            {text}
          </Link>
        ))}
        <button
          className="rounded p-[5px] sm:p-[7px]"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'light' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}