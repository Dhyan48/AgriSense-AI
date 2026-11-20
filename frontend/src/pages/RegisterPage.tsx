import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/shared/Navbar';
import { FormField } from '../components/shared/FormField';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { ApiError } from '../services/api';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6 rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-8">
          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-[var(--text-muted)]">
              Set up your AgriSense AI profile to run models and store prediction history[cite: 1].
            </p>
          </div>

          {serverError && <Alert variant="error">{serverError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField label="Full Name" htmlFor="name" error={errors.name?.message} required>
              <Input
                id="name"
                type="text"
                placeholder="Dhyan H"
                hasError={!!errors.name}
                {...register('name')}
              />
            </FormField>

            <FormField label="Email Address" htmlFor="email" error={errors.email?.message} required>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                hasError={!!errors.email}
                {...register('email')}
              />
            </FormField>

            <FormField
              label="Password"
              htmlFor="password"
              helperText="Minimum 6 characters. Stored securely with one-way hashing[cite: 1]."
              error={errors.password?.message}
              required
            >
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  hasError={!!errors.password}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </FormField>

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)]">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-[#285442] dark:text-[#D6F36A] underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};