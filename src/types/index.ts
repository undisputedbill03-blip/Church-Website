export type UserRole = 
  | 'visitor' 
  | 'member' 
  | 'admin' 
  | 'pastor' 
  | 'care_team' 
  | 'media_team' 
  | 'youth_leader' 
  | 'music_lead';

export interface Sermon {
  id: string;
  title: string;
  scripture: string;
  minister: string;
  date: string;
  duration: string;
  audioUrl: string;
  videoUrl?: string;
  thumbnail: string;
  category: 'daily' | 'sunday' | 'weekday' | 'tape';
  isMembersOnly?: boolean;
  notesPdfUrl?: string;
  summary: string;
  series?: string;
}

export interface Testimony {
  id: string;
  title: string;
  author: string;
  location: string;
  date: string;
  category: 'Divine Healing' | 'Salvation & Baptism' | 'Answered Prayer' | 'Deliverance' | 'Spiritual Growth';
  scripture: string;
  content: string;
  verifiedByPastor: boolean;
  imageUrl?: string;
}

export type CareFormType = 
  | 'checkup' 
  | 'followup' 
  | 'visit' 
  | 'enquiry' 
  | 'suggestion' 
  | 'consultation' 
  | 'baptism';

export type RequestStatus = 'requested' | 'approved' | 'in_preparation' | 'scheduled' | 'done' | 'reviewed';

export interface CareRequest {
  id: string;
  type: CareFormType;
  fullName: string;
  phone: string;
  email?: string;
  area: string;
  preferredDate?: string;
  category?: string; // e.g. for enquiry or consultation mode
  notes?: string;
  status: RequestStatus;
  assignedTo?: string;
  internalNotes?: string;
  createdAt: string;
  isPrivate?: boolean;
  // Baptism specific fields:
  age?: number;
  isConvert?: boolean;
  parentConsentName?: string;
  baptismDate?: string;
  officiatingMinister?: string;
  certificateIssued?: boolean;
  // Consultation specific:
  consultationMode?: 'in_person' | 'phone' | 'video';
  counsellor?: string;
}

export interface Hymn {
  id: string;
  number: number;
  title: string;
  firstLine: string;
  author?: string;
  scriptureRef?: string;
  audioUrl?: string; // church-recorded instrumental/sing-along
  isChurchOwnedOrPublicDomain: boolean;
  officialSourceUrl?: string;
  category: 'worship' | 'faith' | 'rapture' | 'grace';
}

export interface FellowshipGroup {
  id: string;
  name: string;
  zone: string;
  meetingDay: string;
  time: string;
  leader: string;
  phone: string;
  address: string;
  coordinates?: { lat: number; lng: number };
}

export interface EventItem {
  id: string;
  title: string;
  type: 'service' | 'tape_fellowship' | 'camp' | 'baptism' | 'youth' | 'prayer';
  date: string;
  time: string;
  location: string;
  description: string;
  whatToBring?: string;
  bannerImage: string;
  rsvpRequired?: boolean;
}

