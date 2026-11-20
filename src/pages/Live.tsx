import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Radio, 
  WifiOff, 
  Volume2, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Share2, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export const Live: React.FC = () => {
  const { lowBandwidthMode, toggleLowBandwidth, addCareRequest, showToast } = useChurch();

  const [isAudioOnly, setIsAudioOnly] = useState<boolean>(lowBandwidthMode);
  const [prayerRequest, setPrayerRequest] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  const handleSendPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerRequest.trim()) return;

    addCareRequest({
      type: 'enquiry',
      fullName: senderName || 'Live Stream Believer',
      phone: 'Submitted via Live Stream',
      area: 'Online Broadcast',
      category: 'Live Service Prayer Request',
      notes: prayerRequest,
      isPrivate: isPrivate,
    });

    setRequestSent(true);
    setPrayerRequest('');
    setTimeout(() => setRequestSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Live Broadcast Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-vogr-crimson flex items-center justify-center font-bold border border-rose-200">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-vogr-crimson text-white animate-pulse">
                Broadcast Sanctuary
              </span>
              <span className="text-xs text-slate-500">Independence Layout, Enugu</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-vogr-navy mt-0.5">
              Live Fellowship & Spoken Word Service
            </h1>
          </div>
        </div>

        {/* Audio Only Mode Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAudioOnly(!isAudioOnly)}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm ${
              isAudioOnly
                ? 'bg-vogr-gold text-vogr-navyDark'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            {isAudioOnly ? <Volume2 size={15} /> : <WifiOff size={15} />}
            <span>{isAudioOnly ? 'Audio-Only Active (Low Data)' : 'Switch to Audio-Only Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Broadcast Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stream Player Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-vogr-navyDark rounded-3xl overflow-hidden shadow-2xl border-2 border-vogr-navy relative aspect-video flex items-center justify-center">
            {isAudioOnly ? (
              <div className="text-center p-8 space-y-4 text-white">
                <div className="w-20 h-20 rounded-full bg-vogr-navy border-2 border-vogr-gold text-vogr-gold flex items-center justify-center mx-auto shadow-xl">
                  <Volume2 size={36} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Audio Broadcast Streaming</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Optimized for Nigerian telecom networks (under 15MB/hour)
                  </p>
                </div>
                <audio
                  controls
                  autoPlay
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  className="mx-auto w-full max-w-md accent-vogr-gold"
                />
              </div>
            ) : (
              <div className="w-full h-full relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                  title="Live Service Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-base font-bold text-vogr-navy">
                Order of Service: Instrumental Praise & Tape Preaching
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Ministering: {CHURCH_INFO.pastor.name} • Live from Independence Layout
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-bold text-emerald-800">Broadcasting Online</span>
            </div>
          </div>
        </div>

        {/* Right: Live Prayer Request Box (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-church flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-vogr-navy">
              <MessageSquare size={18} className="text-vogr-crimson" />
              <h3 className="font-serif text-lg font-bold">Live Prayer Burden Box</h3>
            </div>
            <p className="text-xs text-slate-600">
              Submit your prayer request during the broadcast. The pastor and elders intercede for all burdens before the service concludes.
            </p>

            {requestSent ? (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-300 text-center space-y-2">
                <CheckCircle2 size={32} className="mx-auto text-emerald-700" />
                <h4 className="font-serif font-bold text-sm text-vogr-navy">Prayer Burden Received</h4>
                <p className="text-[11px] text-slate-600">
                  Your request is held before the Lord Jesus Christ under pastoral confidentiality.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendPrayer} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Name (or Sister/Brother in Christ)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Bro. Kenneth"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Prayer Need / Sick Bed / Family *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={prayerRequest}
                    onChange={(e) => setPrayerRequest(e.target.value)}
                    placeholder="Briefly state your prayer burden..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privatePrayer"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded text-vogr-crimson focus:ring-vogr-crimson w-3.5 h-3.5"
                  />
                  <label htmlFor="privatePrayer" className="text-[11px] text-slate-700 cursor-pointer">
                    Private (For Pastor & Elders only)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                >
                  <Send size={13} />
                  <span>Send Prayer Burden</span>
                </button>
              </form>
            )}
          </div>

          <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500 space-y-1">
            <p>• <strong>Next Service:</strong> Sunday 9:00 AM • Wed & Fri 4:00 PM</p>
            <p>• <strong>Tape Archive:</strong> Full recordings available in Sermon Library</p>
          </div>
        </div>

      </div>

    </div>
  );
};
