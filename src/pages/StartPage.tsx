function StartPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#213547]">
            <h1 className="text-4xl font-bold mb-6 text-white">Welcome to the Smart Restaurant</h1>
            <p className="text-lg text-gray-300 mb-8">Experience the future of dining with our innovative table management system.</p>
            <a href="/reservations" className="px-6 py-3 bg-gray-600 !text-white hover:!text-white rounded-lg hover:bg-gray-500 transition duration-200">
                View Table Plan
            </a>
        </div>
    );
}

export default StartPage;