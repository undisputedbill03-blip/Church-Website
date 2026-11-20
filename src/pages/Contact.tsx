import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  HeartHandshake 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { addCareRequest, showToast, openModal } = useChurch();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    category: 'First-Time Guest Inquiry',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCareRequest({
      type: 'enquiry',
      fullName: form.name,
      phone: form.phone,
      email: form.email,
      area: 'Independence Layout Inquiry',
      category: form.category,
      notes: form.message,
    });
    setSubmitted(true);
    showToast("Thank you! Your message has been routed to the church office.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
          Find Your Way Home
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vogr-navy">
          Visit Us in Independence Layout, Enugu
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          Conveniently located beside IMT Campus 2 in Enugu. We extend a sincere, open shepherd's welcome to you and your family.
        </p>
      </div>

      {/* Grid: Map & Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info & First Visit Guide (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-church space-y-4">
            <h3 className="font-serif text-xl font-bold text-vogr-navy">Church Sanctuary Information</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3 text-slate-700">
                <MapPin size={18} className="text-vogr-crimson shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Physical Address:</strong>
                  <span>{CHURCH_INFO.address}</span>
                  <span className="block text-vogr-crimson font-semibold mt-0.5">Landmark: Beside IMT Campus 2</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-700">
                <Clock size={18} className="text-vogr-crimson shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Service Gatherings:</strong>
                  <span>• Sunday: 9:00 AM – 12:30 PM (Tape & Word)</span><br />
                  <span>• Wednesday: 4:00 PM – 6:00 PM (Bible Exposition)</span><br />
                  <span>• Friday: 4:00 PM – 6:00 PM (United Prayer)</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <Phone size={18} className="text-vogr-crimson shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">Church Office:</strong>
                  <span>{CHURCH_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <Mail size={18} className="text-vogr-crimson shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">Email:</strong>
                  <span>{CHURCH_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/${CHURCH_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Pastor%20Oke%20Hyacinth%20Ayogu%2C%20I%20am%20reaching%20out%20to%20JGS%20Enugu`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow flex items-center justify-center space-x-2"
              >
                <span>Chat via WhatsApp</span>
                <ExternalLink size={13} />
              </a>
              <button
                onClick={() => openModal('planVisit')}
                className="w-full py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow flex items-center justify-center space-x-2"
              >
                <Compass size={14} />
                <span>Open "Plan My Visit" Guide</span>
              </button>
            </div>
          </div>

          {/* First-Time Guest Etiquette Guide */}
          <div className="bg-vogr-navy text-white rounded-3xl p-6 sm:p-8 border-2 border-vogr-gold/40 shadow-church space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-vogr-gold">
              Visitor Etiquette
            </span>
            <h4 className="font-serif text-lg font-bold text-white">What to Expect on Your First Visit</h4>
            <p className="text-xs text-slate-200 leading-relaxed font-light">
              We gather in holy reverence. There is no entertainment choir or worldly fanfare — only sacred instrumental praise and uncompromised Message preaching. Modest attire is embraced. Parking is free and secure inside church grounds.
            </p>
          </div>

        </div>

        {/* Right: Map Embed & Contact Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive Google Map Preview */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-church">
            <div className="p-4 bg-vogr-navy text-white flex items-center justify-between">
              <div>
                <span className="font-serif font-bold text-sm block">Independence Layout, Enugu</span>
                <span className="text-[11px] text-vogr-gold">Beside IMT Campus 2</span>
              </div>
              <a
                href="https://maps.google.com/?q=Independence+Layout+Enugu+Nigeria"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-vogr-gold text-vogr-navyDark font-bold text-xs flex items-center space-x-1"
              >
                <span>Open in Maps App</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="relative h-72 sm:h-80 w-full bg-slate-100">
              <iframe
                title="Church Location Map"
                className="w-full h-full border-0"
                src="https://maps.google.com/maps?q=Independence%20Layout%2C%20Enugu%2C%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Direct Message Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-church space-y-4">
            <h3 className="font-serif text-xl font-bold text-vogr-navy">Send an Official Message</h3>
            <p className="text-xs text-slate-500">
              Our church secretariat and pastoral care team review all inquiries promptly.
            </p>

            {submitted ? (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-300 text-center space-y-1">
                <CheckCircle2 size={32} className="mx-auto text-emerald-700" />
                <h4 className="font-serif font-bold text-sm text-vogr-navy">Message Sent</h4>
                <p className="text-xs text-slate-600">
                  We look forward to fellowshipping with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Bro. Chukwudi"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0803 123 4567"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Message / Inquiry *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ask about service times, directions, baptism classes, or tape downloads..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                >
                  <Send size={13} />
                  <span>Send Message to Secretariat</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
