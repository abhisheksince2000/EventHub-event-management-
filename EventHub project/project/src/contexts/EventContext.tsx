import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, RSVP, EventContextType } from '../types';
import { useAuth } from './AuthContext';

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock events for demonstration
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders, workshops, and networking opportunities.',
    date: '2025-03-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    organizer: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'organizer'
    },
    maxAttendees: 500,
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Technology',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Digital Marketing Workshop',
    description: 'Learn the latest digital marketing strategies and trends from experts in social media, SEO, and content marketing.',
    date: '2025-02-28',
    time: '14:00',
    location: 'Downtown Business Center',
    organizer: {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'organizer'
    },
    maxAttendees: 50,
    imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Marketing',
    createdAt: '2025-01-08T14:30:00Z'
  },
  {
    id: '3',
    title: 'Startup Networking Meetup',
    description: 'Connect with entrepreneurs, investors, and startup enthusiasts. Share ideas, find co-founders, and build your network.',
    date: '2025-02-20',
    time: '18:00',
    location: 'Innovation Hub Coworking Space',
    organizer: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'organizer'
    },
    maxAttendees: 100,
    imageUrl: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Networking',
    createdAt: '2025-01-05T16:15:00Z'
  }
];

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const savedRSVPs = localStorage.getItem('eventapp_rsvps');
    if (savedRSVPs) {
      setRsvps(JSON.parse(savedRSVPs));
    }
  }, []);

  const createEvent = (eventData: Omit<Event, 'id' | 'organizer' | 'createdAt'>) => {
    if (!user) return;
    
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      organizer: user,
      createdAt: new Date().toISOString()
    };
    
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setRsvps(prev => prev.filter(rsvp => rsvp.eventId !== id));
  };

  const submitRSVP = (eventId: string, status: 'yes' | 'no' | 'maybe', notes?: string) => {
    if (!user) return;

    const existingRSVP = rsvps.find(rsvp => rsvp.eventId === eventId && rsvp.userId === user.id);
    
    if (existingRSVP) {
      const updatedRSVPs = rsvps.map(rsvp =>
        rsvp.id === existingRSVP.id
          ? { ...rsvp, status, notes, createdAt: new Date().toISOString() }
          : rsvp
      );
      setRsvps(updatedRSVPs);
      localStorage.setItem('eventapp_rsvps', JSON.stringify(updatedRSVPs));
    } else {
      const newRSVP: RSVP = {
        id: Date.now().toString(),
        eventId,
        userId: user.id,
        user,
        status,
        notes,
        createdAt: new Date().toISOString()
      };
      const updatedRSVPs = [...rsvps, newRSVP];
      setRsvps(updatedRSVPs);
      localStorage.setItem('eventapp_rsvps', JSON.stringify(updatedRSVPs));
    }
  };

  const getUserRSVP = (eventId: string): RSVP | undefined => {
    if (!user) return undefined;
    return rsvps.find(rsvp => rsvp.eventId === eventId && rsvp.userId === user.id);
  };

  const getEventRSVPs = (eventId: string): RSVP[] => {
    return rsvps.filter(rsvp => rsvp.eventId === eventId);
  };

  return (
    <EventContext.Provider value={{
      events,
      rsvps,
      createEvent,
      updateEvent,
      deleteEvent,
      submitRSVP,
      getUserRSVP,
      getEventRSVPs,
      loading
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};