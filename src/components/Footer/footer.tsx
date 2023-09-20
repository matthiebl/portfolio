import { BiLogoGithub, BiLogoLinkedinSquare } from 'react-icons/bi'
import { HiArrowUpRight } from 'react-icons/hi2'

import { roboto_mono } from '@/app/fonts'

export function Footer({}: {}) {
  return (
    <footer className={`${roboto_mono.className} flex w-full justify-center`}>
      <div className='flex w-full max-w-screen-xl flex-wrap items-center justify-center gap-5 p-3 text-gray-500 sm:text-sm'>
        <span className='text-sm'>Matthew Hiebl 2023</span>
        <a
          href='https://github.com/matthiebl'
          target='_blank'
          className='flex items-center gap-1 rounded-full p-2 hover:underline'
        >
          <BiLogoGithub />
          <span className='hidden sm:block'>Github</span>
          <HiArrowUpRight className='hidden sm:block' />
        </a>
        <a
          href='https://www.linkedin.com/in/matthew-hiebl-330544266/'
          target='_blank'
          className='flex items-center gap-1 rounded-full p-2 hover:underline'
        >
          <BiLogoLinkedinSquare />
          <span className='hidden sm:block'>LinkedIn</span>
          <HiArrowUpRight className='hidden sm:block' />
        </a>
      </div>
    </footer>
  )
}
