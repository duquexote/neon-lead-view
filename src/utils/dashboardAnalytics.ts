import { Lead, fatDepositoValues } from "@/data/mockLeads";
import { format, parseISO, subDays } from "date-fns";

export const calculateKPIs = (leads: Lead[]) => {
  const totalLeads = leads.length;
  
  // Leads por tag
  const leadsByTag = leads.reduce((acc, lead) => {
    acc[lead.tag] = (acc[lead.tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Tag com melhor performance
  const bestPerformingTag = Object.entries(leadsByTag).reduce((a, b) => 
    leadsByTag[a[0]] > leadsByTag[b[0]] ? a : b
  )[0];

  // Faturamento potencial total
  const totalRevenuePotential = leads.reduce((sum, lead) => {
    return sum + (fatDepositoValues[lead.fat_deposito] || 0);
  }, 0);

  // Dados para gráfico de barras (leads por tag)
  const chartDataByTag = Object.entries(leadsByTag).map(([tag, count]) => ({
    tag: tag.length > 15 ? tag.substring(0, 15) + "..." : tag,
    leads: count,
    fullTag: tag
  }));

  return {
    totalLeads,
    leadsByTag,
    bestPerformingTag,
    totalRevenuePotential,
    chartDataByTag
  };
};

export const getLeadsByPeriod = (leads: Lead[]) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return {
      date: format(date, 'dd/MM'),
      leads: 0
    };
  }).reverse();

  leads.forEach(lead => {
    const leadDate = parseISO(lead.created_at);
    const dayIndex = last7Days.findIndex(day => {
      const dayDate = format(leadDate, 'dd/MM');
      return day.date === dayDate;
    });
    
    if (dayIndex !== -1) {
      last7Days[dayIndex].leads++;
    }
  });

  return last7Days;
};

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return `R$ ${value.toLocaleString('pt-BR')}`;
};