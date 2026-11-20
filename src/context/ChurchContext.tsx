import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, CareRequest, Sermon, Hymn, RequestStatus, Testimony } from '../types';
import { INITIAL_CARE_REQUESTS, INITIAL_SERMONS, INITIAL_HYMNS, TODAYS_WORD, CHURCH_TESTIMONIES } from '../data/churchData';

interface AudioTrack {
  id: string;
  title: string;
  speakerOrAuthor: string;
  audioUrl: string;
  duration?: string;
  type: 'sermon' | 'hymn' | 'snippet';
}

interface ChurchContextType {
  // Navigation & Page State
  activePage: string;
  setActivePage: (page: string) => void;

  // Accessibility & Data modes
  lowBandwidthMode: boolean;
  toggleLowBandwidth: () => void;
  largeTextMode: boolean;
  toggleLargeText: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;

  // User / Auth & Roles
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isVirtualMemberLoggedIn: boolean;
  setIsVirtualMemberLoggedIn: (val: boolean) => void;

  // Persistent Audio Player
  currentAudio: AudioTrack | null;
  isPlaying: boolean;
  playbackRate: number;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  setRate: (rate: number) => void;
  closeAudioPlayer: () => void;

  // Quick Action Modals
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;

  // Care Requests & Inbox (Confidential)
  careRequests: CareRequest[];
  addCareRequest: (request: Omit<CareRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateCareStatus: (id: string, status: RequestStatus) => void;
  updateCareNotes: (id: string, notes: string) => void;
  issueBaptismCertificate: (id: string, officiatingMinister: string, baptismDate: string) => void;

  // Sermons & Hymns
  sermons: Sermon[];
  addSermon: (sermon: Sermon) => void;
  hymns: Hymn[];

  // Testimonies (VOGR style)
  testimonies: Testimony[];
  addTestimony: (t: Omit<Testimony, 'id' | 'date' | 'verifiedByPastor'>) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('home');
  const [lowBandwidthMode, setLowBandwidthMode] = useState<boolean>(false);
  const [largeTextMode, setLargeTextMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [isVirtualMemberLoggedIn, setIsVirtualMemberLoggedIn] = useState<boolean>(false);

  // Audio Player State
  const [currentAudio, setCurrentAudio] = useState<AudioTrack | null>({
    id: 'todays-word-snippet',
    title: TODAYS_WORD.sermonTitle,
    speakerOrAuthor: TODAYS_WORD.minister,
    audioUrl: TODAYS_WORD.audioSnippetUrl,
    duration: TODAYS_WORD.duration,
    type: 'snippet',
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Modals & Care Requests
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [careRequests, setCareRequests] = useState<CareRequest[]>(() => {
    const saved = localStorage.getItem('jgs_care_requests');
    return saved ? JSON.parse(saved) : INITIAL_CARE_REQUESTS;
  });

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const saved = localStorage.getItem('jgs_sermons');
    return saved ? JSON.parse(saved) : INITIAL_SERMONS;
  });

  const [testimonies, setTestimonies] = useState<Testimony[]>(() => {
    const saved = localStorage.getItem('jgs_testimonies');
    return saved ? JSON.parse(saved) : CHURCH_TESTIMONIES;
  });

  const [hymns] = useState<Hymn[]>(INITIAL_HYMNS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Testimonies to localStorage
  useEffect(() => {
    localStorage.setItem('jgs_testimonies', JSON.stringify(testimonies));
  }, [testimonies]);

  // Sync Care Requests to localStorage
  useEffect(() => {
    localStorage.setItem('jgs_care_requests', JSON.stringify(careRequests));
  }, [careRequests]);

  // Sync Sermons to localStorage
  useEffect(() => {
    localStorage.setItem('jgs_sermons', JSON.stringify(sermons));
  }, [sermons]);

  // Toggle body classes for accessibility
  useEffect(() => {
    if (largeTextMode) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [largeTextMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const toggleLowBandwidth = () => {
    setLowBandwidthMode((prev) => {
      const next = !prev;
      showToast(next ? "Low-Bandwidth Mode Enabled (Audio optimized, heavy images minimized)" : "Standard Mode Restored");
      return next;
    });
  };

  const toggleLargeText = () => {
    setLargeTextMode((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const playTrack = (track: AudioTrack) => {
    setCurrentAudio(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const setRate = (rate: number) => {
    setPlaybackRate(rate);
  };

  const closeAudioPlayer = () => {
    setIsPlaying(false);
    setCurrentAudio(null);
  };

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const addCareRequest = (requestData: Omit<CareRequest, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `CR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: CareRequest = {
      ...requestData,
      id: newId,
      status: 'requested',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCareRequests((prev) => [newRequest, ...prev]);
    showToast(`Request submitted successfully! Tracking Ticket ID: ${newId}`);
    return newId;
  };

  const updateCareStatus = (id: string, status: RequestStatus) => {
    setCareRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
    showToast(`Request ${id} status updated to ${status.replace('_', ' ').toUpperCase()}`);
  };

  const updateCareNotes = (id: string, internalNotes: string) => {
    setCareRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, internalNotes } : req))
    );
    showToast(`Private notes updated for ${id}`);
  };

  const issueBaptismCertificate = (id: string, officiatingMinister: string, baptismDate: string) => {
    setCareRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'done',
              certificateIssued: true,
              officiatingMinister,
              baptismDate,
            }
          : req
      )
    );
    showToast(`Baptism certificate issued for request ${id}!`);
  };

  const addSermon = (newSermon: Sermon) => {
    setSermons((prev) => [newSermon, ...prev]);
    showToast(`Sermon "${newSermon.title}" published successfully!`);
  };

  const addTestimony = (t: Omit<Testimony, 'id' | 'date' | 'verifiedByPastor'>) => {
    const newTestimony: Testimony = {
      ...t,
      id: `test-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verifiedByPastor: true,
    };
    setTestimonies((prev) => [newTestimony, ...prev]);
    showToast("Praise the Lord! Your testimony has been received and shared.");
  };

  return (
    <ChurchContext.Provider
      value={{
        activePage,
        setActivePage,
        lowBandwidthMode,
        toggleLowBandwidth,
        largeTextMode,
        toggleLargeText,
        darkMode,
        toggleDarkMode,
        userRole,
        setUserRole,
        isVirtualMemberLoggedIn,
        setIsVirtualMemberLoggedIn,
        currentAudio,
        isPlaying,
        playbackRate,
        playTrack,
        pauseTrack,
        togglePlay,
        setRate,
        closeAudioPlayer,
        activeModal,
        openModal,
        closeModal,
        careRequests,
        addCareRequest,
        updateCareStatus,
        updateCareNotes,
        issueBaptismCertificate,
        sermons,
        addSermon,
        hymns,
        testimonies,
        addTestimony,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};

