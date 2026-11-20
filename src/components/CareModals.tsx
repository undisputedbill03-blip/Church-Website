import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  X, 
  CalendarCheck, 
  Home as HomeIcon, 
  Droplet, 
  Inbox, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';

export const CareModals: React.FC = () => {
  const { activeModal, closeModal, addCareRequest, showToast } = useChurch();

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    area: 'Independence Layout, Enugu',
    preferredDate: '',
    category: 'General',
    notes: '',
    isPrivate: true,
    age: 25,
    isConvert: true,
    parentConsentName: '',
    consultationMode: 'in_person' as 'in_person' | 'phone' | 'video',
    counsellor: CHURCH_INFO.pastor.name,
    isAnonymous: false,
  });

  if (!activeModal) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeModal === 'consultation') {
      const ticketId = addCareRequest({
        type: 'consultation',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        area: formData.area,
        preferredDate: formData.preferredDate,
        consultationMode: formData.consultationMode,
        counsellor: formData.counsellor,
        notes: formData.notes,
        isPrivate: true,
      });
      setSubmittedTicket(ticketId);
    } else if (activeModal === 'visit') {
      const ticketId = addCareRequest({
        type: 'visit',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        area: formData.area,
        preferredDate: formData.preferredDate,
        category: formData.category,
        notes: formData.notes,
        isPrivate: formData.isPrivate,
      });
      setSubmittedTicket(ticketId);
    } else if (activeModal === 'baptism') {
      const ticketId = addCareRequest({
        type: 'baptism',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        area: formData.area,
        preferredDate: formData.preferredDate,
        age: Number(formData.age),
        isConvert: formData.isConvert,
        parentConsentName: Number(formData.age) < 18 ? formData.parentConsentName : undefined,
        notes: formData.notes,
      });
      setSubmittedTicket(ticketId);
    } else if (activeModal === 'suggestion') {
      const ticketId = addCareRequest({
        type: 'suggestion',
        fullName: formData.isAnonymous ? 'Anonymous Church Member' : (formData.fullName || 'Anonymous'),
        phone: formData.isAnonymous ? 'Confidential' : formData.phone,
        area: formData.area,
        category: formData.category,
        notes: formData.notes,
      });
      setSubmittedTicket(ticketId);
    } else if (activeModal === 'enquiry') {
      const ticketId = addCareRequest({
        type: 'enquiry',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        area: formData.area,
        category: formData.category,
        notes: formData.notes,
      });
      setSubmittedTicket(ticketId);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedTicket(null);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white border border-slate-300 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 transition-all max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Success Confirmation View */}
        {submittedTicket ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-vogr-crimson flex items-center justify-center mx-auto border border-slate-300">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-vogr-navy">Submission Received</h3>
            <p className="text-xs text-slate-600">
              Your care request has been routed to the pastoral office under strict confidentiality.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Your Tracking Ticket ID</span>
              <span className="font-mono text-xl font-bold text-vogr-navy">{submittedTicket}</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Keep this ID to track your request status in the Virtual Member Hub or with the church office.
              </p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full py-3 bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold rounded-xl text-xs shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Headers */}
            {activeModal === 'consultation' && (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-vogr-crimson mb-2 border border-rose-200">
                  <CalendarCheck size={14} />
                  <span>Pastoral Care</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-vogr-navy">Book a Spiritual Consultation</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Private one-on-one spiritual counsel and biblical prayer with {CHURCH_INFO.pastor.name}.
                </p>
              </div>
            )}

            {activeModal === 'visit' && (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-vogr-navy mb-2 border border-slate-200">
                  <HomeIcon size={14} />
                  <span>Care Ministry</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-vogr-navy">Request a Pastoral Visit</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Home, hospital, or bereavement fellowship visit from the shepherd and deacon care team.
                </p>
              </div>
            )}

            {activeModal === 'baptism' && (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 mb-2 border border-sky-200">
                  <Droplet size={14} />
                  <span>Apostolic Ordinance</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-vogr-navy">Request Christian Water Baptism</h3>
                <p className="text-xs text-slate-600 mt-1">
                  By single immersion in the Name of the Lord Jesus Christ (Acts 2:38; 19:5).
                </p>
              </div>
            )}

            {activeModal === 'suggestion' && (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 mb-2 border border-amber-200">
                  <Inbox size={14} />
                  <span>Church Governance</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-vogr-navy">Confidential Suggestion Box</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Share ideas, observations, or feedback directly with church leadership.
                </p>
              </div>
            )}

            {activeModal === 'enquiry' && (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 mb-2 border border-indigo-200">
                  <HelpCircle size={14} />
                  <span>General Information</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-vogr-navy">Submit an Enquiry</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Questions regarding tapes, service schedules, fellowships, or church welfare.
                </p>
              </div>
            )}

            {/* Plan a Visit Modal View */}
            {activeModal === 'planVisit' && (
              <div className="space-y-4">
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-vogr-crimson mb-2 border border-rose-200">
                    <MapPin size={14} />
                    <span>First-Time Guest Guide</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-vogr-navy">Plan Your Visit to JGS Enugu</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    We look forward to welcoming you into sacred fellowship with the Lord Jesus Christ.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-vogr-navy flex items-center space-x-1.5 mb-1">
                      <MapPin size={16} className="text-vogr-crimson" />
                      <span>Exact Location & Landmarks</span>
                    </h4>
                    <p className="text-slate-700">{CHURCH_INFO.address}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      Located right beside IMT Campus 2 in Independence Layout, Enugu.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-vogr-navy flex items-center space-x-1.5 mb-1">
                      <Clock size={16} className="text-vogr-crimson" />
                      <span>Service Days & Hours</span>
                    </h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• <strong>Sunday:</strong> 9:00 AM – 12:30 PM (Tape Fellowship & Exhortation)</li>
                      <li>• <strong>Wednesday:</strong> 4:00 PM – 6:00 PM (Bible Exposition)</li>
                      <li>• <strong>Friday:</strong> 4:00 PM – 6:00 PM (United Prayer)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-vogr-navy flex items-center space-x-1.5 mb-1">
                      <ShieldCheck size={16} className="text-vogr-crimson" />
                      <span>What to Expect</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed font-light">
                      Reverent, sacred atmosphere. Congregational singing of "Only Believe" and vintage hymns accompanied by instrumentalists (no choir). Tape listening and uncompromised biblical preaching. Modest attire is embraced.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={`https://wa.me/${CHURCH_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Pastor%2C%20I%20am%20planning%20to%20visit%20Jehovah%20Good%20Shepherd%20Church`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 text-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2"
                    >
                      <PhoneCall size={16} />
                      <span>Notify Us via WhatsApp</span>
                    </a>
                    <button
                      onClick={handleResetAndClose}
                      className="py-3 px-5 border border-slate-300 rounded-xl hover:bg-slate-100 text-xs sm:text-sm font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Form for Care Submissions */}
            {activeModal !== 'planVisit' && (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                
                {/* Anonymous checkbox for suggestions */}
                {activeModal === 'suggestion' && (
                  <div className="flex items-center space-x-2 mb-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      name="isAnonymous"
                      checked={formData.isAnonymous}
                      onChange={handleCheckboxChange}
                      className="rounded text-amber-700 focus:ring-amber-500 w-4 h-4"
                    />
                    <label htmlFor="isAnonymous" className="text-xs font-semibold text-amber-900 cursor-pointer">
                      Submit anonymously (No name or contact stored)
                    </label>
                  </div>
                )}

                {/* Name & Phone */}
                {(!formData.isAnonymous || activeModal !== 'suggestion') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required={!formData.isAnonymous}
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Bro. Chijioke Emmanuel"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required={!formData.isAnonymous}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0803 123 4567"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                      />
                    </div>
                  </div>
                )}

                {/* Email & Area */}
                {(!formData.isAnonymous || activeModal !== 'suggestion') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">Email Address (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">Area in Enugu</label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="e.g. Independence Layout, New Haven"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                      />
                    </div>
                  </div>
                )}

                {/* Mode & Date for Consultation */}
                {activeModal === 'consultation' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">Consultation Mode</label>
                      <select
                        name="consultationMode"
                        value={formData.consultationMode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                      >
                        <option value="in_person">In-Person at Church Sanctuary</option>
                        <option value="phone">Confidential Phone Call</option>
                        <option value="video">Video Call (Google Meet)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                      />
                    </div>
                  </div>
                )}

                {/* Baptism Details */}
                {activeModal === 'baptism' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-slate-700">Age</label>
                        <input
                          type="number"
                          name="age"
                          min="1"
                          max="120"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1 text-slate-700">Spiritual Background</label>
                        <select
                          name="isConvert"
                          value={formData.isConvert ? 'true' : 'false'}
                          onChange={(e) => setFormData(p => ({ ...p, isConvert: e.target.value === 'true' }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                        >
                          <option value="true">New Convert seeking Christian Baptism</option>
                          <option value="false">Believer seeking re-baptism in Jesus' Name</option>
                        </select>
                      </div>
                    </div>

                    {Number(formData.age) < 18 && (
                      <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                        <label className="block font-bold text-vogr-crimson mb-1">
                          Parent / Guardian Consent (Candidate under 18) *
                        </label>
                        <input
                          type="text"
                          name="parentConsentName"
                          required
                          value={formData.parentConsentName}
                          onChange={handleChange}
                          placeholder="e.g. Mr. & Mrs. Okonkwo (Consent given)"
                          className="w-full px-3 py-2 rounded-lg border border-rose-300"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Category for Visit / Suggestion */}
                {(activeModal === 'visit' || activeModal === 'suggestion' || activeModal === 'enquiry') && (
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                    >
                      {activeModal === 'visit' && (
                        <>
                          <option value="Home Fellowship Visit">Home Fellowship Visit</option>
                          <option value="Hospital / Sick Bed Visit">Hospital / Sick Bed Visit</option>
                          <option value="Bereavement & Comfort">Bereavement & Comfort</option>
                          <option value="New Convert Welcome">New Convert Welcome</option>
                        </>
                      )}
                      {activeModal === 'suggestion' && (
                        <>
                          <option value="Sanctuary & Facilities">Sanctuary & Facilities</option>
                          <option value="Audio / Tapes Broadcast">Audio / Tapes Broadcast</option>
                          <option value="Fellowships & Groups">Fellowships & Groups</option>
                          <option value="Youth Alive">Youth Alive</option>
                          <option value="General Encouragement">General Encouragement</option>
                        </>
                      )}
                      {activeModal === 'enquiry' && (
                        <>
                          <option value="Service Times & Location">Service Times & Location</option>
                          <option value="Spoken Word Tapes">Spoken Word Tapes</option>
                          <option value="Virtual Membership">Virtual Membership</option>
                          <option value="Welfare / Assistance">Welfare / Assistance</option>
                          <option value="Other Enquiries">Other Enquiries</option>
                        </>
                      )}
                    </select>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    {activeModal === 'baptism' 
                      ? 'Brief Spiritual Journey / Reason for Baptism' 
                      : activeModal === 'suggestion' 
                      ? 'Your Constructive Feedback / Suggestion *' 
                      : 'Brief Notes / Prayer Need / Details *'}
                  </label>
                  <textarea
                    name="notes"
                    required
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Provide details so the pastoral office can serve you best..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>

                {/* Confidentiality Notice */}
                <div className="flex items-start space-x-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <ShieldCheck size={16} className="text-vogr-crimson shrink-0 mt-0.5" />
                  <span>
                    Pastoral Confidentiality: All details submitted are reviewed exclusively by authorized ministers ({CHURCH_INFO.pastor.name} and designated deacons).
                  </span>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold rounded-xl text-xs shadow"
                  >
                    Submit to Church Care
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
