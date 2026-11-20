import { Sermon, Hymn, FellowshipGroup, EventItem, CareRequest, Testimony } from '../types';

export const CHURCH_INFO = {
  name: "Jehovah Good Shepherd Church",
  shortName: "JGS Enugu",
  tagline: "The Lord is My Shepherd; I Shall Not Want",
  subtitle: "A sacred fellowship rooted in the Word of God and the Prophet Messenger ministry pattern",
  address: "Independence Layout, Enugu beside IMT Campus 2, Enugu State, Nigeria",
  landmark: "Beside IMT Campus 2",
  city: "Enugu",
  state: "Enugu State",
  country: "Nigeria",
  phone: "+234 803 456 7890",
  whatsapp: "+234 803 456 7890",
  email: "contact@jehovahgoodshepherd.org",
  officeHours: "Tuesday – Friday: 9:00 AM – 3:30 PM",
  pastor: {
    name: "Pastor Oke Hyacinth Ayogu",
    role: "Resident Pastor",
    bio: "Serving with a true shepherd's heart, dedicated to proclaiming the unadulterated Message of the Hour and shepherding souls into the fullness of Jesus Christ.",
  },
  services: [
    {
      title: "Sunday Worship & Tape Fellowship",
      day: "Sunday",
      time: "9:00 AM – 12:30 PM",
      description: "Reverent congregational worship with sacred instrumental hymns, tape listening, and biblical message preaching.",
      nextOccurrenceDayIndex: 0,
      startHour: 9,
      startMinute: 0,
    },
    {
      title: "Wednesday Bible Exposition & Tape Study",
      day: "Wednesday",
      time: "4:00 PM – 6:00 PM",
      description: "Midweek study of the Spoken Word tapes, doctrine, and scripture examination.",
      nextOccurrenceDayIndex: 3,
      startHour: 16,
      startMinute: 0,
    },
    {
      title: "Friday United Prayer & Intercession",
      day: "Friday",
      time: "4:00 PM – 6:00 PM",
      description: "United congregational prayer, seeking God for the sick, home needs, and spiritual revival.",
      nextOccurrenceDayIndex: 5,
      startHour: 16,
      startMinute: 0,
    }
  ],
  banking: {
    naira: {
      bankName: "Ecobank Nigeria",
      accountNumber: "2841098765",
      accountName: "Jehovah Good Shepherd Church Enugu",
      sortCode: "050150321"
    },
    diasporaUsd: {
      bankName: "Ecobank Nigeria (Domiciliary Account)",
      accountNumber: "2841098772",
      accountName: "Jehovah Good Shepherd Church Enugu",
      swiftCode: "ECOBNGLA"
    }
  },
  socialLinks: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    whatsappChannel: "https://whatsapp.com/channel/example",
    telegram: "https://t.me/jgsenugu"
  }
};

export const TODAYS_WORD = {
  date: "Today's Word & Daily Tape Focus",
  scriptureRef: "Psalm 23:1-3 & John 10:11",
  scriptureText: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul...",
  sermonQuote: "Look away from your symptoms, look away from your circumstances, and look to the Good Shepherd. When He speaks Peace, every storm has to be calm. Stay behind that Word; it's your absolute shield.",
  sermonTitle: "The Good Shepherd Leadeth His Sheep",
  tapeNumber: "63-0318",
  minister: "Spoken Word Tape Reference (VGR Archive)",
  audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  duration: "4:15"
};

export const CHURCH_TESTIMONIES: Testimony[] = [
  {
    id: "test-1",
    title: "Miraculous Healing of Severe Lumbar Spine Condition",
    author: "Bro. Emmanuel Eze",
    location: "Independence Layout, Enugu",
    date: "November 14, 2024",
    category: "Divine Healing",
    scripture: "Mark 11:24; Hebrews 13:8",
    content: "For over two years I was unable to sit straight or bend without agonizing back pains. During our Friday United Prayer service, as Pastor Oke Hyacinth Ayogu laid hands on the sick in the Name of Jesus Christ, a warm sensation passed through my spine. All pain vanished instantly! The doctor's subsequent X-ray confirmed normal bone alignment. Praise the Lord Jesus Christ!",
    verifiedByPastor: true,
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "test-2",
    title: "Obedience in Water Baptism and Receiving the Holy Ghost",
    author: "Sis. Ngozi Blessing Alor",
    location: "New Haven, Enugu",
    date: "November 08, 2024",
    category: "Salvation & Baptism",
    scripture: "Acts 2:38; Acts 19:5",
    content: "I grew up in a denominational church baptized under the titles of Father, Son, and Holy Ghost. When I heard the Scripture preached on Acts 2:38 at Jehovah Good Shepherd Church, my heart was struck. I requested baptism into the Name of the Lord Jesus Christ. When I came out of the water, a peace which passeth all understanding filled my soul, and Christ became my all in all.",
    verifiedByPastor: true,
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "test-3",
    title: "Supernatural Deliverance on the Enugu-Port Harcourt Expressway",
    author: "Bro. Kenneth Chukwudi",
    location: "Achara Layout, Enugu",
    date: "October 29, 2024",
    category: "Deliverance",
    scripture: "Psalm 91:11-12",
    content: "While returning to Enugu with goods, my vehicle's front tire blew out at high speed. As the vehicle spun towards a deep ditch, I cried out, 'Lord Jesus, You are my Shepherd!' The car miraculously halted on the soft shoulder without a scratch on anyone. God is truly an ever-present help in trouble.",
    verifiedByPastor: true,
    imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "test-4",
    title: "Still Waters Youth Retreat: Delivered from Worldly Pressures",
    author: "Bro. Timothy U.",
    location: "UNEC Campus Quarters, Enugu",
    date: "October 18, 2024",
    category: "Spiritual Growth",
    scripture: "Romans 12:1-2",
    content: "As a student at UNEC, the pressure from campus peers was overwhelming. Attending the Youth Alive retreat and listening to the Spoken Word tapes gave me an anchor that cannot be shaken. God sanctified my desires and gave me boldness to stand alone for the truth.",
    verifiedByPastor: true,
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_SERMONS: Sermon[] = [
  {
    id: "sermon-1",
    title: "The Good Shepherd and the Voice of the Word",
    scripture: "John 10:1-16; Psalm 23",
    minister: "Pastor Oke Hyacinth Ayogu",
    date: "November 17, 2024",
    duration: "1 hr 22 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
    category: "sunday",
    summary: "A deep pastoral examination of discerning the True Shepherd's voice from all ecclesiastical confusion in this closing hour.",
    series: "The Ministry of the Shepherd"
  },
  {
    id: "sermon-2",
    title: "Water Baptism in the Name of Jesus Christ: The Apostolic Pattern",
    scripture: "Acts 2:38; Acts 19:1-6",
    minister: "Pastor Oke Hyacinth Ayogu",
    date: "November 14, 2024",
    duration: "1 hr 08 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    category: "weekday",
    summary: "Clear scriptural exposition on the formula and purpose of Christian water baptism by single immersion into the Lord Jesus Christ.",
    series: "Doctrinal Foundations"
  },
  {
    id: "sermon-3",
    title: "Tape Fellowship: Faith is the Substance",
    scripture: "Hebrews 11:1",
    minister: "Tape Service (Voice of God Recordings)",
    date: "November 10, 2024",
    duration: "1 hr 45 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    thumbnail: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    category: "tape",
    summary: "Reverent congregational tape listening service focusing on the spoken word that anchors the heart in supernatural faith.",
    series: "Tape Service"
  },
  {
    id: "sermon-4",
    title: "Walking in Divine Healing and Quiet Assurance",
    scripture: "Isaiah 53:5; 1 Peter 2:24",
    minister: "Pastor Oke Hyacinth Ayogu",
    date: "November 07, 2024",
    duration: "58 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80",
    category: "weekday",
    isMembersOnly: true,
    summary: "Members-only midweek highlight: practical testimonies and prayer for physical and spiritual infirmities.",
    series: "The Believer's Walk"
  }
];

export const INITIAL_HYMNS: Hymn[] = [
  {
    id: "hymn-1",
    number: 1,
    title: "Only Believe",
    firstLine: "Fear not, little flock, from the cross to the throne",
    author: "Paul Rader (Public Domain)",
    scriptureRef: "Mark 9:23; Luke 8:50",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    isChurchOwnedOrPublicDomain: true,
    officialSourceUrl: "https://branham.org",
    category: "faith"
  },
  {
    id: "hymn-2",
    number: 24,
    title: "The Great Physician Now is Near",
    firstLine: "The great Physician now is near, the sympathizing Jesus",
    author: "William Hunter (Public Domain)",
    scriptureRef: "Jeremiah 8:22",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    isChurchOwnedOrPublicDomain: true,
    officialSourceUrl: "https://branham.org",
    category: "grace"
  },
  {
    id: "hymn-3",
    number: 112,
    title: "Amazing Grace",
    firstLine: "Amazing grace! how sweet the sound, that saved a wretch like me",
    author: "John Newton (Public Domain)",
    scriptureRef: "Ephesians 2:8",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    isChurchOwnedOrPublicDomain: true,
    officialSourceUrl: "https://branham.org",
    category: "grace"
  },
  {
    id: "hymn-4",
    number: 215,
    title: "He The Pearly Gates Will Open",
    firstLine: "Love divine, so great and wondrous, deep and high and rolling on",
    author: "Fred A. Blom (Public Domain)",
    scriptureRef: "Revelation 21:21",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    isChurchOwnedOrPublicDomain: true,
    officialSourceUrl: "https://branham.org",
    category: "rapture"
  }
];

export const ENUGU_FELLOWSHIPS: FellowshipGroup[] = [
  {
    id: "fel-1",
    name: "Independence Layout Family Fellowship",
    zone: "Independence Layout",
    meetingDay: "Wednesdays",
    time: "6:00 PM – 7:15 PM",
    leader: "Bro. Emmanuel Eze",
    phone: "+234 803 555 0101",
    address: "Off Presidential Road, Independence Layout, Enugu"
  },
  {
    id: "fel-2",
    name: "New Haven & Ogui Believers Cell",
    zone: "New Haven",
    meetingDay: "Wednesdays",
    time: "6:00 PM – 7:15 PM",
    leader: "Bro. Chidi Nnamani",
    phone: "+234 806 555 0202",
    address: "Upper Chime Avenue, New Haven, Enugu"
  },
  {
    id: "fel-3",
    name: "Trans-Ekulu Prayer & Tape Circle",
    zone: "Trans-Ekulu",
    meetingDay: "Fridays",
    time: "6:00 PM – 7:30 PM",
    leader: "Bro. Daniel Okoye",
    phone: "+234 814 555 0303",
    address: "Damija Estate Road, Trans-Ekulu, Enugu"
  },
  {
    id: "fel-4",
    name: "Achara Layout & Agbani Road Fellowship",
    zone: "Achara Layout",
    meetingDay: "Wednesdays",
    time: "5:30 PM – 6:45 PM",
    leader: "Bro. Jude Onyeka",
    phone: "+234 802 555 0404",
    address: "Near Topland Market, Achara Layout, Enugu"
  },
  {
    id: "fel-5",
    name: "Campus Message Fellowship (UNEC / ESUT)",
    zone: "UNEC / Campuses",
    meetingDay: "Saturdays",
    time: "4:00 PM – 5:30 PM",
    leader: "Bro. Timothy Uche",
    phone: "+234 809 555 0505",
    address: "UNEC Campus Quarters, Enugu"
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "Solemn Water Baptismal Service (Acts 2:38)",
    type: "baptism",
    date: "Sunday, December 1, 2024",
    time: "1:00 PM (Immediately after service)",
    location: "JGS Baptismal Pool, Independence Layout",
    description: "Biblical water baptism by single immersion into the Name of the Lord Jesus Christ according to Acts 2:38.",
    whatToBring: "Clean towel, dark change of modest garments, and a prayerful heart.",
    bannerImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    rsvpRequired: true
  },
  {
    id: "ev-2",
    title: "Youth Alive End-of-Year Tape Retreat",
    type: "youth",
    date: "December 13 – 15, 2024",
    time: "Friday 4 PM to Sunday 2 PM",
    location: "Still Waters Inspired Grounds, Enugu Environs",
    description: "Quiet reflection, uncompromised Message tape fellowship, instrumental praise, brotherly communion, and youth mentorship.",
    bannerImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    rsvpRequired: true
  },
  {
    id: "ev-3",
    title: "Annual Thanksgiving & Scripture Fellowship",
    type: "service",
    date: "December 22, 2024",
    time: "9:00 AM – 1:00 PM",
    location: "Main Sanctuary, Independence Layout, Enugu",
    description: "Congregational gratitude for the Lord's shepherd guidance, protection, and spiritual victories through the year.",
    bannerImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_CARE_REQUESTS: CareRequest[] = [
  {
    id: "CR-1001",
    type: "baptism",
    fullName: "Obinna Kingsley Chukwu",
    phone: "+234 803 987 6543",
    email: "obinna.k@gmail.com",
    area: "Independence Layout, Enugu",
    preferredDate: "2024-12-01",
    status: "approved",
    notes: "I recently came into the Message after studying Acts 2:38 and desire to be buried with Christ.",
    assignedTo: "Pastor Oke Hyacinth Ayogu",
    internalNotes: "Pre-baptism class attended on Nov 16. Sincere believer.",
    createdAt: "2024-11-12",
    age: 26,
    isConvert: true,
    certificateIssued: false
  },
  {
    id: "CR-1002",
    type: "visit",
    fullName: "Sis. Ngozi N. Alor",
    phone: "+234 806 112 2334",
    email: "ngozi.alor@yahoo.com",
    area: "New Haven, Enugu",
    preferredDate: "2024-11-22",
    category: "Hospital Recovery",
    status: "scheduled",
    notes: "Recovering after outpatient surgery, requesting pastoral prayer and communion.",
    assignedTo: "Deacon Jude & Care Team",
    internalNotes: "Confirmed visit for Friday 3 PM.",
    createdAt: "2024-11-18",
    isPrivate: true
  },
  {
    id: "CR-1003",
    type: "consultation",
    fullName: "Bro. Patrick O. Igwe",
    phone: "+234 814 334 5566",
    area: "Trans-Ekulu, Enugu",
    preferredDate: "2024-11-25",
    consultationMode: "in_person",
    counsellor: "Pastor Oke Hyacinth Ayogu",
    status: "requested",
    notes: "Guidance on marriage and family decisions in light of the Scripture.",
    createdAt: "2024-11-19"
  },
  {
    id: "CR-1004",
    type: "suggestion",
    fullName: "Anonymous",
    phone: "Confidential",
    area: "Independence Layout",
    category: "Sanctuary Maintenance",
    status: "reviewed",
    notes: "Can we increase the volume of the audio monitor in the mother's quiet room during service?",
    assignedTo: "Media Team Lead",
    internalNotes: "Speaker level adjusted on Tuesday test.",
    createdAt: "2024-11-15"
  }
];
