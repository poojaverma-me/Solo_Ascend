import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Dumbbell, Zap, Target, Book, Heart, Users, Rocket, ShieldCheck, Star, X, Plus } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ATTRIBUTE_OPTIONS = [
  { id: 'strength', label: 'Strength', icon: Dumbbell, color: 'text-red-500' },
  { id: 'agility', label: 'Agility', icon: Zap, color: 'text-blue-500' },
  { id: 'intelligence', label: 'Intelligence', icon: Brain, color: 'text-emerald-500' },
  { id: 'willpower', label: 'Willpower', icon: ShieldCheck, color: 'text-purple-500' },
  { id: 'focus', label: 'Focus', icon: Target, color: 'text-yellow-500' },
  { id: 'knowledge', label: 'Knowledge', icon: Book, color: 'text-cyan-500' },
  { id: 'vitality', label: 'Vitality', icon: Heart, color: 'text-rose-500' },
  { id: 'charisma', label: 'Charisma', icon: Users, color: 'text-pink-500' },
  { id: 'creativity', label: 'Creativity', icon: Rocket, color: 'text-orange-500' },
];

const Onboarding = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [name, setName] = useState('');
  const [credentials, setCredentials] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState(['strength', 'agility', 'intelligence']);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [newCustomAttr, setNewCustomAttr] = useState('');

  const toggleAttribute = (id) => {
    if (selectedAttributes.includes(id)) {
      if (selectedAttributes.length > 1) {
        setSelectedAttributes(selectedAttributes.filter(a => a !== id));
      }
    } else {
      setSelectedAttributes([...selectedAttributes, id]);
    }
  };

  const addCustomAttribute = () => {
    if (!newCustomAttr.trim()) return;
    const id = newCustomAttr.toLowerCase().replace(/\s+/g, '-');
    if (ATTRIBUTE_OPTIONS.some(a => a.id === id) || customAttributes.some(a => a.id === id)) {
      alert("Attribute already exists!");
      return;
    }
    const newAttr = { id, label: newCustomAttr };
    setCustomAttributes([...customAttributes, newAttr]);
    setSelectedAttributes([...selectedAttributes, id]);
    setNewCustomAttr('');
  };

  const handleComplete = () => {
    if (!name.trim()) return;
    const attributesState = {};
    selectedAttributes.forEach(attr => {
      attributesState[attr] = 0;
    });
    onComplete({ 
      name, 
      credentials: credentials || "A new player seeking transcendence.", 
      attributes: attributesState,
      customAttributes: customAttributes 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-20 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-3xl w-full p-10 md:p-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-purple/10 blur-[120px] pointer-events-none" />
        
        <div className="text-center mb-16 space-y-2">
           <h2 className={cn("text-5xl font-black uppercase tracking-tighter italic transition-colors", isDark ? "text-white" : "text-slate-900")}>Player Awakening</h2>
           <p className="text-[10px] font-black text-electric-purple uppercase tracking-[0.6em] opacity-80">Matrix Initialization Protocol</p>
        </div>
        
        <div className="space-y-16">
          {/* Identity Section */}
          <div className="space-y-8">
            <h3 className={cn("text-[11px] font-black uppercase tracking-[0.4em] border-b border-slate-200 dark:border-white/5 pb-4 flex items-center gap-4 transition-colors", isDark ? "text-slate-200" : "text-slate-400")}>
               <span className="w-8 h-[1px] bg-slate-200 dark:bg-white/10" /> Identity Configuration
             </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Player Designation</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SUNG JIN-WOO"
                  className="w-full bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-5 outline-none focus:border-electric-purple/40 transition-all font-bold text-lg text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Declaration of Intent</label>
                <textarea 
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  placeholder="Personal credentials..."
                  className="w-full bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-5 outline-none focus:border-electric-purple/40 transition-all font-bold text-sm text-slate-600 dark:text-slate-300 h-[68px] resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Attributes Selection */}
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-slate-200 dark:border-white/5 pb-4">
              <h3 className={cn("text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-4 transition-colors", isDark ? "text-slate-200" : "text-slate-400")}>
                <span className="w-8 h-[1px] bg-slate-200 dark:bg-white/10" /> Matrix Attributes
              </h3>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{selectedAttributes.length} Awakened</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...ATTRIBUTE_OPTIONS, ...customAttributes].map((attr) => {
                const isSelected = selectedAttributes.includes(attr.id);
                const IconComp = attr.icon || Star;
                return (
                  <button
                    key={attr.id}
                    onClick={() => toggleAttribute(attr.id)}
                    className={cn(
                      "p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group relative overflow-hidden",
                      isSelected 
                        ? 'bg-slate-100 dark:bg-electric-purple/10 border-electric-purple shadow-[0_8px_20px_rgba(139,92,246,0.1)]' 
                        : 'bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 shadow-sm'
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/5 transition-transform group-hover:scale-110",
                      isSelected ? attr.color : 'text-slate-300 dark:text-slate-700'
                    )}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                    )}>
                      {attr.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Manifest Custom */}
            <div className="relative mt-6">
              <input 
                value={newCustomAttr} 
                onChange={e => setNewCustomAttr(e.target.value)} 
                placeholder="Manifest Custom Attribute..." 
                className="w-full bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-6 pr-44 outline-none focus:border-electric-purple/40 text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-inner"
              />
              <button 
                onClick={addCustomAttribute}
                className="absolute right-3 top-3 bottom-3 bg-slate-900 dark:bg-white text-white dark:text-black font-black px-8 rounded-xl text-[9px] transition-all uppercase tracking-widest hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                Manifest
              </button>
            </div>
          </div>

          <button 
            disabled={!name.trim() || selectedAttributes.length < 1}
            onClick={handleComplete}
            className="btn-primary w-full disabled:opacity-20 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-4"
          >
            <span className="uppercase tracking-[0.5em] text-sm">Finalize Awakening</span>
            <ShieldCheck className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
