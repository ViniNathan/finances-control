import logo from '../assets/logo_light.png';
import money from '../assets/money.png';

const MainPage = () => {
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
          <ul className="text text-dark list-disc list-inside">
            <li>Track your incomes and expenses</li>
            <li>Visualize by category</li>
            <li>Analyze spending trends over time</li>
          </ul>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex flex-col justify-center items-center gap-6">
          <img src={money} alt="money" className="size-100"/>
          <a className="text-center bg-primary text-dark font-bold w-64 py-3 rounded-3xl shadow-lg hover:bg-opacity-80 transition text-xl" href="/login">
            Log In
          </a>
          <a className="text-center bg-secondary text-dark font-bold w-64 py-3 rounded-3xl shadow-lg hover:bg-opacity-80 transition text-xl" href="/register">
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
};

export default MainPage;
