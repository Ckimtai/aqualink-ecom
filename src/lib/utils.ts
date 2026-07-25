import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKES(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency', currency: 'KES',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount)
}

export function generateOrderNumber(): string {
  const prefix = 'AQL'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}${random}`
}

export function generateRFQNumber(): string {
  const prefix = 'RFQ'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}${random}`
}
