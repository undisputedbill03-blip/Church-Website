import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { ENUGU_FELLOWSHIPS } from '../data/churchData';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Heart, 
  Filter 
} from 'lucide-react';

export const Fellowships: React.FC = () => {
  const { addCareRequest, showToast } = useChurch();

  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [prayerName, setPrayerName] = useState('');
  const [prayerArea, setPrayerArea] = useState('Independence Layout');
  const [prayerText, setPrayerText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const zones = ['all', 'Independence Layout', 'New Haven', 'Trans-Ekulu', 'Achara Layout', 'UNEC / Campuses'];

  const filteredGroups = ENUGU_FELLOWSHIPS.filter((g) => {
    return selectedZone === 'all' || g.zone === selectedZone;
  });

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;

    addCareRequest({
      type: 'enquiry',
      fullName: prayerName || 'Anonymous Believer',
      phone: 'Submitted via Prayer Wall',
      area: prayerArea,
      category: isPrivate ? 'Private Prayer Burden' : 'Community Prayer Request',
      notes: prayerText,
      isPrivate: isPrivate,
    });

    setSubmitted(true);
    setPrayerText('');
    showToast("Your prayer request has been delivered to the pastoral prayer team.");
    setTimeout(() => setSubmitted(false), 5000);
  };

  const samplePrayerWall = [
    {
      name: "Bro. C. E.",
      area: "Independence Layout",
      date: "Nov 18, 2024",
      need: "Requesting intercession for complete recovery from malaria fever and renewed spiritual strength.",
      answered: false
    },
    {
      name: "Sis. Grace N.",
      area: "New Haven",
      date: "Nov 16, 2024",
      need: "Thanksgiving to God for safety during travels to and from Nsukka, and praying for family salvation.",
      answered: true
    },
    {
      name: "Campus Believer",
      area: "UNEC Quarters",
      date: "Nov 14, 2024",
      need: "Praying for grace to stand true to the Message and holiness during university examinations.",
      answered: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
          Neighborhood & Tape Cells
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vogr-navy">
          Home Fellowships & Prayer Circles
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          Gather with believers in your neighborhood across Enugu for midweek tape study, prayer, and mutual encouragement.
        </p>
      </div>

      {/* Zone Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Filter Zone:</span>
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setSelectedZone(zone)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedZone === zone
                ? 'bg-vogr-navy text-vogr-gold shadow font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {zone === 'all' ? 'All Enugu Zones' : zone}
          </button>
        ))}
      </div>

      {/* Fellowships Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-church flex flex-col justify-between space-y-4 hover:border-vogr-navy transition-colors"
          >
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-vogr-navy text-[10px] uppercase font-bold tracking-wider border border-slate-200">
                {group.zone}
              </span>

              <h3 className="font-serif text-xl font-bold text-vogr-navy leading-snug">
                {group.name}
              </h3>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center space-x-1.5">
                  <Calendar size={13} className="text-vogr-crimson shrink-0" />
                  <span>{group.meetingDay} • {group.time}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <MapPin size={13} className="text-vogr-crimson shrink-0" />
                  <span>{group.address}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Users size={13} className="text-vogr-crimson shrink-0" />
                  <span>Host: {group.leader}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${group.phone}`}
                className="text-xs font-semibold text-vogr-navy flex items-center space-x-1 hover:underline"
              >
                <Phone size={13} />
                <span>{group.phone}</span>
              </a>

              <a
                href={`https://wa.me/${group.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(group.leader)}%2C%20I%20would%20like%20to%20attend%20the%20${encodeURIComponent(group.name)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow"
              >
                WhatsApp Host
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Online Prayer Request & Prayer Wall */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-church space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Submit Prayer Request */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
                Intercession
              </span>
              <h3 className="font-serif text-2xl font-bold text-vogr-navy mt-1">Submit Prayer Burden</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Share your request with the church prayer wall or check the private box for pastor-only intercession.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 bg-white rounded-xl border border-slate-300 text-center space-y-1">
                <CheckCircle2 size={32} className="mx-auto text-emerald-700" />
                <h4 className="font-serif font-bold text-sm text-vogr-navy">Prayer Burden Sent</h4>
                <p className="text-[11px] text-slate-600">
                  We stand with you in faith according to Mark 9:23 ("Only Believe").
                </p>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Name (Optional / Christian Initial)
                  </label>
                  <input
                    type="text"
                    value={prayerName}
                    onChange={(e) => setPrayerName(e.target.value)}
                    placeholder="e.g. Sister Mary or Brother in Christ"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Area in Enugu
                  </label>
                  <select
                    value={prayerArea}
                    onChange={(e) => setPrayerArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  >
                    <option value="Independence Layout">Independence Layout</option>
                    <option value="New Haven">New Haven</option>
                    <option value="Trans-Ekulu">Trans-Ekulu</option>
                    <option value="Achara Layout">Achara Layout</option>
                    <option value="UNEC / ESUT">UNEC / Campus</option>
                    <option value="Other Area">Other Enugu Area / Diaspora</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Prayer Burden *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                    placeholder="Describe your health, family, spiritual, or financial prayer burden..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPrivateWall"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded text-vogr-crimson focus:ring-vogr-crimson w-3.5 h-3.5"
                  />
                  <label htmlFor="isPrivateWall" className="text-[11px] text-slate-700 cursor-pointer">
                    Private mode (Confidential: for Pastor & Elders only)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                >
                  <Send size={13} />
                  <span>Send to Prayer Wall</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Public Community Prayer Wall */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-vogr-navy">Public Prayer Wall</h3>
                <p className="text-xs text-slate-600">
                  Stand in agreement with fellow brethren in prayer.
                </p>
              </div>
              <span className="text-xs text-vogr-crimson font-bold">
                Matthew 18:19
              </span>
            </div>

            <div className="space-y-3">
              {samplePrayerWall.map((pw, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-vogr-navy">{pw.name} • {pw.area}</span>
                    <span className="text-slate-400 text-[11px]">{pw.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic font-light">
                    "{pw.need}"
                  </p>
                  {pw.answered && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={11} />
                      <span>Answered Prayer Testimony</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
