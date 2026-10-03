import { LandingNavbar } from '@/features/landing/landing-navbar'
import { HeroSection } from '@/features/landing/hero-section'
import { HowItWorks } from '@/features/landing/how-it-works'
import { FeaturesSection } from '@/features/landing/features-section'
import { RecipesSection } from '@/features/landing/recipes-section'
import { TestimonialsSection } from '@/features/landing/testimonials-section'
import { CtaSection } from '@/features/landing/cta-section'
import { LandingFooter } from '@/features/landing/landing-footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <RecipesSection />
      <TestimonialsSection />
      <CtaSection />
      <LandingFooter />
    </main>
  )
}
