import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import type { SignupRequest } from '../../types/auth.types';
import { Input } from '../forms/Input';
import { Alert } from '../alerts/Alert';
import { Button } from '../buttons/Button';

const signupSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

type SignupFormData = yup.InferType<typeof signupSchema>;

export const SignupForm: React.FC = () => {
  // Our custom hook for authentication
  const { signup, authState } = useAuth();

  // React Hook Form setup for validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {

      // Getting values from the form
      const signupData: SignupRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await signup(signupData);
      reset();
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

      {authState.isSuccess && (
        <Alert
          type="success"
          message="Account created successfully! You can now log in."
        />
      )}

      {authState.error && (
        <Alert type="error" message={authState.error} />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="">

        <Input
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Cofirm your password"
          register={register}
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          isLoading={authState.isLoading}
          loadingText="Creating Account..."
          variant="primary"
          fullWidth={true}
          className="mt-4 py-2.5"
        >
          Create Account
        </Button>

      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>

  );
};