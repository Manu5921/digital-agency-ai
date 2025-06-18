// Contenu Sophrologie - Cabinet Virginie Roch
// Secteur : Sophrologie & Psychothérapie

export const sophrologyContent = {
  business: {
    name: "Cabinet Virginie Roch",
    practitioner: {
      name: "Virginie Roch",
      title: "Psychologue & Psychothérapeute en TCC",
      experience: "15 ans d'expérience",
      specializations: [
        "Gestion du stress et anxiété",
        "Accompagnement des patients", 
        "Thérapies comportementales (TCC)",
        "Psychologie du travail"
      ],
      certifications: [
        "Psychologue diplômée d'État",
        "Spécialisation TCC",
        "Psychologie du travail"
      ]
    },
    location: {
      cabinet: "Cabinet de Psychologie - Paris et Environs",
      zones: ["Paris", "Île-de-France", "Consultations en ligne"],
      address: "Paris et Cuvat (Haute-Savoie)",
      phone: "+33 6 12 34 56 78",
      email: "virginie.roch@psychologue-tcc.fr",
      website: "https://www.virginie-roch.com"
    }
  },

  // Section Hero avec images premium
  hero: {
    title: "Retrouvez Votre Équilibre Intérieur",
    subtitle: "Accompagnement psychologique personnalisé pour gérer stress, anxiété et retrouver bien-être au quotidien",
    cta: {
      primary: "Prendre Rendez-vous",
      secondary: "Découvrir Mon Approche"
    },
    stats: [
      { number: "15 ans", label: "D'expérience" },
      { number: "500+", label: "Patients accompagnés" },
      { number: "TCC", label: "Spécialisation" },
      { number: "Online", label: "Consultations disponibles" }
    ],
    heroImage: "/images/hero/therapy-office-peaceful.jpg"
  },

  // Services avec images contextuelles
  services: [
    {
      icon: "🧘‍♀️",
      title: "Accompagnement des Patients",
      description: "Suivi psychologique individuel pour surmonter difficultés personnelles et troubles anxieux",
      features: [
        "Séances individuelles",
        "Écoute bienveillante",
        "Approche personnalisée",
        "Outils concrets"
      ],
      price: "À partir de 70€/séance",
      popular: true,
      image: "/images/services/therapy-session.jpg"
    },
    {
      icon: "🧠",
      title: "Coaching Individuel",
      description: "Accompagnement pour développer confiance en soi, gestion émotionnelle et épanouissement personnel",
      features: [
        "Développement personnel",
        "Confiance en soi",
        "Gestion émotions",
        "Objectifs de vie"
      ],
      price: "75€/séance",
      popular: false,
      image: "/images/services/coaching-session.jpg"
    },
    {
      icon: "💼",
      title: "Psychologie du Travail",
      description: "Spécialisation dans l'accompagnement des difficultés professionnelles et burn-out",
      features: [
        "Stress professionnel",
        "Burn-out prevention",
        "Reconversion",
        "Équilibre vie pro/perso"
      ],
      price: "80€/séance",
      popular: false,
      image: "/images/services/work-psychology.jpg"
    },
    {
      icon: "💻",
      title: "Thérapies Comportementales TCC",
      description: "Approche scientifique pour modifier pensées négatives et comportements problématiques",
      features: [
        "Méthodes validées",
        "Approche structurée",
        "Outils pratiques",
        "Résultats mesurables"
      ],
      price: "Selon le suivi",
      popular: false,
      image: "/images/services/tcc-therapy.jpg"
    }
  ],

  // À propos avec photo professionnelle
  about: {
    title: "Virginie Roch - Votre Psychologue & Psychothérapeute",
    content: [
      "Psychologue diplômée d'État avec 15 ans d'expérience, je vous accompagne dans votre parcours de bien-être psychologique.",
      "Spécialisée en thérapies cognitives et comportementales (TCC) et psychologie du travail, j'adapte mon approche à vos besoins spécifiques.",
      "Mon objectif est de vous donner les outils nécessaires pour retrouver équilibre, confiance et sérénité dans votre quotidien."
    ],
    achievements: [
      {
        number: "500+",
        label: "Patients accompagnés",
        description: "Personnes qui ont retrouvé équilibre et bien-être"
      },
      {
        number: "15 ans",
        label: "D'expérience",
        description: "En psychologie clinique et TCC"
      },
      {
        number: "TCC",
        label: "Spécialisation",
        description: "Thérapies cognitives et comportementales"
      },
      {
        number: "Online",
        label: "Consultations",
        description: "Suivi à distance disponible"
      }
    ],
    professionalImage: "/images/about/virginie-roch-portrait.jpg"
  },

  // Approche thérapeutique
  approach: {
    title: "Mon Approche Thérapeutique",
    subtitle: "Une méthode intégrative alliant TCC et accompagnement personnalisé",
    methods: [
      {
        name: "Thérapies Cognitives et Comportementales (TCC)",
        description: "Approche scientifique pour identifier et modifier les pensées négatives",
        image: "/images/approach/tcc-method.jpg"
      },
      {
        name: "Psychologie du Travail",
        description: "Spécialisation dans l'accompagnement des difficultés professionnelles",
        image: "/images/approach/work-psychology.jpg"
      },
      {
        name: "Accompagnement Personnalisé",
        description: "Adaptation de la thérapie selon vos besoins et objectifs spécifiques",
        image: "/images/approach/personalized-support.jpg"
      }
    ]
  },

  // Témoignages avec photos clients (anonymisées)
  testimonials: [
    {
      name: "Marie D.",
      role: "Cadre supérieure",
      company: "Secteur bancaire",
      content: "Virginie m'a aidée à surmonter un burn-out professionnel. Son approche TCC m'a donné des outils concrets pour gérer stress et anxiété.",
      rating: 5,
      image: "/images/testimonials/client-1.jpg",
      results: "Stress maîtrisé, équilibre retrouvé"
    },
    {
      name: "Thomas M.",
      role: "Entrepreneur",
      company: "Start-up tech",
      content: "Les séances en ligne ont été parfaites pour mon planning. Virginie a su m'accompagner dans ma reconversion professionnelle.",
      rating: 5,
      image: "/images/testimonials/client-2.jpg",
      results: "Reconversion réussie"
    },
    {
      name: "Sophie L.",
      role: "Enseignante",
      company: "Éducation nationale",
      content: "Grâce à l'accompagnement de Virginie, j'ai retrouvé confiance en moi et appris à gérer mes émotions au quotidien.",
      rating: 5,
      image: "/images/testimonials/client-3.jpg",
      results: "Confiance retrouvée"
    }
  ],

  // Tarification
  pricing: {
    title: "Tarifs Consultations Psychologie",
    subtitle: "Investissez dans votre bien-être psychologique",
    plans: [
      {
        name: "Consultation Découverte",
        price: "60€",
        period: "1ère séance",
        description: "Parfait pour faire connaissance et définir vos objectifs",
        features: [
          "Bilan psychologique",
          "Définition des objectifs",
          "Explication de l'approche",
          "Plan d'accompagnement"
        ],
        cta: "Prendre Rendez-vous",
        popular: false,
        highlight: "Premier contact"
      },
      {
        name: "Suivi Régulier",
        price: "70€",
        period: "par séance",
        description: "Accompagnement psychologique personnalisé",
        features: [
          "Séances individuelles 50min",
          "Approche TCC adaptée",
          "Outils pratiques",
          "Suivi personnalisé"
        ],
        cta: "Commencer le Suivi",
        popular: true,
        highlight: "Le plus choisi"
      },
      {
        name: "Accompagnement Intensif",
        price: "280€",
        period: "forfait 4 séances",
        description: "Programme intensif pour transformation rapide",
        features: [
          "4 séances rapprochées",
          "Suivi entre séances",
          "Outils personnalisés",
          "Bilan de progression"
        ],
        cta: "Programme Intensif",
        popular: false,
        highlight: "Résultats rapides"
      }
    ]
  },

  // Contact avec ambiance cabinet
  contact: {
    title: "Prêt(e) à Retrouver Votre Équilibre ?",
    subtitle: "Contactez-moi pour votre consultation découverte",
    cta: {
      primary: "Prendre Rendez-vous",
      secondary: "Appeler Maintenant"
    },
    info: {
      cabinet: "Cabinet Virginie Roch",
      address: "Paris et Cuvat (Haute-Savoie)",
      phone: "+33 6 12 34 56 78",
      email: "virginie.roch@psychologue-tcc.fr",
      hours: {
        weekdays: "9h00 - 19h00",
        weekend: "Sur rendez-vous"
      },
      consultations: "Présentiel et en ligne (visioconférence)",
      languages: "Français"
    },
    socialProof: {
      title: "Rejoignez Mes Patients Satisfaits",
      stats: [
        "500+ personnes accompagnées",
        "15 ans d'expertise TCC",
        "Consultations online disponibles"
      ]
    },
    cabinetImages: [
      "/images/cabinet/therapy-room-1.jpg",
      "/images/cabinet/therapy-room-2.jpg",
      "/images/cabinet/peaceful-environment.jpg"
    ]
  },

  // Footer
  footer: {
    description: "Cabinet Virginie Roch - Psychologue & Psychothérapeute spécialisée en TCC pour votre bien-être psychologique",
    links: {
      services: [
        { name: "Accompagnement Patients", href: "#services" },
        { name: "Coaching Individuel", href: "#services" },
        { name: "Psychologie du Travail", href: "#services" },
        { name: "Thérapies TCC", href: "#services" }
      ],
      company: [
        { name: "Mon Approche", href: "#approach" },
        { name: "Témoignages", href: "#testimonials" },
        { name: "Tarifs", href: "#pricing" },
        { name: "Contact", href: "#contact" }
      ],
      legal: [
        { name: "Mentions Légales", href: "/legal" },
        { name: "Politique de Confidentialité", href: "/privacy" },
        { name: "Déontologie", href: "/ethics" }
      ]
    },
    certifications: [
      "Psychologue diplômée d'État",
      "Spécialisation TCC",
      "Psychologie du travail"
    ]
  },

  // SEO Optimisé Psychologie TCC
  seo: {
    title: "Virginie Roch - Psychologue & Psychothérapeute TCC | Paris & Online",
    description: "Psychologue diplômée spécialisée TCC. Accompagnement stress, anxiété, burn-out. Consultations Paris et online. 15 ans d'expérience. Prise RDV rapide.",
    keywords: [
      "psychologue TCC",
      "psychothérapeute Paris",
      "gestion stress anxiété",
      "burn-out psychologue",
      "thérapie cognitive comportementale",
      "psychologie du travail",
      "consultation psychologue online",
      "accompagnement psychologique",
      "psychologue diplômé état",
      "thérapie en ligne",
      "stress professionnel",
      "reconversion psychologue",
      "confiance en soi thérapeute",
      "équilibre vie professionnelle",
      "psychologue Haute-Savoie"
    ],
    localSEO: {
      businessName: "Cabinet Virginie Roch",
      businessType: "Psychologist",
      address: {
        streetAddress: "Consultations Paris et Cuvat",
        addressLocality: "Paris",
        postalCode: "75000",
        addressCountry: "FR",
        addressRegion: "Île-de-France"
      },
      geo: {
        latitude: 48.8566,
        longitude: 2.3522
      },
      telephone: "+33612345678",
      email: "virginie.roch@psychologue-tcc.fr",
      url: "https://virginie-roch-psychologue.vercel.app",
      priceRange: "€€",
      openingHours: [
        "Mo-Fr 09:00-19:00",
        "Sa sur rendez-vous"
      ],
      serviceArea: {
        geo: {
          addressCountry: "FR",
          addressRegion: "Île-de-France"
        },
        areaServed: ["Paris", "Île-de-France", "France (consultations online)"]
      }
    }
  },

  // Configuration Photos Premium (générées par Photo Engine)
  photoConfig: {
    hero: {
      mainImage: "/images/hero/peaceful-therapy-office.jpg",
      alt: "Cabinet de psychologie paisible et accueillant",
      mood: "calm, professional, welcoming"
    },
    services: {
      therapy: "/images/services/individual-therapy.jpg", 
      coaching: "/images/services/personal-coaching.jpg",
      work: "/images/services/work-psychology.jpg",
      tcc: "/images/services/cognitive-therapy.jpg"
    },
    about: {
      portrait: "/images/about/virginie-roch-professional.jpg",
      cabinet: "/images/about/therapy-office-interior.jpg"
    },
    ambient: [
      "/images/ambient/peaceful-waiting-room.jpg",
      "/images/ambient/calming-therapy-space.jpg",
      "/images/ambient/professional-office.jpg"
    ]
  }
};