import { appStore } from '@/lib/store'
import { useStore } from '@tanstack/react-store'
import { useState, useEffect } from 'react'; // 1. Added useEffect

export default function Header() {
  const focusMode = useStore(appStore, (s) => s.focusMode)
  const [time, setTime] = useState(new Date());

  // 2. Set up the interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Updates every second

    // 3. Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${focusMode ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
        <div className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between border-b border-black/[0.03] bg-[#FAFAFA]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 font-sans text-sm tracking-wide">
            <div className="w-8 h-8 bg-[#0E4D47] flex items-center justify-center text-white font-bold">L</div>
            <span className="hidden md:inline cursor-pointer" onClick={() => {}}>LEONHARDBREUER.DE</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-400">
             {/* 4. Display the formatted time */}
             <span>Aschaffenburg: {time.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
             <span className="text-[#0E4D47] font-bold animate-pulse">● ACTIVE</span>
          </div>
        </div>
      </header>
    </>
  )
}
