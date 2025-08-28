export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  fat_deposito: string;
  tag: string;
  created_at: string;
}

export const mockLeads: Lead[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-1111",
    fat_deposito: "até 100k",
    tag: "CR 1 | LEVA 1",
    created_at: "2024-01-20T10:30:00Z"
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(11) 99999-2222",
    fat_deposito: "até 250k",
    tag: "CR 2 | LEVA 1",
    created_at: "2024-01-20T14:15:00Z"
  },
  {
    id: "3",
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    telefone: "(11) 99999-3333",
    fat_deposito: "+500k",
    tag: "BIO IGOR",
    created_at: "2024-01-19T09:45:00Z"
  },
  {
    id: "4",
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 99999-4444",
    fat_deposito: "até 50k",
    tag: "CR 3 | LEVA 1",
    created_at: "2024-01-19T16:20:00Z"
  },
  {
    id: "5",
    nome: "Pedro Rodrigues",
    email: "pedro.rodrigues@email.com",
    telefone: "(11) 99999-5555",
    fat_deposito: "até 500k",
    tag: "CR 6 | LEVA 1",
    created_at: "2024-01-18T11:10:00Z"
  },
  {
    id: "6",
    nome: "Luiza Fernandes",
    email: "luiza.fernandes@email.com",
    telefone: "(11) 99999-6666",
    fat_deposito: "até 100k",
    tag: "CR 1 | LEVA 1",
    created_at: "2024-01-18T13:30:00Z"
  },
  {
    id: "7",
    nome: "Rafael Lima",
    email: "rafael.lima@email.com",
    telefone: "(11) 99999-7777",
    fat_deposito: "até 250k",
    tag: "BIO IGOR",
    created_at: "2024-01-17T08:45:00Z"
  },
  {
    id: "8",
    nome: "Fernanda Alves",
    email: "fernanda.alves@email.com",
    telefone: "(11) 99999-8888",
    fat_deposito: "+500k",
    tag: "CR 2 | LEVA 1",
    created_at: "2024-01-17T15:20:00Z"
  },
  {
    id: "9",
    nome: "Roberto Martins",
    email: "roberto.martins@email.com",
    telefone: "(11) 99999-9999",
    fat_deposito: "até 50k",
    tag: "CR 3 | LEVA 1",
    created_at: "2024-01-16T10:15:00Z"
  },
  {
    id: "10",
    nome: "Juliana Sousa",
    email: "juliana.sousa@email.com",
    telefone: "(11) 99999-0000",
    fat_deposito: "até 100k",
    tag: "CR 6 | LEVA 1",
    created_at: "2024-01-16T14:50:00Z"
  },
  {
    id: "11",
    nome: "Bruno Cardoso",
    email: "bruno.cardoso@email.com",
    telefone: "(11) 88888-1111",
    fat_deposito: "até 500k",
    tag: "BIO IGOR",
    created_at: "2024-01-15T09:30:00Z"
  },
  {
    id: "12",
    nome: "Camila Reis",
    email: "camila.reis@email.com",
    telefone: "(11) 88888-2222",
    fat_deposito: "até 250k",
    tag: "CR 1 | LEVA 1",
    created_at: "2024-01-15T16:40:00Z"
  },
  {
    id: "13",
    nome: "Diego Barbosa",
    email: "diego.barbosa@email.com",
    telefone: "(11) 88888-3333",
    fat_deposito: "+500k",
    tag: "CR 2 | LEVA 1",
    created_at: "2024-01-14T12:25:00Z"
  },
  {
    id: "14",
    nome: "Letícia Nunes",
    email: "leticia.nunes@email.com",
    telefone: "(11) 88888-4444",
    fat_deposito: "até 100k",
    tag: "CR 3 | LEVA 1",
    created_at: "2024-01-14T18:15:00Z"
  },
  {
    id: "15",
    nome: "Gustavo Pereira",
    email: "gustavo.pereira@email.com",
    telefone: "(11) 88888-5555",
    fat_deposito: "até 50k",
    tag: "CR 6 | LEVA 1",
    created_at: "2024-01-13T07:20:00Z"
  }
];

export const fatDepositoValues: { [key: string]: number } = {
  "até 50k": 50000,
  "até 100k": 100000,
  "até 250k": 250000,
  "até 500k": 500000,
  "+500k": 1000000
};