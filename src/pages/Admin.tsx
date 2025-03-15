
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Contest, fetchAllContests, updateContestSolution } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Loader, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminPage() {
  const { toast } = useToast();
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState("");
  const [solutionUrl, setSolutionUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Fetch completed contests for selection
  const fetchCompletedContests = async () => {
    setIsLoading(true);
    try {
      const allContests = await fetchAllContests();
      // Filter to only show completed contests
      const completedContests = allContests.filter(
        contest => contest.status === "completed"
      );
      setContests(completedContests);
    } catch (error) {
      console.error("Error fetching completed contests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch contests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle contest selection
  const handleContestChange = (contestId: string) => {
    setSelectedContestId(contestId);
    setIsSuccess(false);
    
    // Find the selected contest
    const selectedContest = contests.find(c => c.id === contestId);
    
    // Pre-fill the solution URL if it exists
    if (selectedContest?.solutionUrl) {
      setSolutionUrl(selectedContest.solutionUrl);
    } else {
      setSolutionUrl("");
    }
  };
  
  // Submit the solution URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedContestId) {
      toast({
        title: "Error",
        description: "Please select a contest first.",
        variant: "destructive",
      });
      return;
    }
    
    if (!solutionUrl) {
      toast({
        title: "Error",
        description: "Please enter a solution URL.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await updateContestSolution(selectedContestId, solutionUrl);
      
      if (success) {
        toast({
          title: "Success",
          description: "The solution URL has been updated successfully.",
        });
        setIsSuccess(true);
        
        // Refresh the contest list to show the updated solution URL
        fetchCompletedContests();
      } else {
        toast({
          title: "Error",
          description: "Failed to update the solution URL. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating solution URL:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <div className="glass-panel rounded-xl p-6 animate-scale-in">
          <h2 className="text-lg font-medium mb-4">Add Solutions to Completed Contests</h2>
          
          <Button 
            variant="outline" 
            onClick={fetchCompletedContests}
            disabled={isLoading}
            className="mb-6"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> 
                Loading Contests
              </>
            ) : (
              "Load Completed Contests"
            )}
          </Button>
          
          {contests.length > 0 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="contest-select" className="text-sm font-medium">
                  Select Contest
                </label>
                <Select 
                  value={selectedContestId} 
                  onValueChange={handleContestChange}
                >
                  <SelectTrigger id="contest-select" className="w-full">
                    <SelectValue placeholder="Select a contest" />
                  </SelectTrigger>
                  <SelectContent>
                    {contests.map(contest => (
                      <SelectItem key={contest.id} value={contest.id}>
                        {contest.name} ({contest.platform})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="solution-url" className="text-sm font-medium">
                  YouTube Solution URL
                </label>
                <Input
                  id="solution-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={solutionUrl}
                  onChange={(e) => {
                    setSolutionUrl(e.target.value);
                    setIsSuccess(false);
                  }}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting || !selectedContestId || !solutionUrl}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> 
                    Saving
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> 
                    Saved Successfully
                  </>
                ) : (
                  "Save Solution URL"
                )}
              </Button>
            </form>
          )}
          
          <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
            <h3 className="text-base font-medium text-foreground mb-2">
              YouTube Playlists
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a 
                  href="https://www.youtube.com/playlist?list=..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Leetcode PCDs
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/playlist?list=..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Codeforces PCDs
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/playlist?list=..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Codechef PCDs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
