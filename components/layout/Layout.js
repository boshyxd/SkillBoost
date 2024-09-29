import Header from './Header'
import Footer from './Footer'
import BottomNav from '../navigation/BottomNav'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomNav />
      <Footer />
    </>
  )
}