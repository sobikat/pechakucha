import './globals.css'

export const metadata = {
  title: 'Pechakucha',
  description: 'Pechakucha — interactive text animation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
