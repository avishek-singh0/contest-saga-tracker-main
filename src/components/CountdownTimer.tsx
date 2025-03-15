
import { useEffect, useState } from "react";
import { getTimeRemaining } from "@/utils/dateUtils";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));
  
  useEffect(() => {
    // Only set up timer if there's time remaining
    if (timeRemaining.total <= 0) {
      onComplete?.();
      return;
    }
    
    const timer = setInterval(() => {
      const newTimeRemaining = getTimeRemaining(targetDate);
      setTimeRemaining(newTimeRemaining);
      
      if (newTimeRemaining.total <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, onComplete, timeRemaining.total]);
  
  // If no time remaining, just show zeros
  if (timeRemaining.total <= 0) {
    return (
      <div className="flex gap-1 text-sm font-mono">
        <span className="px-1.5 py-0.5 rounded bg-muted">0</span>:
        <span className="px-1.5 py-0.5 rounded bg-muted">0</span>:
        <span className="px-1.5 py-0.5 rounded bg-muted">0</span>:
        <span className="px-1.5 py-0.5 rounded bg-muted">0</span>
      </div>
    );
  }
  
  return (
    <div className="flex gap-1 text-sm font-mono">
      <span className="px-1.5 py-0.5 rounded bg-muted">{timeRemaining.days.toString().padStart(2, '0')}</span>:
      <span className="px-1.5 py-0.5 rounded bg-muted">{timeRemaining.hours.toString().padStart(2, '0')}</span>:
      <span className="px-1.5 py-0.5 rounded bg-muted">{timeRemaining.minutes.toString().padStart(2, '0')}</span>:
      <span className="px-1.5 py-0.5 rounded bg-muted">{timeRemaining.seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}
