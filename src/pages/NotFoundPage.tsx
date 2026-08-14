import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-2xl shadow-xl transition-colors duration-300 ease-in-out my-auto">
      <div className="text-6xl mb-4 font-mono font-bold text-teal-600 dark:text-teal-400">404</div>
      <h1 className="text-2xl font-bold text-stone-800 dark:text-orange-50 mb-2 transition-colors duration-300 ease-in-out">
        Page Not Found
      </h1>
      <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-6 transition-colors duration-300 ease-in-out">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm transition-colors duration-300 ease-in-out"
      >
        Go to Login Page
      </button>
    </div>
  );
};

export default NotFoundPage;
