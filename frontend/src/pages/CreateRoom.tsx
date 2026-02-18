import React, { useState, useEffect } from 'react';
import { Image, X, Edit, Trash2, Eye, Plus, Save, FolderOpen, ChevronRight, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Types
interface Module {
  id: string;
  name: string;
  content: string;
}

interface Room {
  id: string;
  image?: string;
  name: string;
  description: string;
  category: string;
  modulesCount: number;
  modules: Module[];
  enrolledUsers: number;
  createdAt: Date;
}

// Mock initial rooms
const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Cybersecurity 101',
    description: 'Learn the basics of cybersecurity',
    category: 'Technology',
    modulesCount: 5,
    modules: [
      { id: 'm1', name: 'Introduction', content: 'What is cybersecurity?' },
      { id: 'm2', name: 'Threats', content: 'Common threats and attacks' },
    ],
    enrolledUsers: 24,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'UI/UX Design',
    description: 'Master user interface design',
    category: 'Design',
    modulesCount: 8,
    modules: [
      { id: 'm3', name: 'Color Theory', content: 'Basics of colors' },
    ],
    enrolledUsers: 42,
    createdAt: new Date(),
  },
];

const CreateRoom: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModules, setShowModules] = useState(false);

  // Form state
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [modulesCount, setModulesCount] = useState(1);
  const [modules, setModules] = useState<Module[]>([]);

  // Reset form for new room
  const resetForm = () => {
    setImage('');
    setName('');
    setDescription('');
    setCategory('');
    setModulesCount(1);
    setModules([]);
    setSelectedRoom(null);
    setShowModules(false);
  };

  // Load room data into form for editing
  const loadRoom = (room: Room) => {
    setSelectedRoom(room);
    setImage(room.image || '');
    setName(room.name);
    setDescription(room.description);
    setCategory(room.category);
    setModulesCount(room.modulesCount);
    setModules(room.modules);
    setShowModules(true);
  };

  // Handle create room
  const handleCreateRoom = () => {
    if (!name || !description || !category) {
      alert('Please fill all required fields');
      return;
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      image: image || 'https://via.placeholder.com/150',
      name,
      description,
      category,
      modulesCount,
      modules: modules.length > 0 ? modules : Array.from({ length: modulesCount }).map((_, i) => ({
        id: `new-${Date.now()}-${i}`,
        name: `Module ${i + 1}`,
        content: '',
      })),
      enrolledUsers: 0,
      createdAt: new Date(),
    };

    setRooms([...rooms, newRoom]);
    loadRoom(newRoom); // Load into form and show modules
  };

  // Handle update room
  const handleUpdateRoom = () => {
    if (!selectedRoom) return;
    const updated: Room = {
      ...selectedRoom,
      image,
      name,
      description,
      category,
      modulesCount,
      modules,
    };
    setRooms(rooms.map(r => r.id === selectedRoom.id ? updated : r));
    setSelectedRoom(updated);
    alert('Room updated (mock)');
  };

  // Handle delete room
  const handleDeleteRoom = () => {
    if (!selectedRoom) return;
    if (window.confirm(`Are you sure you want to delete "${selectedRoom.name}"?`)) {
      setRooms(rooms.filter(r => r.id !== selectedRoom.id));
      resetForm();
    }
  };

  // Update module field
  const updateModule = (id: string, field: 'name' | 'content', value: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // Generate module fields based on count
  useEffect(() => {
    if (modulesCount > modules.length) {
      const newModules = [...modules];
      for (let i = modules.length; i < modulesCount; i++) {
        newModules.push({
          id: `module-${Date.now()}-${i}`,
          name: `Module ${i + 1}`,
          content: '',
        });
      }
      setModules(newModules);
    } else if (modulesCount < modules.length) {
      setModules(modules.slice(0, modulesCount));
    }
  }, [modulesCount]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Create Room
        </h1>
        <button
          onClick={() => setShowSidebar(true)}
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg transition transform hover:scale-105"
        >
          <Eye className="h-5 w-5" />
          <span>View Rooms</span>
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-gradient-to-br from-white to-blue-50 dark:from-dark-card dark:to-blue-900/20 rounded-3xl shadow-2xl border border-blue-200 dark:border-blue-800 p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                Room Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-400 dark:border-blue-600 shadow-inner">
                  {image ? (
                    <img src={image} alt="preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Image className="h-10 w-10 text-blue-600 dark:text-blue-300" />
                  )}
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow-md">
                  Upload (mock)
                </button>
              </div>
            </div>

            {/* Room Name */}
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Room Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Cybersecurity Masterclass"
                className="w-full p-3 border border-blue-300 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Category <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Technology, Design"
                className="w-full p-3 border border-blue-300 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="What is this room about?"
                className="w-full p-3 border border-blue-300 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Number of Modules */}
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Number of Modules
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={modulesCount}
                onChange={(e) => setModulesCount(parseInt(e.target.value) || 1)}
                className="w-28 p-3 border border-blue-300 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Author Field (placeholder, will be auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Author
              </label>
              <input
                type="text"
                placeholder="Author (auto-filled)"
                disabled
                className="w-full p-3 border border-blue-300 dark:border-blue-700 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Author will be set automatically based on your account.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-8 mt-4 border-t border-blue-200 dark:border-blue-700">
          <button
            onClick={handleCreateRoom}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Room</span>
          </button>
          <button
            onClick={handleUpdateRoom}
            disabled={!selectedRoom}
            className={`px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center space-x-2 ${
              !selectedRoom ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
            }`}
          >
            <Save className="h-5 w-5" />
            <span>Update Room</span>
          </button>
          <button
            onClick={handleDeleteRoom}
            disabled={!selectedRoom}
            className={`px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center space-x-2 ${
              !selectedRoom ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
            }`}
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete Room</span>
          </button>
          {/* New Room button to reset form */}
          <button
            onClick={resetForm}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center space-x-2"
          >
            <FileText className="h-5 w-5" />
            <span>New Room</span>
          </button>
        </div>
      </div>

      {/* Modules Section */}
      {showModules && (
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-dark-card dark:to-blue-900/20 rounded-3xl shadow-2xl border border-blue-200 dark:border-blue-800 p-8 mt-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-800 dark:text-blue-200">
            <FolderOpen className="h-6 w-6 text-blue-600 mr-2" />
            Modules
          </h2>
          <div className="space-y-6">
            {modules.map((module, idx) => (
              <div
                key={module.id}
                className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 rounded-xl border border-blue-300 dark:border-blue-600 shadow-lg hover:shadow-xl transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Module {idx + 1} Name
                    </label>
                    <input
                      type="text"
                      value={module.name}
                      onChange={(e) => updateModule(module.id, 'name', e.target.value)}
                      className="w-full p-3 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Content
                    </label>
                    <textarea
                      value={module.content}
                      onChange={(e) => updateModule(module.id, 'content', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-blue-700 dark:text-blue-300 flex items-center space-x-1 hover:underline">
                    <Plus className="h-4 w-4" /> <span>Add image/link (mock)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar for viewing rooms */}
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={() => setShowSidebar(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-4/5 md:w-3/5 lg:w-2/5 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950 shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto rounded-l-3xl border-l-4 border-blue-500`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-4 -mx-6 -mt-6 rounded-tl-3xl">
                <h2 className="text-2xl font-bold flex items-center">
                  <FolderOpen className="h-6 w-6 mr-2" />
                  My Rooms
                </h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 mt-6">
                {rooms.map(room => (
                  <div
                    key={room.id}
                    className="group relative bg-white dark:bg-dark-card rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-200 dark:border-blue-700 transform hover:-translate-y-1"
                    onClick={() => {
                      loadRoom(room);
                      setShowSidebar(false);
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {room.image ? <img src={room.image} alt="" className="w-full h-full object-cover rounded-xl" /> : room.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 dark:text-dark-text truncate text-lg">{room.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{room.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 space-x-3">
                          <span className="flex items-center">👥 {room.enrolledUsers}</span>
                          <span className="flex items-center">📚 {room.modulesCount} modules</span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                            {room.category}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 rounded-lg shadow-md p-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          loadRoom(room);
                          setShowSidebar(false);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded transition"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete "${room.name}"?`)) {
                            setRooms(rooms.filter(r => r.id !== room.id));
                            if (selectedRoom?.id === room.id) resetForm();
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateRoom;