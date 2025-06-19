'use client'

import Image from 'next/image'
import { ArrowRight, Scale, Shield, Star } from 'lucide-react'
import { siteContent } from '@/data/siteContent'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-accent-500/20 rotate-45 hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-accent-500/20 rotate-12 hidden lg:block"></div>
      
      <div className="relative container mx-auto px-6 py-20 lg:py-0 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Content */}
          <div className="space-y-8 text-white order-2 lg:order-1">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
              <Scale className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Cabinet d'Excellence depuis 1995</span>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                {siteContent.hero.title}
                <span className="block text-yellow-400 text-3xl lg:text-5xl xl:text-6xl mt-2">
                  {siteContent.hero.subtitle}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                {siteContent.hero.description}
              </p>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">95% de réussite</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">+500 affaires résolues</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl">
                <span>{siteContent.hero.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-white/30 hover:border-yellow-400 text-white hover:text-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Découvrir nos Services
              </button>
            </div>
            
            {/* Contact quick info */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-gray-300 mb-2">Consultation gratuite :</p>
              <a href="tel:+33142689015" className="text-yellow-400 hover:text-yellow-300 font-semibold text-xl transition-colors">
                +33 1 42 68 90 15
              </a>
            </div>
          </div>
          
          {/* Professional Image - Photo Engine 3.0 */}
          <div className="relative order-1 lg:order-2">
            
            {/* Main image container */}
            <div className="relative">
              
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-slate-500/20 blur-2xl rounded-3xl"></div>
              
              {/* Image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-1 shadow-2xl">
                <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
                  <Image
                    src={siteContent.hero.image}
                    alt={siteContent.hero.imageAlt}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Floating credential card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Maître Dubois</p>
                    <p className="text-sm text-gray-600">Avocat Expert • 20+ ans</p>
                    <p className="text-xs text-yellow-600 font-medium">Barreau de Paris</p>
                  </div>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 bg-yellow-500 text-black rounded-2xl shadow-2xl p-4 text-center">
                <p className="text-2xl font-bold">95%</p>
                <p className="text-xs font-medium">Taux de réussite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 lg:h-24 text-white" fill="currentColor" viewBox="0 0 1440 320">
          <path fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}