import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import "../style/style.css"
import Provider from '@/redux/component/provider'
const inter = Roboto_Mono({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Pham',
    default: 'Pham', // a default is required when creating a template
  },
  icons: {
    icon: '/img/icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll dark overFlowXHidden'>
      <body className={`${inter.className}`}>
        <Provider>

          {children}
        </Provider>
      </body>
    </html>
  )
}
