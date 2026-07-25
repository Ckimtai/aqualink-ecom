import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Check, FileText } from 'lucide-react'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'
import { formatKES, cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
  onRFQ?: (product: Product) => void
}

export default function ProductCard({ product, onRFQ }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="overflow-hidden group flex flex-col hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3] bg-muted">
        <img src={product.image_url || '/industrial-ro-5000.webp'} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.is_featured && <Badge variant="accent" className="absolute top-3 left-3">Featured</Badge>}
        {product.requires_rfq && <Badge variant="secondary" className="absolute top-3 right-3 bg-amber-100 text-amber-800 border border-amber-200">RFQ</Badge>}
        {!product.in_stock && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Badge variant="destructive" className="px-3 py-1">Out of Stock</Badge></div>}
      </Link>
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className={cn('w-3.5 h-3.5', i <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30')} />)}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-foreground leading-snug hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          {product.requires_rfq ? (
            <>
              <span className="text-sm font-medium text-muted-foreground">Price on request</span>
              <Button size="sm" variant="outline" onClick={() => onRFQ?.(product)}>
                <FileText className="w-4 h-4" /> Get Quote
              </Button>
            </>
          ) : (
            <>
              <span className="font-display font-bold text-lg text-brand-900">{formatKES(product.price)}</span>
              <Button size="sm" onClick={() => addToCart(product)} disabled={!product.in_stock}>
                <ShoppingCart className="w-4 h-4" /> Add
              </Button>
            </>
          )}
        </div>
        {product.in_stock && !product.requires_rfq && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-teal-600"><Check className="w-3.5 h-3.5" /> In Stock</div>
        )}
      </CardContent>
    </Card>
  )
}
