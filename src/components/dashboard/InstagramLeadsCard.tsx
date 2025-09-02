import { Card } from "@/components/ui/card";
import { Lead } from "@/lib/supabase";
import { Instagram } from "lucide-react";

interface InstagramLeadsCardProps {
  leads: Lead[];
}

export const InstagramLeadsCard = ({ leads }: InstagramLeadsCardProps) => {
  // Filtrar apenas leads com Instagram
  const leadsWithInstagram = leads.filter(lead => lead.instagram && typeof lead.instagram === 'string' && lead.instagram.trim() !== '');
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center mb-4">
        <Instagram className="text-pink-500 mr-2" />
        <h3 className="text-lg font-semibold text-foreground">Leads com Instagram</h3>
      </div>
      
      {leadsWithInstagram.length > 0 ? (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {leadsWithInstagram.slice(0, 10).map((lead) => (
            <div 
              key={lead.id} 
              className="flex items-center justify-between p-3 bg-card-secondary rounded-md border border-border"
            >
              <div>
                <p className="font-medium text-foreground">{lead.nome}</p>
                <p className="text-sm text-pink-500">@{lead.instagram}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{lead.fat_deposito}</p>
                <p className="text-xs text-muted-foreground">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
          
          {leadsWithInstagram.length > 10 && (
            <p className="text-center text-sm text-muted-foreground pt-2">
              + {leadsWithInstagram.length - 10} outros leads com Instagram
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum lead com Instagram encontrado</p>
        </div>
      )}
    </Card>
  );
};
