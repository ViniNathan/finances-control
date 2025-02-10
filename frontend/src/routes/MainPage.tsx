import mainImage from '../assets/main_image.png';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-800 to-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={mainImage} 
          alt="Main" 
          className="object-cover w-full h-[max] opacity-70 object-top" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/70 to-stone-900"></div>
      </div>

      {/* Container principal */}
      <div className="relative min-h-screen flex flex-col justify-end md:justify-center items-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          {/* Título */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-2 md:mb-4 tracking-tight">
              FINANCES CONTROL
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Manage your finances simply and efficiently
            </p>
          </div>

          {/* Formulário */}
          <div className="flex flex-col justify-center bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 md:p-8 shadow-xl gap-4">
            <a className='bg-amber-50 border-1 text-2xl font-bold py-2 text-black rounded-lg cursor-pointer text-center' href='/login'>Login</a>
            <a className='bg-transparent border-1 text-2xl font-bold py-2 text-white rounded-lg cursor-pointer text-center' href='/login'>Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;