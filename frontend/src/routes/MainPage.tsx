import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';
import logo from '../assets/logo_light.png';
import money from '../assets/money.png';

const MainPage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Track your incomes and expenses",
      description: "Keep detailed records of all your financial movements in one place"
    },
    {
      title: "Visualize by category",
      description: "Get insights into your spending patterns with intuitive category breakdowns"
    },
    {
      title: "Analyze spending trends over time",
      description: "Make informed decisions with comprehensive historical analysis"
    }
  ];

  return (
    <>
      {/* Mobile Layout */}
      <div className="min-h-[100dvh] bg-bg flex flex-col justify-center items-center py-4 md:hidden">
        <div className="flex flex-col justify-center items-center gap-4 w-[90vw] text-center">
          <img src={logo} alt="logo" className="size-20"/>
          <div className="text-5xl font-bold text-primary">FinTrack</div>
          <p className="text-lg font-semibold text-dark">
            Track your expenses and manage your budget
          </p>
          <div className="flex flex-col justify-center items-center gap-5 w-full text-xl">
            <button className="bg-primary text-dark font-bold w-full py-3 rounded-3xl shadow-md hover:bg-opacity-80 transition">
              <a href="/login">Log In</a>
            </button>
            <button className="bg-secondary text-dark font-bold w-full py-3 rounded-3xl shadow-md hover:bg-opacity-80 transition">
              <a href="/register">Sign Up</a>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 md:min-h-screen md:bg-bg md:px-16 md:py-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-end gap-4">
            <img src={logo} alt="logo" className="size-24"/>
            <div className="text-6xl font-bold text-primary">FinTrack</div>
          </div>
          <p className="text-2xl font-semibold text-dark max-w-lg">
            Track your expenses and manage your budget efficiently.
          </p>
        
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 group transition-all duration-300 hover:transform hover:translate-x-2">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-dark">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex flex-col justify-center items-center gap-6">
          <img src={money} alt="money" className="size-100"/>
          <button className="text-center bg-primary text-dark font-bold w-64 py-3 rounded-3xl shadow-lg hover:bg-opacity-80 transition text-xl" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="text-center bg-secondary text-dark font-bold w-64 py-3 rounded-3xl shadow-lg hover:bg-opacity-80 transition text-xl" onClick={() => navigate('/register')}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPage;