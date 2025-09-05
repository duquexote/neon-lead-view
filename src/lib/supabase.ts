import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xpyebyltmtoeljvknkfd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweWVieWx0bXRvZWxqdmtua2ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg1NjM0NCwiZXhwIjoyMDY1NDMyMzQ0fQ.ig2rDwje-GfY9hfK2zrXgBOybdgczKaM3mg_1vh2BOY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Lead = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  fat_deposito: string;
  tag: string | null;
  created_at: string;
  instagram: string | null;
  id_trello: string | null;
  expertise: string | null;
};

export const fatDepositoValues: { [key: string]: number } = {
  "até 50k": 50000,
  "até 100k": 100000,
  "até 250k": 250000,
  "até 500k": 500000,
  "+500k": 500000
};
