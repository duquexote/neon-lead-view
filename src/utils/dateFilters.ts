import { Lead } from "@/data/mockLeads";

export const filterLeadsByDate = (leads: Lead[], filter: string): Lead[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter) {
    case "today":
      return leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        const leadDay = new Date(leadDate.getFullYear(), leadDate.getMonth(), leadDate.getDate());
        return leadDay.getTime() === today.getTime();
      });

    case "7days":
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      return leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= sevenDaysAgo;
      });

    case "14days":
      const fourteenDaysAgo = new Date(today);
      fourteenDaysAgo.setDate(today.getDate() - 14);
      return leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= fourteenDaysAgo;
      });

    case "30days":
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= thirtyDaysAgo;
      });

    case "all":
    default:
      return leads;
  }
};