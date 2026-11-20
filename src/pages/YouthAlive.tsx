import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { 
  Flame, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Heart, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Compass, 
  Music, 
  BookOpen 
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const YouthAlive: React.FC = () => {
  const { addCareRequest, showToast, setActivePage } = useChurch();

  const [youthForm, setYouthForm] = useState({
    fullName: '',
    phone: '',
    age: 20,
    area: 'Enugu',
    interests: 'Still Waters Camps & Music Instrumental',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCareRequest({
      type: 'enquiry',
      fullName: youthForm.fullName,
      phone: youthForm.phone,
      area: youthForm.area,
      category: 'Youth Alive Sign-up',
      notes: `Youth registration (Age ${youthForm.age}): ${youthForm.interests}`,
    });
    setSubmitted(true);
    showToast("Welcome to Youth Alive JGS Enugu! Our youth leadership will reach out.");
  };

  const programs = [
    {
      title: "Saturday Youth Word & Tape Rally",
      schedule: "Every Saturday • 4:00 PM – 5:30 PM",
      location: "Sanctuary Annex, Independence Layout",
      description: "Quiet tape fellowship, biblical discussions on godly courtship, peer accountability, and instrumental worship.",
      tag: "Weekly Rally"
    },
    {
      title: "Still Waters Inspired Camp Retreat",
      schedule: "Annual December Campout",
      location: "Retreat Grounds, Enugu Environs",
      description: "Quiet time, personal tape listening with headphones, Scripture quizzes, nature walks, and consecration away from worldly distractions.",
      tag: "Annual Camp"
    },
    {
      title: "Campus Message Cells (UNEC / ESUT)",
      schedule: "Bi-Weekly Campus Meetups",
      location: "UNEC & ESUT Study Centers",
      description: "Supporting students living for Jesus Christ amid secular campus pressures and modern trends.",
      tag: "Campus Outreach"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Youth Alive Hero (Still Waters / Young Foundations Style) */}
      <section className="vogr-hero-bg text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-4 border-vogr-gold">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-vogr-crimson text-white font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg">
            <Flame size={15} className="text-vogr-gold" />
            <span>Youth Alive • Still Waters Inspired</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Young, Uncompromising, and <br />
            <span className="text-vogr-gold italic font-serif">Anchored to the Message</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            We are young believers across Enugu walking in holiness, tape fellowship, and instrumental praise. We refuse the compromise of this modern age and stand upon the absolute Word of God.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#join-youth"
              className="px-6 py-3.5 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-extrabold text-xs sm:text-sm shadow-xl transition-transform hover:scale-105"
            >
              Join Youth Alive Today
            </a>
            <button
              onClick={() => setActivePage('events')}
              className="px-6 py-3.5 rounded-full bg-white text-vogr-navy hover:bg-slate-100 font-bold text-xs sm:text-sm shadow"
            >
              Upcoming Youth Camps
            </button>
          </div>
        </div>
      </section>

      {/* 2. Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
            Rallies & Fellowships
          </span>
          <h2 className="font-serif text-3xl font-bold text-vogr-navy">Programs for Young Believers</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Wholesome spiritual environments to build lasting godly friendships and unwavering faith.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4 hover:border-vogr-navy transition-colors"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-vogr-crimson text-[10px] uppercase font-bold tracking-wider border border-rose-200">
                  {p.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-vogr-navy leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-vogr-crimson font-bold flex items-center space-x-1.5">
                  <Calendar size={13} />
                  <span>{p.schedule}</span>
                </p>
                <p className="text-xs text-slate-500 flex items-center space-x-1.5">
                  <MapPin size={13} />
                  <span>{p.location}</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-light pt-2 border-t border-slate-100">
                  {p.description}
                </p>
              </div>

              <a
                href="#join-youth"
                className="text-xs font-bold text-vogr-navy flex items-center space-x-1 hover:underline pt-2"
              >
                <span>Register for this program</span>
                <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Camp Atmosphere Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-church space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
                Still Waters Heritage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy">Youth Fellowship Atmosphere</h2>
            </div>
            <span className="text-xs text-slate-500">Independence Layout & Retreat Grounds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative h-56 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"
                alt="Tape study"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white">Quiet Time & Headphone Tape Fellowship</span>
              </div>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
                alt="Instrumental praise"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white">Sacred Instrumental Praise (No Choir)</span>
              </div>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
                alt="Brotherly fellowship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white">End-of-Year Retreat & Consecration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Join Youth Alive Form */}
      <section id="join-youth" className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-church-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-vogr-navy text-vogr-gold flex items-center justify-center mx-auto font-bold shadow">
              <Flame size={24} />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy">Connect with Youth Alive</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Get notified of youth rallies, Still Waters camp registrations, and local tape study circles.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-300 text-center space-y-2">
              <CheckCircle2 size={36} className="mx-auto text-emerald-700" />
              <h3 className="font-serif text-lg font-bold text-vogr-navy">Registration Received!</h3>
              <p className="text-xs text-slate-600">
                Bro. Timothy and the youth care team look forward to fellowshipping with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={youthForm.fullName}
                    onChange={(e) => setYouthForm({ ...youthForm, fullName: e.target.value })}
                    placeholder="e.g. Bro. Kenechukwu"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={youthForm.phone}
                    onChange={(e) => setYouthForm({ ...youthForm, phone: e.target.value })}
                    placeholder="0803 123 4567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Age Bracket</label>
                  <select
                    value={youthForm.age}
                    onChange={(e) => setYouthForm({ ...youthForm, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  >
                    <option value={15}>13 – 17 (Teens)</option>
                    <option value={20}>18 – 24 (Campus / Young Adults)</option>
                    <option value={28}>25 – 35 (Working Young Believers)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Area in Enugu</label>
                  <input
                    type="text"
                    value={youthForm.area}
                    onChange={(e) => setYouthForm({ ...youthForm, area: e.target.value })}
                    placeholder="e.g. Independence Layout, UNEC"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
              >
                Submit Youth Fellowship Registration
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
