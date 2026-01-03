import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Dumbbell, 
  Zap, 
  Brain, 
  Plus, 
  Check, 
  Camera, 
  Moon, 
  Sun,
  X,
  Target,
  History as HistoryIcon,
  Shield,
  Star,
  Users,
  Rocket,
  Heart,
  Book,
  User as UserIcon,
  LogOut,
  Settings,
  Flame,
  ChevronRight,
  ChevronLeft,
  Edit2,
  Save,
  Trash2,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import History from './History';
// SystemAdvisor removed
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay } from 'date-fns';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DEFAULT_ATTRIBUTES = [
  { id: 'strength', label: 'Strength', icon: Dumbbell, color: 'text-red-500', barColor: 'bg-red-500' },
  { id: 'agility', label: 'Agility', icon: Zap, color: 'text-blue-500', barColor: 'bg-blue-500' },
  { id: 'intelligence', label: 'Intelligence', icon: Brain, color: 'text-emerald-500', barColor: 'bg-emerald-500' },
  { id: 'willpower', label: 'Willpower', icon: Shield, color: 'text-purple-500', barColor: 'bg-purple-500' },
  { id: 'focus', label: 'Focus', icon: Target, color: 'text-yellow-500', barColor: 'bg-yellow-500' },
  { id: 'knowledge', label: 'Knowledge', icon: Book, color: 'text-cyan-500', barColor: 'bg-cyan-500' },
  { id: 'vitality', label: 'Vitality', icon: Heart, color: 'text-rose-500', barColor: 'bg-rose-500' },
  { id: 'charisma', label: 'Charisma', icon: Users, color: 'text-pink-500', barColor: 'bg-pink-500' },
  { id: 'creativity', label: 'Creativity', icon: Rocket, color: 'text-orange-500', barColor: 'bg-orange-500' },
];

const getRankTitle = (totalXp) => {
  if (totalXp < 10000) return "E-Rank Hunter";
  if (totalXp < 20000) return "D-Rank Hunter";
  if (totalXp < 30000) return "C-Rank Hunter";
  if (totalXp < 40000) return "B-Rank Hunter";
  if (totalXp < 50000) return "A-Rank Hunter";
  if (totalXp < 100000) return "S-Rank Hunter";
  if (totalXp < 250000) return "National Level Hunter";
  return "Shadow Monarch";
};

const getLevelName = (level) => {
  const names = {
    1: "The World's Weakest",
    2: "Double Dungeon Survivor",
    3: "System Awakening",
    4: "Trial Participant",
    5: "D-Rank Raider",
    6: "Daily Quest Finisher",
    7: "Instance Dungeon Crawler",
    8: "Steel Fang Slayer",
    9: "Skill Master",
    10: "Necromancer Initiate",
    11: "Lord of Shadows",
    12: "Red Gate Pioneer",
    13: "Demon Castle Ascendant",
    14: "High Orc Conqueror",
    15: "Jeju Island Hero",
    16: "Giant Slayer",
    17: "Monarch's Vessel",
    18: "Kamish Hunter",
    19: "Shadow Sovereign",
    20: "The Absolute Sovereign"
  };
  return names[level] || (level > 20 ? "Legendary Monarch" : "System User");
};

const WeeklyStats = ({ history }) => {
  const { isDark } = useTheme();
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart, { weekStartsOn: 1 })
  });

  const goToPreviousWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  const goToNextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 h-full flex flex-col group/stats">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className={cn("text-xl font-bold tracking-tight transition-colors", isDark ? "text-white" : "text-slate-900")}>
              Weekly Ascension
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-white/5 dark:bg-black/20 p-1 rounded-2xl border border-slate-200 dark:border-white/5 backdrop-blur-sm">
             <button onClick={goToPreviousWeek} className="p-2 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all rounded-xl">
               <ChevronLeft className="w-4 h-4" />
             </button>
             <span className="text-[11px] font-bold uppercase tracking-widest px-4 text-slate-500 dark:text-white/80">
               {format(currentWeekStart, 'MMM dd')} - {format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), 'MMM dd')}
             </span>
             <button onClick={goToNextWeek} className="p-2 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all rounded-xl">
               <ChevronRight className="w-4 h-4" />
             </button>
          </div>
       </div>

       <div className="flex-grow grid grid-cols-7 gap-2 sm:gap-4 items-end min-h-[180px]">
          {weekDays.map((day, i) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayData = history.find(h => h.date === dateStr);
            const completion = dayData ? dayData.completion : 0;
            const isTodayDay = isSameDay(day, new Date());

            return (
              <div key={i} className="flex flex-col items-center gap-4 group relative h-full justify-end">
                <div className="relative w-full flex flex-col items-center justify-end h-full min-w-[30px]">
                    {/* Track */}
                    <div className="w-full bg-slate-200/50 dark:bg-white/[0.03] rounded-2xl absolute inset-0 -z-10" />
                    
                    {/* Progress Bar */}
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${completion}%` }}
                     className={cn(
                       "w-full rounded-2xl transition-all duration-700 relative shadow-sm",
                       completion >= 100 
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                        : "bg-gradient-to-t from-electric-purple to-electric-purple-light opacity-80"
                     )}
                   >
                     {/* Tooltip on hover */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black bg-slate-900 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl z-20 pointer-events-none whitespace-nowrap">
                       {completion}% COMPLETED
                     </div>
                   </motion.div>
                </div>
                <div className="text-center space-y-1">
                   <p className={cn(
                     "text-[10px] font-bold tracking-widest uppercase transition-colors", 
                     isTodayDay ? "text-emerald-500 underline underline-offset-4 decoration-2" : "text-slate-400 dark:text-slate-400"
                   )}>
                     {format(day, 'EEE')}
                   </p>
                </div>
              </div>
            );
          })}
       </div>
    </motion.div>
  );
};

const Dashboard = ({ user, setUser, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  
  // Player Stats State
  const [playerState, setPlayerState] = useState(() => {
    const saved = localStorage.getItem(`solo-player-data-${user.name}`);
    const data = saved ? JSON.parse(saved) : {
      name: user.name,
      credentials: user.credentials || "A player seeking to transcend limits.",
      level: 1,
      xp: 0,
      totalXp: (user.totalXp || 0),
      streakGoal: 7,
      attributes: user.attributes, // Map of {id: value}
      customAttributes: user.customAttributes || [] // Array of {id, label}
    };
    // Ensure numeric values are valid
    if (typeof data.totalXp !== 'number' || isNaN(data.totalXp)) data.totalXp = 0;
    if (typeof data.xp !== 'number' || isNaN(data.xp)) data.xp = 0;
    if (typeof data.level !== 'number' || isNaN(data.level)) data.level = 1;

    return data;
  });

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem(`solo-habits-${user.name}`);
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Morning Run', type: Object.keys(playerState.attributes)[0] || 'strength', completed: false },
    ];
  });
  
  const [avatar, setAvatar] = useState(() => localStorage.getItem(`solo-avatar-${user.name}`) || null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(`solo-history-${user.name}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showStats, setShowStats] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  
  // Account Editing States
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [editName, setEditName] = useState(playerState.name);
  const [editCreds, setEditCreds] = useState(playerState.credentials);
  const [newCustomAttr, setNewCustomAttr] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(`solo-habits-${user.name}`, JSON.stringify(habits));
    localStorage.setItem(`solo-avatar-${user.name}`, avatar || '');
    localStorage.setItem(`solo-history-${user.name}`, JSON.stringify(history));
    localStorage.setItem(`solo-player-data-${user.name}`, JSON.stringify(playerState));
    
    // Sync to parent user object
    setUser({
      ...user,
      name: playerState.name,
      attributes: playerState.attributes,
      customAttributes: playerState.customAttributes,
      credentials: playerState.credentials,
      totalXp: playerState.totalXp
    });
  }, [habits, avatar, history, playerState]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const newCompleted = !h.completed;
        const reward = 50;
        const attrGain = 2;
        
        if (newCompleted) {
          setPlayerState(prev => ({
            ...prev,
            xp: prev.xp + reward,
            totalXp: prev.totalXp + reward,
            attributes: {
              ...prev.attributes,
              [h.type]: Math.min(100, (prev.attributes[h.type] || 0) + attrGain)
            }
          }));
        } else {
          setPlayerState(prev => ({
            ...prev,
            xp: Math.max(0, prev.xp - reward),
            totalXp: Math.max(0, prev.totalXp - reward),
            attributes: {
              ...prev.attributes,
              [h.type]: Math.max(0, (prev.attributes[h.type] || 0) - attrGain)
            }
          }));
        }
        return { ...h, completed: newCompleted };
      }
      return h;
    }));
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    const types = Object.keys(playerState.attributes);
    const randomType = types[Math.floor(Math.random() * types.length)] || 'strength';
    const newHabit = {
      id: Date.now(),
      title: newHabitTitle,
      type: randomType,
      completed: false
    };
    setHabits([...habits, newHabit]);
    setNewHabitTitle('');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const finishDay = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const existingEntry = history.findIndex(h => h.date === today);
    const completedCount = habits.filter(h => h.completed).length;
    const completion = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;
    
    const newEntry = {
      date: today,
      completed: completedCount,
      total: habits.length,
      completion: Math.round(completion),
      xpGained: completedCount * 50,
      habits: habits.map(h => ({ title: h.title, completed: h.completed, type: h.type }))
    };

    if (existingEntry >= 0) {
      const newHistory = [...history];
      newHistory[existingEntry] = newEntry;
      setHistory(newHistory);
    } else {
      setHistory([...history, newEntry]);
    }

    // Level up check (every 1000 XP)
    if (playerState.xp >= 1000) {
      setPlayerState(prev => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - 1000
      }));
    }

    setShowStats(true);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleAttribute = (attrId) => {
    setPlayerState(prev => {
      const newAttributes = { ...prev.attributes };
      if (newAttributes[attrId] !== undefined) {
        if (Object.keys(newAttributes).length > 1) {
          delete newAttributes[attrId];
        }
      } else {
        newAttributes[attrId] = 0;
      }
      return { ...prev, attributes: newAttributes };
    });
  };

  const addCustomAttribute = () => {
    if (!newCustomAttr.trim()) return;
    const id = newCustomAttr.toLowerCase().replace(/\s+/g, '-');
    if (DEFAULT_ATTRIBUTES.some(a => a.id === id) || playerState.customAttributes.some(a => a.id === id)) {
      alert("Attribute already exists!");
      return;
    }
    
    const newAttr = { id, label: newCustomAttr };
    setPlayerState(prev => ({
      ...prev,
      customAttributes: [...prev.customAttributes, newAttr],
      attributes: { ...prev.attributes, [id]: 0 }
    }));
    setNewCustomAttr('');
  };

  const removeCustomAttribute = (id) => {
    setPlayerState(prev => {
      const newCustom = prev.customAttributes.filter(a => a.id !== id);
      const newAttrs = { ...prev.attributes };
      delete newAttrs[id];
      return { ...prev, customAttributes: newCustom, attributes: newAttrs };
    });
  };

  const completionRate = habits.length > 0 
    ? Math.round((habits.filter(h => h.completed).length / habits.length) * 100) 
    : 0;

  const ALL_OPTS = [...DEFAULT_ATTRIBUTES, ...playerState.customAttributes.map(a => ({ id: a.id, label: a.label, icon: Star, color: 'text-slate-500', barColor: 'bg-slate-400' }))];

  const currentRank = getRankTitle(playerState.totalXp);
  const nextRankXpThreshold = (Math.floor(playerState.totalXp / 10000) + 1) * 10000;
  const rankProgress = ((playerState.totalXp % 10000) / 10000) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-slate-200 dark:border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] uppercase text-electric-purple/80">
            <span className="w-8 h-[1px] bg-electric-purple/40" />
            System Protocol Active
          </div>
          <h1 className={cn("text-4xl md:text-6xl uppercase tracking-tighter transition-colors", isDark ? "text-white" : "text-slate-900")}>
            Solo <span className="text-electric-purple font-black italic">Ascend</span>
          </h1>
          <p className={cn("text-xs font-medium tracking-[0.2em] flex items-center gap-4 transition-colors", isDark ? "text-slate-300" : "text-slate-400")}>
            <span className="w-1 h-1 rounded-full bg-emerald-500" /> STATUS: OPERATIONAL
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHistory(true)}
            className="p-4 rounded-2xl glass-card hover-glow flex items-center gap-3 group"
          >
            <HistoryIcon className="w-5 h-5 text-emerald-500 group-hover:rotate-[-45deg] transition-transform" />
            <span className={cn("hidden sm:inline text-[11px] font-black uppercase tracking-widest transition-colors", isDark ? "text-white" : "text-slate-600")}>Archives</span>
          </button>
          <button 
            onClick={onLogout}
            className="p-4 rounded-2xl glass-card hover-glow flex items-center gap-3 group text-red-500 hover:bg-red-500/10"
            title="Exit System"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => setShowAccount(true)}
            className="p-4 rounded-2xl glass-card hover-glow flex items-center gap-3 group"
          >
            <UserIcon className="w-5 h-5 text-blue-500 transition-transform group-hover:scale-110" />
            <span className={cn("hidden sm:inline text-[11px] font-black uppercase tracking-widest transition-colors", isDark ? "text-white" : "text-slate-600")}>Profile</span>
          </button>
          <button 
            onClick={toggleTheme}
            className="p-4 rounded-2xl glass-card hover-glow transition-all"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-violet-600" />}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Profile Card */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 h-full relative group"
          >
            {/* Rank Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric-purple/10 blur-[60px] rounded-full group-hover:bg-electric-purple/20 transition-all pointer-events-none" />
            
            <div className="flex flex-col items-center gap-8">
              <div 
                className="w-40 h-40 rounded-full border-2 border-slate-200 dark:border-white/10 p-2 relative cursor-pointer group/avatar"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-electric-purple/50 bg-slate-100 dark:bg-black/40">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-electric-purple/30">
                      <Trophy className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-2 rounded-full bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center transition-all">
                  <Camera className="w-8 h-8 text-white mb-2" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Update</span>
                </div>
                <input type="file" hidden ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" />
              </div>
              
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                  <Crown className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-[10px] font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-widest">
                    {getLevelName(playerState.level)}
                  </span>
                </div>
                <h2 className={cn("text-3xl font-black uppercase tracking-tight transition-colors", isDark ? "text-white" : "text-slate-900")}>{playerState.name}</h2>
                <div className="text-sm font-bold text-electric-purple uppercase tracking-[0.2em] italic">
                  {currentRank} • LVL {playerState.level}
                </div>
              </div>

              <div className="w-full space-y-6 bg-slate-50 dark:bg-black/20 p-6 rounded-3xl border border-slate-200 dark:border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className={cn(isDark ? "text-slate-300" : "text-slate-400")}>Level Progression</span>
                    <span className="text-electric-purple">{playerState.xp} / 1000 XP</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (playerState.xp/1000)*100)}%` }}
                      className="h-full bg-gradient-to-r from-electric-purple to-electric-purple-light shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className={cn(isDark ? "text-slate-300" : "text-slate-400")}>Rank Promotion</span>
                    <span className="text-emerald-500">{playerState.totalXp} / {nextRankXpThreshold} XP</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${rankProgress}%` }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Stats */}
        <div className="lg:col-span-8">
          <WeeklyStats history={history} />
        </div>

        {/* Attributes */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 h-full"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className={cn("text-xl font-bold uppercase flex items-center gap-3 underline decoration-electric-purple/30 decoration-4 underline-offset-8 transition-colors", isDark ? "text-white" : "text-slate-900")}>
                <Zap className="w-5 h-5 text-electric-purple" />
                Player Attributes
              </h3>
              <button 
                onClick={() => setShowAccount(true)}
                className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-8">
              {Object.entries(playerState.attributes).map(([key, value]) => {
                const opt = ALL_OPTS.find(o => o.id === key);
                const IconComp = opt?.icon || Star;
                return (
                  <div key={key} className="space-y-3 group">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                      <span className="flex items-center gap-3 text-slate-600 dark:text-slate-200">
                        <div className={cn("p-2 rounded-lg bg-slate-100 dark:bg-white/5", opt?.color)}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        {opt?.label || key}
                      </span>
                      <span className="text-slate-900 dark:text-white">{value} / 100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        className={cn("h-full transition-all duration-700 shadow-sm", opt?.barColor || 'bg-slate-400')}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quests */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 h-full flex flex-col"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
              <h3 className={cn("text-2xl font-black uppercase flex items-center gap-4 underline decoration-emerald-500/30 decoration-4 underline-offset-[12px] transition-colors", isDark ? "text-white" : "text-slate-900")}>
                <Target className="w-7 h-7 text-emerald-500" />
                Daily Quests
              </h3>
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="text-emerald-500">{habits.filter(h => h.completed).length} / {habits.length}</span>
                <span className="w-[1px] h-4 bg-white/20" />
                Manifested
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar flex-grow mb-10">
              <AnimatePresence mode="popLayout" initial={false}>
                {habits.map((habit) => (
                  <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={cn(
                      "group p-4 sm:p-6 rounded-3xl flex items-center justify-between gap-4 transition-all duration-300 border-2",
                      habit.completed 
                        ? "bg-slate-100 dark:bg-emerald-500/10 border-emerald-500/30 shadow-sm" 
                        : "bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-grow">
                      <button 
                        onClick={() => toggleHabit(habit.id)}
                        className={cn(
                          "w-10 h-10 min-w-[40px] rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform active:scale-90",
                          habit.completed 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                            : "border-slate-200 dark:border-white/10 hover:border-emerald-500/50 bg-slate-50 dark:bg-black/20"
                        )}
                      >
                        {habit.completed ? <Check className="w-5 h-5 stroke-[3px]" /> : <Flame className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />}
                      </button>
                      <div className="flex flex-col min-w-0">
                        <p className={cn(
                          "text-lg sm:text-xl font-bold transition-all truncate",
                          habit.completed ? "text-slate-400 dark:text-emerald-400/50 line-through italic" : cn(isDark ? "text-white" : "text-slate-900")
                        )}>
                          {habit.title}
                        </p>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-80 text-slate-500 dark:text-emerald-500/60 truncate">
                          {habit.type} STAT INCREASE • +50 XP
                        </span>
                      </div>
                    </div>
                    
                    <button onClick={() => deleteHabit(habit.id)} className="sm:opacity-0 group-hover:opacity-100 p-2 sm:p-3 text-slate-300 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all h-fit">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form onSubmit={addHabit} className="relative mt-auto flex flex-col sm:block gap-4">
              <input 
                type="text" 
                value={newHabitTitle}
                onChange={(e) => setNewHabitTitle(e.target.value)}
                placeholder="Manifest objective..."
                className="w-full bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-3xl p-6 pl-8 pr-12 sm:pr-48 outline-none focus:border-electric-purple/40 text-lg font-bold transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 dark:text-white"
              />
              <button 
                type="submit" 
                className="static sm:absolute right-3 top-3 bottom-3 bg-electric-purple hover:bg-electric-purple-light text-white font-black px-8 py-4 sm:py-0 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-electric-purple/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                Accept Quest
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end py-12">
        <button 
          onClick={finishDay} 
          className="btn-primary min-w-[300px] flex items-center justify-center gap-4 group"
        >
          <span className="uppercase tracking-[0.4em] text-sm">Finalize Evaluation</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Modals remain similarly structured but will benefit from index.css glass-card updates */}

      <AnimatePresence>
        {showAccount && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowAccount(false)} 
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 30 }} 
              className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar p-8 md:p-14 relative z-10 border-electric-purple/30 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
            >
              <button onClick={() => setShowAccount(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
              
              <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full border-4 border-electric-purple/50 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.25)] ring-4 ring-black">
                    {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-800 flex items-center justify-center"><UserIcon className="w-16 h-16 text-electric-purple" /></div>}
                  </div>
                  <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 p-3 bg-electric-purple rounded-full border-4 border-black text-white hover:scale-110 transition-all shadow-xl"><Camera className="w-5 h-5" /></button>
                </div>
                
                <div className="flex-grow text-center md:text-left space-y-4">
                  {isEditingAccount ? (
                    <div className="space-y-4">
                      <input 
                        value={editName} 
                        onChange={e => setEditName(e.target.value)} 
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-2xl futuristic-text text-white w-full italic outline-none focus:border-electric-purple" 
                        placeholder="Character Name..."
                      />
                      <textarea 
                        value={editCreds} 
                        onChange={e => setEditCreds(e.target.value)} 
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/70 w-full h-32 italic resize-none outline-none focus:border-electric-purple" 
                        placeholder="Personal Declaration..."
                      />
                      <div className="flex gap-3">
                        <button onClick={() => {
                          setPlayerState(prev => ({...prev, name: editName, credentials: editCreds}));
                          setIsEditingAccount(false);
                        }} className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-xl text-xs futuristic-text flex items-center gap-2 tracking-widest transition-all"><Save className="w-4 h-4" /> COMMIT CHANGES</button>
                        <button onClick={() => setIsEditingAccount(false)} className="bg-white/5 text-white/50 px-6 py-3 rounded-xl text-xs futuristic-text hover:bg-white/10 transition-all">ABORT</button>
                      </div>
                    </div>
                  ) : (
                    <div className="group relative">
                       <h2 className={cn("text-5xl futuristic-text uppercase tracking-tighter mb-2 italic transition-colors", isDark ? "text-white" : "text-slate-900")}>{playerState.name}</h2>
                       <p className="text-lg futuristic-text text-electric-purple uppercase font-bold tracking-[0.2em] mb-4 shadow-electric-purple/10 shadow-sm">{currentRank}</p>
                       <p className={cn("text-sm italic leading-relaxed p-4 rounded-xl border border-white/5 bg-slate-100 dark:bg-black/20 transition-colors", isDark ? "text-slate-300" : "text-slate-600")}>"{playerState.credentials}"</p>
                       <button onClick={() => setIsEditingAccount(true)} className="absolute -top-2 -right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-electric-purple"><Edit2 className="w-5 h-5" /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                   <h3 className={cn("text-[11px] futuristic-text uppercase tracking-[0.5em] border-b border-white/5 pb-2 transition-colors", isDark ? "text-white/80" : "text-slate-700 font-black")}>Manifestation Protocol</h3>
                  <div className={cn("flex items-center justify-between p-6 rounded-3xl border shadow-inner transition-colors", isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200")}>
                    <div className="space-y-1">
                      <p className={cn("futuristic-text uppercase text-sm tracking-widest transition-colors", isDark ? "text-white/90" : "text-slate-900 font-bold")}>Streak Evaluation Goal</p>
                       <p className={cn("text-[9px] futuristic-text uppercase tracking-widest transition-colors", isDark ? "text-white/50" : "text-slate-500 font-bold")}>Minimum sustained activity for Rank advancement.</p>
                    </div>
                    <div className="flex items-center gap-8 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <button onClick={() => setPlayerState(p => ({...p, streakGoal: Math.max(1, p.streakGoal - 1)}))} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center text-xl transition-all shadow-lg hover:text-emerald-400">-</button>
                      <span className="text-4xl futuristic-text w-12 text-center text-emerald-400 font-bold italic">{playerState.streakGoal}</span>
                      <button onClick={() => setPlayerState(p => ({...p, streakGoal: p.streakGoal + 1}))} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center text-xl transition-all shadow-lg hover:text-emerald-400">+</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                   <div className={cn("flex justify-between items-end border-b pb-3 transition-colors", isDark ? "border-white/5" : "border-slate-200")}>
                      <h3 className={cn("text-[11px] futuristic-text uppercase tracking-[0.5em] transition-colors", isDark ? "text-white/80" : "text-slate-700 font-black")}>Attribute Re-Alignment</h3>
                     <span className="text-[10px] futuristic-text text-electric-purple/70 tracking-widest uppercase font-bold">Rank: {currentRank.split('-')[0]} CLASSIFIED</span>
                   </div>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {ALL_OPTS.map((attr) => {
                      const isSelected = playerState.attributes[attr.id] !== undefined;
                      const isCustom = playerState.customAttributes.some(c => c.id === attr.id);
                      return (
                        <div key={attr.id} className="relative group">
                          <button 
                            onClick={() => toggleAttribute(attr.id)} 
                            className={cn(
                              "w-full p-5 rounded-2xl border text-left transition-all flex flex-col items-center gap-3 relative overflow-hidden", 
                              isSelected 
                                ? "bg-electric-purple/10 border-electric-purple/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                                : (isDark ? "bg-white/[0.01] border-white/5 hover:border-white/20" : "bg-white border-slate-200 hover:border-electric-purple/50")
                            )}>
                            <div className={cn("p-3 rounded-xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform", isSelected ? "text-white" : "text-white/10")}>
                               {React.createElement(attr.icon || Star, { className: "w-6 h-6" })}
                            </div>
                            <p className={cn("text-[9px] futuristic-text uppercase text-center tracking-widest font-bold transition-colors", isSelected ? "text-white" : (isDark ? "text-white/20" : "text-slate-400"))}>{attr.label}</p>
                          </button>
                          {isCustom && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); removeCustomAttribute(attr.id); }} 
                              className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 shadow-lg"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative mt-6 group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-electric-purple/30 group-focus-within:text-electric-purple transition-colors">
                       <Plus className="w-5 h-5" />
                    </div>
                    <input 
                      value={newCustomAttr} 
                      onChange={e => setNewCustomAttr(e.target.value)} 
                      placeholder="Manifest a custom focus area..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-12 focus:outline-none focus:border-electric-purple/50 futuristic-text italic text-sm text-white shadow-inner transition-all"
                    />
                    <button 
                      onClick={addCustomAttribute}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-black futuristic-text px-6 py-2 rounded-xl text-[9px] transition-all uppercase tracking-widest font-bold shadow-lg"
                    >
                      Initialize
                    </button>
                  </div>
                </div>

                <div className="pt-12 flex gap-5 border-t border-white/5">
                  <button onClick={() => setShowAccount(false)} className="flex-grow bg-electric-purple hover:bg-electric-purple-light text-white futuristic-text py-5 rounded-2xl uppercase tracking-[0.5em] text-xs shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] active:scale-95 text-center">Sync Matrix & Return</button>
                  <button onClick={onLogout} className="bg-red-500/5 border border-red-500/20 text-red-500/50 px-8 rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group flex items-center justify-center shadow-lg"><LogOut className="w-6 h-6" /></button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>{showHistory && <History onClose={() => setShowHistory(false)} history={history} />}</AnimatePresence>
      <AnimatePresence>
        {showStats && (
           <StatsModal 
             habits={habits} 
             completionRate={completionRate} 
             stats={playerState.attributes} 
             xp={habits.filter(h => h.completed).length * 50} 
             rank={currentRank}
             levelName={getLevelName(playerState.level)}
             onClose={() => setShowStats(false)} 
           />
        )}
      </AnimatePresence>
    </div>
  );
}

const StatsModal = ({ habits, completionRate, stats, xp, rank, levelName, onClose }) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="glass-card w-full max-w-2xl p-10 md:p-14 relative z-10 border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 p-4 rounded-full shadow-[0_0_30px_#10b981]">
         <Shield className="w-8 h-8 text-black" />
      </div>

      <h2 className="text-4xl futuristic-text uppercase text-center mb-1 text-emerald-400 tracking-tighter italic">Evaluation Manifest</h2>
      <p className="text-[10px] text-center futuristic-text text-white/60 uppercase tracking-[0.5em] mb-14 italic">Shadow Matrix Synchronization Complete</p>
      
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden group shadow-inner">
            <p className="text-[10px] futuristic-text text-emerald-400/90 uppercase mb-3 tracking-[0.3em]">Objectives Cleared</p>
            <p className="text-6xl futuristic-text text-white font-bold">{habits.filter(h => h.completed).length}</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          </div>
          <div className="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden group shadow-inner">
            <p className="text-[10px] futuristic-text text-emerald-400/90 uppercase mb-3 tracking-[0.3em]">Ascension Rate</p>
            <p className="text-6xl futuristic-text text-white font-bold">{completionRate}%</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] futuristic-text uppercase text-white/60 border-b border-white/5 pb-3 flex items-center gap-3 italic tracking-widest"><Zap className="w-4 h-4 text-emerald-400" />Attribute Manifestations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.keys(stats).map(key => {
               const count = habits.filter(h => h.completed && h.type === key).length;
               if (count === 0) return null;
               return (
                <div key={key} className="text-center p-4 bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col items-center">
                  <p className="text-[8px] futuristic-text opacity-50 uppercase tracking-widest mb-1">{key}</p>
                  <p className="text-2xl futuristic-text text-emerald-400 font-bold">+{count * 2}</p>
                </div>
               );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center">
            <p className="text-[9px] futuristic-text uppercase text-white/60 mb-2 tracking-[0.2em]">Matrix XP Harvested</p>
            <p className="text-4xl futuristic-text italic text-emerald-400 shadow-emerald-500/20">+{xp} XP</p>
          </div>
          <div className="flex flex-col text-center lg:text-left px-4">
             <p className="text-[10px] futuristic-text text-emerald-500 uppercase tracking-[0.3em] mb-1 font-bold italic">{levelName}</p>
             <p className="text-lg futuristic-text text-white uppercase tracking-[0.1em]">{rank}</p>
             <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-full animate-pulse" />
             </div>
          </div>
        </div>

        <button onClick={onClose} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black futuristic-text py-6 rounded-2xl uppercase tracking-[0.6em] text-xs font-bold shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.03] active:scale-95">Commit Evaluation</button>
      </div>
    </motion.div>
  </div>
);

export default Dashboard;
