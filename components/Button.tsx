import {MouseEventHandler, ReactNode} from 'react'

export default function Button(props: {
  small?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}) {
  return (
    <button
      onClick={props.onClick}
      className={`
        ${props.small ? 'px-2' : 'px-4'} 
        ${props.small ? 'h-8' : 'h-10'} 
        rounded-lg 
        bg-emerald-100 hover:bg-emerald-200 active:bg-emerald-300 
        transition-colors duration-150
      `}
    >
      {props.children}
    </button>
  )
}
