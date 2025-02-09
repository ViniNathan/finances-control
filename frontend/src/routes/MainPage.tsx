

const MainPage = () => {

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center py-10 bg-stone-900">
        <div className="text-5xl font-mono font-bold text-white">FINANCES CONTROL</div>
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <form className="flex flex-col gap-4 w-[30vw]">
                    <input
                    type="text"
                    placeholder="Username"
                    className="px-4 py-2 bg-gray-100 rounded-md"
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-2 bg-gray-100 rounded-md"
                    />
                    <button
                    className="px-4 py-2 bg-green-700 text-white rounded-md"
                    type="submit"
                    >
                    Login
                    </button>
                </form>
        </div>
    </div>
  );
};

export default MainPage;

