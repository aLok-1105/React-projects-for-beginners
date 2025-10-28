const WearableIntegration = () => {
    const handleConnectFitbit = () => {
        window.location.href = 'http://localhost:3001/auth/fitbit';
    };
    
    const handleConnectGoogle = () => {
        window.location.href = 'http://localhost:3001/auth/google';
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500 p-3 rounded-full">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-watch"><circle cx="12" cy="12" r="6"/><path d="M12 18a6 6 0 1 0 0-12h1a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-1Z"/><path d="M12 22v-4M12 6V2"/></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Connect a Wearable</h3>
                        <p className="text-gray-300 mt-1">Sync your data from Fitbit or Google Fit.</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-y-3">
                <button onClick={handleConnectFitbit} className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Connect with Fitbit
                </button>
                <button onClick={handleConnectGoogle} className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Connect with Google Fit
                </button>
            </div>
        </div>
    );
};

export default WearableIntegration;
