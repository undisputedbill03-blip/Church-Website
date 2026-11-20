import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  HeartHandshake, 
  Copy, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  Sparkles, 
  CheckCircle2, 
  Receipt, 
  Lock 
} from 'lucide-react';

export const Give: React.FC = () => {
  const { showToast } = useChurch();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');
  const [giveType, setGiveType] = useState<'one_time' | 'recurring'>('one_time');
  const [category, setCategory] = useState<string>('Tithes');
  const [customAmount, setCustomAmount] = useState<string>('10000');
  const [giverName, setGiverName] = useState<string>('');
  const [giverEmail, setGiverEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    showToast(`Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const ref = `JGS-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptData({
        reference: ref,
        amount: customAmount,
        currency: currency,
        category: category,
        name: giverName || 'Faithful Believer',
        email: giverEmail || 'giver@church.org',
        date: new Date().toLocaleDateString('en-NG', { dateStyle: 'long' }),
      });
      showToast("Thank you for your cheerful giving in the house of the Lord!");
    }, 1200);
  };

  const presetAmounts = currency === 'NGN' 
    ? ['2,000', '5,000', '10,000', '25,000', '50,000', '100,000']
    : ['50', '100', '250', '500', '1000'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header & Scripture Framing */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-rose-50 text-vogr-crimson border border-rose-200 font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-widest shadow-sm">
          <HeartHandshake size={14} />
          <span>Worship Through Giving</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vogr-navy">
          Supporting the Work of the Lord
        </h1>
        <blockquote className="text-sm sm:text-base text-slate-700 font-serif italic max-w-2xl mx-auto">
          "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." — 2 Corinthians 9:7
        </blockquote>
      </div>

      {/* Success Receipt View */}
      {receiptData ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-vogr-gold shadow-church-lg max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-vogr-crimson flex items-center justify-center mx-auto border border-slate-300">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
              Transaction Completed
            </span>
            <h2 className="font-serif text-2xl font-bold text-vogr-navy">Official Giving Receipt</h2>
            <p className="text-xs text-slate-500">
              Jehovah Good Shepherd Church, Independence Layout, Enugu
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Receipt Reference:</span>
              <span className="font-mono font-bold text-vogr-navy">{receiptData.reference}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Giver:</span>
              <span className="font-semibold text-slate-900">{receiptData.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-900">{receiptData.category}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Date:</span>
              <span>{receiptData.date}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold text-vogr-crimson">
              <span>Amount:</span>
              <span>{receiptData.currency} {Number(receiptData.amount.replace(/,/g, '')).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setReceiptData(null)}
            className="w-full py-3 bg-vogr-navy hover:bg-vogr-navyLight text-vogr-gold font-bold rounded-xl text-xs shadow"
          >
            Done / Give Another Offering
          </button>
        </div>
      ) : (
        /* Giving Options Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Online Payment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-church space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-vogr-navy">Online Giving Portal</h3>
                <p className="text-xs text-slate-500">
                  Card, Bank Transfer, or USSD (Paystack Secure Checkout)
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold border border-slate-200">
                {(['NGN', 'USD', 'GBP'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      currency === curr 
                        ? 'bg-vogr-navy text-vogr-gold shadow' 
                        : 'text-slate-600'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-4">
              
              {/* Category Pills */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">
                  Offering Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Tithes', 'General Offering', 'Building Project', 'Missions & Tapes', 'Welfare / Benevolence', 'Sacrificial Seed'].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                        category === cat
                          ? 'border-vogr-navy bg-vogr-navy text-vogr-gold font-bold shadow'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">
                  Select or Enter Amount ({currency})
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {presetAmounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setCustomAmount(amt.replace(/,/g, ''))}
                      className="py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800"
                    >
                      {currency} {amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    {currency}
                  </span>
                  <input
                    type="number"
                    required
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-12 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={giverName}
                    onChange={(e) => setGiverName(e.target.value)}
                    placeholder="e.g. Bro. Chika"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">
                    Email (for receipt)
                  </label>
                  <input
                    type="email"
                    value={giverEmail}
                    onChange={(e) => setGiverEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-vogr-navy"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-vogr-crimson hover:bg-vogr-crimsonHover text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Lock size={15} />
                  <span>
                    {isProcessing 
                      ? 'Processing Secure Paystack Checkout...' 
                      : `Give ${currency} ${Number(customAmount || 0).toLocaleString()} Now`}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck size={14} className="text-emerald-700" />
                <span>256-Bit SSL Encrypted • Powered by Paystack / Flutterwave</span>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Ecobank Nigeria Transfer Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Naira Ecobank Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-church space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-vogr-crimson">
                  Direct Bank Transfer (Nigeria)
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                  Ecobank
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Bank Name</span>
                    <span className="font-bold text-sm text-slate-900">
                      {CHURCH_INFO.banking.naira.bankName}
                    </span>
                  </div>
                  <Building size={20} className="text-slate-400" />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Account Number</span>
                    <span className="font-mono text-lg font-extrabold text-vogr-navy">
                      {CHURCH_INFO.banking.naira.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(CHURCH_INFO.banking.naira.accountNumber, 'acct-naira')}
                    className="p-2 rounded-xl bg-vogr-navy text-vogr-gold hover:bg-vogr-navyLight"
                    title="Copy Account Number"
                  >
                    {copiedField === 'acct-naira' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Account Name</span>
                  <span className="font-bold text-xs text-slate-900">
                    {CHURCH_INFO.banking.naira.accountName}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                * Please indicate offering type (e.g. "Tithe", "Building") in your transfer narration.
              </p>
            </div>

            {/* Diaspora Domiciliary Account Card */}
            <div className="bg-vogr-navy text-white rounded-3xl p-6 sm:p-8 border-2 border-vogr-gold/40 shadow-church space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-vogr-gold">
                  Diaspora Giving (USD / GBP)
                </span>
                <span className="text-[10px] bg-vogr-navyDark text-slate-300 font-bold px-2 py-0.5 rounded-full border border-slate-700">
                  Ecobank Dom
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p><strong>Bank:</strong> {CHURCH_INFO.banking.diasporaUsd.bankName}</p>
                <div className="flex items-center justify-between bg-vogr-navyDark p-2.5 rounded-xl border border-slate-700">
                  <span>Acct No: <strong className="font-mono text-vogr-gold">{CHURCH_INFO.banking.diasporaUsd.accountNumber}</strong></span>
                  <button
                    onClick={() => copyToClipboard(CHURCH_INFO.banking.diasporaUsd.accountNumber, 'acct-dom')}
                    className="text-vogr-gold hover:underline text-[11px]"
                  >
                    {copiedField === 'acct-dom' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p><strong>SWIFT Code:</strong> {CHURCH_INFO.banking.diasporaUsd.swiftCode}</p>
                <p><strong>Beneficiary:</strong> {CHURCH_INFO.banking.diasporaUsd.accountName}</p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
