import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Droplet, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  Sparkles, 
  User, 
  Printer 
} from 'lucide-react';

export const Baptisms: React.FC = () => {
  const { openModal, careRequests, userRole } = useChurch();

  const [activeStep, setActiveStep] = useState<number>(1);
  const baptismCandidates = careRequests.filter((r) => r.type === 'baptism');

  const upcomingBaptisms = [
    {
      date: "Sunday, December 1, 2024",
      time: "1:00 PM (Immediately following Sunday Service)",
      location: "Sanctuary Baptistery, Independence Layout (Beside IMT Campus 2)",
      officiating: CHURCH_INFO.pastor.name,
      classes: "Saturdays 10:00 AM – 11:30 AM",
      whatToBring: "Clean large towel, dark change of modest garments, and a prayerful heart."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header & Apostolic Overview */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-sky-50 text-vogr-navy border border-sky-200 font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-widest shadow-sm">
          <Droplet size={14} className="text-sky-700" />
          <span>Apostolic Water Baptism</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vogr-navy">
          Christian Water Baptism
        </h1>
        <blockquote className="text-sm sm:text-base text-slate-700 font-serif italic max-w-2xl mx-auto">
          "Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost." — Acts 2:38
        </blockquote>
      </div>

      {/* 2. Theological Foundations Card */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-church space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-vogr-crimson">
            Scriptural Doctrine & Formula
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy">
            Buried With Him by Baptism into Death
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            As revealed in the New Testament scriptures and restored in the Message of the Hour, water baptism is a holy burial by single immersion into the Name of the Lord Jesus Christ. Titles (Father, Son, Holy Ghost) are not names; the Name of the Father, Son, and Holy Ghost is the Lord Jesus Christ (Matthew 28:19 explained in Acts 2:38).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-vogr-crimson">ACTS 2:38</span>
            <h4 className="font-serif font-bold text-sm text-vogr-navy">The Apostolic Formula</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Peter and every apostle baptized exclusively in the Name of the Lord Jesus Christ for the remission of sins.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-vogr-crimson">ACTS 19:1-6</span>
            <h4 className="font-serif font-bold text-sm text-vogr-navy">Re-Baptism in Jesus' Name</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Paul re-baptized the disciples at Ephesus who had known only John's baptism, instructing them in the living Name of Jesus Christ.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-vogr-crimson">ROMANS 6:4</span>
            <h4 className="font-serif font-bold text-sm text-vogr-navy">Burial by Immersion</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Complete immersion beneath water symbolizes the burial of the old nature and rising to walk in newness of life.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => openModal('baptism')}
            className="px-6 py-3 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
          >
            Submit Baptism Request Form
          </button>
          <button
            onClick={() => openModal('consultation')}
            className="px-6 py-3 rounded-full border border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800"
          >
            Counsel with Pastor Oke Hyacinth Ayogu
          </button>
        </div>
      </section>

      {/* 3. Upcoming Baptism Services */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-vogr-crimson">
              Ordinance Service
            </span>
            <h2 className="font-serif text-2xl font-bold text-vogr-navy">Upcoming Baptismal Gathering</h2>
          </div>
          <span className="text-xs text-slate-500">Venue: Independence Layout Sanctuary Pool (Beside IMT Campus 2)</span>
        </div>

        {upcomingBaptisms.map((bap, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-church grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-vogr-crimson font-bold">
                Scheduled Pool Service
              </span>
              <h3 className="font-serif text-2xl font-bold text-vogr-navy">
                {bap.date}
              </h3>
              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center space-x-1.5">
                  <Clock size={13} className="text-vogr-crimson shrink-0" />
                  <span><strong>Time:</strong> {bap.time}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <MapPin size={13} className="text-vogr-crimson shrink-0" />
                  <span><strong>Location:</strong> {bap.location}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <User size={13} className="text-vogr-crimson shrink-0" />
                  <span><strong>Officiating Minister:</strong> {bap.officiating}</span>
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mt-2">
                <p><strong>What to bring:</strong> {bap.whatToBring}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pre-baptism preparation classes: {bap.classes} (Minister covers repentance and apostolic baptism).
                </p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center space-y-3">
              <button
                onClick={() => openModal('baptism')}
                className="w-full py-3 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow"
              >
                Sign Up as Baptism Candidate
              </button>
              <div className="text-center text-[11px] text-slate-500">
                Candidates under 18 require parental consent.
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Candidate Status Tracker */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
            Preparation Pathway
          </span>
          <h2 className="font-serif text-2xl font-bold text-vogr-navy">Candidate Status Tracker</h2>
          <p className="text-xs text-slate-600">
            From initial enquiry to apostolic water baptism, discipleship follow-up, and official church certificate.
          </p>
        </div>

        {/* 5 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          {[
            { step: 1, title: "1. Requested", desc: "Form received by office" },
            { step: 2, title: "2. Approved", desc: "Pastoral interview" },
            { step: 3, title: "3. In Prep", desc: "Baptism class attend" },
            { step: 4, title: "4. Scheduled", desc: "Pool service roster" },
            { step: 5, title: "5. Baptized", desc: "Certificate & follow-up" },
          ].map((s) => (
            <div
              key={s.step}
              className={`p-4 rounded-2xl border transition-all ${
                s.step <= 4
                  ? 'bg-white border-vogr-navy/30 shadow-sm'
                  : 'bg-white/50 border-slate-200'
              }`}
            >
              <span className="font-serif text-base font-bold text-vogr-navy block mb-1">
                {s.title}
              </span>
              <span className="text-[11px] text-slate-500">{s.desc}</span>
            </div>
          ))}
        </div>

        {/* Confidential Candidate Roster */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-sm flex items-center space-x-2 text-vogr-navy">
              <ShieldCheck size={16} className="text-vogr-crimson" />
              <span>Current Candidates on Register (Pastoral Office View)</span>
            </h4>
            <span className="text-xs text-slate-500 font-mono">Confidential Register</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {baptismCandidates.map((c) => (
              <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">{c.fullName}</span>
                  <span className="text-slate-500 ml-2">({c.area} • Age: {c.age || 'Adult'})</span>
                  <p className="text-[11px] text-slate-600 italic">"{c.notes}"</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200">
                    {c.status}
                  </span>
                  {c.status === 'done' || c.certificateIssued ? (
                    <span className="text-emerald-700 text-xs font-semibold">Certificate Issued ✓</span>
                  ) : (
                    <span className="text-xs text-vogr-crimson font-semibold">
                      Class Scheduled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
