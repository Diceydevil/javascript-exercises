import { useState, useEffect } from "react";
function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  return (
    <footer className="border-t border-black bg-gray-50 px-4 py-3">
      <div className="flex justify-between items-center max-w-screen mx-auto">
        {/* Left section - Action buttons */}
        <div className="flex gap-2">
          <button className="bg-black text-white px-3 py-1.5 rounded text-sm hover:bg-gray-800">
            Export
          </button>
          <button className="bg-gray-200 px-3 py-1.5 rounded text-sm hover:bg-gray-300">
            Settings
          </button>
        </div>

        {/* Center section - Info */}
        <div className="text-sm text-gray-600">
          Total Projects: {/* pass count as prop */}
        </div>

        {/* Right section - Time */}
        <div className="text-sm text-gray-600">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
