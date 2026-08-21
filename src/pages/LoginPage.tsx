import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Simple validation: Ensure they typed something
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    // Format the name nicely (e.g., "kurt" -> "Kurt")
    const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);

    // Pass the name and generate a fake email so the TS interface doesn't complain
    login('fake-jwt-token', {
      id: 1,
      name: formattedName,
      email: `${formattedName.toLowerCase()}@campus.edu`,
    });

    navigate('/');
  };

  return (
    <div className="flex flex-1 items-center justify-center py-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
        <div className="text-center">
          <div className="w-12 h-12 bg-teal-100/70 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl border border-teal-600/30 dark:border-teal-400/30">
            👋
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-teal-600 dark:text-teal-400 transition-colors duration-300 ease-in-out">
            Welcome to Campus Lost & Found
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 transition-colors duration-300 ease-in-out">
            Enter your name to browse and manage campus items
          </p>
        </div>

        {errorMessage && (
          <div className="bg-rose-100 border border-rose-300 dark:bg-rose-950/60 dark:border-rose-800 text-rose-700 dark:text-rose-400 p-3 rounded-lg text-xs font-medium text-center transition-colors duration-300 ease-in-out">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors duration-300 ease-in-out">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Kurt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-orange-50/50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-stone-800 dark:text-orange-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 transition-colors duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm transition-colors duration-300 ease-in-out mt-2"
          >
            Enter System
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
