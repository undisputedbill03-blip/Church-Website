import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { 
  HeartHandshake, 
  Sparkles, 
  Home as HomeIcon, 
  HelpCircle, 
  Inbox, 
  CalendarCheck, 
  Droplet, 
  Music, 
  Search, 
  Play, 
  Printer, 
  Send, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { Hymn } from '../types';

export const Ministries: React.FC = () => {
  const { openModal, setActivePage, hymns, playTrack, showToast } = useChurch();

  const [hymnSearch, setHymnSearch] = useState('');
  const [requestedHymn, setRequestedHymn] = useState('');
  const [requestHymnNotes, setRequestHymnNotes] = useState('');
  const [hymnReqSubmitted, setHymnReqSubmitted] = useState(false);

  const filteredHymns = hymns.filter((h) =>
    h.title.toLowerCase().includes(hymnSearch.toLowerCase()) ||
    h.firstLine.toLowerCase().includes(hymnSearch.toLowerCase()) ||
    h.number.toString().includes(hymnSearch)
  );

  const handleRequestHymn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedHymn.trim()) return;
    setHymnReqSubmitted(true);
    showToast(`Hymn request "${requestedHymn}" received for next Lord's Day instrumental praise!`);
    setTimeout(() => {
      setHymnReqSubmitted(false);
      setRequestedHymn('');
      setRequestHymnNotes('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
          Shepherd Care & Service
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vogr-navy">
          Ministries & Church Care
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          Structured into confidential pastoral care for the flock, and faithful service teams upholding the house of God.
        </p>
      </div>

      {/* SECTION A: CARE AND PASTORAL MINISTRIES */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-vogr-crimson">
            Group A
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy">
            Care & Pastoral Ministries
          </h2>
          <p className="text-xs text-slate-600">
            Confidential assistance, spiritual counsel, home care, and ordinance services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Check-ups */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center font-bold">
                <HeartHandshake size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Wellbeing Check-ups</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Members or family can request a wellbeing check-up for absentees, elderly saints, or members experiencing difficulties.
              </p>
              <p className="text-[11px] text-slate-500">Contact: Care Team & Deacons</p>
            </div>
            <button
              onClick={() => openModal('visit')}
              className="w-full py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold shadow"
            >
              Request a Check-up
            </button>
          </div>

          {/* 2. Follow-ups */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center font-bold">
                <Users size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Visitor & Convert Follow-up</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Dedicated welcoming team connecting first-time guests, new converts, and newly baptized believers with spiritual materials and home cells.
              </p>
              <p className="text-[11px] text-slate-500">Contact: Follow-up Secretariat</p>
            </div>
            <button
              onClick={() => openModal('enquiry')}
              className="w-full py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold shadow"
            >
              Connect with Follow-up
            </button>
          </div>

          {/* 3. Pastoral Visits */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center font-bold">
                <HomeIcon size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Pastoral Home & Hospital Visits</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Request a personal home, hospital sickbed, or bereavement visitation with prayer and scripture encouragement.
              </p>
              <p className="text-[11px] text-slate-500">Schedule: Tuesdays & Thursdays</p>
            </div>
            <button
              onClick={() => openModal('visit')}
              className="w-full py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold shadow"
            >
              Request a Visit
            </button>
          </div>

          {/* 4. Add Enquiry */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center font-bold">
                <HelpCircle size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Add Enquiry (Ticketed)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Submit general enquiries regarding doctrine, tape resources, virtual membership, or meeting times with auto-tracking ticket status.
              </p>
              <p className="text-[11px] text-slate-500">Response time: Within 24-48 hrs</p>
            </div>
            <button
              onClick={() => openModal('enquiry')}
              className="w-full py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold shadow"
            >
              Submit an Enquiry
            </button>
          </div>

          {/* 5. Suggestion Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center font-bold">
                <Inbox size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Confidential Suggestion Box</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Anonymous or named suggestions, maintenance requests, and church improvement feedback. Never published publicly.
              </p>
              <p className="text-[11px] text-slate-500">Reviewed by: Board of Trustees & Pastor</p>
            </div>
            <button
              onClick={() => openModal('suggestion')}
              className="w-full py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold shadow"
            >
              Drop a Suggestion
            </button>
          </div>

          {/* 6. Book a Consultation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-vogr-crimson text-white flex items-center justify-center font-bold">
                <CalendarCheck size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Book a Consultation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Private spiritual counseling on personal or doctrinal matters with Pastor Oke Hyacinth Ayogu (In-person, phone, or video).
              </p>
              <p className="text-[11px] text-slate-500">Strict Pastoral Confidentiality</p>
            </div>
            <button
              onClick={() => openModal('consultation')}
              className="w-full py-2.5 rounded-xl bg-vogr-crimson hover:bg-vogr-crimsonHover text-white text-xs font-bold shadow"
            >
              Book Consultation Slot
            </button>
          </div>

          {/* 7. Baptisms (Dedicated Card) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-vogr-gold shadow-church flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-3">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-vogr-navy text-vogr-gold flex items-center justify-center">
                  <Droplet size={20} />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
                  Apostolic Ordinance
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-vogr-navy">
                Christian Water Baptism (Acts 2:38)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl font-light">
                Baptism by single immersion into the Name of the Lord Jesus Christ. Includes preparation classes, candidate status tracker, scheduled services at our Independence Layout pool, and official digital/printable certificates.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActivePage('baptisms')}
                className="px-5 py-2.5 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold shadow"
              >
                Go to Dedicated Baptism Page
              </button>
              <button
                onClick={() => openModal('baptism')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50 text-slate-800"
              >
                Direct Baptism Request Form
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION B: SERVICE AND TEAM MINISTRIES */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-vogr-crimson">
            Group B
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy">
            Service & Team Ministries
          </h2>
          <p className="text-xs text-slate-600">
            Consecrated brethren serving in the upkeep of the house of God (Instrumentalists only — no choir, no women's ministry).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Sanitation Team */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church space-y-4">
            <h3 className="font-serif text-xl font-bold text-vogr-navy">Sanitation & Sanctuary Team</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Caring for the reverence and cleanliness of God’s sanctuary, grounds, and quiet rooms before and after service.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>• <strong>Duty Roster:</strong> Saturday morning sweep & Friday setup</p>
              <p>• <strong>Leader:</strong> Bro. Peter Umeh</p>
            </div>
            <button
              onClick={() => openModal('enquiry')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800"
            >
              Volunteer for Sanitation Roster
            </button>
          </div>

          {/* 2. Children Ministry */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church space-y-4">
            <h3 className="font-serif text-xl font-bold text-vogr-navy">Children's Word Ministry</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Age-appropriate Bible lessons and tape stories with strict child safety protocols and parent check-in procedures.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>• <strong>Ages:</strong> 4 – 12 years (Class during sermon hour)</p>
              <p>• <strong>Content:</strong> Church-owned Bible lessons only</p>
            </div>
            <button
              onClick={() => openModal('enquiry')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800"
            >
              Parent Inquiries & Check-in
            </button>
          </div>

          {/* 3. Youth Ministry */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church space-y-4">
            <h3 className="font-serif text-xl font-bold text-vogr-navy">Youth Alive Fellowship</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Still Waters retreats, Saturday youth tape rallies, peer mentorship, and consecrated living in Enugu.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>• <strong>Rallies:</strong> Saturdays 4:00 PM</p>
              <p>• <strong>Youth Lead:</strong> Bro. Timothy Uche</p>
            </div>
            <button
              onClick={() => setActivePage('youth')}
              className="w-full py-2 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow"
            >
              Explore Youth Alive Section →
            </button>
          </div>

          {/* 4. Music Ministry (Instrumentalists Only) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-church space-y-4 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
                  Instrumentalists Only (No Choir)
                </span>
                <h3 className="font-serif text-2xl font-bold text-vogr-navy">Sacred Music Ministry</h3>
              </div>
              <a
                href="#hymns-space"
                className="text-xs font-bold text-vogr-crimson hover:underline"
              >
                Jump to "Only Believe" Hymns Space ↓
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl font-light">
              In accordance with Message order, there is no entertainment choir. Our music team consists strictly of anointed instrumentalists (piano, acoustic guitar, organ, strings) whose sole duty is to reverently accompany the entire congregation in singing vintage hymns of the faith.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p><strong>Rehearsal Schedule:</strong> Saturdays 2:00 PM – 4:00 PM</p>
                <p><strong>Focus:</strong> Spiritual reverence, timing, congregational accompaniment</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p><strong>Instruments Needed:</strong> Piano, Acoustic Guitar, Violin/Flute</p>
                <p><strong>Audition:</strong> Modest character and technical skill evaluation</p>
              </div>
            </div>

            <button
              onClick={() => openModal('enquiry')}
              className="py-2.5 px-6 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow"
            >
              Audition / Join Instrumental Team
            </button>
          </div>

        </div>
      </section>

      {/* SECTION C: "ONLY BELIEVE" HYMNS SPACE */}
      <section id="hymns-space" className="vogr-hero-bg text-white rounded-3xl p-8 sm:p-12 border-2 border-vogr-gold shadow-church-lg space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-700 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-vogr-crimson text-white text-xs font-bold uppercase tracking-wider">
              <Music size={14} className="text-vogr-gold" />
              <span>Congregational Songbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              "Only Believe" Hymns Space
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Public domain hymns, church-recorded instrumental sing-alongs, Sunday hymn requests, and printable orders of service.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-full bg-white text-vogr-navy hover:bg-slate-100 text-xs font-bold flex items-center space-x-1.5 shadow"
          >
            <Printer size={14} />
            <span>Print Hymn Order View</span>
          </button>
        </div>

        {/* Featured Hymn */}
        <div className="bg-vogr-navyDark/90 p-6 rounded-2xl border border-vogr-gold/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-vogr-gold">
              Hymn of the Week
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              #1. Only Believe (Fear Not, Little Flock)
            </h3>
            <p className="text-xs text-slate-200 italic font-serif">
              "Fear not, little flock, from the cross to the throne, From death into life He went for His own; All power in earth, all power above, Is given to Him for the flock of His love."
            </p>
            <p className="text-[11px] text-vogr-gold">Author: Paul Rader • Public Domain • Mark 9:23</p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center space-y-3">
            <button
              onClick={() => playTrack({
                id: 'hymn-1',
                title: 'Hymn #1: Only Believe',
                speakerOrAuthor: 'JGS Sanctuary Instrumentalists',
                audioUrl: hymns[0]?.audioUrl || '',
                type: 'hymn'
              })}
              className="w-full py-3 rounded-full bg-vogr-gold hover:bg-vogr-goldHover text-vogr-navyDark font-bold text-xs shadow flex items-center justify-center space-x-2"
            >
              <Play size={14} className="fill-vogr-navyDark" />
              <span>Play Instrumental Track</span>
            </button>
            <a
              href="https://branham.org"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-slate-300 hover:text-white text-center flex items-center justify-center space-x-1"
            >
              <span>Verify Official VGR Source</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Hymn Index Search & Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="font-serif text-lg font-bold text-white">Hymn Catalog & Index</h3>
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={hymnSearch}
                onChange={(e) => setHymnSearch(e.target.value)}
                placeholder="Search number or title..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-vogr-navyDark border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-vogr-gold"
              />
            </div>
          </div>

          <div className="overflow-x-auto bg-vogr-navyDark/60 rounded-2xl border border-slate-700">
            <table className="w-full text-left text-xs">
              <thead className="bg-vogr-navyDark text-vogr-gold uppercase font-semibold">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Title & First Line</th>
                  <th className="p-3">Scripture</th>
                  <th className="p-3">Source & Copyright</th>
                  <th className="p-3 text-right">Listen / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredHymns.map((h) => (
                  <tr key={h.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-vogr-gold">#{h.number}</td>
                    <td className="p-3">
                      <p className="font-serif font-bold text-white">{h.title}</p>
                      <p className="text-[11px] text-slate-300 italic truncate max-w-sm">"{h.firstLine}..."</p>
                    </td>
                    <td className="p-3 text-slate-300">{h.scriptureRef || 'Faith Hymn'}</td>
                    <td className="p-3 text-[11px] text-slate-400">
                      {h.isChurchOwnedOrPublicDomain ? 'Public Domain (Church Recording)' : 'Official Reference'}
                    </td>
                    <td className="p-3 text-right">
                      {h.audioUrl && (
                        <button
                          onClick={() => playTrack({
                            id: h.id,
                            title: `Hymn #${h.number}: ${h.title}`,
                            speakerOrAuthor: 'Instrumental Worship',
                            audioUrl: h.audioUrl!,
                            type: 'hymn'
                          })}
                          className="px-3 py-1 rounded-full bg-vogr-gold hover:bg-vogr-goldHover text-vogr-navyDark text-xs font-bold inline-flex items-center space-x-1"
                        >
                          <Play size={11} className="fill-vogr-navyDark" />
                          <span>Play</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member Request A Hymn Form */}
        <div className="bg-vogr-navyDark/90 p-6 rounded-2xl border border-slate-700 max-w-xl mx-auto space-y-4">
          <div className="text-center">
            <h4 className="font-serif text-lg font-bold text-white">Request a Hymn for Sunday Service</h4>
            <p className="text-xs text-slate-300">
              Members can suggest vintage hymns for congregational singing next Lord's Day.
            </p>
          </div>

          {hymnReqSubmitted ? (
            <div className="p-3 bg-vogr-navy text-vogr-gold text-xs font-semibold rounded-xl text-center border border-vogr-gold">
              ✓ Hymn request submitted to the Music Team!
            </div>
          ) : (
            <form onSubmit={handleRequestHymn} className="space-y-3">
              <input
                type="text"
                required
                value={requestedHymn}
                onChange={(e) => setRequestedHymn(e.target.value)}
                placeholder="Hymn Title or Songbook Number (e.g. #24 Great Physician)"
                className="w-full px-3 py-2 text-xs rounded-xl bg-vogr-navy border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-vogr-gold"
              />
              <input
                type="text"
                value={requestHymnNotes}
                onChange={(e) => setRequestHymnNotes(e.target.value)}
                placeholder="Optional reason (e.g. In thanksgiving for healing)"
                className="w-full px-3 py-2 text-xs rounded-xl bg-vogr-navy border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-vogr-gold"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-vogr-gold hover:bg-vogr-goldHover text-vogr-navyDark font-bold text-xs shadow"
              >
                Submit Hymn Request
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
};
