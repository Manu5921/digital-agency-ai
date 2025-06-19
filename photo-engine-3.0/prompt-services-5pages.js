#!/usr/bin/env node

/**
 * PROMPT GENERATOR - SERVICES WEBSITE (5 PAGES)
 * Based on the uploaded image - Home services company
 */

class ServicesWebsitePromptGenerator {
    constructor() {
        this.name = "Services Website 5-Page Prompt Generator";
    }

    /**
     * ANALYZE THE PROVIDED IMAGE
     * Home services company with blue/orange color scheme
     */
    analyzeImage() {
        return {
            // COLOR ANALYSIS
            colors: {
                primary: "#1e3a8a", // Deep blue
                secondary: "#f97316", // Orange accent
                background: "#ffffff", // Clean white
                text: "#1f2937", // Dark gray
                accent: "#fbbf24" // Yellow highlights
            },

            // DESIGN STYLE
            style: {
                mood: "Professional, trustworthy, approachable",
                layout: "Clean, modern, service-focused",
                imagery: "Real workers, authentic photos",
                typography: "Sans-serif, readable, professional"
            },

            // BUSINESS TYPE
            business: {
                type: "Home services company",
                services: ["Plumbing", "Carpentry", "Painting", "General maintenance"],
                target: "Homeowners needing reliable repair services",
                personality: "Professional, skilled, trustworthy"
            }
        };
    }

    /**
     * GENERATE 5-PAGE PROMPT IN ENGLISH
     */
    generateFivePagePrompt() {
        const analysis = this.analyzeImage();

        return `CREATE A PROFESSIONAL 5-PAGE HOME SERVICES WEBSITE

BUSINESS CONTEXT:
- Company: Home maintenance and repair services
- Services: Plumbing, carpentry, painting, electrical, general repairs
- Target: Homeowners seeking reliable, professional contractors
- Brand: "We take pride in our work" - quality-focused service provider

5-PAGE STRUCTURE:

1. HOMEPAGE:
- Hero Section: "We take pride in our work" with professional worker photo
- Services Overview: 3-4 main services with icons (Plumbing, Carpentry, Painting)
- About Preview: "Keeping your home in top condition" section
- Stats Section: Experience years, completed projects, satisfaction rate
- Recent Work Gallery: Before/after photos grid
- Contact CTA: Prominent contact buttons

2. SERVICES PAGE:
- Detailed service descriptions for each offering
- Service-specific imagery and pricing information
- Process explanation: How we work
- Service area coverage map
- Individual service request forms

3. ABOUT US PAGE:
- Company story and mission
- Team member profiles with photos
- Certifications and qualifications
- Insurance and licensing information
- Core values: Integrity, partnerships, experience, innovation

4. PORTFOLIO/PROJECTS PAGE:
- Project case studies with before/after photos
- Client testimonials with photos
- Work categories: Residential, commercial
- Project timelines and outcomes
- Client success stories

5. CONTACT PAGE:
- Multiple contact methods
- Service request form
- Office locations and service areas
- Business hours and availability
- Emergency contact information

VISUAL DESIGN:
- Color Palette: Deep blue primary (#1e3a8a), orange accents (#f97316), white backgrounds
- Typography: Clean sans-serif fonts, professional hierarchy
- Layout: Modern grid system, generous white space
- Images: Authentic worker photos, real project documentation
- Icons: Simple, professional service icons in blue/orange

UI ELEMENTS:
- Navigation: Horizontal menu with clear service categories
- Buttons: Orange primary buttons, blue secondary actions
- Cards: White cards with subtle shadows
- Forms: Clean, professional contact and quote forms
- Footer: Comprehensive with contact info and certifications

BRAND PERSONALITY:
- Professional craftsmen who take pride in quality work
- Reliable, experienced, customer-focused
- Transparent pricing and honest communication
- Local community-oriented service provider

CONTENT TONE:
- Professional yet approachable
- Emphasize quality, reliability, and customer satisfaction
- Focus on problem-solving and home improvement
- Build trust through transparency and expertise

TECHNICAL REQUIREMENTS:
- Responsive design for all devices
- Fast loading with optimized images
- Contact forms with validation
- Service area localization
- Mobile-first navigation
- SEO-optimized structure
- Accessibility compliant

NAVIGATION STRUCTURE:
- Home | Services | About Us | Portfolio | Contact
- Service dropdowns: Plumbing, Carpentry, Painting, Electrical
- Quick actions: Get Quote, Emergency Service, Call Now
- Footer links: Licensing, Insurance, Service Areas

Each page should maintain consistent branding while serving specific user needs and conversion goals.`;
    }

    /**
     * GENERATE PROMPT WITH METADATA
     */
    generateWithMetadata() {
        const prompt = this.generateFivePagePrompt();
        
        return {
            prompt: prompt,
            metadata: {
                pages: 5,
                business_type: "Home Services",
                language: "English",
                length: prompt.length,
                color_scheme: "Blue/Orange",
                target_audience: "Homeowners",
                timestamp: new Date().toISOString()
            }
        };
    }
}

// EXECUTION
console.log('🏠 SERVICES WEBSITE - 5 PAGES PROMPT GENERATOR');
console.log('==============================================\n');

const generator = new ServicesWebsitePromptGenerator();
const result = generator.generateWithMetadata();

console.log('📋 PROMPT FOR GOOGLE STITCH (5 PAGES):');
console.log('=======================================');
console.log(result.prompt);
console.log('=======================================\n');

console.log('📊 METADATA:');
console.log(`- Pages: ${result.metadata.pages}`);
console.log(`- Business: ${result.metadata.business_type}`);
console.log(`- Language: ${result.metadata.language}`);
console.log(`- Length: ${result.metadata.length} characters`);
console.log(`- Colors: ${result.metadata.color_scheme}`);
console.log(`- Target: ${result.metadata.target_audience}`);

console.log('\n🚀 NEXT STEPS:');
console.log('1. Copy the prompt above');
console.log('2. Go to https://stitch.withgoogle.com');
console.log('3. Paste the prompt');
console.log('4. Upload the reference image');
console.log('5. Generate the 5-page website');
console.log('6. Export code from Stitch');
console.log('7. Use html.to.design to import to Figma');

console.log('\n🎯 EXPECTED RESULT:');
console.log('- Professional home services website');
console.log('- 5 distinct pages with clear navigation');
console.log('- Blue/orange color scheme');
console.log('- Service-focused content structure');
console.log('- Mobile-responsive design');

export { ServicesWebsitePromptGenerator };