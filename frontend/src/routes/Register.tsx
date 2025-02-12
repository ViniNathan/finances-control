import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import ReturnButton from '../components/ReturnButton';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { register, loading, error: authError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name length must be at least 3 characters';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Your password must be at least 6 characters long';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Register error', err);
      setErrors(prev => ({ ...prev, email: "Email already registered" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
      <ReturnButton />
      <div className="h-screen w-screen flex justify-center items-center bg-bg py-20">
        <div className="flex flex-col justify-center items-center gap-5 md:gap-10">
          <div className="text-6xl text-center font-bold text-primary">FinTrack</div>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="text-4xl text-center font-semibold">Create an account.</div>
            <div className="text-4xl text-center font-semibold">Start your journey!</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-[90vw] md:w-[30rem]">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-secondary text-black rounded-3xl 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           placeholder-gray-400 transition-all
                           ${errors.name ? 'border-2 border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-secondary text-black rounded-3xl 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           placeholder-gray-400 transition-all
                           ${errors.email ? 'border-2 border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-secondary text-black rounded-3xl 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           placeholder-gray-400 transition-all
                           ${errors.password ? 'border-2 border-red-500' : ''}`}
                  placeholder="Enter your password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-secondary text-black rounded-3xl 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           placeholder-gray-400 transition-all
                           ${errors.confirmPassword ? 'border-2 border-red-500' : ''}`}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 px-4 bg-primary hover:bg-dark-green text-dark hover:text-bg font-semibold text-lg
                       rounded-3xl transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:hover:bg-stone-600 cursor-pointer shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0A4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <div className="text-md">
            Already have an account? <a href="/login"><span className="text-dark-green font-bold">Login now</span></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;