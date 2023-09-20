import { BiCode } from 'react-icons/bi'
import { IoBrowsersOutline } from 'react-icons/io5'
import { BsDot } from 'react-icons/bs'

import { roboto_mono } from '@/app/fonts'
import { projects } from './projects'

export function TimelineSection({}: {}) {
  return (
    <section className='mb-16'>
      <h2 className={`${roboto_mono.className} mb-2 text-xl`}>My projects, a history</h2>
      <p className='text-sm text-gray-700 dark:text-gray-300'>
        I have worked on a variety of web related projects; personally, at university, and at work.
        To simplify the list of projects, I have made a timeline to help visualise my growth.
      </p>
      <div className='relative mt-4 after:absolute after:bottom-0 after:left-1/2 after:top-0 after:-ml-[1px] after:w-[2px] after:rounded after:bg-gray-600 after:dark:bg-white md:after:z-20'>
        <div className='mb-10 h-[1px] md:hidden' />
        {projects.map(({ date, title, description, icons, code, href }) => (
          <div
            key={crypto.randomUUID()}
            className='group relative z-10 mb-10 flex flex-col gap-1 rounded-2xl border-[2px] border-gray-600 bg-white px-6 py-6 dark:border-white dark:bg-slate-900 md:mb-0 md:w-1/2 md:border-0 md:border-transparent md:py-2 md:odd:items-end md:odd:text-right md:even:left-1/2'
          >
            <p className={`${roboto_mono.className} text-sm text-gray-600 dark:text-gray-400`}>
              {date}
            </p>
            <p className={`${roboto_mono.className} font-bold`}>{title}</p>
            <p className='text-sm text-gray-700 dark:text-gray-300'>{description}</p>
            <div className='mt-2 flex flex-row-reverse items-center gap-4 md:mt-0 md:flex-row md:group-even:flex-row-reverse md:group-even:justify-end'>
              {(code || href) && (
                <>
                  <div className='mt-1 flex flex-row-reverse items-center gap-2 text-2xl group-even:flex-row-reverse md:flex-row'>
                    {href && (
                      <a
                        href={href}
                        target='_blank'
                        className='group/tt relative flex items-center justify-center'
                      >
                        <IoBrowsersOutline className='text-lg' />
                        <span className='absolute translate-y-6 scale-0 text-sm duration-150 group-hover/tt:scale-100'>
                          Website
                        </span>
                      </a>
                    )}
                    {code && (
                      <a
                        href={code}
                        target='_blank'
                        className='group/tt relative flex items-center justify-center'
                      >
                        <BiCode />
                        <span className='absolute translate-y-6 scale-0 text-sm duration-150 group-hover/tt:scale-100'>
                          Code
                        </span>
                      </a>
                    )}
                  </div>
                  <BsDot className='mt-1' />
                </>
              )}
              <div className='mt-1 flex items-center gap-2 text-2xl'>
                {icons.map(({ icon, tooltip }) => (
                  <span
                    key={crypto.randomUUID()}
                    className='group/tt relative flex items-center justify-center'
                  >
                    {icon}
                    <span className='absolute translate-y-6 scale-0 text-sm duration-150 group-hover/tt:scale-100'>
                      {tooltip}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className='h-[1px] md:hidden' />
      </div>
      <p className={`${roboto_mono.className} mt-3 text-center text-xl`}>Now</p>
    </section>
  )
}
