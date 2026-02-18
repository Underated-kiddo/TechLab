import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import CreateRoom from "./CreateRoom";
import {
  Users,
  MessageSquare,
  Calendar as CalendarIcon,
  TrendingUp,
  Clock,
  Star,
  Activity,
  Home,
  User,
  PlusCircle,
  Settings,
  LogOut,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  X,
  Search,
  Bell,
  ChevronDown,
  HelpCircle,
  Sun,
  Moon,
  Menu
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-dark-bg dark:to-gray-900 transition-colors duration-300 flex">
      <LocalSidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onMobileOpen={setMobileSidebarOpen}
        isDesktop={isDesktop}
      />
      
      {/* Main content - No margin needed on desktop when using flex layout */}
      <div className="flex-1 flex flex-col min-h-screen">
        <LocalHeader onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <DashboardContent />
          </div>
        </main>
      </div>
    </div>
  );
};


interface LocalSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileOpen: (open: boolean) => void;
  isDesktop: boolean;
}

const LocalSidebar: React.FC<LocalSidebarProps> = ({ 
  collapsed, 
  onCollapse, 
  mobileOpen, 
  onMobileOpen,
  isDesktop
}) => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' },
    { path: '/chat', icon: <MessageSquare size={20} />, label: 'Chat' },
    { path: '/create-room', icon: <PlusCircle size={20} />, label: 'Create Room' },
    { path: '/explore-rooms', icon: <PlusCircle size={20} />, label: 'Explore Rooms' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/Calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { path: '/reports', icon: <FileText size={20} />, label: 'Reports' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && !(event.target as Element).closest('.sidebar-container')) {
        onMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen, onMobileOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => onMobileOpen(false)}
        />
      )}

      {/* Sidebar - Fixed height issue by using inset-0 on desktop */}
      <div 
        className={`sidebar-container 
          ${mobileOpen ? 'fixed' : 'hidden lg:flex'}
          ${isDesktop ? 'sticky top-0' : 'fixed top-0 left-0'}
          h-screen
          bg-gradient-to-b from-blue-800 to-blue-900 
          dark:from-blue-900 dark:to-blue-950 
          text-white 
          transition-all duration-300 z-40
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : 'lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Mobile close button */}
        {mobileOpen && (
          <div className="absolute top-4 right-4 lg:hidden">
            <button 
              onClick={() => onMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {/* Logo and collapse button */}
        <div className="p-4 border-b border-blue-700 dark:border-blue-800 flex-shrink-0">
          <div className={`flex items-center justify-between ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                TechLab
              </h1>
            )}
            {/* Collapse button - hidden on mobile, shown on desktop */}
            <button
              onClick={() => onCollapse(!collapsed)}
              className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors hidden lg:block"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation - This will take available space */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onMobileOpen(false);
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-700 dark:bg-blue-800 shadow-inner' 
                        : 'hover:bg-blue-700/50 dark:hover:bg-blue-800/50'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button - Fixed at bottom */}
        <div className="p-4 border-t border-blue-700 dark:border-blue-800 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Log Out</span>}
          </button>
        </div>
      </div>
    </>
  );
};


interface LocalHeaderProps {
  onMenuClick?: () => void;
}

const LocalHeader: React.FC<LocalHeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    const titles: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/profile': 'My Profile',
      '/chat': 'Messages',
      '/create-room': 'Create Room',
      '/explore-rooms': 'Explore Rooms',
      '/settings': 'Settings',
      '/analytics': 'Analytics',
      '/calendar': 'Calendar',
      '/reports': 'Reports'
    };
    return titles[path] || 'Dashboard';
  };

  const notifications = [
    { id: 1, title: 'New message from Alex', time: '2 min ago', read: false },
    { id: 2, title: 'Room "Design Team" has started', time: '15 min ago', read: false },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
      if (!(event.target as Element).closest('.notifications-dropdown')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border">
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Menu button and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                onMenuClick?.();
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-dark-text">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                Welcome to your workspace
              </p>
            </div>
          </div>

          {/* Right section - Search and icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search bar - hidden on mobile, shown on medium+ */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages, rooms, or users..."
                className="pl-10 pr-4 py-2 w-48 lg:w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Theme toggle - hidden on mobile, shown on medium+ */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </button>

            {/* Help button */}
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Notifications */}
            <div className="relative notifications-dropdown">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-dark-border z-50 animate-slide-up">
                  <div className="p-4 border-b border-gray-200 dark:border-dark-border">
                    <h3 className="font-semibold text-gray-800 dark:text-dark-text">Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800 dark:text-dark-text">{n.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="User menu"
              >
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm md:text-base">
                    JD
                  </div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-card"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="font-medium text-gray-800 dark:text-dark-text">John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Member</p>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 hidden lg:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-dark-border z-50 animate-slide-up">
                  <div className="p-4 border-b border-gray-200 dark:border-dark-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                        JD
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-dark-text">John Doe</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <a
                      href="/profile"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Settings</span>
                    </a>
                    <a
                      href="/profile"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Help & Support</span>
                    </a>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-dark-border">
                    <button
                      onClick={() => { window.location.href = '/'; }}
                      className="w-full text-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium py-2 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar - shown only on mobile when menu is open */}
        {isMobileMenuOpen && (
          <div className="mt-4 lg:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

/* ---------------- Dashboard Content ---------------- */

const DashboardContent: React.FC = () => {
  const stats = [
    { label: 'Interacting Users', value: '1,234', icon: <Users />, change: '+12%', color: 'bg-blue-500' },
    { label: 'My Rooms', value: '48', icon: <MessageSquare />, change: '+8%', color: 'bg-green-500' },
    { label: 'Messages Today', value: '2,847', icon: <Activity />, change: '+23%', color: 'bg-purple-500' },
    { label: 'Engagement Rate', value: '78%', icon: <TrendingUp />, change: '+5%', color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { user: 'Alex Johnson', action: 'created a new room', time: '2 min ago' },
    { user: 'Sam Wilson', action: 'joined "Design Team"', time: '15 min ago' },
    { user: 'Taylor Swift', action: 'shared a file', time: '1 hour ago' },
    { user: 'Chris Evans', action: 'started a video call', time: '2 hours ago' },
  ];

  const topRooms = [
    { name: 'General Chat', members: 245, messages: '1.2k' },
    { name: 'Design Team', members: 89, messages: '890' },
    { name: 'Project Alpha', members: 156, messages: '756' },
    { name: 'Support Group', members: 342, messages: '2.1k' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="text-blue-100">Here's what's happening with your dashboard today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              <CalendarIcon className="inline mr-2" size={20} />
              Schedule Meeting
            </button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-dark-card rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 md:p-3 rounded-xl ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-dark-text mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-dark-card rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-dark-text">
              Recent Activity
            </h2>
            <Clock className="text-blue-500" size={20} />
          </div>
          <div className="space-y-3 md:space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-800 dark:text-dark-text">
                    {activity.user}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2 truncate">
                    {activity.action}
                  </span>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rooms */}
        <div className="bg-white dark:bg-dark-card rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-dark-text">
              Top Rooms
            </h2>
            <Star className="text-yellow-500" size={20} />
          </div>
          <div className="space-y-3 md:space-y-4">
            {topRooms.map((room, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30"
              >
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-800 dark:text-dark-text truncate">
                    {room.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      👥 {room.members} members
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      💬 {room.messages} messages
                    </span>
                  </div>
                </div>
                <button className="px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors duration-300 whitespace-nowrap ml-2">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 md:p-6 border border-blue-200 dark:border-blue-800/30">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-dark-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Start Chat', icon: '💬', color: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Schedule', icon: '📅', color: 'bg-green-100 dark:bg-green-900/30' },
            { label: 'Invite', icon: '👥', color: 'bg-purple-100 dark:bg-purple-900/30' },
            { label: 'Analytics', icon: '📊', color: 'bg-orange-100 dark:bg-orange-900/30' },
          ].map((action, index) => (
            <button
              key={index}
              className={`${action.color} p-3 md:p-4 rounded-xl flex flex-col items-center justify-center space-y-1 md:space-y-2 hover:scale-105 transition-transform duration-300 border border-transparent hover:border-blue-300 dark:hover:border-blue-700`}
            >
              <span className="text-xl md:text-2xl">{action.icon}</span>
              <span className="font-medium text-gray-800 dark:text-dark-text text-sm md:text-base">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;