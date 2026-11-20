import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { 
  UserCheck, 
  Lock, 
  BookOpen, 
  Droplet, 
  CalendarCheck, 
  Clock, 
  Download, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const VirtualMember: React.FC = () => {
  const { 
    isVirtualMemberLoggedIn, 
    setIsVirtualMemberLoggedIn, 
    careRequests, 
    sermons, 
    playTrack,
    setActivePage,
    showToast 
  } = useChurch();

  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'baptism' | 'saved'>('overview');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
    fullName: '',
    phone: '',
    city: 'Enugu',
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVirtualMemberLoggedIn(true);
    showToast(authMode === 'login' ? "Welcome back, Believer!" : "Virtual Member registration submitted! Welcome to the fellowship.");
  };

  const userBaptismRequest = careRequests.find((r) => r.type === 'baptism');
  const memberRequests = careRequests.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* If Not Logged In: Sacred Login & Registration */}
      {!isVirtualMemberLoggedIn ? (
        <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-church-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-vogr-navy border-2 border-vogr-gold text-vogr-gold flex items-center justify-center mx-auto shadow-md">
              <Sparkles size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-vogr-navy">
              Virtual Member Fellowship
            </h2>
            <p className="text-xs text-slate-600">
              Access members-only tape highlights, track your care requests, and access your baptism records.
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold border border-slate-200">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'login' 
                  ? 'bg-vogr-navy text-vogr-gold shadow font-bold' 
                  : 'text-slate-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'register' 
                  ? 'bg-vogr-navy text-vogr-gold shadow font-bold' 
                  : 'text-slate-700'
              }`}
            >
              Register as Virtual Member
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={credentials.fullName}
                    onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                    placeholder="e.g. Bro. David Eze"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={credentials.phone}
                    onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                    placeholder="0803 123 4567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-semibold mb-1 text-slate-700">Email or Member Phone *</label>
              <input
                type="text"
                required
                value={credentials.identifier}
                onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
                placeholder="name@email.com or phone"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">Password / Passcode *</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow-md transition-all pt-3"
            >
              {authMode === 'login' ? 'Sign In to Member Portal' : 'Complete Virtual Registration'}
            </button>
          </form>

          <div className="text-center">
            <span className="text-[11px] text-slate-500">
              New virtual members undergo quiet pastoral verification.
            </span>
          </div>
        </div>
      ) : (
        /* Member Dashboard View */
        <div className="space-y-8">
          
          {/* Member Banner */}
          <div className="bg-vogr-navy text-white p-6 sm:p-8 rounded-3xl border-2 border-vogr-gold/40 shadow-church-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold tracking-widest text-vogr-gold">Virtual Member</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs text-slate-300">Active Believer Fellowship</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Welcome, {credentials.fullName || 'Bro. Obinna Kingsley Chukwu'}
              </h2>
              <p className="text-xs text-slate-300">
                Connected with {CHURCH_INFO.name} • Resident Pastor: {CHURCH_INFO.pastor.name}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsVirtualMemberLoggedIn(false)}
                className="px-4 py-2 rounded-xl bg-vogr-navyDark hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2">
            {[
              { id: 'overview', label: 'My Dashboard' },
              { id: 'requests', label: 'My Care Requests & Tracking' },
              { id: 'baptism', label: 'My Baptism & Certificate' },
              { id: 'saved', label: 'Saved Sermons' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-vogr-navy text-vogr-gold shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: My Care Requests */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-church space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-vogr-navy flex items-center space-x-2">
                    <CalendarCheck size={18} className="text-vogr-crimson" />
                    <span>My Care Requests</span>
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                    {memberRequests.length} Total
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Track visits, consultations, baptisms, and enquiries submitted to the pastoral office.
                </p>
                <div className="space-y-2 pt-2">
                  {memberRequests.slice(0, 2).map((r) => (
                    <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-vogr-crimson">{r.type}</span>
                        <p className="text-xs font-semibold text-slate-900">{r.fullName}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 uppercase border border-emerald-200">
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="w-full py-2 text-xs font-bold text-vogr-navy hover:underline text-center"
                >
                  View All Requests →
                </button>
              </div>

              {/* Card 2: Baptism Status & Certificate */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-church space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-vogr-navy flex items-center space-x-2">
                    <Droplet size={18} className="text-sky-700" />
                    <span>Baptism Registry</span>
                  </h3>
                  <span className="text-xs bg-sky-50 text-sky-800 font-bold px-2 py-0.5 rounded-full border border-sky-200">
                    Acts 2:38
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Status: <strong className="text-vogr-navy font-bold">Approved for Baptism</strong>
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p><strong>Candidate:</strong> Obinna Kingsley Chukwu</p>
                  <p><strong>Service Date:</strong> Sunday, Dec 1, 2024</p>
                  <p><strong>Location:</strong> JGS Sanctuary Pool, Enugu</p>
                </div>
                <button
                  onClick={() => setActiveTab('baptism')}
                  className="w-full py-2.5 rounded-xl bg-vogr-navy text-vogr-gold font-bold text-xs shadow hover:bg-vogr-navyLight"
                >
                  View Official Baptism Certificate
                </button>
              </div>

              {/* Card 3: Member Exhortations */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-church space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-vogr-navy flex items-center space-x-2">
                    <BookOpen size={18} className="text-vogr-gold" />
                    <span>Member Exhortations</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Unlocked
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Midweek prayer summaries and special tape listening notes.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900">Walking in Divine Healing</p>
                    <p className="text-[11px] text-slate-500">Pastor Oke Hyacinth Ayogu</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePage('sermons')}
                  className="w-full py-2 text-xs font-bold text-vogr-navy hover:underline text-center"
                >
                  Browse Sermon Library →
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: MY CARE REQUESTS */}
          {activeTab === 'requests' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-church space-y-4">
              <h3 className="font-serif text-xl font-bold text-vogr-navy">My Submitted Pastoral Requests</h3>
              <p className="text-xs text-slate-600">
                All submissions are encrypted and reviewed strictly by authorized pastoral staff.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 uppercase font-semibold text-slate-700">
                    <tr>
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Request Type</th>
                      <th className="p-3">Date Submitted</th>
                      <th className="p-3">Area / Details</th>
                      <th className="p-3">Current Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {memberRequests.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-vogr-navy">{r.id}</td>
                        <td className="p-3 font-semibold capitalize">{r.type}</td>
                        <td className="p-3 text-slate-500">{r.createdAt}</td>
                        <td className="p-3 max-w-xs truncate text-slate-700">{r.notes || r.area}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            r.status === 'done'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : r.status === 'approved'
                              ? 'bg-sky-50 text-sky-800 border border-sky-200'
                              : r.status === 'scheduled'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {r.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BAPTISM & PRINTABLE CERTIFICATE */}
          {activeTab === 'baptism' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-church space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
                      Official Church Record
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-vogr-navy">Christian Water Baptism Record</h3>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-full bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold text-xs flex items-center space-x-2 shadow"
                  >
                    <Download size={14} />
                    <span>Print / Save Certificate PDF</span>
                  </button>
                </div>

                {/* Printable Certificate Box (Classical Gold Altar Border) */}
                <div id="printable-certificate" className="bg-[#FFFDF9] text-slate-900 p-8 sm:p-14 rounded-3xl border-8 border-double border-vogr-gold shadow-2xl max-w-3xl mx-auto text-center space-y-6 relative overflow-hidden">
                  
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest font-extrabold text-vogr-navy">
                      Jehovah Good Shepherd Church
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Independence Layout, Enugu (Beside IMT Campus 2), Nigeria
                    </p>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-vogr-navy tracking-wide border-b-2 border-vogr-gold pb-4 inline-block">
                    Certificate of Christian Baptism
                  </h1>

                  <p className="text-sm italic font-serif text-slate-700">
                    "Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost." — Acts 2:38
                  </p>

                  <div className="py-4 space-y-2">
                    <p className="text-xs uppercase font-semibold text-slate-500">This is to solemnly certify that</p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-crimson border-b border-slate-300 pb-2 max-w-md mx-auto">
                      Obinna Kingsley Chukwu
                    </h2>
                    <p className="text-xs text-slate-700 pt-2 font-medium">
                      was baptized by single immersion into the Name of the Lord Jesus Christ
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-vogr-gold/40 text-xs">
                    <div>
                      <p className="font-serif font-bold text-sm text-vogr-navy">{CHURCH_INFO.pastor.name}</p>
                      <p className="text-[11px] text-slate-500">Officiating Resident Pastor</p>
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm text-vogr-navy">December 1, 2024</p>
                      <p className="text-[11px] text-slate-500">Date of Baptism • Enugu, Nigeria</p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-center space-x-2 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    <Award size={14} className="text-vogr-gold" />
                    <span>Church Seal Registered • Record Ref: JGS-BAP-2024-089</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: SAVED SERMONS */}
          {activeTab === 'saved' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-church space-y-4">
              <h3 className="font-serif text-xl font-bold text-vogr-navy">Saved Messages & Continue Listening</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sermons.slice(0, 2).map((s) => (
                  <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-vogr-navy">{s.title}</h4>
                      <p className="text-xs text-slate-500">{s.scripture} • {s.duration}</p>
                    </div>
                    <button
                      onClick={() => playTrack({
                        id: s.id,
                        title: s.title,
                        speakerOrAuthor: s.minister,
                        audioUrl: s.audioUrl,
                        duration: s.duration,
                        type: 'sermon'
                      })}
                      className="px-3.5 py-1.5 rounded-full bg-vogr-navy text-vogr-gold text-xs font-bold"
                    >
                      Listen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
