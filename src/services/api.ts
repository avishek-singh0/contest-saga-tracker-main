
/**
 * API Service
 * Handles data fetching from various coding platform APIs
 */

import { toast } from "@/components/ui/use-toast";

// Types
export interface Contest {
  id: string;
  name: string;
  platform: "codeforces" | "codechef" | "leetcode";
  url: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  status: "upcoming" | "ongoing" | "completed";
  solutionUrl?: string;
}

export interface ContestFilters {
  platforms: {
    codeforces: boolean;
    codechef: boolean;
    leetcode: boolean;
  };
  status: {
    upcoming: boolean;
    ongoing: boolean;
    completed: boolean;
  };
}

// Mock data for initial development
const MOCK_CONTESTS: Contest[] = [
  {
    id: "cf-1",
    name: "Codeforces Round #924 (Div. 2)",
    platform: "codeforces",
    url: "https://codeforces.com/contests",
    startTime: new Date(Date.now() + 86400000), // 1 day in future
    endTime: new Date(Date.now() + 86400000 + 7200000), // 1 day + 2 hours
    duration: 120, // 2 hours
    status: "upcoming",
  },
  {
    id: "cc-1",
    name: "CodeChef Starters 100",
    platform: "codechef",
    url: "https://www.codechef.com/contests",
    startTime: new Date(Date.now() + 172800000), // 2 days in future
    endTime: new Date(Date.now() + 172800000 + 10800000), // 2 days + 3 hours
    duration: 180, // 3 hours
    status: "upcoming",
  },
  {
    id: "lc-1",
    name: "LeetCode Weekly Contest 356",
    platform: "leetcode",
    url: "https://leetcode.com/contest/",
    startTime: new Date(Date.now() + 432000000), // 5 days in future
    endTime: new Date(Date.now() + 432000000 + 5400000), // 5 days + 1.5 hours
    duration: 90, // 1.5 hours
    status: "upcoming",
  },
  {
    id: "cf-2",
    name: "Codeforces Round #923 (Div. 3)",
    platform: "codeforces",
    url: "https://codeforces.com/contests",
    startTime: new Date(Date.now() - 604800000), // 7 days in past
    endTime: new Date(Date.now() - 604800000 + 7200000), // 7 days in past + 2 hours
    duration: 120,
    status: "completed",
    solutionUrl: "https://www.youtube.com/watch?v=example1",
  },
  {
    id: "cc-2",
    name: "CodeChef Starters 99",
    platform: "codechef",
    url: "https://www.codechef.com/contests",
    startTime: new Date(Date.now() - 1209600000), // 14 days in past
    endTime: new Date(Date.now() - 1209600000 + 10800000), // 14 days in past + 3 hours
    duration: 180,
    status: "completed",
    solutionUrl: "https://www.youtube.com/watch?v=example2",
  },
  {
    id: "lc-2",
    name: "LeetCode Weekly Contest 355",
    platform: "leetcode",
    url: "https://leetcode.com/contest/",
    startTime: new Date(Date.now() - 259200000), // 3 days in past
    endTime: new Date(Date.now() - 259200000 + 5400000), // 3 days in past + 1.5 hours
    duration: 90,
    status: "completed",
  },
  {
    id: "cf-3",
    name: "Codeforces Round #922 (Div. 1)",
    platform: "codeforces",
    url: "https://codeforces.com/contests",
    startTime: new Date(), // Now (for demo of ongoing)
    endTime: new Date(Date.now() + 3600000), // 1 hour from now
    duration: 120,
    status: "ongoing",
  },
];

/**
 * Fetch all contests from all platforms
 */
export async function fetchAllContests(): Promise<Contest[]> {
  try {
    // In a production environment, we would make actual API calls 
    // to each platform. For now, returning mock data.
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return [...MOCK_CONTESTS];
  } catch (error) {
    console.error("Error fetching contests:", error);
    toast({
      title: "Error",
      description: "Failed to fetch contests. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
}

/**
 * Filter contests based on selected platforms and status
 */
export function filterContests(contests: Contest[], filters: ContestFilters): Contest[] {
  return contests.filter(contest => {
    // Filter by platform
    const platformMatch = filters.platforms[contest.platform];
    
    // Filter by status
    const statusMatch = filters.status[contest.status];
    
    return platformMatch && statusMatch;
  });
}

/**
 * Update contest solution URL
 */
export async function updateContestSolution(contestId: string, solutionUrl: string): Promise<boolean> {
  try {
    // In production, we would make an API call to update the solution URL
    console.log(`Updating solution for contest ${contestId} with URL ${solutionUrl}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success
    return true;
  } catch (error) {
    console.error("Error updating contest solution:", error);
    return false;
  }
}

/**
 * Bookmark a contest
 */
export function bookmarkContest(contestId: string): boolean {
  try {
    const bookmarks = getBookmarkedContests();
    
    if (bookmarks.includes(contestId)) {
      // Already bookmarked, remove it
      const updatedBookmarks = bookmarks.filter(id => id !== contestId);
      localStorage.setItem('contestBookmarks', JSON.stringify(updatedBookmarks));
      return false; // Returning false means "unbookmarked"
    } else {
      // Not bookmarked, add it
      bookmarks.push(contestId);
      localStorage.setItem('contestBookmarks', JSON.stringify(bookmarks));
      return true; // Returning true means "bookmarked"
    }
  } catch (error) {
    console.error("Error bookmarking contest:", error);
    return false;
  }
}

/**
 * Get all bookmarked contest IDs
 */
export function getBookmarkedContests(): string[] {
  try {
    const bookmarks = localStorage.getItem('contestBookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error("Error getting bookmarked contests:", error);
    return [];
  }
}

/**
 * Check if a contest is bookmarked
 */
export function isContestBookmarked(contestId: string): boolean {
  try {
    const bookmarks = getBookmarkedContests();
    return bookmarks.includes(contestId);
  } catch (error) {
    console.error("Error checking if contest is bookmarked:", error);
    return false;
  }
}
