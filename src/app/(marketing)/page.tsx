/**
 * Página principal de DentFlow.
 * Orquesta todas las secciones en orden de conversión.
 */

import { Hero } from '@/components/marketing/hero';
import { SocialProof } from '@/components/marketing/social-proof';
import { Features } from '@/components/marketing/features';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Testimonials } from '@/components/marketing/testimonials';
import { FAQ } from '@/components/marketing/faq';
import { TurnoSection } from '@/components/marketing/turno-section';

/**
 * Landing page de DentFlow.
 * Orden: Hero -> SocialProof -> Features -> HowItWorks -> Testimonials -> FAQ -> Turno.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <TurnoSection />
    </>
  );
}