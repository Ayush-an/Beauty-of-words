import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
  ];

  // Only show these if logged in
  if (isLoggedIn) {
    navLinks.push({ name: "Profile", path: "/profile" });
  }

  // Only show if Admin
  if (userRole === 'admin') {
    navLinks.push({ name: "Create", path: "/create" });
    navLinks.push({ name: "Admin Dashboard", path: "/admin-dashboard" });
  }

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#121212]/80 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-20 w-30 overflow-hidden rounded-md flex items-center justify-center bg-white">
              <img
                src="/Logo2.png"
                alt="Beauty of Words Logo"
                className="h-30 w-30 object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2"></div>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-full bg-accent text-white dark:bg-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
              >
                Logout
              </button>
            )}

            {userRole !== 'admin' && (
              <Link
                to="/login"
                onClick={() => { /* This would be a specialized admin login in a real app */ }}
                className="ml-2 px-5 py-2.5 rounded-full border-2 border-accent text-accent text-sm font-bold hover:bg-accent hover:text-white dark:hover:text-neutral-900 transition-all duration-300"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button could go here, omitting for simplicity unless requested */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Login</Link>
            <div className="h-8 w-8 rounded-full border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
              <span className="text-[10px] font-bold">...</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;