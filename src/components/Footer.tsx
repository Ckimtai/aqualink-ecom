import { Link } from 'react-router-dom'
import { Droplets, Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center"><Droplets className="w-6 h-6 text-white" /></div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl text-white">Aqualink</span>
                <span className="text-[10px] text-brand-300 font-medium tracking-wide">WATER TREATMENT SOLUTIONS</span>
              </div>
            </Link>
            <p className="text-sm text-brand-300 leading-relaxed">Commercial & industrial water treatment solutions. We deliver environmentally responsible and cost-effective water treatment across Kenya and East Africa.</p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-brand-600 flex items-center justify-center transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-brand-600 flex items-center justify-center transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-brand-600 flex items-center justify-center transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop?category=reverse-osmosis" className="hover:text-brand-400 transition-colors">Reverse Osmosis</Link></li>
              <li><Link to="/shop?category=water-softeners" className="hover:text-brand-400 transition-colors">Water Softeners</Link></li>
              <li><Link to="/shop?category=filtration-systems" className="hover:text-brand-400 transition-colors">Filtration Systems</Link></li>
              <li><Link to="/shop?category=disinfection" className="hover:text-brand-400 transition-colors">Disinfection</Link></li>
              <li><Link to="/shop?category=chemicals-dosing" className="hover:text-brand-400 transition-colors">Chemicals & Dosing</Link></li>
              <li><Link to="/shop?category=spare-parts" className="hover:text-brand-400 transition-colors">Spare Parts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Shop All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" /><span>P.O Box 78601-00507, Viwandani, Nairobi, Kenya</span></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-400 shrink-0" /><a href="tel:+254727581379" className="hover:text-brand-400 transition-colors">+254 727 581 379</a></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-400 shrink-0" /><a href="mailto:info@aqualink.co.ke" className="hover:text-brand-400 transition-colors">info@aqualink.co.ke</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-brand-400">&copy; {new Date().getFullYear()} Aqualink. All rights reserved.</p>
          <p className="text-xs text-brand-400">Monday–Friday: 8am – 6pm</p>
        </div>
      </div>
    </footer>
  )
}
