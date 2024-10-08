import Header from './Header'
import Footer from './Footer'
import BottomNav from '../navigation/BottomNav'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mb-16">{children}</main>
      <BottomNav />
      <Footer />
    </div>
  )
}