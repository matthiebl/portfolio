import { roboto_mono } from '../fonts'

export default function About() {
  return (
    <main className='mb-16 w-full max-w-screen-lg px-6 sm:my-16 md:px-10'>
      <section className='mb-16 text-sm text-gray-700 dark:text-gray-300'>
        <h2 className={`${roboto_mono.className} mb-2 text-xl text-black dark:text-white`}>
          About Me
        </h2>
        <p className='mb-2'>
          My name is Matthew Hiebl. I graduate my computer science degree from UNSW in December
          2023.
        </p>
        <p className='mb-2'>{"There isn't too much to say other than that..."}</p>
        <p className='mb-2'>Check out my socials in the footer!</p>
      </section>
    </main>
  )
}
