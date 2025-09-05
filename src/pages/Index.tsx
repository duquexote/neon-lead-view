import { useState, useMemo, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { filterLeadsByDate } from "@/utils/dateFilters";
import { calculateKPIs, getLeadsByPeriod, formatCurrency } from "@/utils/dashboardAnalytics";
import { BarChart3, Users, TrendingUp, DollarSign, Calendar, Award } from "lucide-react";
import { fetchLeads } from "@/services/leadService";
import { Lead } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Buscar dados do Supabase
  const { data: leads = [], isLoading, error } = useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: fetchLeads
  });


  const filteredLeads = useMemo(() => {
    return filterLeadsByDate(leads, activeFilter);
  }, [leads, activeFilter]);

  const kpis = useMemo(() => {
    return calculateKPIs(filteredLeads);
  }, [filteredLeads]);

  const leadsOverTime = useMemo(() => {
    return getLeadsByPeriod(filteredLeads);
  }, [filteredLeads]);
  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-orange mx-auto"></div>
          <p className="mt-4 text-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dashboard-bg p-6 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl">Erro ao carregar dados</p>
          <p className="mt-2">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

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
            subtitle={`${kpis.leadsByTag[kpis.bestPerformingTag] || 0} leads`}
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
            title="Pior Tag"
            value={kpis.worstPerformingTag}
            subtitle={`${kpis.leadsByTag[kpis.worstPerformingTag] || 0} leads`}
            trend="down"
            trendValue="-"
          />
        </div>

        {/* Tag com mais potencial, Expert com Mais Leads e Média de Leads por Dia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <KPICard
            title="TAG com mais Potencial"
            value={kpis.highestPotentialTag}
            subtitle={`${kpis.highestPotentialTagCount} leads com valores altos`}
            trend="up"
            trendValue="+"
            highlight={true}
          />
          <KPICard
            title="Expertise mais atingida"
            value={kpis.topExpert}
            subtitle={`${kpis.topExpertCount} leads preenchidos`}
            trend="up"
            trendValue="+"
            icon={<Award className="w-5 h-5" />}
            highlight={true}
          />
          <KPICard
            title="Média de Leads por Dia"
            value={kpis.averageLeadsPerDay}
            subtitle="Leads captados por dia"
            trend="neutral"
            trendValue="diário"
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