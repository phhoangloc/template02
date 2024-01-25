import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import "../style/style.css"
import ProviderExport from '@/redux/Provider'
const inter = Roboto_Mono({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Lockheart',
    default: 'Lockheart', // a default is required when creating a template
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
    <html lang="en">
      <body className={inter.className}>
        <ProviderExport>
          {children}
        </ProviderExport>
      </body>
    </html>
  )
}
