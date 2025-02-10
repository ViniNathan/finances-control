import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
        setEmail('');
        setPassword('');
      } catch (err) {
        // Error handling is done in the useAuth hook
      }
    };

  return (
    <div className="h-screen w-screen bg-stone-200 py-20">
        <div className="flex flex-col justify-center items-center gap-10">
            <div className="text-4xl text-center">
                Welcome back! Glad to see you.
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-gray-600 text-white rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                             placeholder-gray-400 transition-all"
                    placeholder="Digite seu email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-gray-600 text-white rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                             placeholder-gray-400 transition-all"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium 
                         rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 
                         disabled:cursor-not-allowed disabled:hover:bg-green-600"
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
            <div className="text-sm">
                Don't have an account? <a href="/register">Register now</a>
            </div>
        </div>
    </div>
  )
}

export default Login