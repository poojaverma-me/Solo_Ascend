import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Target, Zap, CheckCircle2, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const History = ({ onClose, history = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const renderHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-electric-purple/10 rounded-2xl text-electric-purple">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Quest <span className="text-electric-purple italic">Archives</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/40 p-1 rounded-2xl border border-slate-200 dark:border-white/5">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-3 hover:bg-electric-purple/10 hover:text-electric-purple transition-all rounded-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold uppercase tracking-widest min-w-[140px] text-center text-[11px] text-slate-600 dark:text-slate-300">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-3 hover:bg-electric-purple/10 hover:text-electric-purple transition-all rounded-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, i) => (
          <div key={i} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <div className="grid grid-cols-7 gap-3">
        {calendarDays.map((day, i) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayData = history.find(h => h.date === dateStr);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isCurrentDay = isToday(day);
          const isSelected = selectedDay && isSameDay(day, parseISO(selectedDay.date));
          
          return (
            <div
              key={i}
              onClick={() => dayData && setSelectedDay(dayData)}
              className={cn(
                "relative aspect-square p-2 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center",
                !isCurrentMonth ? "opacity-10 pointer-events-none" : "opacity-100",
                isCurrentDay ? "border-electric-purple bg-electric-purple/5 shadow-sm" : "border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-slate-200 dark:hover:border-white/10",
                isSelected ? "ring-4 ring-electric-purple/20 border-electric-purple bg-electric-purple/10 shadow-lg" : ""
              )}
            >
              <span className={cn(
                "text-sm font-black transition-all",
                isCurrentDay ? "text-electric-purple" : "text-slate-400 dark:text-slate-400"
              )}>
                {format(day, 'd')}
              </span>
              
              {dayData && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                </div>
              )}
              
              {dayData && (
                <div className="mt-1">
                  <span className="text-[8px] font-black tracking-tighter opacity-70 text-emerald-600 dark:text-emerald-400">{dayData.completion}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/95 backdrop-blur-2xl"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="glass-card w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 relative z-10 border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh]"
      >
        {/* Calendar Section */}
        <div className="lg:col-span-7 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          {renderHeader()}
          <div className="p-8 bg-slate-50 dark:bg-black/20 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-inner">
            {renderDays()}
            {renderCells()}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="glass-card p-6 flex items-center gap-5 border-slate-200 dark:border-white/5">
              <div className="w-12 h-12 rounded-[20px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest">Total Quests</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white italic">{history.reduce((acc, curr) => acc + curr.completed, 0)}</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center gap-5 border-slate-200 dark:border-white/5">
              <div className="w-12 h-12 rounded-[20px] bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest">Days Active</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white italic">{history.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Day Details Section */}
        <div className="lg:col-span-5 bg-slate-50/50 dark:bg-white/[0.01] p-8 md:p-12 flex flex-col border-l border-slate-200 dark:border-white/5">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-electric-purple uppercase tracking-[0.4em]">Daily Evaluation</p>
              <h3 className="text-3xl font-black uppercase text-slate-900 dark:text-white">
                {selectedDay ? format(parseISO(selectedDay.date), 'MMM do') : 'Archives'}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-full transition-colors group"
            >
              <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar pr-4">
            {!selectedDay ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-20 dark:opacity-10">
                <CalendarIcon className="w-24 h-24 mb-6" />
                <p className="font-black uppercase text-xs tracking-[0.2em] max-w-[200px] leading-relaxed">Select a manifested day to view records</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 p-8 rounded-[32px] shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-300">Completion Manifest</span>
                    <span className="text-2xl font-black text-emerald-500 italic">{selectedDay.completion}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-black/60 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedDay.completion}%` }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_#10b981]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-300 mb-6 flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-slate-200 dark:bg-white/20" /> Quest Breakdown
                  </h4>
                  {(selectedDay.habits || []).length === 0 ? (
                    <div className="text-center py-12 bg-slate-100/50 dark:bg-black/20 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
                      <p className="text-xs font-bold text-slate-400 italic">No quest data recorded</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDay.habits.map((habit, idx) => (
                        <div key={idx} className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                          habit.completed 
                            ? "bg-white dark:bg-emerald-500/5 border-emerald-500/20 shadow-sm" 
                            : "bg-slate-100/30 dark:bg-black/20 border-slate-100 dark:border-transparent opacity-50"
                        )}>
                          {habit.completed ? (
                            <div className="p-1 bg-emerald-500 rounded-lg text-white">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                          <div className="flex flex-col">
                            <span className={cn(
                              "text-sm font-bold",
                              habit.completed ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 line-through"
                            )}>
                              {habit.title}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-80 text-slate-500 dark:text-emerald-500/60">
                              {habit.type} STAT
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {selectedDay && (
            <div className="mt-10 pt-10 border-t border-slate-200 dark:border-white/5 flex gap-6 items-center">
              <div className="flex-grow p-5 bg-white dark:bg-black/40 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest mb-1">XP Harvest</p>
                <p className="text-2xl font-black text-electric-purple italic">+{selectedDay.xpGained} XP</p>
              </div>
              <div className="p-5 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex flex-col items-center">
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Status</p>
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 italic">SYNCED</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default History;
