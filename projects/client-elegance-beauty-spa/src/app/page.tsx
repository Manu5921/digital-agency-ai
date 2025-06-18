import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      
      {/* Section Galerie Beauté */}
      <section id="galerie" className="section-padding bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-responsive font-bold text-gray-900 mb-6">
              Galerie &
              <span className="block text-pink-600">Transformations</span>
            </h2>
            <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
              Découvrez nos réalisations et les transformations beauté de nos clientes 
              dans notre institut parisien de luxe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Soins Visage</h3>
                <p className="text-gray-600 text-sm">Résultats éclatants avec nos soins premium</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                <span className="text-4xl">💆‍♀️</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Massages</h3>
                <p className="text-gray-600 text-sm">Détente absolue dans nos cabines VIP</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                <span className="text-4xl">💅</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Manucure</h3>
                <p className="text-gray-600 text-sm">Élégance et sophistication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}