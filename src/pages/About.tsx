import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Sparkles, 
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Users 
} from 'lucide-react';

export const About: React.FC = () => {
  const { openModal, setActivePage } = useChurch();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
          Our Foundation & Message Heritage
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vogr-navy">
          Walking in the Light of the Spoken Word
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          Jehovah Good Shepherd Church in Enugu, Nigeria, is an apostolic fellowship established on the absolute authority of the Holy Scriptures and the prophetic ministry pattern of William Marrion Branham.
        </p>
      </div>

      {/* Leadership Profile: Pastor Oke Hyacinth Ayogu */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-church">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 text-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-vogr-navy border-4 border-vogr-gold p-2 shadow-xl flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                alt="Pastor Oke Hyacinth Ayogu"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="font-serif text-xl font-bold mt-4 text-vogr-navy">
              {CHURCH_INFO.pastor.name}
            </h3>
            <p className="text-xs text-vogr-crimson font-bold uppercase tracking-wider">
              {CHURCH_INFO.pastor.role}
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-vogr-crimson">
              Pastoral Care & Exhortation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy">
              Shepherding with the Voice of the Word
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
              {CHURCH_INFO.pastor.bio}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              At JGS Enugu, our ministry is anchored in brotherly love, sound biblical doctrine, and reverent tape fellowship. We do not substitute human theology for the living Spoken Word of God.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openModal('consultation')}
                className="px-5 py-2.5 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow"
              >
                Book a Spiritual Consultation
              </button>
              <button
                onClick={() => openModal('visit')}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold hover:bg-slate-50 text-slate-800"
              >
                Request a Pastoral Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Message Pillars */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
            Scriptural Pillars
          </span>
          <h2 className="font-serif text-3xl font-bold text-vogr-navy">What We Stand For</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-vogr-navy">The Spoken Word & Scriptures</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              We uphold the Holy Bible as the infallible Word of God, confirmed and unveiled in this end time through the Message of William Marrion Branham.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-vogr-crimson text-white flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-vogr-navy">Apostolic Water Baptism</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              We practice Christian water baptism strictly by single immersion in the Name of the Lord Jesus Christ, following Acts 2:38 and Acts 19:5.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-vogr-gold text-vogr-navyDark flex items-center justify-center font-bold">
              <Heart size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-vogr-navy">Sacred Instrumental Praise</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Our music ministry features anointed instrumentalists only (no choir). The entire congregation sings "Only Believe" and vintage hymns of faith in sacred reverence.
            </p>
          </div>
        </div>
      </section>

      {/* Curated Outbound Resource Hub: Voice of God Recordings (VGR) */}
      <section className="bg-vogr-navy text-white p-8 sm:p-12 rounded-3xl border-2 border-vogr-gold/40 shadow-church-lg space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-vogr-gold">
            Official Message Resources
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Voice of God Recordings (VGR)
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
            In compliance with copyright ethics, we direct all believers and seekers to the official Voice of God Recordings archives for complete sermon audio, translations, and publications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <a
            href="https://branham.org"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-vogr-navyLight hover:bg-slate-700 border border-vogr-gold/30 flex items-center justify-between group transition-colors"
          >
            <div>
              <p className="font-serif font-bold text-sm text-white">branham.org</p>
              <p className="text-[11px] text-slate-300">Official VGR Home & Articles</p>
            </div>
            <ExternalLink size={16} className="text-vogr-gold group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://thetable.branham.org"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-vogr-navyLight hover:bg-slate-700 border border-vogr-gold/30 flex items-center justify-between group transition-colors"
          >
            <div>
              <p className="font-serif font-bold text-sm text-white">The Table App</p>
              <p className="text-[11px] text-slate-300">Search All Spoken Word Tapes</p>
            </div>
            <ExternalLink size={16} className="text-vogr-gold group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://youngfoundations.org"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-vogr-navyLight hover:bg-slate-700 border border-vogr-gold/30 flex items-center justify-between group transition-colors"
          >
            <div>
              <p className="font-serif font-bold text-sm text-white">Young Foundations</p>
              <p className="text-[11px] text-slate-300">Still Waters Youth & Quizzes</p>
            </div>
            <ExternalLink size={16} className="text-vogr-gold group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

    </div>
  );
};
