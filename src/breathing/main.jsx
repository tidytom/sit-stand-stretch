import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Main App Component
        function App() {
          // State to manage if the breathing exercise is active
          const [isBreathing, setIsBreathing] = useState(false);
          // State for the current breathing phase: 'inhale', 'holdIn', 'exhale', 'holdOut'
          const [phase, setPhase] = useState('inhale');
          // State for the countdown timer within each phase
          const [count, setCount] = useState(0);
          // State to track the number of completed breathing cycles
          const [cycle, setCycle] = useState(0);
          // State for the selected breathing pattern
          const [pattern, setPattern] = useState('4-7-8');
          // State for the total elapsed time of the session in seconds
          const [sessionTime, setSessionTime] = useState(0);
          // Ref to hold the interval ID to ensure it's cleared properly
          const timerRef = useRef(null);


          // --- Breathing Pattern Definitions ---
          // An object containing different breathing techniques with their timings and descriptions.
          const breathingPatterns = {
            '4-7-8': { 
              inhale: 4, holdIn: 7, exhale: 8, holdOut: 0, 
              name: '4-7-8 Relaxation', 
              description: 'Excellent for calming with sleep or stress.',
              optimalUsage: 'Perform 4-8 cycles. Ideal for pre-sleep or high-stress moments.',
              sessionDuration: 240 // 4 minutes
            },
            'box': { 
              inhale: 4, holdIn: 4, exhale: 4, holdOut: 4, 
              name: 'Box Breathing Focus', 
              description: 'Helps to center the mind and improve focus under stress.',
              optimalUsage: 'Practice for 3-5 minutes to regain focus and composure.',
              sessionDuration: 300 // 5 minutes
            },
            'calm': { 
              inhale: 4, holdIn: 2, exhale: 6, holdOut: 2, 
              name: 'Gentle Beginner', 
              description: 'A simple, calming pattern perfect for starting out.',
              optimalUsage: 'Ideal for longer, 5-10 minute meditative sessions.',
              sessionDuration: 480 // 8 minutes
            },
            'double': { 
              inhale: 4, holdIn: 0, exhale: 8, holdOut: 0, 
              name: 'Double Exhale Stress', 
              description: 'Emphasizes a long, relaxing exhale to reduce stress.',
              optimalUsage: 'Use for 2-5 minutes to quickly reduce acute feelings of stress.',
              sessionDuration: 180 // 3 minutes
            }
          };

          // --- Main Breathing Logic ---
          // This effect hook manages the breathing timer and state transitions.
          useEffect(() => {
            const currentPattern = breathingPatterns[pattern];
            
            if (!isBreathing) {
              clearInterval(timerRef.current);
              setCount(currentPattern.inhale);
              return;
            }

            // Reset state when a new session starts
            setPhase('inhale');
            setCount(currentPattern.inhale);
            setCycle(0);
            setSessionTime(0);

            let localSessionTime = 0;
            let localCycle = 0;
            const phaseSequence = ['inhale', 'holdIn', 'exhale', 'holdOut'];
            let phaseIndex = 0;
            let timeInPhase = 0;

            // The main timer, ticks every second
            timerRef.current = setInterval(() => {
              localSessionTime++;
              timeInPhase++;

              const currentPhaseName = phaseSequence[phaseIndex];
              const currentPhaseDuration = currentPattern[currentPhaseName];
              
              setSessionTime(localSessionTime);
              setCount(currentPhaseDuration - timeInPhase);

              if (localSessionTime >= currentPattern.sessionDuration) {
                setIsBreathing(false);
                return;
              }

              // Phase Transition Logic
              if (timeInPhase >= currentPhaseDuration) {
                timeInPhase = 0;
                phaseIndex = (phaseIndex + 1) % 4;

                let nextPhaseName = phaseSequence[phaseIndex];
                let nextPhaseDuration = currentPattern[nextPhaseName];

                while (nextPhaseDuration === 0) {
                   phaseIndex = (phaseIndex + 1) % 4;
                   nextPhaseName = phaseSequence[phaseIndex];
                   nextPhaseDuration = currentPattern[nextPhaseName];
                }

                if (nextPhaseName === 'inhale') {
                  localCycle++;
                  setCycle(localCycle);
                }

                setPhase(nextPhaseName);
                setCount(nextPhaseDuration);
              }
            }, 1000);

            // Cleanup Function
            return () => {
              clearInterval(timerRef.current);
            };
          }, [isBreathing, pattern]);

          // --- Helper Functions ---

          const getPhaseText = () => {
            if (!isBreathing) return 'Ready?';
            switch(phase) {
              case 'inhale': return 'Breathe In';
              case 'holdIn': return 'Hold';
              case 'exhale': return 'Breathe Out';
              case 'holdOut': return 'Hold';
              default: return 'Breathe';
            }
          };

          const getBubbleScale = () => {
            if (!isBreathing) return 'scale-100';
            switch(phase) {
              case 'inhale': return 'scale-150';
              case 'holdIn': return 'scale-150';
              case 'exhale': return 'scale-75';
              case 'holdOut': return 'scale-75';
              default: return 'scale-100';
            }
          };
          
          const getBubbleColor = () => {
            if (!isBreathing) return 'bg-gradient-to-br from-slate-400 to-slate-600';
            switch(phase) {
              case 'inhale': return 'bg-gradient-to-br from-cyan-400 to-sky-600';
              case 'holdIn': return 'bg-gradient-to-br from-teal-400 to-emerald-600';
              case 'exhale': return 'bg-gradient-to-br from-purple-400 to-indigo-600';
              case 'holdOut': return 'bg-gradient-to-br from-slate-500 to-slate-700';
              default: return 'bg-gradient-to-br from-slate-400 to-slate-600';
            }
          };

          const getTransitionDuration = () => {
            if (!isBreathing) return 500;
            const currentPattern = breathingPatterns[pattern];
            switch(phase) {
              case 'inhale': return currentPattern.inhale * 1000;
              case 'exhale': return currentPattern.exhale * 1000;
              default: return 200; 
            }
          };

          const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
          };

          // --- Event Handlers ---

          const handleToggleBreathing = () => {
            setIsBreathing(prev => !prev);
          };

          const handlePatternChange = (newPattern) => {
            setPattern(newPattern);
            setIsBreathing(false); 
          };

          // --- JSX Render ---
          const currentPatternData = breathingPatterns[pattern];
          const progressPercentage = (sessionTime / currentPatternData.sessionDuration) * 100;

          return (
            <div className="min-h-full bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-1000">
              <a href="./" className="mb-6 text-sm text-slate-400 hover:text-slate-200 underline-offset-4 hover:underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 px-1">
                <span aria-hidden="true">&larr; </span>All tools
              </a>

              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-light text-white mb-3">Free Easy Breath Tool</h1>
                <p className="text-slate-300 text-base md:text-lg max-w-md">
                  Follow the rhythm and find your calm.
                </p>
                <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto mt-3">
                  Not medical advice. Stop if you feel dizzy or have pain. Ask your doctor or physical therapist before starting new exercises.
                </p>
              </div>

              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-80 flex items-center justify-center mb-8">
                <div 
                  className={`absolute w-full h-full rounded-full opacity-25 blur-2xl transition-all ${getBubbleColor()} ${getBubbleScale()}`}
                  style={{ transitionDuration: `${getTransitionDuration()}ms` }} 
                />
                <div 
                  className={`relative w-4/5 h-4/5 rounded-full shadow-2xl transition-all ease-in-out flex items-center justify-center ${getBubbleColor()} ${getBubbleScale()}`}
                  style={{ transitionDuration: `${getTransitionDuration()}ms` }}
                >
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white opacity-20 rounded-full blur-lg" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    <div className="text-2xl font-light mb-2">
                      {getPhaseText()}
                    </div>
                    {(isBreathing && count > 0) && (
                      <div className="text-6xl font-thin opacity-80">
                        {count}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {isBreathing && (
                <div className="w-full max-w-md mb-8 px-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-1">
                        <span>{formatTime(sessionTime)}</span>
                        <span>{formatTime(currentPatternData.sessionDuration)}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                            className="bg-sky-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                            style={{ width: `${progressPercentage}%`}}
                        ></div>
                    </div>
                     {cycle > 0 && (
                      <div className="text-slate-400 text-sm text-center mt-2">
                        Cycles Completed: {cycle}
                      </div>
                    )}
                </div>
              )}

              <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
                <div className="w-full">
                  <h3 className="text-slate-200 text-lg mb-4 text-center">Choose a Pattern</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(breathingPatterns).map(([key, patternData]) => (
                      <button
                        key={key}
                        onClick={() => handlePatternChange(key)}
                        disabled={isBreathing}
                        className={`p-4 rounded-lg text-left transition-all duration-300 border-2 ${
                          pattern === key 
                            ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20 scale-105' 
                            : isBreathing 
                            ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className="font-semibold text-sm">{patternData.name}</div>
                        <div className="text-xs opacity-80 mt-1">{patternData.description}</div>
                         {pattern === key && !isBreathing && (
                            <div className="text-xs mt-2 pt-2 border-t border-white/10 text-sky-200">
                                {patternData.optimalUsage}
                            </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleToggleBreathing}
                  className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full md:w-auto ${
                    isBreathing 
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
                  }`}
                >
                  {isBreathing ? 'Stop Session' : `Start: ${currentPatternData.name}`}
                </button>
              </div>
            </div>
          );
        }

        // Render the App component to the #root div
createRoot(document.getElementById('root')).render(<App />);
