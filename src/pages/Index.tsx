import { useState, useMemo } from "react";
import { mockLeads } from "@/data/mockLeads";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { filterLeadsByDate } from "@/utils/dateFilters";
import { calculateKPIs, getLeadsByPeriod, formatCurrency } from "@/utils/dashboardAnalytics";
import { BarChart3, Users, TrendingUp, DollarSign } from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredLeads = useMemo(() => {
    return filterLeadsByDate(mockLeads, activeFilter);
  }, [activeFilter]);

  const kpis = useMemo(() => {
    return calculateKPIs(filteredLeads);
  }, [filteredLeads]);

  const leadsOverTime = useMemo(() => {
    return getLeadsByPeriod(filteredLeads);
  }, [filteredLeads]);

  return (
    <div className="min-h-screen bg-dashboard-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-neon-orange" />
              Dashboard de Leads
            </h1>
            <p className="text-muted-foreground mt-1">
              Análise de performance das Landing Pages
            </p>
          </div>
          <FilterBar 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total de Leads"
            value={kpis.totalLeads}
            subtitle="Leads captados"
            trend="up"
            trendValue="+12%"
          />
          <KPICard
            title="Melhor Tag"
            value={kpis.bestPerformingTag}
            subtitle={`${kpis.leadsByTag[kpis.bestPerformingTag]} leads`}
            highlight={true}
          />
          <KPICard
            title="Potencial Total"
            value={formatCurrency(kpis.totalRevenuePotential)}
            subtitle="Faturamento estimado"
            trend="up"
            trendValue="+8%"
          />
          <KPICard
            title="Taxa de Conversão"
            value="3.4%"
            subtitle="Média das LPs"
            trend="neutral"
            trendValue="0%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Leads por Tag (LP)"
            data={kpis.chartDataByTag}
            type="bar"
            dataKey="leads"
            xAxisKey="tag"
            height={300}
          />
          <ChartCard
            title="Evolução de Leads (Últimos 7 dias)"
            data={leadsOverTime}
            type="area"
            dataKey="leads"
            xAxisKey="date"
            height={300}
          />
        </div>

        {/* Leads Table */}
        <LeadsTable leads={filteredLeads} />
      </div>
    </div>
  );
};

export default Index;