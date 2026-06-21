'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-200 mt-16 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">SmartResell</span>
            </Link>
            <p className="text-sm text-emerald-300 leading-relaxed">
              The most trusted second-hand marketplace in Bangladesh. Shop sustainably, protect the environment, and save money!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={16} /> support@smartresell.com</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +880 1312503905</li>
              <li className="flex items-center gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-white transition"><FaFacebook /></a>
              <a href="#" className="hover:text-white transition"><BsInstagram /></a>
              <a href="#" className="hover:text-white transition"><BsTwitter /></a>
              <a href="#" className="hover:text-white transition"><LiaLinkedin /></a>
            </div>
          </div>

        </div>

     
        <hr className="border-emerald-900 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-400">
          <p>&copy; 2026 SmartResell. All rights reserved.</p>
          <p>Made for a greener Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}