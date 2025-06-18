// Contenu FitCoach Pro - Coaching Fitness & Nutrition
export const fitcoachContent = {
  // Informations de base
  business: {
    name: "FitCoach Pro",
    slogan: "Coaching Fitness & Nutrition pour Professionnels Actifs",
    description: "Transformez votre corps et votre énergie avec un coaching personnalisé adapté à votre rythme de vie professionnel",
    coach: {
      name: "Sarah Martin",
      title: "Coach Certifiée BPJEPS & Nutritionniste",
      experience: "8 ans d'expérience",
      specializations: ["Coaching Femmes", "Nutrition Santé", "Fitness Professionnel"],
      certifications: ["BPJEPS AGFF", "Nutrition Sportive", "Pilates Certifiée"]
    },
    location: {
      studio: "Studio FitCoach Pro - 16ème Arrondissement, Paris",
      zones: ["Paris 16ème", "Passy", "Trocadéro", "Auteuil", "Boulogne-Billancourt", "Neuilly-sur-Seine"],
      address: "45 Avenue de la Grande Armée, 75116 Paris",
      phone: "+33 1 45 67 89 10",
      email: "contact@fitcoach-pro.fr",
      coordinates: {
        lat: 48.8738,
        lng: 2.2834
      },
      arrondissement: "16ème",
      quartiers: ["Passy", "Trocadéro", "Auteuil", "Chaillot"]
    }
  },

  // Section Hero
  hero: {
    title: "Transformez Votre Corps, Libérez Votre Énergie",
    subtitle: "Coaching fitness & nutrition sur-mesure pour professionnels qui veulent des résultats durables",
    cta: {
      primary: "Séance d'Essai Gratuite",
      secondary: "Bilan Fitness Offert"
    },
    stats: [
      { number: "95%", label: "Clients satisfaits" },
      { number: "8 ans", label: "D'expérience" },
      { number: "200+", label: "Transformations" },
      { number: "24/7", label: "Suivi personnalisé" }
    ]
  },

  // Services
  services: [
    {
      icon: "💪",
      title: "Coaching Personnel 1-1",
      description: "Séances individuelles adaptées à vos objectifs et votre planning professionnel",
      features: [
        "Programme personnalisé",
        "Horaires flexibles",
        "Suivi nutritionnel",
        "Motivation constante"
      ],
      price: "À partir de 89€/séance",
      popular: true
    },
    {
      icon: "🥗",
      title: "Plans Nutrition Pro",
      description: "Rééquilibrage alimentaire pour professionnels actifs avec préparation simplifiée",
      features: [
        "Menus équilibrés",
        "Recettes rapides",
        "Liste de courses",
        "Suivi hebdomadaire"
      ],
      price: "89€/mois",
      popular: false
    },
    {
      icon: "👩‍🦳",
      title: "Coaching Femmes 35+",
      description: "Programme spécialisé pour les femmes actives avec approche holistique",
      features: [
        "Hormones & métabolisme",
        "Gestion du stress",
        "Renforcement musculaire",
        "Bien-être mental"
      ],
      price: "120€/séance",
      popular: false
    },
    {
      icon: "💻",
      title: "Cours Virtuels Live",
      description: "Sessions de groupe en ligne pour s'entraîner depuis chez vous ou le bureau",
      features: [
        "Classes en direct",
        "Replay disponible",
        "Communauté active",
        "Matériel minimal"
      ],
      price: "39€/mois",
      popular: false
    }
  ],

  // À propos
  about: {
    title: "Sarah Martin - Votre Coach Fitness & Nutrition",
    content: [
      "Passionnée par le bien-être et la transformation physique, je vous accompagne depuis 8 ans dans votre parcours fitness.",
      "Spécialisée dans le coaching pour professionnels actifs, je comprends vos contraintes de temps et d'énergie.",
      "Mon approche combine entraînement efficace, nutrition équilibrée et motivation constante pour des résultats durables."
    ],
    achievements: [
      {
        number: "200+",
        label: "Clients transformés",
        description: "Professionnels qui ont retrouvé forme et énergie"
      },
      {
        number: "95%",
        label: "Taux de satisfaction",
        description: "Clients qui recommandent mes services"
      },
      {
        number: "8 ans",
        label: "D'expérience",
        description: "En coaching fitness et nutrition"
      },
      {
        number: "24/7",
        label: "Disponibilité",
        description: "Support et motivation continue"
      }
    ]
  },

  // Témoignages
  testimonials: [
    {
      name: "Marie Dubois",
      role: "Directrice Marketing",
      company: "TechCorp",
      content: "Sarah a complètement transformé ma relation au sport. En 6 mois, j'ai perdu 12kg et retrouvé une énergie incroyable pour mes journées intenses.",
      rating: 5,
      image: "/testimonials/marie-dubois.jpg",
      results: "12kg perdus, énergie retrouvée"
    },
    {
      name: "Julien Moreau",
      role: "Consultant Finance",
      company: "BankPro",
      content: "Le coaching en ligne de Sarah est parfait pour mon planning. Les séances sont efficaces et elle s'adapte parfaitement à mes contraintes.",
      rating: 5,
      image: "/testimonials/julien-moreau.jpg",
      results: "Masse musculaire +15%"
    },
    {
      name: "Sophie Laurent",
      role: "Avocate",
      company: "Cabinet Laurent",
      content: "Après 40 ans, je pensais que c'était trop tard. Sarah m'a prouvé le contraire ! Je me sens plus forte et confiante que jamais.",
      rating: 5,
      image: "/testimonials/sophie-laurent.jpg",
      results: "Forme physique optimale"
    }
  ],

  // Pricing
  pricing: {
    title: "Tarifs Coaching Fitness & Nutrition",
    subtitle: "Investissez dans votre santé et votre bien-être",
    plans: [
      {
        name: "Coaching Découverte",
        price: "0€",
        period: "1 séance",
        description: "Parfait pour découvrir notre approche",
        features: [
          "Bilan fitness complet",
          "Analyse posturale",
          "Définition des objectifs",
          "Plan d'action personnalisé"
        ],
        cta: "Réserver Maintenant",
        popular: false,
        highlight: "Offre découverte"
      },
      {
        name: "Coaching Essentiel",
        price: "320€",
        period: "4 séances/mois",
        description: "L'essentiel pour démarrer votre transformation",
        features: [
          "4 séances individuelles",
          "Programme personnalisé",
          "Suivi nutritionnel",
          "Support WhatsApp"
        ],
        cta: "Commencer Maintenant",
        popular: true,
        highlight: "Le plus populaire"
      },
      {
        name: "Coaching Premium",
        price: "580€",
        period: "8 séances/mois",
        description: "Transformation complète avec suivi intensif",
        features: [
          "8 séances individuelles",
          "Plan nutrition complet",
          "Suivi hebdomadaire",
          "Cours virtuels inclus",
          "Bilan mensuel"
        ],
        cta: "Transformation Complète",
        popular: false,
        highlight: "Résultats garantis"
      }
    ]
  },

  // Contact
  contact: {
    title: "Prêt(e) à Transformer Votre Corps ?",
    subtitle: "Contactez-moi pour votre séance d'essai gratuite",
    cta: {
      primary: "Séance d'Essai Gratuite",
      secondary: "Appeler Maintenant"
    },
    info: {
      studio: "Studio FitCoach Pro",
      address: "45 Avenue de la Grande Armée, 75116 Paris (16ème)",
      phone: "+33 1 45 67 89 10",
      email: "contact@fitcoach-pro.fr",
      hours: {
        weekdays: "6h00 - 21h00",
        weekend: "8h00 - 18h00"
      },
      metro: "Porte Maillot (Ligne 1), Argentine (Ligne 1)",
      parking: "Parking gratuit disponible"
    },
    socialProof: {
      title: "Rejoignez la Communauté FitCoach Pro",
      stats: [
        "200+ professionnels transformés",
        "95% de satisfaction client",
        "Résultats visibles en 30 jours"
      ]
    }
  },

  // Footer
  footer: {
    description: "FitCoach Pro - Votre partenaire fitness & nutrition pour une transformation durable",
    links: {
      services: [
        { name: "Coaching Personnel", href: "#services" },
        { name: "Plans Nutrition", href: "#services" },
        { name: "Coaching Femmes", href: "#services" },
        { name: "Cours Virtuels", href: "#services" }
      ],
      company: [
        { name: "À Propos", href: "#about" },
        { name: "Témoignages", href: "#testimonials" },
        { name: "Tarifs", href: "#pricing" },
        { name: "Contact", href: "#contact" }
      ],
      legal: [
        { name: "Mentions Légales", href: "/legal" },
        { name: "Politique de Confidentialité", href: "/privacy" },
        { name: "CGV", href: "/terms" }
      ]
    },
    certifications: [
      "BPJEPS AGFF",
      "Nutrition Sportive",
      "Pilates Certifiée"
    ]
  },

  // SEO Optimisé Fitness Paris 16ème
  seo: {
    title: "FitCoach Pro - Coach Sportif & Nutrition Paris 16ème | Sarah Martin",
    description: "Coach sportif certifiée à Paris 16ème. Coaching personnalisé, plans nutrition, transformations garanties. Passy, Trocadéro, Auteuil. Séance d'essai gratuite. ⭐⭐⭐⭐⭐",
    keywords: [
      "coach sportif",
      "coaching fitness", 
      "coach nutrition",
      "personal trainer Paris",
      "perte de poids",
      "remise en forme",
      "coach sportif femme Paris",
      "coaching nutrition en ligne",
      "coach sportif 16ème",
      "salle sport Passy",
      "fitness Trocadéro",
      "coach sportif Paris 16",
      "personal trainer femme Paris",
      "perte de poids coach",
      "transformation physique Paris",
      "coaching sportif Auteuil",
      "fitness coaching Boulogne"
    ],
    localSEO: {
      businessName: "FitCoach Pro",
      businessType: "HealthAndFitnessService",
      address: {
        streetAddress: "45 Avenue de la Grande Armée",
        addressLocality: "Paris",
        postalCode: "75116",
        addressCountry: "FR",
        addressRegion: "Île-de-France"
      },
      geo: {
        latitude: 48.8738,
        longitude: 2.2834
      },
      telephone: "+33145678910",
      email: "contact@fitcoach-pro.fr",
      url: "https://fitcoach-pro.vercel.app",
      priceRange: "€€€",
      openingHours: [
        "Mo-Fr 06:00-21:00",
        "Sa-Su 08:00-18:00"
      ],
      serviceArea: {
        geo: {
          addressCountry: "FR",
          addressRegion: "Île-de-France"
        },
        areaServed: ["Paris 16ème", "Passy", "Trocadéro", "Auteuil", "Boulogne-Billancourt", "Neuilly-sur-Seine"]
      }
    }
  }
};