import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm, { type SearchFilters } from "@/components/search-form";
import TripCard from "@/components/trip-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { TripWithOrganizer } from "@shared/schema";

export default function Trips() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState<SearchFilters>({
    organizedBy: searchParams.get('organizedBy') || undefined,
    destination: searchParams.get('destination') || undefined,
    priceRange: searchParams.get('priceRange') || undefined,
  });
  
  const [sortBy, setSortBy] = useState<string>('price-low');
  const [priceRange, setPriceRange] = useState<string>('all-prices');
  const [organizedBy, setOrganizedBy] = useState<string>('all-organizers');
  const [tags, setTags] = useState<string[]>([]);

  const { data: trips = [], isLoading } = useQuery<TripWithOrganizer[]>({
    queryKey: ["/api/trips"],
  });
  
  console.log('Trips query result:', { trips: trips.length, isLoading, filters });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange('all-prices');
    setOrganizedBy('all-organizers');
    setTags([]);
  };

  // Filter and sort trips - always show only active trips first
  const currentDate = new Date();
  let filteredTrips = trips.filter(trip => {
    const departureDate = new Date(trip.departureDate);
    const returnDate = new Date(trip.returnDate);
    
    // Always show only active trips (current date between departure and return date)
    return currentDate >= departureDate && currentDate <= returnDate;
  });

  // Apply organizer filter from search
  if (filters.organizedBy) {
    filteredTrips = filteredTrips.filter(trip => 
      trip.organizer.companyName === filters.organizedBy
    );
  }

  // Apply destination filter from search
  if (filters.destination && trips.length > 0) {
    console.log('Applying destination filter:', filters.destination);
    console.log('Available trips:', trips.map(t => ({ id: t.id, dest: t.destination })));
    
    filteredTrips = filteredTrips.filter(trip => {
      const tripDest = trip.destination.toLowerCase();
      const searchDest = filters.destination?.toLowerCase();
      
      console.log(`Comparing trip "${trip.destination}" with search "${filters.destination}"`);
      
      // Handle different destination formats
      if (searchDest === 'iraq') {
        const matches = tripDest === 'iraq' || tripDest.includes('iraq');
        console.log(`Iraq match: ${matches}`);
        return matches;
      }
      if (searchDest === 'umrah' || searchDest === 'hajj') {
        const matches = tripDest.includes('umrah') || tripDest.includes('hajj') || tripDest.includes('mecca');
        console.log(`Umrah/Hajj match: ${matches}`);
        return matches;
      }
      if (searchDest === 'iran') {
        const matches = tripDest === 'iran' || tripDest.includes('iran');
        console.log(`Iran match: ${matches}`);
        return matches;
      }
      if (searchDest === 'syria') {
        const matches = tripDest === 'syria' || tripDest.includes('syria');
        console.log(`Syria match: ${matches}`);
        return matches;
      }
      
      const matches = tripDest === searchDest;
      console.log(`Exact match: ${matches}`);
      return matches;
    });
    
    console.log('Filtered trips count:', filteredTrips.length);
  }

  // Apply price range filter from search
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number);
    filteredTrips = filteredTrips.filter(trip => {
      if (max) {
        return trip.pricePerPerson >= min && trip.pricePerPerson <= max;
      }
      return trip.pricePerPerson >= min;
    });
  }

  // Apply price filter
  if (priceRange && priceRange !== 'all-prices') {
    const [min, max] = priceRange.split('-').map(Number);
    filteredTrips = filteredTrips.filter(trip => {
      if (max) {
        return trip.pricePerPerson >= min && trip.pricePerPerson <= max;
      }
      return trip.pricePerPerson >= min;
    });
  }

  // Apply organizer filter
  if (organizedBy && organizedBy !== 'all-organizers') {
    filteredTrips = filteredTrips.filter(trip => 
      trip.organizer.companyName === organizedBy
    );
  }

  // Apply tag filter
  if (tags.length > 0) {
    filteredTrips = filteredTrips.filter(trip => 
      tags.some(tag => (trip.tags as string[]).includes(tag))
    );
  }

  // Sort trips
  switch (sortBy) {
    case 'price-low':
      filteredTrips.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
      break;
    case 'price-high':
      filteredTrips.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
      break;
    case 'rating':
      filteredTrips.sort((a, b) => b.averageRating - a.averageRating);
      break;
    case 'departure':
      filteredTrips.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
      break;
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + 
    (priceRange && priceRange !== 'all-prices' ? 1 : 0) + 
    (organizedBy && organizedBy !== 'all-organizers' ? 1 : 0) + 
    tags.length;

  // Get unique organizer names from trips
  const uniqueOrganizers = Array.from(new Set(trips.map(trip => trip.organizer.companyName))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Section */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("trips.title")}</h1>
            <p className="text-xl opacity-90">{t("trips.description")}</p>
          </div>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">{t("trips.filters")}:</span>
              </div>
              
              {/* Price Range Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48 text-gray-900 bg-white">
                  <SelectValue placeholder={t("searchForm.priceRange")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-prices">{t("tripsPage.allPrices")}</SelectItem>
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

              {/* Organized By Filter */}
              <Select value={organizedBy} onValueChange={setOrganizedBy}>
                <SelectTrigger className="w-48 text-gray-900 bg-white">
                  <SelectValue placeholder={t("searchForm.organizedBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-organizers">{t("tripsPage.allOrganizers")}</SelectItem>
                  {uniqueOrganizers.map((organizerName) => (
                    <SelectItem key={organizerName} value={organizerName}>
                      {organizerName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tag Filters */}
              <div className="flex flex-wrap gap-2">
                {['Premium', 'Budget-Friendly', 'Cultural', 'Verified'].map((tag) => (
                  <Badge
                    key={tag}
                    variant={tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  {t("tripsPage.clearFilters")} ({activeFiltersCount})
                </Button>
              )}

              {/* Sort */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-600">{t("trips.sortBy")}:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 text-gray-900 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">{t("tripsPage.priceLowToHigh")}</SelectItem>
                    <SelectItem value="price-high">{t("tripsPage.priceHighToLow")}</SelectItem>
                    <SelectItem value="rating">{t("tripsPage.highestRated")}</SelectItem>
                    <SelectItem value="departure">{t("tripsPage.departureDate")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredTrips.length} {t("tripsPage.tripsFound")}
            </h2>
            {/* Debug info - remove in production */}
            <div className="text-xs text-gray-500">
              Debug: Total trips: {trips.length}, Filtered: {filteredTrips.length}, 
              Destination filter: {filters.destination || 'none'}, Loading: {isLoading ? 'yes' : 'no'}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-t-2xl"></div>
                  <div className="bg-white p-6 rounded-b-2xl">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("tripsPage.noTripsFound")}</h3>
              <p className="text-gray-600 mb-4">
                {t("tripsPage.adjustFilters")}
              </p>
              <Button onClick={clearFilters} variant="outline">
                {t("tripsPage.clearAllFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
