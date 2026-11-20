import React from 'react';
import { useChurch } from './context/ChurchContext';
import { Navbar } from './components/Navbar';
import { QuickActionStrip } from './components/QuickActionStrip';
import { PersistentAudioPlayer } from './components/PersistentAudioPlayer';
import { CareModals } from './components/CareModals';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Sermons } from './pages/Sermons';
import { Testimonies } from './pages/Testimonies';
import { Live } from './pages/Live';
import { VirtualMember } from './pages/VirtualMember';
import { YouthAlive } from './pages/YouthAlive';
import { Events } from './pages/Events';
import { Fellowships } from './pages/Fellowships';
import { Ministries } from './pages/Ministries';
import { Baptisms } from './pages/Baptisms';
import { Give } from './pages/Give';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  const { activePage, toastMessage } = useChurch();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'sermons':
        return <Sermons />;
      case 'testimonies':
        return <Testimonies />;
      case 'live':
        return <Live />;
      case 'virtual-member':
        return <VirtualMember />;
      case 'youth':
        return <YouthAlive />;
      case 'events':
        return <Events />;
      case 'fellowships':
        return <Fellowships />;
      case 'ministries':
        return <Ministries />;
      case 'baptisms':
        return <Baptisms />;
      case 'give':
        return <Give />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-shepherd-950 text-shepherd-900 dark:text-cream-100 font-sans selection:bg-pasture-200 selection:text-pasture-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-pasture-900 text-cream-50 px-4 py-3 rounded-2xl shadow-2xl border border-gold-400/40 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-gold-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Sticky Quick-Action Strip (Mobile Only) */}
      <QuickActionStrip isStickyMobile={true} />

      {/* Signature Persistent Audio/Tape Player */}
      <PersistentAudioPlayer />

      {/* Confidential Care Form Modals & Plan a Visit Dialog */}
      <CareModals />

      {/* Site-wide Reverent Footer */}
      <Footer />
    </div>
  );
};

export default App;

