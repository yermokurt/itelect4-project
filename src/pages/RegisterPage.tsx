import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "../api/auth";
import { ApiError } from "../api/client";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center py-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
        <div className="text-center">
          <div className="w-12 h-12 bg-teal-100/70 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl border border-teal-600/30 dark:border-teal-400/30">
            📝
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-teal-600 dark:text-teal-400 transition-colors duration-300 ease-in-out">
            Create an Account
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 transition-colors duration-300 ease-in-out">
            Join the Campus Lost &amp; Found system
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
              Full name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Kurt Yermo"
              value={name}
              autoComplete="name"
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
              className="h-10 border-stone-300 bg-orange-50/50 px-4 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <Label htmlFor="email" className="text-foreground">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. kurt@dlsl.edu.ph"
              value={email}
              autoComplete="email"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 border-stone-300 bg-orange-50/50 px-4 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              autoComplete="new-password"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 border-stone-300 bg-orange-50/50 px-4 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-10 w-full bg-teal-600 text-xs text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 disabled:opacity-60"
          >
            {isLoading ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-xs text-stone-500 dark:text-stone-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
