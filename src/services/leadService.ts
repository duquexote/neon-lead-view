import { supabase, Lead } from '../lib/supabase';

export const fetchLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('power')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar leads:', error);
    throw new Error(error.message);
  }

  return data as Lead[];
};

export const getLeadsWithInstagram = async (): Promise<Lead[]> => {
  const leads = await fetchLeads();
  return leads.filter(lead => lead.instagram !== null && lead.instagram !== undefined && lead.instagram !== '');
};

export const getLeadsWithoutInstagram = async (): Promise<Lead[]> => {
  const leads = await fetchLeads();
  return leads.filter(lead => !lead.instagram || lead.instagram === '');
};

export const getLeadsByFatDeposito = async (): Promise<{ [key: string]: number }> => {
  const leads = await fetchLeads();
  
  const fatDepositoCount: { [key: string]: number } = {
    "até 50k": 0,
    "até 100k": 0,
    "até 250k": 0,
    "até 500k": 0,
    "+500k": 0
  };

  leads.forEach(lead => {
    if (lead.fat_deposito && fatDepositoCount.hasOwnProperty(lead.fat_deposito)) {
      fatDepositoCount[lead.fat_deposito]++;
    }
  });

  return fatDepositoCount;
};

export const getLeadsByTag = async (): Promise<{ [key: string]: number }> => {
  const leads = await fetchLeads();
  
  const tagCount: { [key: string]: number } = {};

  leads.forEach(lead => {
    if (lead.tag) {
      if (!tagCount[lead.tag]) {
        tagCount[lead.tag] = 0;
      }
      tagCount[lead.tag]++;
    }
  });

  return tagCount;
};

export const getLeadsByDate = async (): Promise<{ [key: string]: number }> => {
  const leads = await fetchLeads();
  
  const dateCount: { [key: string]: number } = {};

  leads.forEach(lead => {
    if (lead.created_at) {
      const date = new Date(lead.created_at).toISOString().split('T')[0];
      if (!dateCount[date]) {
        dateCount[date] = 0;
      }
      dateCount[date]++;
    }
  });

  return dateCount;
};

export const getTotalLeadsValue = async (): Promise<number> => {
  const leads = await fetchLeads();
  const { fatDepositoValues } = await import('../lib/supabase');
  
  let totalValue = 0;
  
  leads.forEach(lead => {
    if (lead.fat_deposito && fatDepositoValues[lead.fat_deposito]) {
      totalValue += fatDepositoValues[lead.fat_deposito];
    }
  });
  
  return totalValue;
};

export const getLeadsBySource = async (): Promise<{ [key: string]: number }> => {
  const leads = await fetchLeads();
  
  // Analisar origem com base no email ou instagram
  const sourceCount: { [key: string]: number } = {
    'Instagram': 0,
    'Email': 0,
    'Indicação': 0,
    'Outros': 0
  };

  leads.forEach(lead => {
    if (lead.instagram && typeof lead.instagram === 'string' && lead.instagram.trim() !== '') {
      sourceCount['Instagram']++;
    } else if (lead.email && typeof lead.email === 'string' && lead.email.includes('gmail')) {
      sourceCount['Email']++;
    } else if (lead.tag && typeof lead.tag === 'string' && lead.tag.toLowerCase().includes('indicação')) {
      sourceCount['Indicação']++;
    } else {
      sourceCount['Outros']++;
    }
  });

  return sourceCount;
};

export const getLeadsByTrelloStatus = async (): Promise<{ [key: string]: number }> => {
  const leads = await fetchLeads();
  
  const trelloCount: { [key: string]: number } = {
    'Com ID': 0,
    'Sem ID': 0
  };

  leads.forEach(lead => {
    if (lead.id_trello && typeof lead.id_trello === 'string' && lead.id_trello.trim() !== '') {
      trelloCount['Com ID']++;
    } else {
      trelloCount['Sem ID']++;
    }
  });

  return trelloCount;
};
