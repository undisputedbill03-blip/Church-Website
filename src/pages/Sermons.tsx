import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Sermon } from '../types';
import { 
  Search, 
  Filter, 
  Play, 
  Download, 
  Share2, 
  Lock, 
  Calendar, 
  User, 
  BookOpen, 
  PlusCircle, 
  Clock, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

export const Sermons: React.FC = () => {
  const { 
    sermons, 
    playTrack, 
    isVirtualMemberLoggedIn, 
    setActivePage, 
    userRole, 
    showToast,
    lowBandwidthMode 
  } = useChurch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  const filteredSermons = sermons.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scripture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.minister.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSeries = selectedSeries === 'all' || s.series === selectedSeries;

    return matchesSearch && matchesCategory && matchesSeries;
  });

  const seriesList = Array.from(new Set(sermons.map((s) => s.series).filter(Boolean)));

  const handleShare = (sermon: Sermon) => {
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: `Listen to "${sermon.title}" preached at Jehovah Good Shepherd Church Enugu`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${sermon.title} - ${sermon.scripture}`);
      showToast("Sermon details copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-vogr-crimson">
            Sermon & Tape Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vogr-navy mt-1">
            The Living Voice of the Word
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Search and listen to Sunday tape messages, weekday expositions, and congregational tape fellowship.
          </p>
        </div>

        {/* Staff Upload Button */}
        {(userRole === 'admin' || userRole === 'pastor' || userRole === 'media_team') && (
          <button
            onClick={() => setActivePage('admin')}
            className="px-4 py-2.5 rounded-full bg-vogr-navy text-vogr-gold border border-vogr-gold text-xs font-bold flex items-center space-x-1.5 shadow"
          >
            <PlusCircle size={15} />
            <span>Upload New Sermon Tape</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, scripture, or preacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-vogr-navy"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['all', 'sunday', 'weekday', 'tape', 'daily'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-vogr-navy text-vogr-gold shadow font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Tapes' : cat}
            </button>
          ))}
        </div>

        {/* Series Dropdown */}
        {seriesList.length > 0 && (
          <div className="w-full md:w-auto">
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
            >
              <option value="all">All Series</option>
              {seriesList.map((s, idx) => (
                <option key={idx} value={s as string}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Sermons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSermons.map((sermon) => {
          const isGated = sermon.isMembersOnly && !isVirtualMemberLoggedIn && userRole === 'visitor';

          return (
            <div
              key={sermon.id}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-church flex flex-col justify-between transition-all ${
                isGated ? 'opacity-90' : 'hover:shadow-church-lg hover:border-vogr-gold'
              }`}
            >
              <div>
                {!lowBandwidthMode && sermon.thumbnail && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-vogr-navy/90 text-vogr-gold text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                      {sermon.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-vogr-navy/90 text-white text-[11px] px-2 py-0.5 rounded font-mono">
                      {sermon.duration}
                    </span>
                    {sermon.isMembersOnly && (
                      <span className="absolute top-3 right-3 bg-vogr-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                        <Lock size={10} />
                        <span>Virtual Members Only</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Calendar size={13} />
                    <span>{sermon.date}</span>
                    <span>•</span>
                    <BookOpen size={13} />
                    <span className="font-semibold text-slate-800">{sermon.scripture}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-vogr-navy leading-snug">
                    {sermon.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-2">
                    {sermon.summary}
                  </p>

                  <div className="pt-2 text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                    <User size={13} className="text-vogr-crimson" />
                    <span>{sermon.minister}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 pt-0 border-t border-slate-100">
                {isGated ? (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2 mt-2">
                    <div className="flex items-center justify-center space-x-1 text-xs text-vogr-crimson font-bold">
                      <Lock size={13} />
                      <span>Member Exhortation Teaser</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Sign in or register as a Virtual Member to unlock full audio and PDF study notes.
                    </p>
                    <button
                      onClick={() => setActivePage('virtual-member')}
                      className="w-full py-1.5 rounded-lg bg-vogr-navy text-vogr-gold text-xs font-bold shadow"
                    >
                      Sign In / Register Free
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-3">
                    <button
                      onClick={() => playTrack({
                        id: sermon.id,
                        title: sermon.title,
                        speakerOrAuthor: sermon.minister,
                        audioUrl: sermon.audioUrl,
                        duration: sermon.duration,
                        type: 'sermon'
                      })}
                      className="px-4 py-2 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold text-xs font-bold flex items-center space-x-2 shadow transition-transform hover:scale-105"
                    >
                      <Play size={13} className="fill-vogr-gold" />
                      <span>Play Tape</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleShare(sermon)}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
                        title="Share sermon details"
                      >
                        <Share2 size={15} />
                      </button>
                      <a
                        href={sermon.audioUrl}
                        download
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
                        title="Download audio (Low bandwidth friendly)"
                      >
                        <Download size={15} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
