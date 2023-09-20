import './globals.css'
import type { Metadata } from 'next'
import { roboto } from './fonts'
import { ThemeProvider } from './theme'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'matthiebl | Home',
  description: "matthiebl's site",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={roboto.className + ' flex flex-col dark:bg-slate-950'}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar />
          <div className='flex w-full justify-center'>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
