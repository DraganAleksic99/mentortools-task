import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>this is layout!!</h1>
      {children}
    </>
  )
}
