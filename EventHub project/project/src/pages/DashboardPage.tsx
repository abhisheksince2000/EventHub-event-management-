import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Users, Edit3, Trash2, Eye } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { events, deleteEvent, getEventRSVPs } = useEvents();
  const { user } = useAuth();
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  if (!user || user.role !== 'organizer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in as an organizer to access the dashboard.</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Login as Organizer
          </Link>
        </div>
      </div>
    );
  }

  const userEvents = events.filter(event => event.organizer.id === user.id);
  const upcomingEvents = userEvents.filter(event => new Date(`${event.date}T${event.time}`) > new Date());
  const pastEvents = userEvents.filter(event => new Date(`${event.date}T${event.time}`) <= new Date());

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setDeletingEventId(eventId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    deleteEvent(eventId);
    setDeletingEventId(null);
  };

  const getTotalAttendees = () => {
    return userEvents.reduce((total, event) => {
      const rsvps = getEventRSVPs(event.id);
      return total + rsvps.filter(rsvp => rsvp.status === 'yes').length;
    }, 0);
  };

  const EventTable: React.FC<{ events: typeof userEvents; title: string }> = ({ events, title }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      
      {events.length === 0 ? (
        <div className="p-6 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No {title.toLowerCase()} found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RSVPs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map(event => {
                const rsvps = getEventRSVPs(event.id);
                const attendingCount = rsvps.filter(rsvp => rsvp.status === 'yes').length;
                const maybeCount = rsvps.filter(rsvp => rsvp.status === 'maybe').length;
                const eventDate = new Date(`${event.date}T${event.time}`);

                return (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {eventDate.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {eventDate.toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {event.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="text-green-600 font-medium">{attendingCount} Yes</span>
                        {maybeCount > 0 && (
                          <span className="text-yellow-600 ml-2">{maybeCount} Maybe</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {event.maxAttendees && `/ ${event.maxAttendees} max`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/events/${event.id}`}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="View Event"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          className="text-gray-600 hover:text-blue-600 p-1"
                          title="Edit Event"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          disabled={deletingEventId === event.id}
                          className="text-red-600 hover:text-red-700 p-1 disabled:opacity-50"
                          title="Delete Event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">Manage your events and track attendees</p>
          </div>
          <Link
            to="/create-event"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userEvents.length}</p>
                <p className="text-gray-600">Total Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-emerald-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{getTotalAttendees()}</p>
                <p className="text-gray-600">Total Attendees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Tables */}
        <div className="space-y-8">
          <EventTable events={upcomingEvents} title="Upcoming Events" />
          <EventTable events={pastEvents} title="Past Events" />
        </div>
      </div>
    </div>
  );
};