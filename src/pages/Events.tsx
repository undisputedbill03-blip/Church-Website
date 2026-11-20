import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { UPCOMING_EVENTS, CHURCH_INFO } from '../data/churchData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  CalendarPlus, 
  Filter, 
  Droplet, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export const Events: React.FC = () => {
  const { openModal, showToast } = useChurch();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [reminderPhone, setReminderPhone] = useState<string>('');
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const filteredEvents = UPCOMING_EVENTS.filter((e) => {
    return selectedType === 'all' || e.type === selectedType;
  });

  const handleSetReminder = (e: React.FormEvent, eventTitle: string) => {
    e.preventDefault();
    if (!reminderPhone) return;
    showToast(`WhatsApp reminder scheduled for "${eventTitle}" to ${reminderPhone}`);
    setActiveEventId(null);
    setReminderPhone('');
  };

  const handleAddToCalendar = (title: string, date: string, location: string) => {
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent('Jehovah Good Shepherd Church Service/Event')}&location=${encodeURIComponent(location)}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
            Gatherings & Calendars
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vogr-navy mt-1">
            Church Gatherings & Retreats
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Water baptism services, tape fellowships, annual youth camps, and special meetings in Enugu.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'service', 'baptism', 'youth'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedType(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                selectedType === cat
                  ? 'bg-vogr-navy text-vogr-gold shadow font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Gatherings' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Banner: Water Baptismal Service */}
      <div className="vogr-hero-bg text-white rounded-3xl p-6 sm:p-10 border-2 border-vogr-gold shadow-church-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-vogr-crimson text-white text-xs font-bold uppercase tracking-wider">
            <Droplet size={14} className="text-vogr-gold" />
            <span>Featured Ordinance Gathering</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Solemn Water Baptismal Service (Acts 2:38)
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
            Sunday, December 1, 2024 • 1:00 PM (Immediately after Sunday service). Candidates are immersed in the Name of the Lord Jesus Christ.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openModal('baptism')}
              className="px-5 py-2.5 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow"
            >
              Request Baptism Registration
            </button>
            <button
              onClick={() => handleAddToCalendar("Solemn Water Baptismal Service", "2024-12-01", CHURCH_INFO.address)}
              className="px-5 py-2.5 rounded-full bg-white text-vogr-navy hover:bg-slate-100 text-xs font-bold shadow flex items-center space-x-1.5"
            >
              <CalendarPlus size={14} />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-64 bg-vogr-navyDark/90 p-4 rounded-2xl border border-vogr-gold/30 text-center space-y-2 shrink-0">
          <span className="text-[10px] uppercase font-bold text-vogr-gold tracking-wider">Location</span>
          <p className="font-serif text-sm font-bold text-white">JGS Sanctuary Pool</p>
          <p className="text-xs text-slate-300">Independence Layout, Beside IMT Campus 2</p>
          <p className="text-[11px] text-vogr-gold pt-1 border-t border-slate-700">
            What to bring: Clean towel & modest dark garments
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-church flex flex-col justify-between hover:shadow-church-lg transition-shadow"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={evt.bannerImage}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-vogr-navy/90 text-vogr-gold text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                  {evt.type}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-vogr-crimson">
                  <Calendar size={14} />
                  <span>{evt.date}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-vogr-navy leading-snug">
                  {evt.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-600">
                  <p className="flex items-center space-x-1.5">
                    <Clock size={13} className="text-vogr-crimson shrink-0" />
                    <span>{evt.time}</span>
                  </p>
                  <p className="flex items-center space-x-1.5">
                    <MapPin size={13} className="text-vogr-crimson shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-light pt-2 border-t border-slate-100">
                  {evt.description}
                </p>

                {evt.whatToBring && (
                  <p className="text-[11px] text-vogr-navy font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    What to bring: {evt.whatToBring}
                  </p>
                )}
              </div>
            </div>

            {/* Event Action & Reminder */}
            <div className="p-6 pt-0 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={() => handleAddToCalendar(evt.title, evt.date, evt.location)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1"
                >
                  <CalendarPlus size={13} />
                  <span>Calendar</span>
                </button>

                <button
                  onClick={() => setActiveEventId(activeEventId === evt.id ? null : evt.id)}
                  className="px-3 py-1.5 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold flex items-center space-x-1"
                >
                  <Bell size={13} />
                  <span>WhatsApp Alert</span>
                </button>
              </div>

              {activeEventId === evt.id && (
                <form onSubmit={(e) => handleSetReminder(e, evt.title)} className="pt-2 flex gap-1">
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp No (e.g. 0803...)"
                    value={reminderPhone}
                    onChange={(e) => setReminderPhone(e.target.value)}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-lg text-xs font-semibold shrink-0"
                  >
                    Set
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
