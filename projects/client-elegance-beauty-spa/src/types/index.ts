// Types globaux pour Digital Agency AI Template

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    name: string
    email: string
    subject: string
    timestamp: string
  }
  error?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

export interface ProjectInfo {
  name: string
  sector: string
  client: string
  domain?: string
  description?: string
  features?: string[]
  timeline?: string
  budget?: string
}

export interface SiteConfig {
  name: string
  description: string
  domain: string
  contact: {
    phone: string
    email: string
    address: string
  }
  social?: {
    facebook?: string
    linkedin?: string
    twitter?: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  fonts: {
    heading: string
    body: string
  }
}

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

// Types pour l'API
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Types pour les métadonnées SEO
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

// Types pour les statistiques
export interface Stats {
  clients: number
  projects: number
  experience: number
  satisfaction: number
}