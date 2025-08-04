import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { DESTINATIONS } from "@shared/destinations";
import type { TripWithOrganizer } from "@shared/schema";

interface SearchFormProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  organizedBy?: string;
  destination?: string;
  priceRange?: string;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState<SearchFilters>({});
  const { t } = useTranslation();
  const { toast } = useToast();

  // Get trips data to extract unique organizers
  const { data: trips = [] } = useQuery<TripWithOrganizer[]>({
    queryKey: ["/api/trips"],
  });

  // Get unique organizer names from trips
  const uniqueOrganizers = Array.from(new Set(trips.map(trip => trip.organizer.companyName))).sort();



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // No validation required - if no filters are selected, show all active trips
    
    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to trips page with search params
      const params = new URLSearchParams();
      if (filters.organizedBy) params.set('organizedBy', filters.organizedBy);
      if (filters.destination) params.set('destination', filters.destination);
      if (filters.priceRange) params.set('priceRange', filters.priceRange);
      
      setLocation(`/trips?${params.toString()}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t("searchForm.organizedBy")}</Label>
            <Select 
              value={filters.organizedBy} 
              onValueChange={(value) => setFilters({...filters, organizedBy: value === "clear" ? undefined : value})}
            >
              <SelectTrigger className="w-full text-gray-900 bg-white">
                <SelectValue placeholder={t("selectLanguage")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clear">{t("cancel")}</SelectItem>
                {uniqueOrganizers.map((organizerName) => (
                  <SelectItem key={organizerName} value={organizerName}>
                    {organizerName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t('search.destination')}</Label>
            <Select 
              value={filters.destination} 
              onValueChange={(value) => setFilters({...filters, destination: value === "clear" ? undefined : value})}
            >
              <SelectTrigger className="w-full text-gray-900 bg-white">
                <SelectValue placeholder={t("searchForm.destination")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clear">{t("cancel")}</SelectItem>
                {DESTINATIONS.map((dest) => (
                  <SelectItem key={dest.value} value={dest.value}>
                    {dest.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t("searchForm.priceRange")}</Label>
            <Select 
              value={filters.priceRange} 
              onValueChange={(value) => setFilters({...filters, priceRange: value === "clear" ? undefined : value})}
            >
              <SelectTrigger className="w-full text-gray-900 bg-white">
                <SelectValue placeholder={t("searchForm.priceRange")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clear">{t("cancel")}</SelectItem>
                <SelectItem value="0-500">Under $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
                <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
                <SelectItem value="2000-2500">$2,000 - $2,500</SelectItem>
                <SelectItem value="2500-3000">$2,500 - $3,000</SelectItem>
                <SelectItem value="3000-3500">$3,000 - $3,500</SelectItem>
                <SelectItem value="3500-4000">$3,500 - $4,000</SelectItem>
                <SelectItem value="4000">$4,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="bg-primary text-white hover:bg-primary/90 font-semibold flex items-center justify-center">
            <Search className="w-4 h-4 mr-2" />
            {t('searchForm.button')}
          </Button>
        </div>
      </form>
    </div>
  );
}
