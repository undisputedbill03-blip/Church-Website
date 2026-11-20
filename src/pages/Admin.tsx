import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  ShieldCheck, 
  Inbox, 
  Droplet, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Clock, 
  Award, 
  PlusCircle, 
  FileText, 
  User, 
  Search, 
  Filter, 
  Lock, 
  Eye, 
  Check, 
  Download 
} from 'lucide-react';
import { CareFormType, RequestStatus, Sermon } from '../types';

export const Admin: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    careRequests, 
    updateCareStatus, 
    updateCareNotes, 
    issueBaptismCertificate,
    sermons,
    addSermon,
    showToast 
  } = useChurch();

  const [activeTab, setActiveTab] = useState<'care_inbox' | 'baptism_manager' | 'sermon_cms' | 'members'>('care_inbox');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');

  const [certDialogCandidateId, setCertDialogCandidateId] = useState<string | null>(null);
  const [certMinister, setCertMinister] = useState<string>(CHURCH_INFO.pastor.name);
  const [certDate, setCertDate] = useState<string>('2024-12-01');

  const [newSermon, setNewSermon] = useState<Omit<Sermon, 'id'>>({
    title: '',
    scripture: '',
    minister: CHURCH_INFO.pastor.name,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    duration: '1 hr 15 min',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    category: 'sunday',
    isMembersOnly: false,
    summary: '',
    series: 'The Shepherd Ministry',
  });

  const filteredCare = careRequests.filter((r) => {
    return filterType === 'all' || r.type === filterType;
  });

  const handleSaveNotes = (id: string) => {
    updateCareNotes(id, editingNotes);
    setSelectedRequestId(null);
  };

  const handleIssueCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certDialogCandidateId) return;
    issueBaptismCertificate(certDialogCandidateId, certMinister, certDate);
    setCertDialogCandidateId(null);
  };

  const handleSermonUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSermon.title.trim()) return;

    addSermon({
      ...newSermon,
      id: `sermon-${Date.now()}`,
    });

    setNewSermon({
      title: '',
      scripture: '',
      minister: CHURCH_INFO.pastor.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '1 hr 15 min',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      videoUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
      category: 'sunday',
      isMembersOnly: false,
      summary: '',
      series: 'The Shepherd Ministry',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-vogr-navy text-white p-6 sm:p-8 rounded-3xl border-2 border-vogr-gold/40 shadow-church-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck size={20} className="text-vogr-gold" />
            <span className="text-xs uppercase font-bold tracking-widest text-vogr-gold">
              Staff CMS & Care Portal
            </span>
            <span className="text-xs text-slate-300">• Role: <strong className="text-white capitalize">{userRole.replace('_', ' ')}</strong></span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
            Church Administration & Care Inbox
          </h1>
          <p className="text-xs text-slate-300">
            Confidential handling of visits, consultations, baptism records, and sermon uploads.
          </p>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-300">Active Role:</span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-vogr-navyDark border border-slate-700 text-xs text-vogr-gold font-bold focus:outline-none"
          >
            <option value="pastor">Pastor ({CHURCH_INFO.pastor.name})</option>
            <option value="admin">Church Administrator</option>
            <option value="care_team">Care & Follow-up Team</option>
            <option value="media_team">Media & Broadcast Lead</option>
            <option value="music_lead">Music Lead (Instrumental)</option>
            <option value="youth_leader">Youth Alive Leader</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('care_inbox')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeTab === 'care_inbox'
              ? 'bg-vogr-navy text-vogr-gold shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Inbox size={15} />
          <span>Care & Pastoral Inbox ({careRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('baptism_manager')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeTab === 'baptism_manager'
              ? 'bg-vogr-navy text-vogr-gold shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Droplet size={15} />
          <span>Baptism Manager & Certificates</span>
        </button>

        <button
          onClick={() => setActiveTab('sermon_cms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeTab === 'sermon_cms'
              ? 'bg-vogr-navy text-vogr-gold shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen size={15} />
          <span>Sermon & Tape CMS</span>
        </button>
      </div>

      {/* TAB 1: UNIFIED CARE INBOX */}
      {activeTab === 'care_inbox' && (
        <div className="space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              {['all', 'consultation', 'visit', 'baptism', 'suggestion', 'enquiry'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterType(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                    filterType === cat
                      ? 'bg-vogr-navy text-vogr-gold shadow font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Inflow Streams' : cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-vogr-crimson font-bold">
              Strict Pastoral Confidentiality Active
            </span>
          </div>

          <div className="space-y-3">
            {filteredCare.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-vogr-gold transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-vogr-navy">
                      {req.id}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      {req.type}
                    </span>
                    {req.isPrivate && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-vogr-crimson border border-rose-200 flex items-center space-x-1">
                        <Lock size={9} />
                        <span>Confidential</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400">Received: {req.createdAt}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <strong className="block text-slate-900 font-bold">{req.fullName}</strong>
                    <span className="text-slate-500">{req.phone}</span>
                    {req.email && <span className="block text-slate-500">{req.email}</span>}
                  </div>
                  <div>
                    <span className="text-slate-500 block">Area in Enugu:</span>
                    <span className="font-semibold text-slate-800">{req.area}</span>
                    {req.preferredDate && (
                      <span className="block text-slate-500 mt-0.5">Pref. Date: {req.preferredDate}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-500 block">Current Status:</span>
                    <select
                      value={req.status}
                      onChange={(e) => updateCareStatus(req.id, e.target.value as RequestStatus)}
                      className="mt-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold uppercase text-vogr-navy"
                    >
                      <option value="requested">Requested</option>
                      <option value="approved">Approved</option>
                      <option value="in_preparation">In Preparation</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="done">Done / Completed</option>
                      <option value="reviewed">Reviewed</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Submission Notes:</span>
                  <p className="text-slate-800 leading-relaxed italic">
                    "{req.notes}"
                  </p>
                </div>

                {req.internalNotes && (
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <strong className="block text-[10px] uppercase font-bold">Internal Pastoral Notes:</strong>
                    <span>{req.internalNotes}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      setSelectedRequestId(req.id);
                      setEditingNotes(req.internalNotes || '');
                    }}
                    className="text-xs font-bold text-vogr-navy hover:underline"
                  >
                    + Add / Update Private Care Notes
                  </button>

                  {req.type === 'baptism' && req.status !== 'done' && (
                    <button
                      onClick={() => setCertDialogCandidateId(req.id)}
                      className="px-3.5 py-1 rounded-full bg-vogr-crimson text-white text-xs font-bold shadow hover:bg-vogr-crimsonHover"
                    >
                      Issue Baptism Certificate
                    </button>
                  )}
                </div>

                {selectedRequestId === req.id && (
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="Enter confidential notes (e.g. Deacon assigned, visit confirmed)..."
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300"
                    />
                    <button
                      onClick={() => handleSaveNotes(req.id)}
                      className="px-4 py-1.5 rounded-xl bg-vogr-navy text-vogr-gold text-xs font-bold shrink-0"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: BAPTISM MANAGER & REGISTER */}
      {activeTab === 'baptism_manager' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Baptismal Register & Certificate Issuer</h3>
              <p className="text-xs text-slate-500">
                Official records of candidates baptized into the Name of the Lord Jesus Christ (Acts 2:38).
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full bg-vogr-navy text-vogr-gold text-xs font-bold flex items-center space-x-1.5 shadow"
            >
              <Download size={14} />
              <span>Print Official Register</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-church">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase">
                  <tr>
                    <th className="p-3">Candidate Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Area in Enugu</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Classes</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {careRequests.filter((r) => r.type === 'baptism').map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <strong className="block text-slate-900 font-bold">{c.fullName}</strong>
                        <span className="text-[11px] text-slate-500">Age: {c.age || 'Adult'}</span>
                      </td>
                      <td className="p-3">{c.phone}</td>
                      <td className="p-3">{c.area}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200">
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3 text-emerald-700 font-semibold">Attended Class ✓</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setCertDialogCandidateId(c.id)}
                          className="px-3 py-1 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow"
                        >
                          {c.certificateIssued ? 'Re-Issue Certificate' : 'Issue Certificate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificate Issuance Dialog */}
          {certDialogCandidateId && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-vogr-navy">Issue Official Baptism Certificate</h3>
                <p className="text-xs text-slate-600">
                  This marks the candidate as baptized and generates their printable/digital certificate with the church seal.
                </p>

                <form onSubmit={handleIssueCertSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Officiating Resident Pastor *</label>
                    <input
                      type="text"
                      required
                      value={certMinister}
                      onChange={(e) => setCertMinister(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Date of Baptism *</label>
                    <input
                      type="date"
                      required
                      value={certDate}
                      onChange={(e) => setCertDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-vogr-navy text-vogr-gold font-bold text-xs shadow"
                    >
                      Confirm & Issue Certificate
                    </button>
                    <button
                      type="button"
                      onClick={() => setCertDialogCandidateId(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: SERMON & TAPE CMS */}
      {activeTab === 'sermon_cms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-church space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
              Media & Tape Uploads
            </span>
            <h3 className="font-serif text-2xl font-bold text-vogr-navy">Publish New Sermon Tape</h3>
            <p className="text-xs text-slate-500">
              Upload tape recordings, scriptures, duration, and manage members-only gating.
            </p>
          </div>

          <form onSubmit={handleSermonUpload} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Sermon Title *</label>
                <input
                  type="text"
                  required
                  value={newSermon.title}
                  onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })}
                  placeholder="e.g. The Voice of the Sign"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Scripture Reference *</label>
                <input
                  type="text"
                  required
                  value={newSermon.scripture}
                  onChange={(e) => setNewSermon({ ...newSermon, scripture: e.target.value })}
                  placeholder="e.g. Exodus 4:1-8; John 14:12"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Preacher / Tape Reference</label>
                <input
                  type="text"
                  value={newSermon.minister}
                  onChange={(e) => setNewSermon({ ...newSermon, minister: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newSermon.category}
                  onChange={(e) => setNewSermon({ ...newSermon, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                >
                  <option value="sunday">Sunday Service</option>
                  <option value="weekday">Weekday Exposition</option>
                  <option value="tape">Tape Service</option>
                  <option value="daily">Daily Word</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Duration</label>
                <input
                  type="text"
                  value={newSermon.duration}
                  onChange={(e) => setNewSermon({ ...newSermon, duration: e.target.value })}
                  placeholder="1 hr 20 min"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Audio MP3 URL *</label>
                <input
                  type="url"
                  required
                  value={newSermon.audioUrl}
                  onChange={(e) => setNewSermon({ ...newSermon, audioUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Video Stream Link (Optional)</label>
                <input
                  type="url"
                  value={newSermon.videoUrl}
                  onChange={(e) => setNewSermon({ ...newSermon, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Sermon Summary & Notes</label>
              <textarea
                rows={3}
                value={newSermon.summary}
                onChange={(e) => setNewSermon({ ...newSermon, summary: e.target.value })}
                placeholder="Key highlights and scripture focus..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isMembersOnly"
                checked={newSermon.isMembersOnly}
                onChange={(e) => setNewSermon({ ...newSermon, isMembersOnly: e.target.checked })}
                className="rounded text-vogr-navy focus:ring-vogr-navy w-4 h-4"
              />
              <label htmlFor="isMembersOnly" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Members-Only Highlight (Gated for registered Virtual Members)
              </label>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs shadow flex items-center space-x-2"
            >
              <PlusCircle size={15} />
              <span>Publish Sermon to Library</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
