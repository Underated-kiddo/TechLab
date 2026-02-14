    import { useNavigate } from "react-router-dom";
    import { Button } from "../components/ui/button";
    import SignupSignIn from "./Signup-SignIn";

    export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-blue-950 text-blue-300">
        <nav className="flex justify-between items-center px-8 py-6 border-b border-blue-900">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            TechLab
            </h2>
            <div className="flex gap-4">
            <Button
                onClick={() => navigate("/about")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                About
            </Button>
            <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-blue-700 text-blue-300 hover:bg-blue-900"
            >
                Login
            </Button>
            <Button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                Sign Up
            </Button>
            </div>
        </nav>

        <section className="px-8 py-20 max-w-5xl mx-auto text-center bg-blue-900">
            <h1 className="text-4xl font-bold mb-6 leading-tight text-blue-200">
            Level up your tech game - Teach ,Learn , Connect .
            </h1>
            <p className="text-xl text-blue-300/80 mb-12 max-w-2xl mx-auto">
            Join a community of Tech enthusiasts sharing knowledge and skills . Build your network, learn from others,
            and grow together.
            </p>
            <div className="flex gap-4 justify-center">
            <Button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg text-white"
            >
                Sign-up now 
            </Button>
            <Button
                variant="outline"
                onClick={() => navigate("/About")}
                className="border-blue-600 text-blue-300 hover:bg-blue-900 px-8 py-3 text-lg"
            >
                Explore Platform
            </Button>
            </div>
        </section>

        <section className="px-8 py-20 bg-blue-900/40 backdrop-blur">
            <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-blue-200">
                Why  Join TechLab?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">

            <div className="p-6 bg-blue-900/60 rounded-lg border border-blue-800 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">👨‍💻</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">
                    Peer to peer Learning
                </h3>
                <p className="text-blue-300/80">
                    Learn directly from fellow tech enthusiasts , create or join and learn from modules taught by the real practitioners  with the same passions.
                </p>
                </div>

                <div className="p-6 bg-blue-900/60 rounded-lg border border-blue-800 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">
                    Connect & Grow  Networks
                </h3>
                <p className="text-blue-300/80">
                    Meet passionate developers, designers, and tech enthusiasts from
                    around the world.
                </p>
                </div>

                <div className="p-6 bg-blue-900/60 rounded-lg border border-blue-800 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">⌨️</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">
                    Hands on Sessions
                </h3>
                <p className="text-blue-300/80">
                    Practice real commands and code directly in your browser no setup required - just jump in and begin.
                </p>
                </div>

                <div className="p-6 bg-blue-900/60 rounded-lg border border-blue-800 hover:border-blue-500 transition">
                <div className="text-4xl mb-4">🖥️</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">
                    Explore your Interests in The World of Tech
                </h3>
                <p className="text-blue-300/80">
                    Discover fields that you want in the vast world of technology, pursue and become a master in the field.
                </p>
                </div>
            </div>
            </div>
        </section>

        <section className="px-8 py-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-200">
            Ready to Join Community?
            </h2>
            <p className="text-lg text-blue-300/80 mb-10">
            Start connecting with the tech enthusiastic community today and unlock endless
            opportunities for learning and growth.
            </p>
            <Button
            onClick={() => navigate("/Dashboard")}
            className="bg-blue-600 hover:bg-blue-700 px-12 py-4 text-lg text-white"
            >
            Get Started →
            </Button>
        </section>

        <footer className="border-t border-blue-900 px-8 py-8 text-center text-blue-400">
            <p>&copy; 2026 TechLab. Built by techies, for techies.</p>
        </footer>
        </div>
    );
    }