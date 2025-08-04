import { getDestinationImages, getDestinationPrimaryImage } from "@shared/destination-images";
import type { Trip } from "@shared/schema";

// Get images for a trip, falling back to destination images if none provided
export function getTripImages(trip: Trip): string[] {
  const tripImages = trip.images as string[] || [];
  
  // If trip has images, return them
  if (tripImages.length > 0 && tripImages.some(img => img.trim() !== '')) {
    return tripImages.filter(img => img.trim() !== '');
  }
  
  // Otherwise, return destination fallback images
  return getDestinationImages(trip.destination);
}

// Get primary image for a trip (for cards/previews)
export function getTripPrimaryImage(trip: Trip): string {
  const images = getTripImages(trip);
  return images[0];
}

// Check if trip is using fallback images
export function isUsingFallbackImages(trip: Trip): boolean {
  const tripImages = trip.images as string[] || [];
  return !tripImages.length || !tripImages.some(img => img.trim() !== '');
}