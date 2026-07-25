import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import RFQDialog from './components/RFQDialog'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import AuthPage from './pages/AuthPage'
import Account from './pages/Account'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProducts from './pages/admin/AdminProducts'
import AdminRFQs from './pages/admin/AdminRFQs'
import AdminQuotations from './pages/admin/AdminQuotations'
import AdminSettings from './pages/admin/AdminSettings'
import type { Product } from './types'

function StoreShell() {
  const [rfqProduct, setRfqProduct] = useState<Product | null>(null)
  const [rfqOpen, setRfqOpen] = useState(false)

  const openRFQ = (product: Product) => {
    setRfqProduct(product)
    setRfqOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onRFQ={openRFQ} />} />
          <Route path="/shop" element={<Shop onRFQ={openRFQ} />} />
          <Route path="/product/:slug" element={<ProductDetail onRFQ={openRFQ} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <RFQDialog product={rfqProduct} open={rfqOpen} onOpenChange={setRfqOpen} />
    </div>
  )
}

function AdminShell() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/rfqs" element={<AdminRFQs />} />
      <Route path="/admin/quotations" element={<AdminQuotations />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <AuthProvider>
      <CartProvider>
        {isAdmin ? <AdminShell /> : <StoreShell />}
      </CartProvider>
    </AuthProvider>
  )
}
