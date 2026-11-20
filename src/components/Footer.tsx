import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Heart, 
  Send 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, showToast } = useChurch();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Thank you! You are subscribed to church tape announcements and weekly updates.");
  };

  return (
    <footer className="bg-vogr-navyDark text-white border-t-4 border-vogr-gold pt-16 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700">
          
          {/* Col 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-vogr-navy border-2 border-vogr-gold text-vogr-gold flex items-center justify-center font-serif text-lg font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Jehovah Good Shepherd</h3>
                <span className="text-xs text-vogr-gold uppercase tracking-widest block font-medium">Church • Enugu, Nigeria</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-vogr-crimson pl-3">
              "{CHURCH_INFO.tagline}" — A sacred flock walking in the light of the present truth and apostolic message.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p>Resident Pastor: <strong className="text-white">{CHURCH_INFO.pastor.name}</strong></p>
              <p>Independence Layout, Enugu (Beside IMT Campus 2)</p>
              <p>Giving Account: <strong className="text-vogr-gold">Ecobank Nigeria ({CHURCH_INFO.banking.naira.accountNumber})</strong></p>
            </div>
          </div>

          {/* Col 2: Service Times & Broadcasts */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-vogr-gold flex items-center space-x-1.5">
              <Clock size={15} />
              <span>Gathering Times</span>
            </h4>
            <ul className="text-xs space-y-2.5 text-slate-300">
              <li className="bg-vogr-navy/80 p-2.5 rounded-lg border border-slate-700">
                <strong className="text-white block">Sunday Worship & Tape Service</strong>
                <span className="text-vogr-gold font-semibold">9:00 AM – 12:30 PM</span>
              </li>
              <li className="bg-vogr-navy/80 p-2.5 rounded-lg border border-slate-700">
                <strong className="text-white block">Wednesday Bible Exposition</strong>
                <span className="text-vogr-gold font-semibold">4:00 PM – 6:00 PM</span>
              </li>
              <li className="bg-vogr-navy/80 p-2.5 rounded-lg border border-slate-700">
                <strong className="text-white block">Friday United Prayer</strong>
                <span className="text-vogr-gold font-semibold">4:00 PM – 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-vogr-gold">
              Quick Links
            </h4>
            <ul className="text-xs space-y-2 text-slate-300 grid grid-cols-2 gap-x-2">
              <li>
                <button onClick={() => { setActivePage('sermons'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Sermons & Tapes
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('testimonies'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Field Testimonies
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('live'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Live Broadcast
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('baptisms'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Water Baptism (Acts 2:38)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('youth'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Youth Alive
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('ministries'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Care Ministries
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('give'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Give (Ecobank)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-vogr-gold text-left">
                  Visit Us in Enugu
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Official Message Links:</span>
              <a
                href="https://branham.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-vogr-gold hover:underline"
              >
                <span>Voice of God Recordings (VGR)</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter & WhatsApp Broadcast */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-vogr-gold">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-300">
              Receive weekly scripture thoughts, tape references, and fellowship announcements.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Your phone or email"
                  required
                  className="w-full px-3 py-2 text-xs rounded-l-lg bg-vogr-navy border border-slate-600 text-white focus:outline-none focus:border-vogr-gold"
                />
                <button
                  type="submit"
                  className="bg-vogr-crimson hover:bg-vogr-crimsonHover text-white px-3 py-2 rounded-r-lg text-xs font-semibold flex items-center justify-center border border-l-0 border-slate-600"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>

            <div className="pt-2">
              <a
                href={`https://wa.me/${CHURCH_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20JGS%20Enugu`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-xs bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 px-3 py-2 rounded-lg w-full justify-center transition-colors"
              >
                <span>Official WhatsApp Channel</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Jehovah Good Shepherd Church, Enugu. All Rights Reserved.
          </p>
          <p className="text-center md:text-right text-[11px] text-slate-400 max-w-xl">
            Sermon tapes and original message publications are referenced with respect to Voice of God Recordings ([branham.org](https://branham.org)). Music is exclusively instrumental. Soli Deo Gloria.
          </p>
        </div>
      </div>
    </footer>
  );
};
