import Menu from './menu'

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  )
}