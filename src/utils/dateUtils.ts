
/**
 * Date Utilities
 * Functions to format dates and calculate time differences
 */

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(date);
}

/**
 * Calculate time remaining until a future date
 * @returns Object with days, hours, minutes, seconds
 */
export function getTimeRemaining(targetDate: Date): { 
  days: number; 
  hours: number; 
  minutes: number; 
  seconds: number;
  total: number;
} {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, total: difference };
}

/**
 * Format time remaining to a readable string
 */
export function formatTimeRemaining(targetDate: Date): string {
  const { days, hours, minutes, total } = getTimeRemaining(targetDate);
  
  if (total <= 0) {
    return "Started";
  }
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}

/**
 * Get a relative time string (e.g. "2 days ago", "in 3 hours")
 */
export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHr / 24);
  
  if (diffSec < 0) {
    // In the past
    if (diffDays < -1) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (diffHr < -1) {
      return `${Math.abs(diffHr)} hours ago`;
    } else if (diffMin < -1) {
      return `${Math.abs(diffMin)} minutes ago`;
    } else {
      return "Just now";
    }
  } else {
    // In the future
    if (diffDays > 1) {
      return `in ${diffDays} days`;
    } else if (diffHr > 1) {
      return `in ${diffHr} hours`;
    } else if (diffMin > 1) {
      return `in ${diffMin} minutes`;
    } else {
      return "Just now";
    }
  }
}

/**
 * Format duration in minutes to a readable string
 */
export function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}
