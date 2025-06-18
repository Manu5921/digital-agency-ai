// Contenu Élégance Beauty Spa - Institut de Beauté Haut de Gamme
export const beautyContent = {
  // Informations de base
  business: {
    name: "Élégance Beauty Spa",
    slogan: "Institut de Beauté Haut de Gamme",
    description: "Révélez votre beauté naturelle dans un cadre raffiné avec nos soins sur-mesure et notre expertise beauté",
    owner: {
      name: "Amélie Dubois",
      title: "Esthéticienne Diplômée d'État & Spa Manager",
      experience: "12 ans d'expérience",
      specializations: ["Soins Anti-Âge", "Massage Bien-être", "Épilation Laser"],
      certifications: ["CAP Esthétique", "Spécialisation Anti-Âge", "Massage Californien"]
    },
    location: {
      institute: "Élégance Beauty Spa - 16ème Arrondissement, Paris",
      zones: ["Paris 16ème", "Passy", "Trocadéro", "Auteuil", "Boulogne-Billancourt", "Neuilly-sur-Seine"],
      address: "28 Avenue Foch, 75116 Paris",
      phone: "+33 1 45 67 89 12",
      email: "contact@elegance-beauty-spa.fr",
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
    title: "Révélez Votre Beauté Naturelle",
    subtitle: "Institut de beauté haut de gamme pour femmes exigeantes qui recherchent excellence et raffinement",
    cta: {
      primary: "Soin Découverte Offert",
      secondary: "Nos Prestations"
    },
    stats: [
      { number: "98%", label: "Clientes satisfaites" },
      { number: "12 ans", label: "D'expertise beauté" },
      { number: "500+", label: "Transformations" },
      { number: "VIP", label: "Cabines privées" }
    ]
  },

  // Services
  services: [
    {
      icon: "✨",
      title: "Soins Visage Premium",
      description: "Soins sur-mesure avec produits de luxe pour révéler l'éclat de votre peau",
      features: [
        "Diagnostic personnalisé",
        "Produits haute couture",
        "Cabine VIP privée",
        "Suivi beauté"
      ],
      price: "À partir de 120€",
      popular: true
    },
    {
      icon: "💆‍♀️",
      title: "Massages Bien-être",
      description: "Détente absolue avec nos massages relaxants dans un cadre apaisant",
      features: [
        "Massage californien",
        "Pierres chaudes",
        "Aromathérapie",
        "Ambiance zen"
      ],
      price: "85€/séance",
      popular: false
    },
    {
      icon: "💅",
      title: "Épilation & Manucure",
      description: "Épilation laser et soins des mains avec techniques douces et matériel professionnel",
      features: [
        "Épilation laser",
        "Techniques douces",
        "Vernis semi-permanent",
        "Nail art personnalisé"
      ],
      price: "60€/zone",
      popular: false
    },
    {
      icon: "🌸",
      title: "Forfaits Beauté",
      description: "Journées bien-être complètes pour une transformation beauté totale",
      features: [
        "Soin visage + corps",
        "Massage relaxant",
        "Manucure beauté",
        "Collation offerte"
      ],
      price: "280€/journée",
      popular: false
    }
  ],

  // À propos
  about: {
    title: "Amélie Dubois - Votre Experte Beauté",
    content: [
      "Passionnée par l'univers de la beauté depuis plus de 12 ans, je vous accueille dans mon institut raffiné du 16ème arrondissement.",
      "Diplômée d'État avec de nombreuses spécialisations, j'ai à cœur de révéler votre beauté naturelle avec des soins personnalisés.",
      "Mon approche allie techniques expertes, produits d'exception et moment de détente pour une expérience beauté inoubliable."
    ],
    achievements: [
      {
        number: "500+",
        label: "Clientes transformées",
        description: "Femmes qui ont retrouvé confiance et éclat"
      },
      {
        number: "98%",
        label: "Taux de satisfaction",
        description: "Clientes qui recommandent notre institut"
      },
      {
        number: "12 ans",
        label: "D'expertise",
        description: "En soins esthétiques et bien-être"
      },
      {
        number: "VIP",
        label: "Cabines privées",
        description: "Pour une intimité et un confort optimal"
      }
    ]
  },

  // Témoignages
  testimonials: [
    {
      name: "Claire Moreau",
      role: "Directrice Artistique",
      company: "Agence Créative",
      content: "L'Élégance Beauty Spa est devenu mon refuge beauté. Amélie a une expertise remarquable et les soins sont d'une qualité exceptionnelle.",
      rating: 5,
      image: "/testimonials/claire-moreau.jpg",
      results: "Peau éclatante, détente absolue"
    },
    {
      name: "Sophie Bertrand",
      role: "Avocate d'Affaires",
      company: "Cabinet International",
      content: "Un véritable havre de paix au cœur de Paris. Les soins anti-âge ont transformé ma peau et le cadre est absolument somptueux.",
      rating: 5,
      image: "/testimonials/sophie-bertrand.jpg",
      results: "Peau rajeunie de 10 ans"
    },
    {
      name: "Isabelle Laurent",
      role: "Chef d'Entreprise",
      company: "Consulting Luxury",
      content: "Depuis que je fréquente cet institut, j'ai retrouvé confiance en moi. Les forfaits bien-être sont parfaits pour décompresser.",
      rating: 5,
      image: "/testimonials/isabelle-laurent.jpg",
      results: "Confiance et bien-être retrouvés"
    }
  ],

  // Pricing
  pricing: {
    title: "Tarifs Institut de Beauté",
    subtitle: "Investissez dans votre beauté et votre bien-être",
    plans: [
      {
        name: "Soin Découverte",
        price: "0€",
        period: "1ère visite",
        description: "Parfait pour découvrir notre savoir-faire",
        features: [
          "Diagnostic peau personnalisé",
          "Mini-soin visage",
          "Conseil beauté",
          "Visite de l'institut"
        ],
        cta: "Réserver Maintenant",
        popular: false,
        highlight: "Offre découverte"
      },
      {
        name: "Forfait Mensuel",
        price: "180€",
        period: "3 soins/mois",
        description: "L'essentiel pour une beauté régulière",
        features: [
          "2 soins visage",
          "1 massage détente",
          "Produits à emporter",
          "Conseils personnalisés"
        ],
        cta: "Commencer Maintenant",
        popular: true,
        highlight: "Le plus populaire"
      },
      {
        name: "Forfait VIP",
        price: "450€",
        period: "Journée complète",
        description: "Transformation beauté totale en une journée",
        features: [
          "Soin visage premium",
          "Massage corps complet",
          "Manucure + pédicure",
          "Collation gastronomique",
          "Produits de luxe offerts"
        ],
        cta: "Réserver l'Expérience",
        popular: false,
        highlight: "Expérience unique"
      }
    ]
  },

  // Contact
  contact: {
    title: "Prête à Révéler Votre Beauté ?",
    subtitle: "Contactez-nous pour votre soin découverte offert",
    cta: {
      primary: "Soin Découverte Offert",
      secondary: "Appeler Maintenant"
    },
    info: {
      institute: "Élégance Beauty Spa",
      address: "28 Avenue Foch, 75116 Paris (16ème)",
      phone: "+33 1 45 67 89 12",
      email: "contact@elegance-beauty-spa.fr",
      hours: {
        weekdays: "9h00 - 19h00",
        weekend: "10h00 - 18h00"
      },
      metro: "Charles de Gaulle-Étoile (Lignes 1, 2, 6), Trocadéro (Lignes 6, 9)",
      parking: "Parking Avenue Foch disponible"
    },
    socialProof: {
      title: "Rejoignez nos Clientes VIP",
      stats: [
        "500+ femmes sublimées",
        "98% de satisfaction client",
        "Résultats visibles dès le 1er soin"
      ]
    }
  },

  // Footer
  footer: {
    description: "Élégance Beauty Spa - Votre institut de beauté haut de gamme pour révéler votre éclat naturel",
    links: {
      services: [
        { name: "Soins Visage", href: "#services" },
        { name: "Massages", href: "#services" },
        { name: "Épilation", href: "#services" },
        { name: "Forfaits VIP", href: "#services" }
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
      "CAP Esthétique",
      "Spécialisation Anti-Âge",
      "Massage Californien"
    ]
  },

  // SEO Optimisé Beauté Paris 16ème
  seo: {
    title: "Élégance Beauty Spa - Institut Beauté Haut de Gamme Paris 16ème | Amélie Dubois",
    description: "Institut de beauté de luxe à Paris 16ème. Soins visage, massages, épilation laser. Avenue Foch, Passy, Trocadéro. Soin découverte offert. ⭐⭐⭐⭐⭐",
    keywords: [
      "institut de beauté",
      "salon de beauté", 
      "esthéticienne Paris",
      "soins visage Paris",
      "massage bien-être",
      "épilation laser",
      "beauté haut de gamme",
      "spa Paris 16ème",
      "institut beauté Passy",
      "soins anti-âge",
      "beauté Trocadéro",
      "esthétique Paris 16",
      "spa de luxe Paris",
      "soins beauté premium",
      "institut Auteuil",
      "beauté Avenue Foch"
    ],
    localSEO: {
      businessName: "Élégance Beauty Spa",
      businessType: "BeautySalon",
      address: {
        streetAddress: "28 Avenue Foch",
        addressLocality: "Paris",
        postalCode: "75116",
        addressCountry: "FR",
        addressRegion: "Île-de-France"
      },
      geo: {
        latitude: 48.8738,
        longitude: 2.2834
      },
      telephone: "+33145678912",
      email: "contact@elegance-beauty-spa.fr",
      url: "https://elegance-beauty-spa.vercel.app",
      priceRange: "€€€€",
      openingHours: [
        "Mo-Fr 09:00-19:00",
        "Sa-Su 10:00-18:00"
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