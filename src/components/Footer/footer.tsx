import { roboto_mono } from '@/app/fonts'

export function Footer({}: {}) {
  return (
    <footer className={`${roboto_mono.className} flex w-full justify-center`}>
      <div className='flex w-full max-w-screen-xl items-center justify-center gap-4'></div>
    </footer>
  )
}
