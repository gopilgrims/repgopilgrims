import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Calendar, 
  Users, 
  Hotel, 
  Star, 
  CheckCircle, 
  MapPin, 
  Plane, 
  Utensils, 
  Car, 
  UserCheck,
  Clock,
  DollarSign,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { TripWithOrganizer, Review } from "@shared/schema";
import { getTripImages, getTripPrimaryImage, isUsingFallbackImages } from "@/lib/trip-images";
import CompanyLogo from "@/components/company-logo";

const bookingSchema = z.object({
  numberOfPilgrims: z.number().min(1, "Must be at least 1 pilgrim"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Phone number is required"),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function TripDetails() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Debug the params
  console.log("TripDetails params:", params);
  
  const { data: trip, isLoading } = useQuery<TripWithOrganizer>({
    queryKey: ["/api/trips", params.id],
    enabled: !!params.id && typeof params.id === 'string',
  });

  // Fetch reviews for this trip
  const { data: tripReviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews", "trip", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/reviews?tripId=${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const allReviews = await response.json();
      return allReviews.filter((review: Review) => review.tripId === params.id);
    },
    enabled: !!params.id && typeof params.id === 'string',
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("POST", "/api/bookings", {
        ...data,
        tripId: params.id,
        userId: user?.id || "guest-user",
        totalAmount: data.numberOfPilgrims * (trip?.pricePerPerson || 0),
      });
    },
    onSuccess: () => {
      toast({
        title: "Booking submitted successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      setIsBookingOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/trips", params.id] });
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numberOfPilgrims: 1,
      contactEmail: user?.email || "",
      contactPhone: "",
      specialRequests: "",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              </div>
              <div className="bg-gray-200 h-96 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h1>
            <Link href="/trips">
              <Button>Browse all trips</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const availableSlots = trip.maxPilgrims - (trip.currentBookings || 0);
  const isFullyBooked = availableSlots <= 0;
  
  // Check if trip has ended
  const today = new Date();
  const returnDate = new Date(trip.returnDate);
  const departureDate = new Date(trip.departureDate);
  const hasEnded = returnDate < today;
  const hasStarted = departureDate < today;
  
  // Calculate days remaining until departure or status
  const getDaysStatus = () => {
    if (hasEnded) {
      return "Trip completed";
    } else if (hasStarted) {
      const daysLeft = Math.ceil((returnDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `${daysLeft} days remaining`;
    } else {
      const daysUntilDeparture = Math.ceil((departureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `Departs in ${daysUntilDeparture} days`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-500">/</span>
            <Link href="/trips" className="text-gray-500 hover:text-gray-700">Trips</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">{trip.title}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" onClick={() => setLocation("/trips")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to trips
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Hero Image */}
        <div className="mb-8 relative">
          <img 
            src={getTripPrimaryImage(trip)} 
            alt={trip.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          {isUsingFallbackImages(trip) && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white/90">
                Stock Photo
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trip Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {trip.organizer.isVerified && (
                  <Badge className="bg-verified text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {trip.tags && Array.isArray(trip.tags) && (trip.tags as string[]).map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {trip.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 text-gray-700 font-medium">
                    {trip.averageRating > 0 ? trip.averageRating.toFixed(1) : 'New'}
                  </span>
                  {trip.totalReviews > 0 && (
                    <span className="text-gray-500 text-sm ml-1">({trip.totalReviews} reviews)</span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{trip.destination}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{trip.description}</p>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Departure</p>
                      <p className="text-sm text-gray-600">{formatDate(trip.departureDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Return</p>
                      <p className="text-sm text-gray-600">{formatDate(trip.returnDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Group Size</p>
                      <p className="text-sm text-gray-600">Max {trip.maxPilgrims} pilgrims</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Hotel className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Accommodation</p>
                      <p className="text-sm text-gray-600">{trip.accommodation}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">What's Included</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {trip.includesFlights && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Plane className="w-4 h-4 mr-2 text-verified" />
                        <span>Flights included</span>
                      </div>
                    )}
                    {trip.includesMeals && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Utensils className="w-4 h-4 mr-2 text-verified" />
                        <span>All meals</span>
                      </div>
                    )}
                    {trip.includesTransport && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Car className="w-4 h-4 mr-2 text-verified" />
                        <span>Transportation</span>
                      </div>
                    )}
                    {trip.includesGuide && (
                      <div className="flex items-center text-sm text-gray-600">
                        <UserCheck className="w-4 h-4 mr-2 text-verified" />
                        <span>Expert guide</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trip Zakirs Section */}
                {trip.includesGuide && trip.tripZakirs && trip.tripZakirNames && (trip.tripZakirNames as string[]).length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3">Zakire Ahlaylbait</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(trip.tripZakirNames as string[]).map((name, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <UserCheck className="w-4 h-4 mr-2 text-primary" />
                            <span className="font-medium">{name || `Zakir ${index + 1}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Daily Itinerary */}
            {trip.itinerary && Array.isArray(trip.itinerary) && (trip.itinerary as any[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Daily Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(trip.itinerary as any[]).map((day, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                          {day.day || index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">Day {day.day || index + 1}</h4>
                          {day.activities && Array.isArray(day.activities) ? (
                            <ul className="text-sm text-gray-600 space-y-1">
                              {day.activities.map((activity: string, actIndex: number) => (
                                <li key={actIndex} className="flex items-start">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-600">{day.description || 'No activities listed'}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Show message if no itinerary */}
            {(!trip.itinerary || !Array.isArray(trip.itinerary) || (trip.itinerary as any[]).length === 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Daily Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-4">Detailed itinerary will be provided upon booking confirmation.</p>
                </CardContent>
              </Card>
            )}

            {/* Organizer Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <CompanyLogo 
                    logoUrl={trip.organizer.companyLogo} 
                    companyName={trip.organizer.companyName}
                    size="lg"
                    className="w-16 h-16"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{trip.organizer.companyName}</h3>
                      {trip.organizer.isVerified && (
                        <Badge className="bg-verified text-white text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{trip.organizer.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Experience:</span>
                        <span className="ml-1 font-medium">{trip.organizer.yearsExperience} years</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Satisfaction:</span>
                        <span className="ml-1 font-medium">{trip.organizer.satisfactionRate}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total trips:</span>
                        <span className="ml-1 font-medium">{trip.organizer.totalTrips}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Zaer Reviews</CardTitle>
                  <Link href="/reviews">
                    <Button variant="outline" size="sm">
                      View All Reviews
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {tripReviews.length > 0 ? (
                  <div className="space-y-6">
                    {tripReviews.slice(0, 3).map((review, index) => (
                      <div key={review.id}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium text-sm">{review.title}</span>
                          {review.isVerified && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified Zaer
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                        <p className="text-xs text-gray-500">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                        </p>
                        {index < tripReviews.slice(0, 3).length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                    {tripReviews.length > 3 && (
                      <div className="text-center pt-4">
                        <Link href="/reviews">
                          <Button variant="outline" size="sm">
                            View {tripReviews.length - 3} more reviews
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="font-medium mb-2">No reviews yet</p>
                    <p className="text-sm">Be the first to share your spiritual journey experience</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      ${trip.pricePerPerson.toLocaleString()}
                    </div>
                    <div className="text-gray-600">per person</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Available slots:</span>
                      <span className={`font-medium ${isFullyBooked ? 'text-warning' : 'text-verified'}`}>
                        {availableSlots} left
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${hasEnded ? 'text-gray-500' : hasStarted ? 'text-yellow-600' : 'text-green-600'}`}>
                        {getDaysStatus()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {Math.ceil((new Date(trip.returnDate).getTime() - new Date(trip.departureDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>

                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-primary text-white hover:bg-primary/90" 
                        size="lg"
                        disabled={isFullyBooked || hasEnded}
                      >
                        {hasEnded ? 'Trip Completed' : isFullyBooked ? 'Fully Booked' : 'Book Now'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Your Pilgrimage</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="numberOfPilgrims"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Pilgrims</FormLabel>
                                <FormControl>
                                  <Select 
                                    value={field.value?.toString()} 
                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[...Array(Math.min(availableSlots, 10))].map((_, i) => (
                                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                                          {i + 1} pilgrim{i + 1 > 1 ? 's' : ''}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="contactEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="contactPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="specialRequests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Requests (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Price per person:</span>
                              <span>${trip.pricePerPerson.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Number of pilgrims:</span>
                              <span>{form.watch('numberOfPilgrims') || 1}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>Total amount:</span>
                              <span>${((form.watch('numberOfPilgrims') || 1) * trip.pricePerPerson).toLocaleString()}</span>
                            </div>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={bookingMutation.isPending}
                          >
                            {bookingMutation.isPending ? 'Processing...' : 'Submit Booking Request'}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    No payment required now. You'll receive a confirmation email with payment instructions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
