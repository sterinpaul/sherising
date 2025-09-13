import { useEffect, useState } from "react";

const Loader = () => {
  const [bars, setBars] = useState([
    { height: 60, isUp: true },
    { height: 40, isUp: false },
    { height: 80, isUp: true },
    { height: 50, isUp: true },
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prevBars => 
        prevBars.map(bar => {
          const newHeight = Math.random() * 80 + 20;
          const isUp = newHeight > bar.height;
          return { height: newHeight, isUp };
        })
      );
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
      <div className="bg-gray-800 rounded-xl p-4 shadow-xl absolute top-1/2 left-1/2 -translate-1/2">
        <div className="flex items-end space-x-2 h-12">
          {bars.map((bar, index) => (
            <div
              key={index}
              className={`w-2 rounded-t-xs transition-all duration-700 ease-in-out ${
                bar.isUp ? 'bg-lime-300' : 'bg-red-500'
              }`}
              style={{ height: `${bar.height}%` }}
            ></div>
          ))}
        </div>
      </div>
  );
};

export default Loader;