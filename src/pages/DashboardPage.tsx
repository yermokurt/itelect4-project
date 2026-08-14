import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { User } from '../types/index';

const mockUser: User = {
  id: 1,
  name: "Kurt Yermo",
  email: "kurt@example.com",
  role: "student",
  isActive: true,
};

const DashboardPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-8 my-auto py-6">
      {/* Hero Welcome Section */}
      <div className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 p-8 sm:p-12 rounded-2xl shadow-lg transition-colors duration-300 ease-in-out text-center flex flex-col items-center gap-4">
        <div className="w-full flex justify-center mb-2">
          <UserCard user={mockUser} />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-800 dark:text-orange-50 transition-colors duration-300 ease-in-out">
          Welcome to <span className="text-teal-600 dark:text-teal-400">Campus Lost & Found</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed transition-colors duration-300 ease-in-out">
          Your centralized platform to report lost possessions, register items you've found on campus, and connect items with their rightful owners safely and efficiently.
        </p>
      </div>

      {/* Centered Hero Action Card */}
      <div className="max-w-xl mx-auto w-full">
        <Link
          to="/items"
          className="group bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 flex flex-col justify-between text-left gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-teal-100/70 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 rounded-xl flex items-center justify-center text-2xl border border-teal-600/30 dark:border-teal-400/30 transition-colors duration-300 ease-in-out">
              📦
            </div>
            <span className="text-stone-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 text-lg transition-colors duration-300">
              →
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-800 dark:text-orange-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 ease-in-out">
              Browse Lost & Found Items
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed transition-colors duration-300 ease-in-out">
              Search through campus inventory, filter by lost or found status, and check details on reported items.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
