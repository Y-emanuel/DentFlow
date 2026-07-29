/**
 * Layout del grupo de rutas (marketing).
 * Incluye Navbar y Footer que envuelven todas las páginas de marketing.
 */

import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';

/**
 * Layout de marketing con Navbar superior y Footer inferior.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}