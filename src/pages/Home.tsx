import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO, TODAYS_WORD } from '../data/churchData';
import { QuickActionStrip } from '../components/QuickActionStrip';
import { 
  Play, 
  Pause, 
  MapPin, 
  Calendar, 
  Clock, 
  Radio, 
  ArrowRight, 
  Volume2, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  CheckCircle, 
  Users, 
  BookOpen, 
  ExternalLink,
  Flame,
  ChevronRight,
  Disc,
  Heart,
  Droplet
} from 'lucide-react';

export const Home: React.FC = () => {
  const { 
    setActivePage, 
    openModal, 
    playTrack, 
    isPlaying, 
    currentAudio, 
    togglePlay, 
    sermons,
    testimonies,
    showToast,
    lowBandwidthMode 
  } = useChurch();

  // Next Service Countdown Calculator
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, targetTitle: '' });

  useEffect(() => {
    const calculateNextService = () => {
      const now = new Date();
      const currentDay = now.getDay();
      
      const serviceSchedule = [
        { day: 0, hour: 9, min: 0, title: "Sunday Worship & Tape Fellowship" },
        { day: 3, hour: 16, min: 0, title: "Wednesday Bible Exposition" },
        { day: 5, hour: 16, min: 0, title: "Friday United Prayer" }
      ];

      let nextDate: Date | null = null;
      let targetService = serviceSchedule[0];

      for (let offset = 0; offset <= 7; offset++) {
        const testDay = (currentDay + offset) % 7;
        const matching = serviceSchedule.find(s => s.day === testDay);
        if (matching) {
          const testDate = new Date(now);
          testDate.setDate(now.getDate() + offset);
          testDate.setHours(matching.hour, matching.min, 0, 0);

          if (testDate.getTime() > now.getTime()) {
            nextDate = testDate;
            targetService = matching;
            break;
          }
        }
      }

      if (!nextDate) {
        nextDate = new Date(now);
        nextDate.setDate(now.getDate() + (7 - currentDay));
        nextDate.setHours(9, 0, 0, 0);
      }

      const diff = nextDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds, targetTitle: targetService.title });
    };

    calculateNextService();
    const interval = setInterval(calculateNextService, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayTodaysWord = () => {
    if (currentAudio?.id === 'todays-word-snippet') {
      togglePlay();
    } else {
      playTrack({
        id: 'todays-word-snippet',
        title: TODAYS_WORD.sermonTitle,
        speakerOrAuthor: `${TODAYS_WORD.tapeNumber} • ${TODAYS_WORD.minister}`,
        audioUrl: TODAYS_WORD.audioSnippetUrl,
        duration: TODAYS_WORD.duration,
        type: 'snippet'
      });
    }
  };

  const handleShareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: "Today's Word - JGS Enugu",
        text: `"${TODAYS_WORD.sermonQuote}" — ${TODAYS_WORD.sermonTitle} (${CHURCH_INFO.name}, Enugu)`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`"${TODAYS_WORD.sermonQuote}" — ${TODAYS_WORD.sermonTitle} (${CHURCH_INFO.name})`);
      showToast("Quote copied to clipboard!");
    }
  };

  return (
    <div className="space-y-12 pb-16 bg-slate-50">
      
      {/* 1. HERO SECTION: Clean VOGR & Branham.org Sacred Navy Banner */}
      <section className="vogr-hero-bg text-white pt-14 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b-4 border-vogr-gold relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Sacred Seal Pill */}
          <div className="inline-flex items-center space-x-2 bg-vogr-navyDark/90 border border-vogr-gold/40 rounded-full px-4 py-1.5 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-vogr-gold animate-ping"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-vogr-gold">
              Voice of the Word • Enugu Fellowship
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Jehovah Good Shepherd Church
          </h1>

          {/* Subtitle & Theological Heritage */}
          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-200 leading-relaxed font-sans font-light">
            "{CHURCH_INFO.tagline}" — Walking in the apostolic Message of the Hour and ministry patterns of William Marrion Branham.
          </p>

          <p className="text-xs sm:text-sm text-vogr-gold font-semibold tracking-wide flex items-center justify-center space-x-2">
            <MapPin size={16} />
            <span>Independence Layout, Enugu (Beside IMT Campus 2), Nigeria</span>
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('live')}
              className="px-6 py-3.5 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Radio size={18} className="text-white animate-pulse" />
              <span>Join Live Service Broadcast</span>
            </button>

            <button
              onClick={() => openModal('planVisit')}
              className="px-6 py-3.5 rounded-full bg-white text-vogr-navy hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center space-x-2"
            >
              <Compass size={18} className="text-vogr-crimson" />
              <span>Plan Your Visit</span>
            </button>

            <button
              onClick={() => setActivePage('testimonies')}
              className="px-6 py-3.5 rounded-full bg-vogr-navyDark/80 hover:bg-vogr-navyDark text-vogr-gold border border-vogr-gold/40 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Read Testimonies</span>
            </button>
          </div>
        </div>
      </section>

      {/* QUICK-ACTION STRIP */}
      <div className="-mt-8 relative z-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-church-lg border border-slate-200 p-2">
          <QuickActionStrip />
        </div>
      </div>

      {/* 2. SIGNATURE: "QUOTE OF THE DAY" / TODAY'S WORD (VOGR & BRANHAM.ORG PATTERN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-church overflow-hidden">
          
          <div className="bg-vogr-navy text-white px-6 sm:px-8 py-3 flex items-center justify-between border-b border-vogr-gold/40">
            <div className="flex items-center space-x-2">
              <BookOpen size={16} className="text-vogr-gold" />
              <span className="font-serif font-bold text-sm tracking-wide">
                Quote of the Day & Daily Spoken Word Focus
              </span>
            </div>
            <span className="text-xs text-vogr-gold font-mono uppercase tracking-wider">
              {TODAYS_WORD.date}
            </span>
          </div>

          <div className="p-6 sm:p-10 vogr-quote-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Quote & Scripture */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-vogr-crimson">
                  <span>SCRIPTURE:</span>
                  <span className="text-slate-800 font-serif text-sm">{TODAYS_WORD.scriptureRef}</span>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl text-slate-900 leading-relaxed italic">
                  "{TODAYS_WORD.sermonQuote}"
                </blockquote>

                <div className="text-xs text-slate-600 font-sans space-y-0.5 pt-1">
                  <p>Sermon Title: <strong className="text-slate-900 font-bold">{TODAYS_WORD.sermonTitle}</strong></p>
                  <p>Tape Ref: <strong className="text-vogr-crimson font-mono font-bold">{TODAYS_WORD.tapeNumber}</strong> • {TODAYS_WORD.minister}</p>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handlePlayTodaysWord}
                    className="px-5 py-2.5 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs sm:text-sm flex items-center space-x-2 shadow"
                  >
                    {isPlaying && currentAudio?.id === 'todays-word-snippet' ? (
                      <>
                        <Pause size={15} />
                        <span>Pause Spoken Word</span>
                      </>
                    ) : (
                      <>
                        <Play size={15} className="fill-vogr-gold" />
                        <span>Listen to Daily Audio ({TODAYS_WORD.duration})</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShareQuote}
                    className="p-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-sm"
                    title="Share this quote"
                  >
                    <Share2 size={16} />
                  </button>

                  <a
                    href="https://branham.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-vogr-navy hover:underline flex items-center space-x-1 font-semibold ml-2"
                  >
                    <span>Read on VOGR Archive</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Right Tape Box */}
              <div className="lg:col-span-4 bg-vogr-navy text-white p-6 rounded-2xl border border-vogr-gold/30 shadow-inner space-y-3">
                <div className="flex items-center justify-between text-xs text-vogr-gold">
                  <span className="font-mono font-bold">VOGR TAPE CATALOG</span>
                  <Disc size={18} className={`${isPlaying && currentAudio?.id === 'todays-word-snippet' ? 'animate-spin' : ''}`} />
                </div>
                <h4 className="font-serif text-lg font-bold text-white leading-snug">
                  {TODAYS_WORD.sermonTitle}
                </h4>
                <p className="text-xs text-slate-300">
                  Tape listening and congregational study at Independence Layout, Enugu.
                </p>
                <div className="pt-2 border-t border-slate-700 flex justify-between text-xs">
                  <span className="text-vogr-gold font-mono">{TODAYS_WORD.tapeNumber}</span>
                  <button
                    onClick={() => setActivePage('sermons')}
                    className="text-white hover:text-vogr-gold font-semibold flex items-center space-x-1"
                  >
                    <span>More Tapes</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. SERVICE TIMES & COUNTDOWN TO NEXT GATHERING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-church">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Countdown */}
            <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs uppercase font-bold tracking-wider text-vogr-crimson flex items-center space-x-1.5">
                <Clock size={15} />
                <span>Next Service Gathering</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-vogr-navy">
                {countdown.targetTitle || "Sunday Worship Service"}
              </h3>
              <p className="text-xs text-slate-500">
                Independence Layout Sanctuary (Beside IMT Campus 2, Enugu)
              </p>

              {/* Countdown Digits */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="bg-vogr-navy text-vogr-gold p-3 rounded-xl text-center shadow">
                  <span className="font-mono text-2xl font-extrabold block">{countdown.days}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-300">Days</span>
                </div>
                <div className="bg-vogr-navy text-vogr-gold p-3 rounded-xl text-center shadow">
                  <span className="font-mono text-2xl font-extrabold block">{countdown.hours}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-300">Hours</span>
                </div>
                <div className="bg-vogr-navy text-vogr-gold p-3 rounded-xl text-center shadow">
                  <span className="font-mono text-2xl font-extrabold block">{countdown.minutes}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-300">Mins</span>
                </div>
                <div className="bg-vogr-navy text-vogr-gold p-3 rounded-xl text-center shadow">
                  <span className="font-mono text-2xl font-extrabold block">{countdown.seconds}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-300">Secs</span>
                </div>
              </div>
            </div>

            {/* Right: The 3 Regular Church Services */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CHURCH_INFO.services.map((srv, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-vogr-navy transition-colors">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-vogr-crimson block mb-1">
                      {srv.day}
                    </span>
                    <h4 className="font-serif text-base font-bold text-vogr-navy leading-snug">
                      {srv.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-900 mt-2">
                      {srv.time}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-3 pt-2 border-t border-slate-200 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED TESTIMONIES OF FAITH (VOGR PATTERN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson flex items-center space-x-1.5">
              <Sparkles size={14} />
              <span>Miracles & Divine Healing</span>
            </span>
            <h2 className="font-serif text-3xl font-bold text-vogr-navy">
              Testimonies from the Flock
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              "Jesus Christ the same yesterday, and to day, and for ever." — Hebrews 13:8
            </p>
          </div>
          <button
            onClick={() => setActivePage('testimonies')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-vogr-navy hover:text-vogr-crimson transition-colors"
          >
            <span>View All Field Testimonies</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonies.slice(0, 3).map((testimony) => (
            <div
              key={testimony.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4 hover:border-vogr-gold transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-vogr-crimson border border-rose-200">
                    {testimony.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">{testimony.date}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-vogr-navy leading-snug">
                  {testimony.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed font-light line-clamp-4">
                  "{testimony.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="block text-slate-900 font-bold">{testimony.author}</strong>
                  <span className="text-slate-500 text-[11px]">{testimony.location}</span>
                </div>
                <button
                  onClick={() => setActivePage('testimonies')}
                  className="text-xs font-bold text-vogr-crimson hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LATEST SERMONS & TAPE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
              The Living Voice
            </span>
            <h2 className="font-serif text-3xl font-bold text-vogr-navy">
              Latest Sermons & Tape Exhortations
            </h2>
          </div>
          <button
            onClick={() => setActivePage('sermons')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-vogr-navy hover:text-vogr-crimson transition-colors"
          >
            <span>Browse Full Sermon Library</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sermons.slice(0, 3).map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-church flex flex-col justify-between hover:shadow-church-lg transition-shadow"
            >
              <div>
                {!lowBandwidthMode && sermon.thumbnail && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-vogr-navy/90 text-vogr-gold text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                      {sermon.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-vogr-navy/90 text-white text-[11px] px-2 py-0.5 rounded font-mono">
                      {sermon.duration}
                    </span>
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Calendar size={13} />
                    <span>{sermon.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{sermon.scripture}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-vogr-navy leading-snug">
                    {sermon.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sermon.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {sermon.minister}
                </span>

                <button
                  onClick={() => playTrack({
                    id: sermon.id,
                    title: sermon.title,
                    speakerOrAuthor: sermon.minister,
                    audioUrl: sermon.audioUrl,
                    duration: sermon.duration,
                    type: 'sermon'
                  })}
                  className="px-3.5 py-1.5 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold flex items-center space-x-1.5 shadow"
                >
                  <Play size={13} className="fill-vogr-gold" />
                  <span>Play Tape</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STILL WATERS YOUTH ALIVE FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-vogr-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-church-lg border-2 border-vogr-gold/40">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-vogr-crimson text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              <Flame size={14} className="text-vogr-gold" />
              <span>Youth Alive • Still Waters Inspired</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              A Consecrated Generation Standing on the Word
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Saturday youth rallies, uncompromised tape fellowship, still waters campouts, instrumental praise, and peer accountability in Enugu.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage('youth')}
                className="px-5 py-2.5 rounded-full bg-vogr-gold hover:bg-vogr-goldHover text-vogr-navyDark font-bold text-xs sm:text-sm shadow"
              >
                Explore Youth Alive
              </button>
              <button
                onClick={() => openModal('enquiry')}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20"
              >
                Register for Next Rally
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDEPENDENCE LAYOUT, ENUGU LOCATION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-church">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson flex items-center space-x-1.5">
                <MapPin size={14} />
                <span>Sanctuary Location</span>
              </span>
              <h2 className="font-serif text-3xl font-bold text-vogr-navy">
                Join Us in Independence Layout
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                Our fellowship is located in the serene surroundings of <strong className="text-slate-900 font-bold">Independence Layout, Enugu (Beside IMT Campus 2)</strong>. Whether visiting for the first time or returning home, we welcome you in the blessed Name of the Lord Jesus Christ.
              </p>

              <div className="space-y-2 text-xs text-slate-700">
                <p>• <strong>Address:</strong> {CHURCH_INFO.address}</p>
                <p>• <strong>Resident Pastor:</strong> {CHURCH_INFO.pastor.name}</p>
                <p>• <strong>Gathering Days:</strong> Sunday 9:00 AM • Wed & Fri 4:00 PM</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('planVisit')}
                  className="px-5 py-2.5 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow"
                >
                  First-Time Visitor Guide
                </button>
                <button
                  onClick={() => setActivePage('contact')}
                  className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold"
                >
                  Map & Directions
                </button>
              </div>
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-6 bg-vogr-navy text-white rounded-2xl overflow-hidden border border-vogr-gold/40 p-6 shadow-inner text-center space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-vogr-gold">
                Enugu Map Coordinates
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                {CHURCH_INFO.name}
              </h3>
              <p className="text-xs text-slate-300">
                Independence Layout (Beside IMT Campus 2), Enugu, Nigeria
              </p>
              <div className="pt-3">
                <a
                  href="https://maps.google.com/?q=Independence+Layout+Enugu+Nigeria"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-vogr-gold text-vogr-navyDark font-bold text-xs shadow hover:bg-vogr-goldHover"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
