import { Button } from "@/components/ui/button";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const filters = [
    { key: "today", label: "Hoje" },
    { key: "7days", label: "7 dias" },
    { key: "14days", label: "14 dias" },
    { key: "30days", label: "30 dias" },
    { key: "all", label: "Todos" }
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "secondary"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={
            activeFilter === filter.key 
              ? "bg-neon-orange text-black hover:bg-neon-orange-light" 
              : "bg-secondary text-foreground hover:bg-muted"
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};