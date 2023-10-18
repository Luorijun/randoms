import {ReactNode} from 'react'
import {Inter} from 'next/font/google'
import Navbar from './_parts/navbar'
import './_assets/globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: '随机生成器',
  description: '生成各种随机的内容',
}

export default function RootLayout(props: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
        h-screen w-[1100px] mx-auto
        flex flex-col
        p-8 gap-8
        ${inter.className}
      `}>
        <Navbar/>
        {props.children}
      </body>
    </html>
  )
}
