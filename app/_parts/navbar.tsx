'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const links = [
  ['/secret', '密钥'],
  ['/color', '颜色'],
]

export default function Navbar() {
  const path = usePathname()

  const select = (current: string) => path === current ? 'selected' : ''

  return (
    <header className={`flex gap-4`}>
      {links.map(([href, text]) => (
        <Link
          href={href} key={href}
          className={`
            flex-none
            flex justify-center items-center
            px-4 h-10 rounded-lg bg-emerald-100 border-emerald-400
            hover:bg-emerald-200 [&.selected]:border-b-4
            transition-all duration-150
            ${select(href)}`
          }>
          {text}
        </Link>
      ))}
    </header>
  )
}


