import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);

    login('fake-jwt-token', {
      id: 1,
      name: formattedName,
      email: `${formattedName.toLowerCase()}@dlsl.edu.ph`,
      role: 'student',
      isActive: true,
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
            <Label htmlFor="name" className="text-foreground">
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Kurt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 border-stone-300 bg-orange-50/50 px-4 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-10 w-full bg-teal-600 text-xs text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
          >
            Enter System
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
