import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { 
  CalendarCheck, 
  Home as HomeIcon, 
  Droplet, 
  Inbox, 
  HelpCircle, 
  HeartHandshake 
} from 'lucide-react';

interface QuickActionStripProps {
  isStickyMobile?: boolean;
}

export const QuickActionStrip: React.FC<QuickActionStripProps> = ({ isStickyMobile = false }) => {
  const { openModal, setActivePage } = useChurch();

  const actions = [
    {
      id: 'consultation',
      label: 'Book a Consultation',
      shortLabel: 'Consultation',
      icon: CalendarCheck,
      color: 'text-vogr-navy bg-slate-100 hover:bg-slate-200 border-slate-300',
      action: () => openModal('consultation')
    },
    {
      id: 'visit',
      label: 'Request a Visit',
      shortLabel: 'Request Visit',
      icon: HomeIcon,
      color: 'text-vogr-navy bg-slate-100 hover:bg-slate-200 border-slate-300',
      action: () => openModal('visit')
    },
    {
      id: 'baptism',
      label: 'Request Baptism (Acts 2:38)',
      shortLabel: 'Baptism',
      icon: Droplet,
      color: 'text-sky-800 bg-sky-50 hover:bg-sky-100 border-sky-200',
      action: () => openModal('baptism')
    },
    {
      id: 'suggestion',
      label: 'Suggestion Box',
      shortLabel: 'Suggestion',
      icon: Inbox,
      color: 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200',
      action: () => openModal('suggestion')
    },
    {
      id: 'enquiry',
      label: 'Add Enquiry',
      shortLabel: 'Enquiry',
      icon: HelpCircle,
      color: 'text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      action: () => openModal('enquiry')
    },
    {
      id: 'give',
      label: 'Give Online (Ecobank)',
      shortLabel: 'Give',
      icon: HeartHandshake,
      color: 'text-vogr-crimson bg-rose-50 hover:bg-rose-100 border-rose-200 font-bold',
      action: () => setActivePage('give')
    },
  ];

  if (isStickyMobile) {
    return (
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className="flex flex-col items-center justify-center p-1.5 min-w-[58px] rounded-lg text-slate-800 hover:text-vogr-navy transition-colors focus:outline-none"
              >
                <div className={`p-1.5 rounded-full border ${act.color}`}>
                  <Icon size={14} />
                </div>
                <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">{act.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-y border-slate-200 py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-wider font-bold text-vogr-navy hidden lg:inline flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-vogr-crimson"></span>
          <span>Quick Pastoral Care & Service Actions:</span>
        </span>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-center sm:justify-start">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm border ${act.color}`}
              >
                <Icon size={14} />
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
