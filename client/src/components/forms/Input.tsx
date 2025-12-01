import type { FieldError, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
}

export const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  disabled = false,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm text-left font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...register(id)}
        type={type}
        id={id}
        disabled={disabled}
        className={`
          mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 
          text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
          }
        `}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};