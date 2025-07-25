import React, { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { Event, RSVP } from '../types';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';

interface RSVPFormProps {
  event: Event;
  existingRSVP?: RSVP;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ event, existingRSVP }) => {
  const [status, setStatus] = useState<'yes' | 'no' | 'maybe'>(existingRSVP?.status || 'yes');
  const [notes, setNotes] = useState(existingRSVP?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitRSVP } = useEvents();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    submitRSVP(event.id, status, notes);
    setIsSubmitting(false);
  };

  if (!user) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-4">Please log in to RSVP to this event.</p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {existingRSVP ? 'Update Your RSVP' : 'RSVP to This Event'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Will you attend this event?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setStatus('yes')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all ${
                status === 'yes'
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Check className="h-4 w-4" />
              <span className="font-medium">Yes</span>
            </button>
            
            <button
              type="button"
              onClick={() => setStatus('maybe')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all ${
                status === 'maybe'
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-medium">Maybe</span>
            </button>
            
            <button
              type="button"
              onClick={() => setStatus('no')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all ${
                status === 'no'
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <X className="h-4 w-4" />
              <span className="font-medium">No</span>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Any questions or special requirements..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting ? 'Submitting...' : existingRSVP ? 'Update RSVP' : 'Submit RSVP'}
        </button>
      </form>

      {existingRSVP && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Your current RSVP: <span className="font-medium capitalize">{existingRSVP.status}</span>
          </p>
          {existingRSVP.notes && (
            <p className="text-sm text-blue-600 mt-1">Notes: {existingRSVP.notes}</p>
          )}
        </div>
      )}
    </div>
  );
};