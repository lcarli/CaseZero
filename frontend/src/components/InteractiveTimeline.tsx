import React, { useState, useMemo } from 'react';
import { Evidence } from '../types/api';

interface TimelineEvent {
  id: number;
  date: Date;
  time: string;
  title: string;
  description: string;
  type: 'evidence' | 'event' | 'analysis' | 'witness';
  evidence?: Evidence;
  location?: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

interface InteractiveTimelineProps {
  evidences: Evidence[];
  events?: TimelineEvent[];
  onEventSelect?: (event: TimelineEvent) => void;
  selectedEventId?: number | null;
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  evidences,
  events = [],
  onEventSelect,
  selectedEventId
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterImportance, setFilterImportance] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'chronological' | 'grouped'>('chronological');

  // Convert evidences to timeline events
  const evidenceEvents: TimelineEvent[] = evidences.map(evidence => ({
    id: evidence.evidenceId,
    date: new Date(evidence.collectedAt),
    time: new Date(evidence.collectedAt).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    title: evidence.name,
    description: evidence.description,
    type: 'evidence' as const,
    evidence,
    location: evidence.location,
    importance: evidence.requiresAnalysis ? 'high' : 'medium'
  }));

  // Combine all events
  const allEvents = [...evidenceEvents, ...events];

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = allEvents.filter(event => {
      if (filterType !== 'all' && event.type !== filterType) return false;
      if (filterImportance !== 'all' && event.importance !== filterImportance) return false;
      return true;
    });

    // Sort by date
    filtered.sort((a, b) => a.date.getTime() - b.date.getTime());

    return filtered;
  }, [allEvents, filterType, filterImportance]);

  // Group events by date if needed
  const groupedEvents = useMemo(() => {
    if (viewMode !== 'grouped') return filteredEvents;

    const grouped = filteredEvents.reduce((acc, event) => {
      const dateKey = event.date.toLocaleDateString('fr-FR');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {} as Record<string, TimelineEvent[]>);

    return grouped;
  }, [filteredEvents, viewMode]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'evidence':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        );
      case 'event':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
        );
      case 'analysis':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case 'witness':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-500 border-red-600';
      case 'high':
        return 'bg-orange-500 border-orange-600';
      case 'medium':
        return 'bg-blue-500 border-blue-600';
      case 'low':
        return 'bg-gray-500 border-gray-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    const types = {
      evidence: 'Évidence',
      event: 'Événement',
      analysis: 'Analyse',
      witness: 'Témoignage'
    };
    return types[type as keyof typeof types] || type;
  };

  const handleEventClick = (event: TimelineEvent) => {
    if (onEventSelect) {
      onEventSelect(event);
    }
  };

  const renderEvent = (event: TimelineEvent, isSelected: boolean) => (
    <div
      key={event.id}
      onClick={() => handleEventClick(event)}
      className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md'
          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full border-2 ${getImportanceColor(event.importance)}`}></div>
        <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
      </div>

      {/* Event content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1 rounded ${getImportanceColor(event.importance)} text-white`}>
              {getEventIcon(event.type)}
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {getTypeLabel(event.type)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {event.time}
          </div>
        </div>

        <h4 className="text-sm font-semibold text-gray-900 mt-1">
          {event.title}
        </h4>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {event.description}
        </p>

        {event.location && (
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            {event.location}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Timeline Interactive ({filteredEvents.length} événements)
        </h3>

        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('chronological')}
              className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                viewMode === 'chronological'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Chronologique
            </button>
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                viewMode === 'grouped'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Par jour
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'événement
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Tous les types</option>
            <option value="evidence">Évidences</option>
            <option value="event">Événements</option>
            <option value="analysis">Analyses</option>
            <option value="witness">Témoignages</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Importance
          </label>
          <select
            value={filterImportance}
            onChange={(e) => setFilterImportance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Toutes les importances</option>
            <option value="critical">Critique</option>
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>
        </div>
      </div>

      {/* Timeline content */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun événement trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">Modifiez vos critères de filtrage.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {viewMode === 'chronological' ? (
            filteredEvents.map(event => 
              renderEvent(event, selectedEventId === event.id)
            )
          ) : (
            Object.entries(groupedEvents).map(([date, dayEvents]) => (
              <div key={date} className="border rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {new Date(dayEvents[0].date).getDate()}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {date}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {dayEvents.length} événement{dayEvents.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 ml-11">
                  {dayEvents.map((event: TimelineEvent) => 
                    renderEvent(event, selectedEventId === event.id)
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveTimeline;
