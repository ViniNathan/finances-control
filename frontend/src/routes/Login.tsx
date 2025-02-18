import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ReturnButton from '../components/ReturnButton';
import { useNavigate } from 'react-router';

const Login = () => {
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        await login(email, password);
        setEmail('');
        setPassword('');
        // Redirect to the dashboard
        navigate('/dashboard');
      } catch (err) {
        // Error handling is done in the useAuth hook
      }
    };

  return (
    <>
    <ReturnButton />
    <div className="h-[100dvh] w-screen flex justify-center items-center bg-bg py-20">
        <div className="flex flex-col justify-center items-center gap-10">
            <div className="text-6xl text-center font-bold text-primary">FinTrack</div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-4xl text-center font-semibold">Welcome back!</div>
              <div className="text-4xl text-center font-semibold"> Glad to see you.</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-[90vw] md:w-[30rem]">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-black px-4 py-3 rounded-3xl text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary text-black rounded-3xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                             placeholder-gray-400 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary text-black rounded-3xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                             placeholder-gray-400 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 px-4 bg-primary hover:bg-dark-green text-dark hover:text-bg font-semibold  text-lg
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
                  'Login'
                )}
              </button>
            </form>
            <div className="text-md">
                Don't have an account? <a href="/register"><span className="text-dark-green font-bold">Register now</span></a>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login