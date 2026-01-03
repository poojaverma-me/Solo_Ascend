import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, UserPlus, LogIn } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Login = ({ onLogin, onSignUp }) => {
  const { isDark } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full p-12 text-center relative z-10"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-electric-purple to-electric-purple-light rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_12px_40px_rgba(139,92,246,0.3)] group">
          <Zap className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="space-y-3 mb-12">
          <h1 className={cn("text-5xl font-black uppercase tracking-tighter transition-colors", isDark ? "text-white" : "text-slate-900")}>
            Solo <span className="text-electric-purple italic">Ascend</span>
          </h1>
          <p className={cn("text-[10px] font-black uppercase tracking-[0.6em] transition-colors", isDark ? "text-slate-200" : "text-slate-500")}>
            Internal Matrix Protocol
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin(false)} 
            className="btn-primary w-full flex items-center justify-center gap-4 group"
          >
            <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="uppercase tracking-[0.2em] text-sm">Initialize System</span>
          </button>

          <button 
            onClick={onSignUp} 
            className="w-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-bold py-4 rounded-2xl transition-all border border-slate-200 dark:border-white/10 uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3"
          >
            <UserPlus className="w-4 h-4 text-emerald-500" />
            New Player Awakening
          </button>

          <div className="relative py-6">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/5" /></div>
             <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest"><span className="bg-slate-50 dark:bg-obsidian/40 backdrop-blur-md rounded-full px-4 py-1 text-slate-400 dark:text-slate-300">Sovereign Override</span></div>
          </div>

          <button 
            onClick={() => {
              const guestUser = {
                name: "SUNG JIN-WOO",
                attributes: { strength: 65, agility: 46, intelligence: 78 },
                credentials: "System-assigned shadow sovereign bypass.",
                customAttributes: []
              };
              localStorage.setItem('solo-player', JSON.stringify(guestUser));
              onLogin(false);
            }} 
            className={cn("w-full transition-all uppercase text-[10px] font-black tracking-[0.4em] italic py-2", isDark ? "text-white/60 hover:text-electric-purple" : "text-slate-400 hover:text-electric-purple")}
          >
            Guest Sovereign Access
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40">
           <span>Core Matrix Optimal</span>
           <span className="text-emerald-500">Encrypted</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
