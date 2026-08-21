import { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

const Layout = () => {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAuthAction = () => {
    if (token) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-stone-950 text-stone-800 dark:text-orange-50 font-sans transition-colors duration-300 ease-in-out flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col min-h-screen gap-6 flex-1">
        {/* Header / Navbar */}
        <header className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-md p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300 ease-in-out">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400 transition-colors duration-300 ease-in-out">
                CAMPUS LOST & FOUND
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 transition-colors duration-300 ease-in-out">
                Campus Inventory System
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="md:hidden px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white transition-colors duration-300 ease-in-out"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <nav className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive
                    ? 'bg-teal-600 text-white dark:bg-teal-700'
                    : 'text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive
                    ? 'bg-teal-600 text-white dark:bg-teal-700'
                    : 'text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`
              }
            >
              Browse Items
            </NavLink>
            <NavLink
              to="/claims"
              className={({ isActive }) =>
                `text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
                  isActive
                    ? 'bg-teal-600 text-white dark:bg-teal-700'
                    : 'text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`
              }
            >
              My Claims
            </NavLink>
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-orange-50 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors duration-300 ease-in-out"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            {user && (
              <span className="text-xs font-medium px-2 py-1 bg-teal-100/60 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-600/30 dark:border-teal-400/30 rounded-md transition-colors duration-300 ease-in-out">
                👤 {user.name}
              </span>
            )}

            <button
              onClick={handleAuthAction}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm transition-colors duration-300 ease-in-out"
            >
              {token ? 'Logout' : 'Login'}
            </button>
          </nav>
        </header>

        {/* Main Content View */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 border-t border-stone-300 dark:border-stone-800 text-center text-xs text-stone-500 dark:text-stone-400 transition-colors duration-300 ease-in-out">
          <p>© 2026 Campus Lost & Found System</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
