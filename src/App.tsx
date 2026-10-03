import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Community } from './pages/Community';
import { Products } from './pages/Products';
import { ChildhoodEmergencyGuide } from './pages/ChildhoodEmergencyGuide';
import { LiveSessions } from './pages/LiveSessions';
import { Certifications } from './pages/Certifications';
import { CertificationApply } from './pages/CertificationApply';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { PaymentConfirmation } from './pages/PaymentConfirmation';
import { StudentPortal } from './pages/StudentPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { CertificateVerify } from './pages/CertificateVerify';
import { RedeemAccessCode } from './pages/RedeemAccessCode';
import { Container } from './components/Container';
import { Section } from './components/Section';
import { Headline } from './components/Headline';
import { Button } from './components/Button';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);
  return null;
}

// Temporary placeholder for routes waiting for Step 2+
function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="pt-36 md:pt-44 min-h-[60vh] flex items-center">
      <Section bg="white" className="w-full">
        <Container>
          <div className="max-w-[680px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h1" align="auto">
              {`${title} Page {{Coming Soon}}`}
            </Headline>
            <p className="font-body text-lg text-teal-950/80 leading-relaxed">
              This page will be built in the next step according to the Baby First Health sitemap and design specification.
            </p>
            <div className="pt-4 flex justify-start md:justify-center">
              <Button to="/" variant="primary">
                Return to Home
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isPortalRoute = location.pathname.startsWith('/portal');
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white text-teal-950 font-body antialiased">
      {!isPortalRoute && !isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/childhood-emergency-guide"
            element={<ChildhoodEmergencyGuide />}
          />
          <Route path="/certifications" element={<Certifications />} />
          <Route
            path="/certifications/apply"
            element={<CertificationApply />}
          />
          <Route path="/apply" element={<CertificationApply />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/redeem" element={<RedeemAccessCode />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/verify/:certId" element={<CertificateVerify />} />
          <Route path="/live-sessions" element={<LiveSessions />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:category" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isPortalRoute && !isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
