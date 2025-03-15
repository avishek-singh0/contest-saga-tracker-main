
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Contest, fetchAllContests, getBookmarkedContests } from "@/services/api";
import { ContestCard } from "@/components/ContestCard";
import { Loader, BookmarkX } from "lucide-react";

export default function BookmarksPage() {
  const [bookmarkedContests, setBookmarkedContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch bookmarked contests on initial load and re-fetch if bookmarks change
  useEffect(() => {
    const getContests = async () => {
      setIsLoading(true);
      try {
        const allContests = await fetchAllContests();
        const bookmarkIds = getBookmarkedContests();
        
        const filtered = allContests.filter(contest => 
          bookmarkIds.includes(contest.id)
        );
        
        setBookmarkedContests(filtered);
      } catch (error) {
        console.error("Error fetching bookmarked contests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getContests();
    
    // Set up a listener for storage events to update if bookmarks change in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "contestBookmarks") {
        getContests();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  // Handler for contest status change or when bookmarks are updated
  const handleUpdateBookmarks = async () => {
    const allContests = await fetchAllContests();
    const bookmarkIds = getBookmarkedContests();
    
    const filtered = allContests.filter(contest => 
      bookmarkIds.includes(contest.id)
    );
    
    setBookmarkedContests(filtered);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bookmarked Contests</h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : bookmarkedContests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-border p-8">
            <BookmarkX className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
            <h3 className="text-lg font-medium mb-2">No bookmarked contests</h3>
            <p>Bookmark contests you're interested in to see them here.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                onStatusChange={handleUpdateBookmarks}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
