import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Phone, User, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Header() {
  const { totalItems, setCartOpen } = useCart()
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' },
    { to: '/services', label: 'Services' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-3' : 'bg-background/80 backdrop-blur-sm py-4')}>
      <div className="container-app">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="https://www.aqualink.co.ke/wp-content/uploads/2025/06/Screenshot-2025-06-07-085233.png"
              alt="Aqualink Technologies"
              className="h-11 w-auto object-contain"
              crossOrigin="anonymous"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all">{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+254727581379" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> +254 727 581 379
            </a>
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/account" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <User className="w-4 h-4" /> Account
                </Link>
                <Button variant="ghost" size="icon" onClick={signOut} className="rounded-xl bg-secondary" aria-label="Sign out">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm" className="hidden md:flex rounded-xl">
                <Link to="/auth"><User className="w-4 h-4" /> Sign In</Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="relative rounded-xl bg-primary/10 text-primary hover:bg-primary/15" aria-label="Open cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">{totalItems}</span>}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden rounded-xl bg-secondary" aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="lg:hidden mt-4 pb-2 flex flex-col gap-1 animate-slide-up">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all">{link.label}</Link>
            ))}
            <a href="tel:+254727581379" className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-2"><Phone className="w-4 h-4" /> +254 727 581 379</a>
            {user ? (
              <>
                <Link to="/account" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-2"><User className="w-4 h-4" /> Account</Link>
                <button onClick={() => { signOut(); setMobileOpen(false) }} className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-2 text-left"><LogOut className="w-4 h-4" /> Sign Out</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-2"><User className="w-4 h-4" /> Sign In</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
