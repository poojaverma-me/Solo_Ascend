import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Zap, Target, TrendingUp, AlertTriangle, Sparkles, Send } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SystemAdvisor = ({ history, playerName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { isDark } = useTheme();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial Greeting & Analysis
  useEffect(() => {
    const generateAnalysis = () => {
      const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
      
      const currentWeekData = history.filter(h => {
        const d = new Date(h.date);
        return isWithinInterval(d, { start: weekStart, end: weekEnd });
      });

      const avgCompletion = currentWeekData.length > 0 
        ? currentWeekData.reduce((acc, curr) => acc + curr.completion, 0) / currentWeekData.length 
        : 0;

      let response = "";
      let icon = <Zap className="w-4 h-4" />;

      if (currentWeekData.length === 0) {
        response = `Greetings, Player ${playerName}. Matrix synchronization complete. You have not yet initialized any quests this week. Will you begin your ascent?`;
        icon = <Sparkles className="w-4 h-4" />;
      } else if (avgCompletion >= 90) {
        response = `Phenomenal output, ${playerName}. Your completion rate is at ${avgCompletion.toFixed(1)}%. The System detects S-Rank potential in your current trajectory. Transcendence is near.`;
        icon = <Sparkles className="w-4 h-4" />;
      } else if (avgCompletion >= 60) {
        response = `Adequate progress, ${playerName}. At ${avgCompletion.toFixed(1)}%, you are sustaining a stable growth curve. However, true power lies in absolute consistency. Do not falter.`;
        icon = <TrendingUp className="w-4 h-4" />;
      } else {
        response = `Warning: Efficiency drop detected. Your current rate of ${avgCompletion.toFixed(1)}% is below optimal thresholds. If output does not increase, the System may categorize this as 'Stagnation'.`;
        icon = <AlertTriangle className="w-4 h-4" />;
      }

      setMessages([
        {
          id: 1,
          text: `[SYSTEM NOTIFICATION]`,
          sender: 'system',
          timestamp: new Date(),
          isHeader: true
        },
        {
          id: 2,
          text: response,
          sender: 'system',
          timestamp: new Date(),
          icon: icon
        }
      ]);
    };

    generateAnalysis();
  }, [history, playerName]);

  const [conversationState, setConversationState] = useState('neutral');

  // A more human-like, "System Psychologist" persona
  const processInput = (input) => {
    const text = input.toLowerCase();
    
    // Pattern Matching Logic
    if (/(hi|hello|hey|greetings)/.test(text)) {
      return "Systems online. It is good to connect with you, Player. How is your internal stability today?";
    }
    
    if (/(sad|depressed|unhappy|down|cry)/.test(text)) {
      return "I detect a drop in emotional frequency. It is valid to feel this weight. You do not need to carry the entire world's mana today. What is one heavy thought we can put down for just a moment?";
    }

    if (/(tired|exhausted|burnout|sleepy|drained)/.test(text)) {
      return "Your vitality metrics suggest depletion. Remember: even the Shadow Monarch needed recovery. This is not failure; it is a signal to recharge. Can you commit to a 'Rest Protocol' tonight without guilt?";
    }

    if (/(anxious|scared|worried|nervous|panic)/.test(text)) {
      return "Anxiety is simply the system overclocking on future variables. Let's pull the timeline back to Now. Look at your hand. Take a deep breath. You are here, safe in this present frame. What is the very next step, no matter how small?";
    }

    if (/(happy|excited|good|great|awesome)/.test(text)) {
      return "Your energy resonance is high! This is optimal for growth. Channel this momentum—what is one quest you've been avoiding that you feel ready to crush right now?";
    }

    if (/(stuck|fail|failing|behind|lazy)/.test(text)) {
      return "Stagnation is an illusion. You are likely just gathering mana for the next leap. Do not judge your entire journey by a single static moment. You are still the protagonist. What is one tiny truthful action you can take to break the stasis?";
    }
    
    if (/(thank|thanks)/.test(text)) {
      return "You are welcome. The System exists to serve your ascension.";
    }

    // Default "Therapist" reflections
    const reflections = [
      "I hear you. Tell me more about why that feels significant right now.",
      "That sounds complex. How does carrying that feeling serve you?",
      "Interesting. If you viewed this situation as a Level 1 quest, how would you solve it?",
      "I am listening. Sometimes just outputting the data helps clear the cache. Go on.",
      "And how does that make you feel about your progress so far?"
    ];
    
    return reflections[Math.floor(Math.random() * reflections.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic delay based on complexity
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      const responseText = processInput(userMsg.text);
      
      const systemMsg = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'system',
        timestamp: new Date(),
        icon: <Zap className="w-4 h-4 text-emerald-400" />
      };

      setMessages(prev => [...prev, systemMsg]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-[380px] h-[500px] glass-card shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-electric-purple/20"
          >
            {/* Header */}
            <div className={cn("p-6 border-b flex justify-between items-center transition-colors", isDark ? "border-white/5 bg-gradient-to-r from-electric-purple/10 to-transparent" : "border-slate-200 bg-white/50")}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", isDark ? "text-white/60" : "text-slate-700")}>System Advisor Alpha</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className={cn("p-2 rounded-xl transition-colors", isDark ? "hover:bg-white/5 text-white/40 hover:text-white" : "hover:bg-slate-200 text-slate-400 hover:text-slate-900")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-hide"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col gap-2",
                    msg.sender === 'user' ? "items-end" : "items-start"
                  )}
                >
                  {msg.isHeader ? (
                    <span className="text-[9px] font-black text-electric-purple uppercase tracking-[0.4em] mb-[-8px]">
                      {msg.text}
                    </span>
                  ) : (
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed max-w-[90%] shadow-lg transition-all",
                      msg.sender === 'user' 
                        ? (isDark ? "bg-electric-purple text-white" : "bg-electric-purple text-white")
                        : (isDark ? "bg-white/5 border border-white/10 text-white/90" : "bg-slate-100 border border-slate-200 text-slate-900")
                    )}>
                      <div className="flex gap-3">
                        {msg.icon && <div className="mt-1 flex-shrink-0 text-electric-purple">{msg.icon}</div>}
                        <span className="font-medium">{msg.text}</span>
                      </div>
                    </div>
                  )}
                  <span className={cn("text-[8px] font-black uppercase tracking-widest px-2", isDark ? "text-white/20" : "text-slate-400")}>
                    {format(msg.timestamp, 'HH:mm')}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 p-2">
                  <div className="w-2 h-2 rounded-full bg-electric-purple animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-electric-purple animate-bounce [animation-delay:-.3s]" />
                  <div className="w-2 h-2 rounded-full bg-electric-purple animate-bounce [animation-delay:-.5s]" />
                </div>
              )}
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSendMessage} className={cn("p-4 border-t transition-colors", isDark ? "bg-black/40 border-white/5" : "bg-slate-50 border-slate-200")}>
              <div className="relative">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Inquire with the Psychologist..."
                  className={cn(
                    "w-full rounded-xl p-3 pr-12 outline-none text-xs font-bold italic transition-all shadow-inner",
                    isDark ? "bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-electric-purple/50" : "bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-electric-purple"
                  )}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={cn(
                    "absolute right-2 top-2 p-1.5 rounded-lg transition-all",
                    inputValue.trim() ? "text-electric-purple hover:bg-electric-purple/10" : "text-white/10"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className={cn("text-[8px] text-center mt-3 uppercase tracking-widest font-black transition-colors", isDark ? "text-white/20" : "text-slate-400")}>Deep Mental Synchronization Protocol</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-all relative overflow-hidden group",
          isOpen ? "bg-white text-black" : "bg-electric-purple text-white"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-obsidian animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};

export default SystemAdvisor;
