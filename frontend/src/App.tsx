    import { useNavigate } from "react-router-dom";
    import { Button } from "./components/ui/button";

    export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-700">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            TechLab
            </h2>
            <div className="flex gap-4">
            <Button
                variant="outline"
                onClick={() => navigate("/connect")}
                className="border-slate-600 hover:bg-slate-700"
            >
                Login
            </Button>
            <Button
                onClick={() => navigate("/profile")}
                className="bg-blue-600 hover:bg-blue-700"
            >
                Sign Up
            </Button>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="px-8 py-20 max-w-5xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
            Connect with Techies,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Share Skills
            </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            The home of all techies to connect and share skills with each other
            without having to pay a dime. Build your network, learn from others,
            and grow together.
            </p>
            <div className="flex gap-4 justify-center">
            <Button
                onClick={() => navigate("/profile")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            >
                Get Started
            </Button>
            <Button
                variant="outline"
                onClick={() => navigate("/connect")}
                className="border-slate-400 text-white hover:bg-slate-700 px-8 py-3 text-lg"
            >
                Explore Community
            </Button>
            </div>
        </section>

        {/* Features Section */}
        <section className="px-8 py-20 bg-slate-800/50 backdrop-blur">
            <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
                Why TechLab?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3">Connect & Network</h3>
                <p className="text-slate-300">
                    Meet passionate developers, designers, and tech enthusiasts from
                    around the world.
                </p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-3">Share Knowledge</h3>
                <p className="text-slate-300">
                    Learn from experts, share your experience, and grow your skills
                    in a collaborative environment.
                </p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">100% Free</h3>
                <p className="text-slate-300">
                    No subscriptions, no hidden fees. Everything you need to connect
                    and learn is completely free.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
            <p className="text-lg text-slate-300 mb-10">
            Start connecting with the tech community today and unlock endless
            opportunities for learning and growth.
            </p>
            <Button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 hover:bg-blue-700 px-12 py-4 text-lg"
            >
            Sign Up Now
            </Button>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700 px-8 py-8 text-center text-slate-400">
            <p>&copy; 2026 TechLab. Built by techies, for techies.</p>
        </footer>
        </div>
    );
    }