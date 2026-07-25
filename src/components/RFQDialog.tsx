import { useState } from 'react'
import { Loader2, Send, FileText } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { generateRFQNumber } from '@/lib/utils'
import type { Product } from '../types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface RFQDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const APPLICATIONS = [
  'Drinking Water',
  'Food & Beverage Production',
  'Hospital / Healthcare',
  'Hotel / Hospitality',
  'School / Institution',
  'Factory / Manufacturing',
  'Bottling Plant',
  'Swimming Pool',
  'Agriculture / Irrigation',
  'Wastewater Treatment',
  'Other',
]

export default function RFQDialog({ product, open, onOpenChange }: RFQDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', quantity: '1', application: '', message: '' })

  const handleClose = (open: boolean) => {
    if (!open) {
      setSuccess(null)
      setForm({ name: '', email: '', phone: '', company: '', quantity: '1', application: '', message: '' })
    }
    onOpenChange(open)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return
    setSubmitting(true)
    try {
      const rfqNumber = generateRFQNumber()
      const { error } = await supabase.from('rfq_requests').insert({
        rfq_number: rfqNumber,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        company: form.company || null,
        product_id: product.id,
        product_name: product.name,
        quantity: parseInt(form.quantity) || 1,
        application: form.application || null,
        message: form.message || null,
        status: 'pending',
      })
      if (error) throw error
      setSuccess(rfqNumber)
      toast.success('RFQ submitted successfully!')
    } catch {
      toast.error('Failed to submit RFQ. Please try again or call us.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-display font-bold">Request Submitted!</h2>
            <p className="text-muted-foreground mt-2">
              Your RFQ reference number is <span className="font-semibold text-primary">{success}</span>.
              Our team will review your requirements and send you a detailed quote within 24-48 hours.
            </p>
            <Button className="mt-6" onClick={() => handleClose(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a Quote</DialogTitle>
              <DialogDescription>
                {product?.name} — This product requires a custom quote. Fill out the form below and we'll get back to you within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rfq-name">Full Name *</Label>
                  <Input id="rfq-name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="rfq-phone">Phone Number *</Label>
                  <Input id="rfq-phone" required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+254 7XX XXX XXX" className="mt-1.5" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rfq-email">Email Address *</Label>
                  <Input id="rfq-email" required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="rfq-company">Company (Optional)</Label>
                  <Input id="rfq-company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="mt-1.5" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rfq-quantity">Quantity Needed *</Label>
                  <Input id="rfq-quantity" required type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="rfq-application">Application / Use Case</Label>
                  <Select value={form.application} onValueChange={v => setForm({ ...form, application: v })}>
                    <SelectTrigger id="rfq-application" className="mt-1.5"><SelectValue placeholder="Select application" /></SelectTrigger>
                    <SelectContent>
                      {APPLICATIONS.map(app => <SelectItem key={app} value={app}>{app}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="rfq-message">Additional Details (Optional)</Label>
                <Textarea id="rfq-message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your water source, required output capacity, site conditions, or any special requirements..." className="mt-1.5" />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : <><Send className="w-5 h-5" /> Submit RFQ</>}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
