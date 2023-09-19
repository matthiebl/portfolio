import { roboto_mono } from '../fonts'

export default function Projects() {
  return (
    <main className='my-16 w-full max-w-screen-lg px-6 md:px-10'>
      <section className='mb-16'>
        <h2 className={`${roboto_mono.className} mb-2 text-xl`}>What do I work on?</h2>
        <p></p>
      </section>
      <section className='mb-16'>
        <h2 className={`${roboto_mono.className} mb-2 text-xl`}>My projects, a history</h2>
        <p className='text-gray800 dark:text-gray-200'>
          I have worked on a variety of web related projects; personally, at university, and at
          work. To simplify the list, lets have a look at the timeline to help see how I have
          developed and learnt new development stacks.
        </p>
        <div className='relative mt-4 after:absolute after:bottom-0 after:left-1/2 after:top-0 after:-ml-[1px] after:w-[2px] after:rounded after:bg-black after:dark:bg-white'>
          {[
            { date: 'Apr 2022', title: 'visuals', description: 'Project 1' },
            { date: 'Jul 2022', title: 'visuals', description: 'Project 1' },
            { date: 'Nov 2021', title: 'Project A', description: 'Project 1' },
          ].map(({ date, title, description }) => (
            <div className='relative flex w-1/2 flex-col px-6 py-4 odd:items-end odd:text-right even:left-1/2'>
              <p className={`${roboto_mono.className} text-sm text-gray-600 dark:text-gray-400`}>
                {date}
              </p>
              <p className={`${roboto_mono.className} mb-1 font-bold`}>{title}</p>
              <p className='text-justify text-gray-800 dark:text-gray-200'>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
