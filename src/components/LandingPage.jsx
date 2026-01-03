import { useRef, useState } from 'react'; // Added useState
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Target, ChevronRight, Play, Star, TrendingUp, Brain, Users, Pause } from 'lucide-react'; // Added Pause
import { useTheme } from './ThemeContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const LandingPage = ({ onStart }) => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const featuresRef = useRef(null); // Ref for "Read Protocol" scroll target
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToProtocol = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={cn("absolute inset-0 bg-gradient-to-b transition-colors duration-700", isDark ? "from-obsidian via-slate-950 to-black" : "from-slate-50 via-white to-slate-100")} />
        <div className="absolute top-0 left-0 w-full h-[800px] bg-electric-purple/10 blur-[120px] rounded-full translate-y-[-50%]" />
        <div className="absolute bottom-0 right-0 w-full h-[600px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-[30%]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-electric-purple rounded-lg flex items-center justify-center transform rotate-3 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
               <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className={cn("font-black text-xl tracking-tighter uppercase italic", isDark ? "text-white" : "text-slate-900")}>Solo <span className="text-electric-purple">Ascend</span></span>
        </div>
        <button 
          onClick={onStart}
          className="group relative px-6 py-2.5 overflow-hidden rounded-xl bg-electric-purple text-white font-bold tracking-wider uppercase text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Initialize System <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-electric-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn("text-[10px] uppercase tracking-[0.2em] font-bold", isDark ? "text-white/60" : "text-slate-500")}>System Protocol V4.2 Online</span>
          </div>
          
          <h1 className={cn("text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]", isDark ? "text-white" : "text-slate-900")}>
            Gamify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-emerald-400">Existence</span>
          </h1>
          
          <p className={cn("text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-80", isDark ? "text-slate-300" : "text-slate-600")}>
            Transform your daily habits into quests. Earn XP, level up your stats, and transcend your limits. The System is waiting for you, Player.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-slate-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3"
            >
              <Play className="w-4 h-4 fill-black" /> Begin Ascent
            </button>
            <button 
              onClick={scrollToProtocol}
              className={cn("w-full sm:w-auto px-8 py-4 bg-transparent border-2 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-white/5 flex items-center justify-center gap-3", isDark ? "border-white/20 text-white" : "border-slate-900/10 text-slate-900")}>
               Read Protocol
            </button>
          </div>
        </motion.div>

        {/* Hero Visual / Placeholder Video UI */}
        <motion.div 
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-24 w-full max-w-5xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-purple via-emerald-400 to-electric-purple rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition-opacity duration-1000 animate-gradient-x" />
          <div className={cn("relative rounded-[1.8rem] border overflow-hidden shadow-2xl aspect-video flex items-center justify-center bg-black/80 backdrop-blur-xl group", isDark ? "border-white/10" : "border-slate-200")}>
            
            {/* Functional Video Player */}
            <video 
              ref={videoRef}
              className="w-full h-full object-cover opacity-80"
              poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
              loop
              playsInline
              onClick={toggleVideo} // Click video to toggle
            >
              <source src="https://media.istockphoto.com/id/1364366601/video/futuristic-hud-user-interface.mp4?s=mp4-640x640-is&k=20&c=6h4Z8O-yGvj2e_yD7m6kG8J2g_1j_3J6j4_8h9_6k7g=" type="video/mp4" />
              {/* Fallback for video source if stock one invalid - using a reliable tech background placeholder */}
            </video>

            {/* Overlay UI - Hides when playing */}
            <div className={cn("absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 bg-black/40", isPlaying ? "opacity-0 pointer-events-none" : "opacity-100")}>
                <div className="text-center space-y-4 relative z-10">
                  <button 
                    onClick={toggleVideo}
                    className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto transition-transform hover:scale-110 cursor-pointer backdrop-blur-sm bg-white/5 group-hover:border-electric-purple/50"
                  >
                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                  </button>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">Initiate Tutorial Sequence</p>
                </div>
            </div>

            {/* Pause Overlay (Optional, only shows on hover when playing) */}
            {isPlaying && (
               <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={toggleVideo} className="p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/10">
                     <Pause className="w-5 h-5 fill-white" />
                  </button>
               </div>
            )}

            {/* Top Bar UI */}
            <div className="absolute top-0 w-full h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-black/60 backdrop-blur-sm z-20">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-green-500/50" />
               </div>
               <div className="mx-auto text-[10px] font-mono text-white/30 tracking-widest uppercase">system_tutorial_override.mp4</div>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className={cn("py-32 px-6 md:px-12 relative", isDark ? "bg-black/20" : "bg-slate-50")}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <FeatureCard 
             icon={Target}
             title="Daily Quests"
             desc="Define your objectives. Complete them to earn XP. Consistency is your weapon."
             isDark={isDark}
           />
           <FeatureCard 
             icon={TrendingUp}
             title="Rank Ascension"
             desc="Level up your stats: Strength, Intellect, Willpower. Watch your E-Rank status crumble."
             isDark={isDark}
           />
           <FeatureCard 
             icon={Shield}
             title="History Tracking"
             desc="Review your past performance. Visualize your streak and maintain your momentum."
             isDark={isDark}
           />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
         <p className={cn("text-[10px] uppercase tracking-[0.3em] font-bold opacity-40", isDark ? "text-white" : "text-slate-900")}>
           Solo Ascend • Sovereign Matrix V4.2 • {new Date().getFullYear()}
         </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, isDark }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={cn(
      "p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group",
      isDark ? "bg-white/5 border-white/5 hover:border-electric-purple/50" : "bg-white border-slate-200 hover:border-electric-purple/50 shadow-xl shadow-slate-200/50"
    )}
  >
    <div className="absolute top-0 right-0 p-32 bg-electric-purple/5 rounded-full blur-3xl group-hover:bg-electric-purple/10 transition-colors" />
    <div className="w-12 h-12 rounded-2xl bg-electric-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-electric-purple" />
    </div>
    <h3 className={cn("text-xl font-black uppercase tracking-tight mb-3", isDark ? "text-white" : "text-slate-900")}>{title}</h3>
    <p className={cn("text-sm font-medium leading-relaxed opacity-70", isDark ? "text-slate-300" : "text-slate-600")}>{desc}</p>
  </motion.div>
);

export default LandingPage;
