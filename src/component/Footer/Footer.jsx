'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 border-t border-gray-800 transition-colors duration-300">
      <div className="mx-auto w-10/12 max-w-[1200px] py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">FyloTech</h3>
            <p className="text-sm text-gray-400">
              Your ultimate destination for modern, cutting-edge technology and gadgets.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-200 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-400 transition">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-md font-semibold text-gray-200 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-blue-400 transition">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-400 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-blue-400 transition">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-md font-semibold text-gray-200 mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" /> support@fylotech.com
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" /> +880 1XXXXXXXXX
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5" /> 123 Tech Avenue, Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} FyloTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
