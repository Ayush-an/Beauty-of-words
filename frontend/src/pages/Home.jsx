import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen pt-24 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[var(--color-brand-light)] dark:bg-[var(--color-brand-dark)]">

      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">

        {/* Logo */}
        <div className="mx-auto w-40 h-24 flex items-center justify-center">
          <img
            src="/Logo1.jpg"
            alt="Beauty of Words Logo"
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Tagline */}
        <span className="inline-block py-1 px-4 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[var(--color-accent)] text-sm font-semibold tracking-wider uppercase">
          The Art of Language
        </span>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
          Beauty of <span className="text-[var(--color-accent)] italic">Words</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Discover the profound impact of language. Explore curated quotes,
          evocative poetry, and beautiful concepts from cultures around the world.
        </p>

        {/* Buttons */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-8 py-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login to Explore
              </Link>

              <Link
                to="/signup"
                className="px-8 py-4 rounded-full border-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold hover:border-accent hover:text-accent transition-all duration-300"
              >
                Create Account
              </Link>
            </>
          ) : (
            <Link
              to="/explore"
              className="px-10 py-4 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Back to Explore →
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;