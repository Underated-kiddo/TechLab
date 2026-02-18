import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, X, Calendar as CalendarIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
}

const Calendar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: '2026-02-15', title: 'Call peer' },
    { id: '2', date: '2026-02-18', title: 'Connect with mentor' },
    { id: '3', date: '2026-02-22', title: 'Group study' },
    { id: '4', date: '2026-02-05', title: 'Team meeting' },
  ]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDay(dateStr);
    setEditingEvent(null);
    setNewEventTitle('');
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (!selectedDay || !newEventTitle.trim()) return;
    const newEvent: Event = {
      id: Date.now().toString(),
      date: selectedDay,
      title: newEventTitle.trim(),
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setEditingEvent(null);
    setShowEventModal(false);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent || !newEventTitle.trim()) return;
    setEvents(events.map(e => e.id === editingEvent.id ? { ...e, title: newEventTitle } : e));
    setEditingEvent(null);
    setNewEventTitle('');
    setShowEventModal(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
      if (editingEvent?.id === id) {
        setEditingEvent(null);
        setNewEventTitle('');
      }
    }
  };

  const openEditEvent = (event: Event) => {
    setSelectedDay(event.date);
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setShowEventModal(true);
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Calendar
        </h1>
        <div className="flex items-center space-x-3 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-blue-200 dark:border-blue-800">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-semibold text-gray-800 dark:text-dark-text min-w-[160px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl shadow-2xl border border-blue-200 dark:border-blue-800 overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 auto-rows-fr p-2 gap-2">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-blue-100 dark:border-blue-900/30" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`min-h-[120px] bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                  isToday 
                    ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-900/50' 
                    : 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600'
                }`}
              >
                <div className="p-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-lg font-bold ${
                      isToday 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {day}
                    </span>
                    <button
                      onClick={() => handleDayClick(day)}
                      className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[70px] overflow-y-auto scrollbar-thin">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className="group relative bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 p-2 rounded-lg text-xs shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-blue-800 dark:text-blue-100 truncate flex-1">
                            {event.title}
                          </span>
                          <div className="flex space-x-1 ml-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditEvent(event); }}
                              className="p-1 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-700 rounded transition"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                              className="p-1 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-700 rounded transition"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => {
          setSelectedDay(`${year}-${String(month+1).padStart(2,'0')}-01`);
          setShowEventModal(true);
        }}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-20"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Event Modal */}
      {showEventModal && selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up border border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </h3>
              <button onClick={() => setShowEventModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-800 dark:text-gray-200 font-medium">{selectedDay}</span>
              </div>
            </div>

            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              autoFocus
            />

            <div className="flex space-x-3">
              {editingEvent ? (
                <>
                  <button
                    onClick={handleUpdateEvent}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(editingEvent.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddEvent}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
                >
                  Add Event
                </button>
              )}
            </div>

            {/* List of existing events for this day */}
            {!editingEvent && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Events on this day:</h4>
                {events.filter(e => e.date === selectedDay).length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No events yet.</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {events.filter(e => e.date === selectedDay).map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium">{event.title}</span>
                        <div className="flex space-x-2">
                          <button onClick={() => openEditEvent(event)} className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteEvent(event.id)} className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;