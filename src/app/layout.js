import "./globals.css";
import { Pacifico } from 'next/font/google';
import "./globals.css";

{/*const inter = Inter({
  subsets: ['latin'],
  variable: '--font-rounded',
})*/}
const pacifico = Pacifico(
{
  weight: '400',
  subsets: ['latin'],
  variable: '--font-logo',
}
)

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pacifico.variable}>
      <body >
        {children}
      </body>
    </html>
  )
}


