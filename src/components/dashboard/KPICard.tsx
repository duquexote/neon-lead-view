import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  highlight?: boolean;
}

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue,
  highlight = false 
}: KPICardProps) => {
  return (
    <Card className={`p-6 bg-kpi-card border-border ${highlight ? 'ring-2 ring-neon-orange' : ''}`}>
      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <div className="flex items-center justify-between">
          <span className={`text-3xl font-bold ${highlight ? 'text-neon-orange' : 'text-foreground'}`}>
            {value}
          </span>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 
              'text-muted-foreground'
            }`}>
              {trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4" />}
              {trendValue}
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};