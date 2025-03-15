
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Contest, ContestFilters, fetchAllContests, filterContests } from "@/services/api";
import { ContestCard } from "@/components/ContestCard";
import { PlatformFilter } from "@/components/PlatformFilter";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function IndexPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ContestFilters>({
    platforms: {
      codeforces: true,
      codechef: true,
      leetcode: true
    },
    status: {
      upcoming: true,
      ongoing: true,
      completed: true
    }
  });
  
  // Fetch contests on initial load
  useEffect(() => {
    const getContests = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllContests();
        setContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getContests();
  }, []);
  
  // Apply filters and search whenever they change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = filterContests(contests, filters);
      
      // Apply search filter if searchQuery exists
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(contest => 
          contest.name.toLowerCase().includes(query) || 
          contest.platform.toLowerCase().includes(query)
        );
      }
      
      setFilteredContests(filtered);
    };
    
    applyFilters();
  }, [contests, filters, searchQuery]);
  
  // Handler for filter changes
  const handleFilterChange = (newFilters: ContestFilters) => {
    setFilters(newFilters);
  };
  
  // Handler for contest status change (e.g., when a countdown completes)
  const handleContestStatusChange = async () => {
    const data = await fetchAllContests();
    setContests(data);
  };
  
  return (
    <Layout>
      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Input
              type="search"
              placeholder="Search contests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <PlatformFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">All Contests</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-secondary">
                {filteredContests.length} contests
              </Badge>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredContests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No contests match your current filters.</p>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onStatusChange={handleContestStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
