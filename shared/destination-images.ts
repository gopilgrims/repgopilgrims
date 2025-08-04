// Static destination images for fallback when trip images are not provided
export const DESTINATION_IMAGES = {
  umrah: [
    "/images/destinations/hajj.1.jpg", // Kaaba
    "/images/destinations/hajj.2.jpg", // Masjid al-Haram
    "/images/destinations/hajj.3.jpg"  // Medina
  ],
  hajj: [
    "/images/destinations/hajj.1.jpg", // Kaaba
      "/images/destinations/hajj.2.jpg", // Masjid al-Haram
      "/images/destinations/hajj.3.jpg"  // Medina
  ],
  iraq: [
    "/images/destinations/iraq.1.jpg", // Shrine of Imam Hussein
    "/images/destinations/iraq.2.jpg", // Karbala dome
    "/images/destinations/iraq.3.jpg"  // Najaf shrine
  ],
  iran: [
    "/images/destinations/iran.1.jpg", // Imam Reza shrine
    "/images/destinations/iran.2.jpg", 
  ],
  syria: [
    "/images/destinations/syria-damascus-1.jpg", // Damascus mosque
    "/images/destinations/syria-umayyad-1.jpg", // Umayyad mosque
    "/images/destinations/syria-architecture-1.jpg"  // Islamic architecture
  ],
  "iran-iraq": [
  "/images/destinations/iran.1.jpg", // Imam Reza shrine
  "/images/destinations/iraq.1.jpg", 
    "/images/destinations/iraq.2.jpg","/images/destinations/iraq.3.jpg",
    "/images/destinations/iran.2.jpg"] 
// Shrine of Imam Hussein]
};

// Get fallback images for a destination
export function getDestinationImages(destination: string): string[] {
  const key = destination.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '') as keyof typeof DESTINATION_IMAGES;
  return [...(DESTINATION_IMAGES[key] || DESTINATION_IMAGES.umrah)]; // Default to Umrah images, spread to avoid readonly issues
}

// Get primary image for a destination (for cards/previews)
export function getDestinationPrimaryImage(destination: string): string {
  const images = getDestinationImages(destination);
  return images[0];
}