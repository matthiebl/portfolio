import { roboto_mono } from '@/app/fonts'

export function IntroSection({}: {}) {
  return (
    <section className='mb-16 text-sm text-gray-700 dark:text-gray-300'>
      <h2 className={`${roboto_mono.className} mb-2 text-xl text-black dark:text-white`}>
        What do I work on?
      </h2>
      <p className='mb-2'>
        I enjoy a to do with web development and am particularly fond of the frontend aspect. Being
        able to create a visual and working interface from nothing feels extrememly rewarding to me.
      </p>
      <p className='mb-2'>
        However, I really enjoy working with APIs, even if my exposure and experience is limited.
        The idea of a well defined input/output system is what I enjoy from the backend and API
        side.
      </p>
      <p className='mb-2'>
        The ideas that I implement are often small and are targeted to niche problems I face that
        could be solved with a simple web interface. Such as improving things like expense tracking
        that are tailored to how I like to organise and visualise my data.
      </p>
      <h2 className={`${roboto_mono.className} mb-2 mt-5 text-xl text-black dark:text-white`}>
        How do I do it?
      </h2>
      <p className='mb-2'>
        When it comes to tech stacks, I tend to favour those that do not require a lot of effort to
        set up. Since most of my projects are short term, little ideas that I have, I like to have
        easy to set up, use and deploy stacks to simplify the process for myself.
      </p>
      <p className='mb-2'>
        Typically I have chosen tech stacks that are rather simple, such as Firebase, which takes a
        lot of the granular control over relations, tables and queries away from me. In the future I
        aim to steer away from these overly simplistic stacks in favour of ones that give me more
        control and allow me to develop more experiences with fullstack web development.
      </p>
    </section>
  )
}
