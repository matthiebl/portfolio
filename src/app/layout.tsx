import './globals.css'
import type { Metadata } from 'next'
import { inter } from './fonts'
import { ThemeProvider } from './theme'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'matthiebl | Home',
  description: "matthiebl's site",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className + ' dark:bg-slate-950'}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar />
          <div className='flex w-full justify-center'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
