import Link from 'next/link'
import { roboto_mono } from './fonts'

export default function Home() {
  return (
    <main className='w-full max-w-screen-lg px-6 py-24 md:px-10'>
      <section className='sm:mt-24'>
        <p className={`${roboto_mono.className} font-bold`}>Hey there! I am,</p>
        <p className={`${roboto_mono.className} mb-8 text-7xl font-bold sm:text-8xl`}>
          {/* {'<insert name>'} */}
          Matthew Hiebl
        </p>
        <p className='mb-5 text-3xl font-semibold text-gray-700 dark:text-gray-400 sm:mb-10 sm:text-5xl'>
          Web Developer
        </p>
        <p className='text-gray-600 dark:text-gray-500 sm:w-9/12 md:w-7/12'>
          I enjoy all aspects of web development and have a passion for turning ideas into usable
          and responsive websites.
        </p>
      </section>

      <section className='my-14 flex flex-col gap-5'>
        {[
          { href: '/projects', text: 'See my projects' },
          { href: '/about', text: 'More about me' },
        ].map(({ href, text }) => (
          <Link
            key={crypto.randomUUID()}
            href={href}
            className={`
              group flex w-full items-center gap-2 rounded-lg border border-gray-300 px-4 py-3
              text-gray-600 duration-300
              hover:border-gray-400 hover:text-gray-900
              hover:shadow-md dark:border-gray-400 dark:text-gray-400 dark:hover:border-gray-100
              dark:hover:text-gray-100 sm:border-0 sm:p-0 sm:hover:shadow-none
            `}
          >
            {`${text} `}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5 duration-300 group-hover:translate-x-10 group-hover:-rotate-0 sm:group-hover:translate-x-0 sm:group-hover:-rotate-45'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
              />
            </svg>
          </Link>
        ))}
      </section>
    </main>
  )
}
