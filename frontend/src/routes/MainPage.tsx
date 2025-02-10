import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const MainPage = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Clean inputs after login
      setEmail('');
      setPassword('');
    } catch (err) {
      // Error handling is done in the useAuth hook
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-10 bg-stone-900">
      <h1 className="text-5xl font-mono font-bold text-white text-center mb-8">FINANCES CONTROL</h1>
      
      <div className="w-full max-w-md px-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          
          <button
            className={`px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;