import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Lead } from "@/lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadsTableProps {
  leads: Lead[];
}

export const LeadsTable = ({ leads }: LeadsTableProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  const getTagColor = (tag: string | null) => {
    if (!tag) return "text-muted-foreground";
    if (tag.includes("BIO IGOR")) return "text-neon-orange";
    if (tag.includes("CR 10 | LEVA 1")) return "text-amber-500";
    if (tag.includes("CR 1")) return "text-blue-400";
    if (tag.includes("CR 2")) return "text-green-400";
    if (tag.includes("CR 3")) return "text-purple-400";
    if (tag.includes("CR 6")) return "text-pink-400";
    return "text-muted-foreground";
  };

  const getFatDepositoColor = (fatDeposito: string | null) => {
    if (!fatDeposito) return "text-muted-foreground";
    if (fatDeposito === "+500k") return "text-neon-orange font-semibold";
    if (fatDeposito === "até 500k") return "text-green-400";
    if (fatDeposito === "até 250k") return "text-yellow-400";
    if (fatDeposito === "até 100k") return "text-blue-400";
    return "text-muted-foreground";
  };

  return (
    <Card className="bg-card border-border">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Todos os Leads</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header border-border hover:bg-table-header">
                <TableHead className="text-muted-foreground font-semibold">Nome</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Email</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Telefone</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Potencial</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Expertise</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Tag</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="bg-table-row border-border hover:bg-table-row-hover transition-colors"
                >
                  <TableCell className="text-foreground font-medium">{lead.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.telefone}</TableCell>
                  <TableCell className={getFatDepositoColor(lead.fat_deposito)}>
                    {lead.fat_deposito}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.expertise || "-"}
                  </TableCell>
                  <TableCell className={`font-medium ${getTagColor(lead.tag)}`}>
                    {lead.tag}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};