import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Users, Hotel, Star, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import type { TripWithOrganizer } from "@shared/schema";
import { getTripPrimaryImage, isUsingFallbackImages } from "@/lib/trip-images";

interface TripCardProps {
  trip: TripWithOrganizer;
}

export default function TripCard({ trip }: TripCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getBadgeColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'premium':
        return 'bg-accent-orange text-white';
      case 'budget-friendly':
        return 'bg-blue-100 text-blue-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'verified':
        return 'bg-verified text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img 
          src={getTripPrimaryImage(trip)} 
          alt={trip.title}
          className="w-full h-64 object-cover"
        />
        {isUsingFallbackImages(trip) && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/90 text-xs">
              Stock Photo
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {trip.organizer.isVerified && (
              <Badge className="bg-verified text-white text-xs font-medium">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {trip.tags && Array.isArray(trip.tags) ? trip.tags.map((tag) => (
              <Badge 
                key={tag} 
                className={`text-xs font-medium ${getBadgeColor(tag)}`}
              >
                {tag}
              </Badge>
            )) : null}
          </div>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-gray-700 font-medium">
              {trip.averageRating > 0 ? trip.averageRating.toFixed(1) : 'New'}
            </span>
            {trip.totalReviews > 0 && (
              <span className="text-gray-500 text-sm ml-1">({trip.totalReviews})</span>
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{trip.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {formatDate(trip.departureDate)} - {formatDate(trip.returnDate)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>Max {trip.maxPilgrims} pilgrims</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Hotel className="w-4 h-4 mr-2" />
            <span>{trip.accommodation}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${trip.pricePerPerson.toLocaleString()}
            </span>
            <span className="text-gray-600">/person</span>
          </div>
          <Link href={`/trips/${String(trip.id)}`}>
            <Button className="bg-primary text-white hover:bg-primary/90 font-medium">
              View Details
            </Button>
          </Link>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={trip.organizer.companyLogo || ''} alt={trip.organizer.companyName} />
              <AvatarFallback>{trip.organizer.companyName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{trip.organizer.companyName}</p>
              <p className="text-xs text-gray-600">
                {trip.organizer.yearsExperience} years experience • {trip.organizer.satisfactionRate}% satisfaction
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
