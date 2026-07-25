import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatKES, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart()

  return (
    <>
      <div className={cn('fixed inset-0 bg-black/50 z-50 transition-opacity duration-300', isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={() => setCartOpen(false)} />
      <div className={cn('fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col transition-transform duration-300', isCartOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Cart ({totalItems})</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} aria-label="Close cart"><X className="w-5 h-5" /></Button>
        </div>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4"><ShoppingBag className="w-10 h-10 text-muted-foreground/50" /></div>
            <p className="text-muted-foreground font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Browse our products and add items to your cart.</p>
            <Button asChild className="mt-6"><Link to="/shop" onClick={() => setCartOpen(false)}>Shop Now</Link></Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <Link to={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)} className="shrink-0">
                    <img src={item.product.image_url || '/industrial-ro-5000.webp'} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover bg-muted" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)} className="text-sm font-medium text-foreground hover:text-primary line-clamp-2">{item.product.name}</Link>
                    <p className="text-sm font-semibold text-primary mt-1">{formatKES(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="w-3.5 h-3.5" /></Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)} aria-label="Remove item"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="font-display font-bold text-xl text-brand-900">{formatKES(totalPrice)}</span>
              </div>
              <Button asChild size="lg" className="w-full"><Link to="/checkout" onClick={() => setCartOpen(false)}>Proceed to Checkout</Link></Button>
              <Button variant="ghost" className="w-full" onClick={() => setCartOpen(false)}>Continue Shopping</Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
