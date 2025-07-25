export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'attendee';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: User;
  maxAttendees?: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  status: 'yes' | 'no' | 'maybe';
  createdAt: string;
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'organizer' | 'attendee') => Promise<void>;
  loading: boolean;
}

export interface EventContextType {
  events: Event[];
  rsvps: RSVP[];
  createEvent: (event: Omit<Event, 'id' | 'organizer' | 'createdAt'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  submitRSVP: (eventId: string, status: 'yes' | 'no' | 'maybe', notes?: string) => void;
  getUserRSVP: (eventId: string) => RSVP | undefined;
  getEventRSVPs: (eventId: string) => RSVP[];
  loading: boolean;
}