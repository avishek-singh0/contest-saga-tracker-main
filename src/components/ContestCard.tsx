
import { useState } from "react";
import { formatDate, formatDuration } from "@/utils/dateUtils";
import { CountdownTimer } from "./CountdownTimer";
import { Contest, bookmarkContest, isContestBookmarked } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink, Play, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ContestCardProps {
  contest: Contest;
  onStatusChange?: () => void;
}

export function ContestCard({ contest, onStatusChange }: ContestCardProps) {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(isContestBookmarked(contest.id));
  
  const handleBookmark = () => {
    const bookmarked = bookmarkContest(contest.id);
    setIsBookmarked(bookmarked);
    
    toast({
      title: bookmarked ? "Contest Bookmarked" : "Bookmark Removed",
      description: bookmarked 
        ? `You've bookmarked ${contest.name}` 
        : `Removed bookmark for ${contest.name}`,
      duration: 3000,
    });
  };
  
  const handleTimerComplete = () => {
    // When timer completes, notify parent component to refresh status
    onStatusChange?.();
  };
  
  const getPlatformBadge = () => {
    switch (contest.platform) {
      case "codeforces":
        return <Badge variant="outline" className="badge-codeforces">Codeforces</Badge>;
      case "codechef":
        return <Badge variant="outline" className="badge-codechef">CodeChef</Badge>;
      case "leetcode":
        return <Badge variant="outline" className="badge-leetcode">LeetCode</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = () => {
    switch (contest.status) {
      case "upcoming":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Upcoming</Badge>;
      case "ongoing":
        return <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">Ongoing</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="contest-card group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
        <div className="flex flex-wrap gap-2">
          {getPlatformBadge()}
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{formatDuration(contest.duration)}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-2">{contest.name}</h3>
      
      <div className="text-sm text-muted-foreground mb-4">
        {formatDate(contest.startTime)}
      </div>
      
      {contest.status === "upcoming" && (
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-1">Time remaining:</div>
          <CountdownTimer 
            targetDate={contest.startTime} 
            onComplete={handleTimerComplete}
          />
        </div>
      )}
      
      {contest.solutionUrl && (
        <div className="mb-4">
          <a 
            href={contest.solutionUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Play className="w-4 h-4" />
            Watch Solution
          </a>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5"
          onClick={handleBookmark}
        >
          <Bookmark 
            className={`w-4 h-4 ${isBookmarked ? "fill-primary" : ""}`} 
          />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5"
          asChild
        >
          <a href={contest.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            Visit
          </a>
        </Button>
      </div>
    </div>
  );
}
