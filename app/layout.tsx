import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FieldFlow — Hockey operations',
  description: 'Manage field hockey matches, teams, competitions and official scores.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
