
import { ContestFilters } from "@/services/api";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface PlatformFilterProps {
  filters: ContestFilters;
  onFilterChange: (filters: ContestFilters) => void;
}

export function PlatformFilter({ filters, onFilterChange }: PlatformFilterProps) {
  const togglePlatform = (platform: keyof ContestFilters["platforms"]) => {
    const newFilters = { 
      ...filters,
      platforms: {
        ...filters.platforms,
        [platform]: !filters.platforms[platform]
      }
    };
    onFilterChange(newFilters);
  };
  
  const toggleStatus = (status: keyof ContestFilters["status"]) => {
    const newFilters = {
      ...filters,
      status: {
        ...filters.status,
        [status]: !filters.status[status]
      }
    };
    onFilterChange(newFilters);
  };
  
  const resetFilters = () => {
    onFilterChange({
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
  };
  
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Platforms</h3>
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            label="Codeforces" 
            isActive={filters.platforms.codeforces}
            onClick={() => togglePlatform("codeforces")}
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
          />
          <FilterButton 
            label="CodeChef" 
            isActive={filters.platforms.codechef}
            onClick={() => togglePlatform("codechef")}
            className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
          />
          <FilterButton 
            label="LeetCode" 
            isActive={filters.platforms.leetcode}
            onClick={() => togglePlatform("leetcode")}
            className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Status</h3>
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            label="Upcoming" 
            isActive={filters.status.upcoming}
            onClick={() => toggleStatus("upcoming")}
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
          />
          <FilterButton 
            label="Ongoing" 
            isActive={filters.status.ongoing}
            onClick={() => toggleStatus("ongoing")}
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
          />
          <FilterButton 
            label="Completed" 
            isActive={filters.status.completed}
            onClick={() => toggleStatus("completed")}
            className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          />
        </div>
      </div>
      
      <Button variant="link" size="sm" onClick={resetFilters} className="px-0">
        Reset Filters
      </Button>
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

function FilterButton({ label, isActive, onClick, className }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full 
        border transition-all duration-200
        ${isActive ? className : "bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"}
      `}
    >
      {isActive && <CheckIcon className="w-3.5 h-3.5" />}
      {label}
    </button>
  );
}
