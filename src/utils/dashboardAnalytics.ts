import { Lead, fatDepositoValues } from "@/lib/supabase";
import { format, parseISO, subDays } from "date-fns";

export const calculateKPIs = (leads: Lead[]) => {
  const totalLeads = leads.length;
  
  // Leads por tag
  const leadsByTag = leads.reduce((acc, lead) => {
    if (lead.tag) {
      acc[lead.tag] = (acc[lead.tag] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Tag com melhor performance
  const bestPerformingTag = Object.entries(leadsByTag).length > 0 
    ? Object.entries(leadsByTag).reduce((a, b) => 
        leadsByTag[a[0]] > leadsByTag[b[0]] ? a : b
      )[0]
    : "Sem tag";
    
  // Tag com pior performance (menos leads)
  const worstPerformingTag = Object.entries(leadsByTag).length > 0 
    ? Object.entries(leadsByTag).reduce((a, b) => 
        leadsByTag[a[0]] < leadsByTag[b[0]] ? a : b
      )[0]
    : "Sem tag";
    
  // Contagem de leads por tag com valores altos (até 500k e +500k)
  const highValueLeadsByTag = leads.reduce((acc, lead) => {
    if (lead.tag && (lead.fat_deposito === "até 500k" || lead.fat_deposito === "+500k")) {
      acc[lead.tag] = (acc[lead.tag] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Tag com mais potencial (mais leads com valores altos)
  const highestPotentialTag = Object.entries(highValueLeadsByTag).length > 0 
    ? Object.entries(highValueLeadsByTag).reduce((a, b) => 
        highValueLeadsByTag[a[0]] > highValueLeadsByTag[b[0]] ? a : b
      )[0]
    : "Sem tag";
  
  // Número de leads com valores altos para a tag com mais potencial
  const highestPotentialTagCount = highestPotentialTag !== "Sem tag" ? 
    highValueLeadsByTag[highestPotentialTag] : 0;
    
  // Cálculo de média de leads por dia
  const dateMap = leads.reduce((acc, lead) => {
    const date = lead.created_at.split('T')[0]; // Formato YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const uniqueDays = Object.keys(dateMap).length;
  const averageLeadsPerDay = uniqueDays > 0 ? (totalLeads / uniqueDays).toFixed(1) : '0';

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
    worstPerformingTag,
    highestPotentialTag,
    highestPotentialTagCount,
    averageLeadsPerDay,
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