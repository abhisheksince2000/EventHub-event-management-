import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, User } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';
import { RSVPForm } from '../components/RSVPForm';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, getEventRSVPs, getUserRSVP } = useEvents();
  
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <Link
            to="/events"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const rsvps = getEventRSVPs(event.id);
  const userRSVP = getUserRSVP(event.id);
  const attendingCount = rsvps.filter(rsvp => rsvp.status === 'yes').length;
  const maybeCount = rsvps.filter(rsvp => rsvp.status === 'maybe').length;

  const formatDateTime = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`);
    return {
      date: eventDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
      }),
      time: eventDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      })
    };
  };

  const { date: formattedDate, time: formattedTime } = formatDateTime(event.date, event.time);
  const isEventPast = new Date(`${event.date}T${event.time}`) < new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/events"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
              {isEventPast && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Event Ended</span>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                  {event.title}
                </h1>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{formattedDate}</p>
                    <p className="text-sm text-gray-600">Date</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{formattedTime}</p>
                    <p className="text-sm text-gray-600">Time</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{event.location}</p>
                    <p className="text-sm text-gray-600">Location</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {attendingCount} attending{maybeCount > 0 && `, ${maybeCount} maybe`}
                    </p>
                    <p className="text-sm text-gray-600">Attendees</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Organized by</h3>
                <div className="flex items-center space-x-3">
                  {event.organizer.avatar ? (
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{event.organizer.name}</p>
                    <p className="text-sm text-gray-600">{event.organizer.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {!isEventPast ? (
              <RSVPForm event={event} existingRSVP={userRSVP} />
            ) : (
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Event Ended</h3>
                <p className="text-gray-600">This event has already taken place.</p>
              </div>
            )}

            {/* Attendee List */}
            {rsvps.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Attendees ({attendingCount})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {rsvps
                    .filter(rsvp => rsvp.status === 'yes')
                    .map(rsvp => (
                      <div key={rsvp.id} className="flex items-center space-x-3">
                        {rsvp.user.avatar ? (
                          <img
                            src={rsvp.user.avatar}
                            alt={rsvp.user.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {rsvp.user.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};