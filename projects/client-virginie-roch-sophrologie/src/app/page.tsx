import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import BMICalculator from './components/BMICalculator'
import ScheduleSection from './components/ScheduleSection'
import TransformationGallery from './components/TransformationGallery'
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
      
      {/* Fonctionnalités Fitness Spécifiques */}
      <section id="outils" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-responsive font-bold text-gray-900 mb-6">
              Outils &
              <span className="block text-orange-600">Évaluation</span>
            </h2>
            <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
              Utilisez nos outils gratuits pour évaluer votre condition physique 
              et planifier votre parcours de transformation.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <BMICalculator />
          </div>
        </div>
      </section>

      <ScheduleSection />
      <TransformationGallery />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}