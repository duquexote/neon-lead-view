import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  title: string;
  stats: { label: string; value: number; color?: string }[];
  total: number;
}

export const StatsCard = ({ title, stats, total }: StatsCardProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">{stat.label}</span>
              <span className="text-muted-foreground">
                {stat.value} ({Math.round((stat.value / total) * 100)}%)
              </span>
            </div>
            <Progress 
              value={(stat.value / total) * 100} 
              className={`h-2 ${stat.color || "bg-neon-orange"}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
