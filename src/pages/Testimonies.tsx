import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Testimony } from '../types';
import { 
  Award, 
  Sparkles, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Heart, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Filter, 
  PlusCircle 
} from 'lucide-react';

export const Testimonies: React.FC = () => {
  const { testimonies, addTestimony, showToast } = useChurch();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    location: 'Independence Layout, Enugu',
    category: 'Divine Healing' as Testimony['category'],
    scripture: 'Hebrews 13:8',
    content: '',
  });

  const categories = [
    'all',
    'Divine Healing',
    'Salvation & Baptism',
    'Answered Prayer',
    'Deliverance',
    'Spiritual Growth',
  ];

  const filteredTestimonies = testimonies.filter((t) => {
    return selectedCategory === 'all' || t.category === selectedCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    addTestimony({
      title: formData.title,
      author: formData.author || 'Believer in Christ',
      location: formData.location,
      category: formData.category,
      scripture: formData.scripture,
      content: formData.content,
    });

    setShowSubmitModal(false);
    setFormData({
      title: '',
      author: '',
      location: 'Independence Layout, Enugu',
      category: 'Divine Healing',
      scripture: 'Hebrews 13:8',
      content: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* VOGR Style Testimonies Banner */}
      <div className="vogr-hero-bg text-white rounded-3xl p-8 sm:p-14 shadow-church-lg border-2 border-vogr-gold/30 text-center space-y-5 relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-vogr-crimson px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-md">
          <Sparkles size={14} className="text-vogr-gold" />
          <span>VOGR & Message Field Testimonies</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
          Testimonies of Faith & Miracles
        </h1>

        <blockquote className="max-w-2xl mx-auto font-serif italic text-sm sm:text-base text-slate-200 border-l-2 border-vogr-gold pl-4 py-1 text-left sm:text-center sm:border-l-0">
          "And they overcame him by the blood of the Lamb, and by the word of their testimony..." — Revelation 12:11
        </blockquote>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          Real accounts of divine healing, apostolic baptism, answered prayers, and supernatural deliverance among the believers at Jehovah Good Shepherd Church in Enugu, Nigeria.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-6 py-3 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <PlusCircle size={16} />
            <span>Submit Your Testimony</span>
          </button>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-vogr-navy text-white shadow font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Testimonies' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredTestimonies.length} verified testimonies
        </span>
      </div>

      {/* Testimonies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTestimonies.map((testimony) => (
          <article
            key={testimony.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-church flex flex-col justify-between space-y-5 hover:border-vogr-gold transition-colors"
          >
            <div className="space-y-4">
              {/* Category & Date */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-vogr-crimson border border-rose-200">
                  {testimony.category}
                </span>
                <span className="text-slate-400 flex items-center space-x-1">
                  <Calendar size={13} />
                  <span>{testimony.date}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-vogr-navy leading-snug">
                {testimony.title}
              </h2>

              {/* Scripture Anchor */}
              <p className="text-xs font-semibold text-vogr-gold flex items-center space-x-1.5 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/60 w-fit">
                <BookOpen size={13} />
                <span>Scripture: {testimony.scripture}</span>
              </p>

              {/* Narrative Content */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                {testimony.content}
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-slate-900 font-bold">{testimony.author}</strong>
                <span className="text-slate-500 flex items-center space-x-1">
                  <MapPin size={12} className="text-vogr-crimson" />
                  <span>{testimony.location}</span>
                </span>
              </div>

              {testimony.verifiedByPastor && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck size={13} className="text-emerald-700" />
                  <span>Verified by Pastor</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Submit Testimony Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-vogr-navy">Submit Your Testimony</h3>
                <p className="text-xs text-slate-500">Give God the glory for what He has done</p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Testimony Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Healed of Severe Illness after Prayer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Bro. David Eze"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Area in Enugu *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  >
                    <option value="Divine Healing">Divine Healing</option>
                    <option value="Salvation & Baptism">Salvation & Baptism</option>
                    <option value="Answered Prayer">Answered Prayer</option>
                    <option value="Deliverance">Deliverance</option>
                    <option value="Spiritual Growth">Spiritual Growth</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Scripture Reference</label>
                  <input
                    type="text"
                    value={formData.scripture}
                    onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
                    placeholder="e.g. Mark 11:24"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Your Testimony Narrative *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Clearly describe how the Lord intervened, healed, delivered, or blessed you..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold rounded-xl shadow"
                >
                  Publish Testimony
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-3 border border-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

