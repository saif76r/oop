import React from 'react';
import { UserProgress, Level } from '../../types';
import { CURRICULUM } from '../../content/curriculum';
import { ACHIEVEMENTS } from '../../content/achievements';
import { 
  Play, Flame, Trophy, Award, Map, Terminal, CheckCircle2, 
  ChevronRight, Sparkles, Shield, Crown, Clock
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onNavigateToMap: () => void;
  onNavigateToArena: () => void;
  onNavigateToCampaign: () => void;
  onSelectLevel: (level: Level) => void;
  onOpenProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onNavigateToMap,
  onNavigateToArena,
  onNavigateToCampaign,
  onSelectLevel,
  onOpenProfile,
}) => {
  // Find current in-progress or next available level
  const nextLevel = CURRICULUM.find(
    (l) => progress.unlockedLevelIds.includes(l.id) && !progress.completedLevelIds.includes(l.id)
  ) || CURRICULUM[0];

  const completedLevelCount = progress.completedLevelIds.length;
  const completedMissionsCount = progress.completedMissionIds.length;
  const recentAchievements = ACHIEVEMENTS.filter((a) => progress.achievements.includes(a.id)).slice(0, 3);

  // XP to next level
  const currentLvl = progress.level;
  const xpCurrent = progress.currentXP;
  const nextLvlXpTarget = Math.pow(currentLvl, 2) * 100;
  const prevLvlXpTarget = Math.pow(currentLvl - 1, 2) * 100;
  const xpInLevel = Math.max(0, xpCurrent - prevLvlXpTarget);
  const xpNeededInLevel = Math.max(100, nextLvlXpTarget - prevLvlXpTarget);
  const progressPercent = Math.min(100, Math.round((xpInLevel / xpNeededInLevel) * 100));

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-2xl border border-slate-800 bg-[#090c16] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_fantasy_realm_1791652001782.jpg"
            alt="OOP Quest Realm"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#070913] via-[#070913]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>REAL-TIME JAVA OOP ENGINE</span>
              <span>·</span>
              <span>OPENJDK 17 COMPILER</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Master Java OOP Through an Epic Fantasy Quest
            </h1>

            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Step into Olympia where encapsulation shields your heroes, polymorphism commands diverse combatants, and collections preserve infinite inventories. Write real Java code to unlock all 16 realms.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectLevel(nextLevel)}
                className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-xs md:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-950"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continue: Level {nextLevel.id} — {nextLevel.title}</span>
              </button>

              <button
                onClick={onNavigateToMap}
                className="py-2.5 px-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 rounded-lg font-medium text-xs md:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Map className="w-4 h-4 text-indigo-400" />
                <span>Explore All {CURRICULUM.length} Realms</span>
              </button>
            </div>
          </div>

          {/* Player Quick Profile Card */}
          <div className="md:col-span-4 bg-[#0b0e1b]/90 border border-slate-800 p-5 rounded-xl space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-indigo-500/60 shrink-0">
                <img
                  src="/src/assets/images/avatar_code_mage_1791652048175.jpg"
                  alt="Player Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {progress.displayName}
                  </h3>
                  <button
                    onClick={onOpenProfile}
                    className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-indigo-300">Level {progress.level} Scholar</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>{progress.streakDays}d Streak</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Level XP Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">XP Progress</span>
                <span className="text-indigo-300 tabular-nums font-semibold">
                  {progress.currentXP} XP
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Summary Metric Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[#0b0e1b] border border-slate-800 rounded-lg">
          <span className="text-xs font-medium text-slate-400 block mb-1">Realms Conquered</span>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {completedLevelCount} <span className="text-xs text-slate-500 font-sans">/ {CURRICULUM.length}</span>
          </div>
        </div>

        <div className="p-4 bg-[#0b0e1b] border border-slate-800 rounded-lg">
          <span className="text-xs font-medium text-slate-400 block mb-1">Missions Verified</span>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {completedMissionsCount} <span className="text-xs text-slate-500 font-sans">completed</span>
          </div>
        </div>

        <div className="p-4 bg-[#0b0e1b] border border-slate-800 rounded-lg">
          <span className="text-xs font-medium text-slate-400 block mb-1">Total Earned XP</span>
          <div className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">
            {progress.currentXP} <span className="text-xs text-slate-500 font-sans">XP</span>
          </div>
        </div>

        <div className="p-4 bg-[#0b0e1b] border border-slate-800 rounded-lg">
          <span className="text-xs font-medium text-slate-400 block mb-1">Achievements</span>
          <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
            {progress.achievements.length} <span className="text-xs text-slate-500 font-sans">/ {ACHIEVEMENTS.length}</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Next Recommended Missions & Campaign Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Next Available Realms */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                Active Learning Path
              </h2>
              <p className="text-xs text-slate-400">
                Continue your progression sequentially to unlock deeper architectural tiers.
              </p>
            </div>
            <button
              onClick={onNavigateToMap}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {CURRICULUM.slice(0, 4).map((lvl) => {
              const isUnlocked = progress.unlockedLevelIds.includes(lvl.id);
              const isDone = progress.completedLevelIds.includes(lvl.id);
              return (
                <div
                  key={lvl.id}
                  onClick={() => isUnlocked && onSelectLevel(lvl)}
                  className={`p-4 rounded-lg border transition-all flex items-center justify-between ${
                    isUnlocked
                      ? 'bg-[#0b0e1b] border-slate-800 hover:border-slate-700 cursor-pointer'
                      : 'bg-[#070913] border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-md flex items-center justify-center font-mono text-xs font-semibold shrink-0 ${
                        isDone
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : isUnlocked
                          ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      {lvl.id < 10 ? `0${lvl.id}` : lvl.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-slate-200">{lvl.title}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{lvl.subtitle}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {lvl.topics.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-indigo-400 tabular-nums">
                      +{lvl.totalXP} XP
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level 16 Eternal Kingdom Highlight Card */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#140e29] to-[#0b0e1b] border border-amber-600/30 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-amber-400 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              FINAL CAMPAIGN
            </span>
            <span className="text-xs font-mono text-slate-500">LEVEL 16</span>
          </div>

          <h3 className="text-base font-display font-bold text-white">
            The Eternal Kingdom & Eclipse Dragon
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            A comprehensive 5-stage RPG architecture challenge. Build world entities, design dynamic combat dispatch, protect collections, and slay the multi-phase Eclipse Dragon.
          </p>

          <div className="p-3 bg-slate-950/70 border border-slate-900 rounded-md text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span>Status</span>
              <span className="text-indigo-400 font-medium">
                {progress.unlockedLevelIds.includes(16) ? 'Unlocked' : 'Requires Level 15 Clearance'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Boss Health</span>
              <span className="font-mono text-amber-300">
                {progress.campaignCheckpoint.dragonDefeated ? '0 (Defeated)' : `${progress.campaignCheckpoint.bossHealthRemaining} HP`}
              </span>
            </div>
          </div>

          <button
            onClick={onNavigateToCampaign}
            className="w-full py-2 bg-amber-600/90 hover:bg-amber-500 text-white rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Launch Final Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
};
