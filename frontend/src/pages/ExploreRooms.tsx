            import  { useState, useMemo } from "react";
            import { NavLink, useNavigate } from "react-router-dom";
            import {
            Home,
            BookOpen,
            Users,
            Settings,
            Bell,
            Search,
            Menu,
            X,
            Sun,
            Moon,
            ChevronLeft,
            ChevronRight,
            Calendar1,
            } from "lucide-react";
            import { Button } from "../components/ui/button";

            export default function ExploreRooms() {
            interface TechField {
                id: string;
                title: string;
                instructor: string;
                description: string;
                level: "Beginner" | "Intermediate" | "Advanced";
                students: number;
                image: string;
            }

            const navigate = useNavigate();

            const [sidebarOpen, setSidebarOpen] = useState(true);
            const [darkMode, setDarkMode] = useState(false);
            const [search, setSearch] = useState("");
            const [sortBy, setSortBy] = useState("title");
            const [currentPage, setCurrentPage] = useState(1);

            const itemsPerPage = 6;

                const techFields: TechField[] = [
                    {
                    id: "1",
                    title: "Cybersecurity Fundamentals",
                    instructor: "Darksage",
                    description: "Learn ethical hacking and CTF basics.",
                    level: "Beginner",
                    students: 120,
                    image: "https://source.unsplash.com/400x300/?cybersecurity",
                    },
                    {
                    id: "2",
                    title: "Full Stack MERN",
                    instructor: "Jane Dev",
                    description: "React, Node, Express & MongoDB mastery.",
                    level: "Intermediate",
                    students: 210,
                    image: "https://source.unsplash.com/400x300/?programming",
                    },
                    {
                    id: "3",
                    title: "AI & Machine Learning",
                    instructor: "Alex Data",
                    description: "Build ML systems using Python.",
                    level: "Advanced",
                    students: 340,
                    image: "https://source.unsplash.com/400x300/?artificial-intelligence",
                    },
                    {
                    id: "4",
                    title: "Cloud Computing",
                    instructor: "CloudMaster",
                    description: "AWS, Azure and DevOps pipelines.",
                    level: "Intermediate",
                    students: 180,
                    image: "https://source.unsplash.com/400x300/?cloud",
                    },
                ];

                // FILTER + SORT
                const filteredAndSorted = useMemo(() => {
                    const filtered = techFields.filter((field) => {
                    const searchTerm = search.toLowerCase();
                    return (
                        field.title.toLowerCase().includes(searchTerm) ||
                        field.instructor.toLowerCase().includes(searchTerm) ||
                        field.level.toLowerCase().includes(searchTerm)
                    );
                    });
                
                    // Create the copy and sort it
                    return [...filtered].sort((a, b) => {
                    switch (sortBy) {
                        case "students":
                        return b.students - a.students;
                        default:
                        return a.title.localeCompare(b.title);
                    }
                    });
                }, [search, sortBy, techFields]); // Added techFields to deps just in case it's not static

            // PAGINATION
            const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

            const paginatedData = filteredAndSorted.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            );

            return (
                <div className={darkMode ? "dark" : ""}>
                <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

                    {/* SIDEBAR */}
                    <aside
                    className={`bg-blue-900 text-white h-screen transition-all duration-300 ${
                        sidebarOpen ? "w-64" : "w-20"
                    }`}
                    >
                    <div className="flex items-center justify-between p-4 border-b border-blue-800">
                        {sidebarOpen && (
                        <h1 className="text-xl font-bold">TechLab</h1>
                        )}
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>

                    <nav className="p-4 space-y-3">
                        <NavLink
                        to="/"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800"
                        >
                        <Home size={20} />
                        {sidebarOpen && <span>Dashboard</span>}
                        </NavLink>

                        <NavLink
                        to="/chatroom"
                        className="flex items-center space-x-3 p-3 rounded-lg bg-blue-800"
                        >
                        <BookOpen size={20} />
                        {sidebarOpen && <span>Chat rooms</span>}
                        </NavLink>

                        <NavLink
                        to="/users"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800"
                        >
                        <Users size={20} />
                        {sidebarOpen && <span>Users</span>}
                        </NavLink>

                        <NavLink
                        to="/calendar"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800"
                        >
                        <Calendar1 size={20} />
                        {sidebarOpen && <span>Calendar</span>}
                        </NavLink>

                        <NavLink
                        to="/settings"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800"
                        >
                        <Settings size={20} />
                        {sidebarOpen && <span>Settings</span>}
                        </NavLink>
                    </nav>
                    </aside>

                    {/* MAIN */}
                    <div className="flex-1 flex flex-col">

                    {/* TOPBAR */}
                    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
                        <div className="flex items-center space-x-4">

                        <div className="relative w-72">
                            <Search
                            className="absolute left-3 top-3 text-gray-400"
                            size={18}
                            />
                            <input
                            type="text"
                            placeholder="Search fields..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <select
                        aria-label="Sort rooms by category"
                            value={sortBy}
                            onChange={(e) => {
                            setSortBy(e.target.value);
                            setCurrentPage(1);
                            }}
                            className="border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="title">Sort by Title</option>
                            <option value="students">Sort by Students</option>
                            <option value="level">Sort by Level</option>
                        </select>
                        </div>

                        <div className="flex items-center space-x-5">
                        <button onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <Sun /> : <Moon />}
                        </button>
                        <Bell />
                        </div>
                    </header>

                    {/* CARDS */}
                    <main className="p-6 flex-1 bg-blue-300">
                        {paginatedData.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                            No fields found.
                        </div>
                        ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                            {paginatedData.map((field) => (
                            <div
                                key={field.id}
                                onClick={() => navigate(`/field/${field.id}`)}
                                className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                            >
                                <img
                                src={field.image}
                                alt={field.title}
                                className="h-40 w-full object-cover rounded-t-xl"
                                />

                                <div className="p-4 space-y-2">
                                <h3 className="text-xl font-bold dark:text-white">
                                    {field.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Instructor: {field.instructor}
                                </p>

                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-blue-600">
                                    {field.level}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                    {field.students} students
                                    </span>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 space-x-4">
                            <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                            >
                            <ChevronLeft />
                            </Button>

                            <span className="dark:text-white">
                            Page {currentPage} of {totalPages}
                            </span>

                            <Button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                            >
                            <ChevronRight />
                            </Button>
                        </div>
                        )}
                    </main>
                    </div>
                </div>
                </div>
            );
            }