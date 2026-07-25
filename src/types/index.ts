export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category_id: string | null
  image_url: string | null
  features: string[]
  specifications: Record<string, string>
  in_stock: boolean
  rating: number
  is_featured: boolean
  requires_rfq: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderItemInsert {
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
}
