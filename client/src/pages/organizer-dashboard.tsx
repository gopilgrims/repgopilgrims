import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/lib/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Trash2,
  Plane,
  Utensils,
  Car,
  UserCheck,
  MessageSquare,
  Filter,
} from "lucide-react";
import { BOOKING_STATUSES, STATUS_CATEGORIES, getStatusInfo, type BookingStatus } from "@/lib/booking-status";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Organizer, Trip, Booking, InsertTrip } from "@shared/schema";
import { DESTINATIONS } from "@shared/destinations";
import CompanyLogo from "@/components/company-logo";

interface TripFormData extends Partial<InsertTrip> {
  tripZakirs?: number;
  tripZakirNames?: string[];
}

export default function OrganizerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, isRTL } = useTranslation();
  const queryClient = useQueryClient();
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const [showEditTrip, setShowEditTrip] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    companyName: "",
    description: "",
    yearsExperience: 0,
    contactEmail: "",
    contactPhone: "",
    businessEmail: "",
    businessPhone: "",
    website: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [tripForm, setTripForm] = useState<TripFormData>({
    title: "",
    description: "",
    destination: "",
    departureDate: undefined,
    returnDate: undefined,
    maxPilgrims: 20,
    pricePerPerson: 0,
    accommodation: "",
    accommodationStars: 3,
    includesFlights: false,
    includesMeals: false,
    includesTransport: false,
    includesGuide: false,
    tripZakirs: 2,
    tripZakirNames: [],
    itinerary: [],
    images: [],
    tags: [],
  });

  // Fetch organizer profile
  const { data: organizer, isLoading: orgLoading } = useQuery<Organizer>({
    queryKey: ["/api/organizers/by-user", user?.id],
    enabled: !!user?.id,
  });

  // Fetch organizer's trips
  const { data: trips = [], isLoading: tripsLoading } = useQuery<Trip[]>({
    queryKey: ["/api/organizers", organizer?.id, "trips"],
    enabled: !!organizer?.id,
  });

  // Fetch organizer's bookings
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<
    Booking[]
  >({
    queryKey: ["/api/organizers", organizer?.id, "bookings"],
    enabled: !!organizer?.id,
  });

  // Filter bookings based on status
  const filteredBookings = bookings.filter(booking => 
    statusFilter === "all" || booking.status === statusFilter
  );

  // Update booking status mutation
  const updateBookingStatusMutation = useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/bookings/${bookingId}`, { status });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/organizers", organizer?.id, "bookings"],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update booking status",
        variant: "destructive",
      });
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      console.log("Starting profile update with data:", profileData);
      let finalData = { ...profileData };
      
      // Handle logo upload if a new file was selected
      if (logoFile) {
        console.log("Uploading logo file:", logoFile.name);
        const formData = new FormData();
        formData.append('logo', logoFile);
        
        // Upload logo first with authentication
        try {
          const uploadResponse = await apiRequest('POST', '/api/upload/logo', formData);
          const uploadResult = await uploadResponse.json();
          console.log("Logo upload successful:", uploadResult);
          finalData.companyLogo = uploadResult.url;
        } catch (error) {
          console.error('Logo upload error:', error);
          throw new Error('Failed to upload logo. Please try again.');
        }
      }
      
      try {
        console.log("Updating organizer profile with data:", finalData);
        const response = await apiRequest("PUT", `/api/organizers/${organizer?.id}`, finalData);
        const result = await response.json();
        console.log("Profile update successful:", result);
        return result;
      } catch (error) {
        console.error('Profile update error:', error);
        // Check if error is a JSON parsing error (HTML response)
        if (error.message && error.message.includes('not valid JSON')) {
          throw new Error('Server error: received HTML instead of JSON. Please check server logs.');
        }
        throw new Error('Failed to update profile. Please try again.');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/organizers/by-user", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/organizers", organizer?.id],
      });
      setShowEditProfile(false);
      setLogoFile(null);
      setLogoPreview("");
    },
    onError: (error) => {
      console.error("Profile update mutation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Handle logo file upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Initialize profile form when organizer data loads
  useEffect(() => {
    if (organizer) {
      setProfileForm({
        companyName: organizer.companyName || "",
        description: organizer.description || "",
        yearsExperience: organizer.yearsExperience || 0,
        contactEmail: organizer.contactEmail || "",
        contactPhone: organizer.contactPhone || "",
        businessEmail: organizer.businessEmail || "",
        businessPhone: organizer.businessPhone || "",
        website: organizer.website || "",
      });
      setLogoPreview(organizer.companyLogo || "");
    }
  }, [organizer]);

  // Update trip mutation
  const updateTripMutation = useMutation({
    mutationFn: async ({
      tripId,
      tripData,
    }: {
      tripId: string;
      tripData: TripFormData;
    }) => {
      const payload = {
        ...tripData,
        departureDate: tripData.departureDate
          ? new Date(tripData.departureDate).toISOString()
          : undefined,
        returnDate: tripData.returnDate
          ? new Date(tripData.returnDate).toISOString()
          : undefined,
        itinerary: tripData.itinerary || [],
        images: tripData.images || [],
        tags: tripData.tags || [],
        tripZakirs: tripData.includesGuide
          ? tripData.tripZakirs || 2
          : undefined,
        tripZakirNames: tripData.includesGuide
          ? tripData.tripZakirNames || []
          : [],
      };

      const response = await apiRequest("PUT", `/api/trips/${tripId}`, payload);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Trip updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/organizers", organizer?.id, "trips"],
      });
      setShowEditTrip(false);
      setEditingTrip(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update trip",
        variant: "destructive",
      });
    },
  });

  // Create trip mutation
  const createTripMutation = useMutation({
    mutationFn: async (tripData: TripFormData) => {
      // Ensure dates are proper Date objects
      const payload = {
        ...tripData,
        organizerId: organizer?.id,
        departureDate: tripData.departureDate
          ? new Date(tripData.departureDate).toISOString()
          : undefined,
        returnDate: tripData.returnDate
          ? new Date(tripData.returnDate).toISOString()
          : undefined,
        itinerary: tripData.itinerary || [],
        images: tripData.images || [],
        tags: tripData.tags || [],
        tripZakirs: tripData.includesGuide
          ? tripData.tripZakirs || 2
          : undefined,
        tripZakirNames: tripData.includesGuide
          ? tripData.tripZakirNames || []
          : [],
      };

      console.log("Sending trip data:", payload);
      const response = await apiRequest("POST", "/api/trips", payload);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/organizers", organizer?.id, "trips"],
      });
      toast({
        title: "Success",
        description: "Trip created successfully!",
      });
      setShowCreateTrip(false);
      setTripForm({
        title: "",
        description: "",
        destination: "",
        departureDate: undefined,
        returnDate: undefined,
        maxPilgrims: 20,
        pricePerPerson: 0,
        accommodation: "",
        accommodationStars: 3,
        includesFlights: false,
        includesMeals: false,
        includesTransport: false,
        includesGuide: false,
        tripZakirs: 2,
        tripZakirNames: [],
        itinerary: [],
        images: [],
        tags: [],
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600">
              Please log in to access the organizer dashboard.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orgLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!organizer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Organizer Profile Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              You need to register as an organizer first.
            </p>
            <Button
              onClick={() => (window.location.href = "/organizer-signup")}
            >
              Register as Organizer
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = {
    totalTrips: trips.length,
    activeBookings: bookings.filter((b: Booking) => b.status === "confirmed")
      .length,
    totalRevenue: bookings.reduce(
      (sum: number, b: Booking) => sum + b.totalAmount,
      0,
    ),
    averageRating: organizer.satisfactionRate || 0, // Will be updated when reviews are implemented
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <CompanyLogo 
                  logoUrl={organizer.companyLogo} 
                  companyName={organizer.companyName}
                  size="lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Organizer Dashboard
                  </h1>
                  <p className="text-gray-600">{organizer.companyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                {organizer.isVerified ? (
                  <Badge className="bg-verified text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-warning border-warning"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Pending Verification
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => (window.location.href = "/whatsapp-parser")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Parser
              </Button>

              {organizer.isVerified && (
                <Dialog open={showCreateTrip} onOpenChange={setShowCreateTrip}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Trip
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Trip Package</DialogTitle>
                      <DialogDescription>
                        Fill in the details for your new pilgrimage trip package
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createTripMutation.mutate(tripForm);
                      }}
                      className="space-y-6"
                    >
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Trip Title</Label>
                          <Input
                            id="title"
                            value={tripForm.title || ""}
                            onChange={(e) =>
                              setTripForm({
                                ...tripForm,
                                title: e.target.value,
                              })
                            }
                            placeholder="e.g., 14-Day Umrah Package"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="destination">Destination</Label>
                          <Select
                            value={tripForm.destination || ""}
                            onValueChange={(value) =>
                              setTripForm({ ...tripForm, destination: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination" />
                            </SelectTrigger>
                            <SelectContent>
                              {DESTINATIONS.map((dest) => (
                                <SelectItem key={dest.value} value={dest.value}>
                                  {dest.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={tripForm.description || ""}
                          onChange={(e) =>
                            setTripForm({
                              ...tripForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe your trip package, highlights, and what makes it special..."
                          rows={4}
                          required
                        />
                      </div>

                      {/* Dates and Capacity */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="departureDate">Departure Date</Label>
                          <Input
                            id="departureDate"
                            type="date"
                            value={
                              tripForm.departureDate
                                ? new Date(tripForm.departureDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              setTripForm({
                                ...tripForm,
                                departureDate: new Date(e.target.value),
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="returnDate">Return Date</Label>
                          <Input
                            id="returnDate"
                            type="date"
                            value={
                              tripForm.returnDate
                                ? new Date(tripForm.returnDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              setTripForm({
                                ...tripForm,
                                returnDate: new Date(e.target.value),
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxPilgrims">Max Zaers</Label>
                          <Input
                            id="maxPilgrims"
                            type="number"
                            value={tripForm.maxPilgrims || 20}
                            onChange={(e) =>
                              setTripForm({
                                ...tripForm,
                                maxPilgrims: parseInt(e.target.value),
                              })
                            }
                            min="1"
                            max="200"
                            required
                          />
                        </div>
                      </div>

                      {/* Pricing and Accommodation */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="pricePerPerson">
                            Price Per Person ($)
                          </Label>
                          <Input
                            id="pricePerPerson"
                            type="number"
                            value={tripForm.pricePerPerson || 0}
                            onChange={(e) =>
                              setTripForm({
                                ...tripForm,
                                pricePerPerson: parseFloat(e.target.value),
                              })
                            }
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="accommodation">Accommodation</Label>
                          <Input
                            id="accommodation"
                            value={tripForm.accommodation || ""}
                            onChange={(e) =>
                              setTripForm({
                                ...tripForm,
                                accommodation: e.target.value,
                              })
                            }
                            placeholder="e.g., Hilton Makkah Convention Hotel"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="accommodationStars">
                            Hotel Stars
                          </Label>
                          <Select
                            value={
                              tripForm.accommodationStars?.toString() || "3"
                            }
                            onValueChange={(value) =>
                              setTripForm({
                                ...tripForm,
                                accommodationStars: parseInt(value),
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="5">5 Stars</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Trip Zakirs Section */}
                      {tripForm.includesGuide && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="tripZakirs">
                              Number of Zakire Ahlaylbait
                            </Label>
                            <Input
                              id="tripZakirs"
                              type="number"
                              value={tripForm.tripZakirs || 2}
                              onChange={(e) => {
                                const count = parseInt(e.target.value);
                                if (count >= 2 && count <= 5) {
                                  const existingNames =
                                    tripForm.tripZakirNames || [];
                                  const names = Array.from(
                                    { length: count },
                                    (_, i) => existingNames[i] || "",
                                  );
                                  setTripForm({
                                    ...tripForm,
                                    tripZakirs: count,
                                    tripZakirNames: names,
                                  });
                                }
                              }}
                              min="2"
                              max="5"
                              placeholder="Zakire Ahlaylbait (2-5)"
                            />
                          </div>

                          <div>
                            <Label>Trip Zakir Names</Label>
                            <div className="space-y-2 mt-2">
                              {Array.from(
                                { length: tripForm.tripZakirs || 2 },
                                (_, index) => (
                                  <Input
                                    key={index}
                                    placeholder={`Zakir ${index + 1} Name`}
                                    value={
                                      tripForm.tripZakirNames?.[index] || ""
                                    }
                                    onChange={(e) => {
                                      const newNames = [
                                        ...(tripForm.tripZakirNames || []),
                                      ];
                                      newNames[index] = e.target.value;
                                      setTripForm({
                                        ...tripForm,
                                        tripZakirNames: newNames,
                                      });
                                    }}
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Inclusions */}
                      <div>
                        <Label>What's Included</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includesFlights"
                              checked={tripForm.includesFlights || false}
                              onCheckedChange={(checked) =>
                                setTripForm({
                                  ...tripForm,
                                  includesFlights: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="includesFlights"
                              className="flex items-center"
                            >
                              <Plane className="w-4 h-4 mr-1" />
                              Flights
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includesMeals"
                              checked={tripForm.includesMeals || false}
                              onCheckedChange={(checked) =>
                                setTripForm({
                                  ...tripForm,
                                  includesMeals: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="includesMeals"
                              className="flex items-center"
                            >
                              <Utensils className="w-4 h-4 mr-1" />
                              Meals
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includesTransport"
                              checked={tripForm.includesTransport || false}
                              onCheckedChange={(checked) =>
                                setTripForm({
                                  ...tripForm,
                                  includesTransport: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="includesTransport"
                              className="flex items-center"
                            >
                              <Car className="w-4 h-4 mr-1" />
                              Transport
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includesGuide"
                              checked={tripForm.includesGuide || false}
                              onCheckedChange={(checked) =>
                                setTripForm({
                                  ...tripForm,
                                  includesGuide: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="includesGuide"
                              className="flex items-center"
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              Trip Zakirs
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Daily Itinerary Section */}
                      <div className="space-y-4">
                        <Label>Daily Itinerary</Label>
                        <div className="space-y-3">
                          {/* Itinerary Day inputs */}
                          {((tripForm.itinerary as any[]) || []).map(
                            (day, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-4 space-y-3"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">
                                    Day {index + 1}
                                  </h4>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newItinerary = [
                                        ...((tripForm.itinerary as any[]) ||
                                          []),
                                      ];
                                      newItinerary.splice(index, 1);
                                      setTripForm({
                                        ...tripForm,
                                        itinerary: newItinerary,
                                      });
                                    }}
                                  >
                                    Remove Day
                                  </Button>
                                </div>

                                {/* Activities for this day */}
                                <div className="space-y-2">
                                  <Label className="text-sm">Activities</Label>
                                  {(day.activities || []).map(
                                    (activity: string, actIndex: number) => (
                                      <div
                                        key={actIndex}
                                        className="flex gap-2"
                                      >
                                        <Input
                                          value={activity}
                                          onChange={(e) => {
                                            const newItinerary = [
                                              ...((tripForm.itinerary as any[]) ||
                                                []),
                                            ];
                                            if (!newItinerary[index].activities)
                                              newItinerary[index].activities =
                                                [];
                                            newItinerary[index].activities[
                                              actIndex
                                            ] = e.target.value;
                                            setTripForm({
                                              ...tripForm,
                                              itinerary: newItinerary,
                                            });
                                          }}
                                          placeholder={`Activity ${actIndex + 1} (e.g., Visit Masjid al-Haram, Tawaf, etc.)`}
                                          className="flex-1"
                                        />
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            const newItinerary = [
                                              ...((tripForm.itinerary as any[]) ||
                                                []),
                                            ];
                                            newItinerary[
                                              index
                                            ].activities.splice(actIndex, 1);
                                            setTripForm({
                                              ...tripForm,
                                              itinerary: newItinerary,
                                            });
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </div>
                                    ),
                                  )}

                                  {/* Add activity button */}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newItinerary = [
                                        ...((tripForm.itinerary as any[]) ||
                                          []),
                                      ];
                                      if (!newItinerary[index].activities)
                                        newItinerary[index].activities = [];
                                      newItinerary[index].activities.push("");
                                      setTripForm({
                                        ...tripForm,
                                        itinerary: newItinerary,
                                      });
                                    }}
                                    className="w-fit"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Activity
                                  </Button>
                                </div>
                              </div>
                            ),
                          )}

                          {/* Add day button */}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const newItinerary = [
                                ...((tripForm.itinerary as any[]) || []),
                              ];
                              newItinerary.push({
                                day: newItinerary.length + 1,
                                activities: [""],
                              });
                              setTripForm({
                                ...tripForm,
                                itinerary: newItinerary,
                              });
                            }}
                            className="w-fit"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Day
                          </Button>

                          <p className="text-sm text-gray-500">
                            Add detailed daily activities for your pilgrimage.
                            Each day should include spiritual activities, visits
                            to holy sites, meals, and any special ceremonies or
                            prayers.
                          </p>
                        </div>
                      </div>

                      {/* Images Section */}
                      <div className="space-y-4">
                        <Label>Trip Images</Label>
                        <div className="space-y-3">
                          {/* Image URL inputs */}
                          {((tripForm.images as string[]) || []).map(
                            (imageUrl, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={imageUrl}
                                  onChange={(e) => {
                                    const newImages = [
                                      ...((tripForm.images as string[]) || []),
                                    ];
                                    newImages[index] = e.target.value;
                                    setTripForm({
                                      ...tripForm,
                                      images: newImages,
                                    });
                                  }}
                                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newImages = [
                                      ...((tripForm.images as string[]) || []),
                                    ];
                                    newImages.splice(index, 1);
                                    setTripForm({
                                      ...tripForm,
                                      images: newImages,
                                    });
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ),
                          )}

                          {/* Add image button */}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newImages = [
                                ...((tripForm.images as string[]) || []),
                                "",
                              ];
                              setTripForm({ ...tripForm, images: newImages });
                            }}
                            className="w-fit"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Image URL
                          </Button>

                          <p className="text-sm text-gray-500">
                            Add URLs to high-quality images of your trip
                            destinations, accommodations, or activities.
                            Recommended size: 800x500px or larger.
                            <br />
                            <strong>Note:</strong> If no images are provided,
                            we'll use beautiful destination-specific stock
                            photos as fallbacks.
                          </p>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex justify-end space-x-3 pt-6 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateTrip(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createTripMutation.isPending}
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          {createTripMutation.isPending
                            ? "Creating..."
                            : "Create Trip"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!organizer.isVerified && (
          <Card className="mb-8 border-warning bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <h3 className="font-medium text-warning">
                    Verification Pending
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Your organizer profile is under review. You'll be able to
                    create trips once verified (usually within 48 hours).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalTrips}</p>
                  <p className="text-sm text-gray-600">Total Trips</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.activeBookings}</p>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">
                    ${stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold">
                    {stats.averageRating.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>Trip Packages</CardTitle>
              </CardHeader>
              <CardContent>
                {tripsLoading ? (
                  <p>Loading trips...</p>
                ) : !trips || trips.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No trips yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Create your first trip package to start receiving
                      bookings.
                    </p>
                    {organizer?.isVerified && (
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Trip
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Found {trips.length} trip(s)
                    </p>
                    {trips.map((trip: Trip) => (
                      <div
                        key={trip.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {trip.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {trip.destination}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(
                                  trip.departureDate,
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {trip.currentBookings}/{trip.maxPilgrims}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />$
                                {trip.pricePerPerson}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                (window.location.href = `/trips/${trip.id}`)
                              }
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingTrip(trip);
                                setTripForm({
                                  title: trip.title,
                                  description: trip.description,
                                  destination: trip.destination,
                                  departureDate: trip.departureDate,
                                  returnDate: trip.returnDate,
                                  maxPilgrims: trip.maxPilgrims,
                                  pricePerPerson: trip.pricePerPerson,
                                  accommodation: trip.accommodation,
                                  accommodationStars: trip.accommodationStars,
                                  includesFlights: trip.includesFlights,
                                  includesMeals: trip.includesMeals,
                                  includesTransport: trip.includesTransport,
                                  includesGuide: trip.includesGuide,
                                  tripZakirs: trip.tripZakirs || 2,
                                  tripZakirNames: trip.tripZakirNames || [],
                                  itinerary: trip.itinerary || [],
                                  images: trip.images || [],
                                  tags: trip.tags || [],
                                });
                                setShowEditTrip(true);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Recent Bookings</CardTitle>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {Object.entries(STATUS_CATEGORIES).map(([category, statuses]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                            {category}
                          </div>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusInfo(status).dotColor}`} />
                                <span>{getStatusInfo(status).label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <p>Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No bookings yet
                    </h3>
                    <p className="text-gray-600">
                      Bookings will appear here once zaers start booking your trips.
                    </p>
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No bookings match filter
                    </h3>
                    <p className="text-gray-600">
                      Try selecting a different status filter to see more bookings.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking: Booking) => {
                      const statusInfo = getStatusInfo(booking.status);
                      return (
                        <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <p className="font-medium text-gray-900">
                                    {booking.contactEmail}
                                  </p>
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                                    <div className="flex items-center space-x-1">
                                      <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`} />
                                      <span>{statusInfo.label}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Select
                                    value={booking.status}
                                    onValueChange={(newStatus) => {
                                      updateBookingStatusMutation.mutate({
                                        bookingId: booking.id,
                                        status: newStatus
                                      });
                                    }}
                                    disabled={updateBookingStatusMutation.isPending}
                                  >
                                    <SelectTrigger className="w-[140px] h-7 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(STATUS_CATEGORIES).map(([category, statuses]) => (
                                        <div key={category}>
                                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                                            {category}
                                          </div>
                                          {statuses.map(status => {
                                            const info = getStatusInfo(status);
                                            return (
                                              <SelectItem key={status} value={status}>
                                                <div className="flex items-center space-x-2">
                                                  <div className={`w-2 h-2 rounded-full ${info.dotColor}`} />
                                                  <span>{info.label}</span>
                                                </div>
                                              </SelectItem>
                                            );
                                          })}
                                        </div>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <Users className="w-4 h-4 inline mr-1" />
                                {booking.numberOfPilgrims} pilgrims • ${booking.totalAmount}
                              </p>
                              <p className="text-xs text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Booked: {new Date(booking.createdAt).toLocaleDateString()}
                              </p>
                              {booking.specialRequests && (
                                <p className="text-xs text-gray-600 mt-2">
                                  <MessageSquare className="w-3 h-3 inline mr-1" />
                                  Special requests: {booking.specialRequests}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {bookings.length > 0 && (
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    Showing {filteredBookings.length} of {bookings.length} bookings
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <CompanyLogo 
                    logoUrl={organizer.companyLogo} 
                    companyName={organizer.companyName}
                    size="lg"
                  />
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <p className="mt-1 text-gray-900 text-lg font-semibold">{organizer.companyName}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="mt-1 text-gray-900">{organizer.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Years of Experience
                  </label>
                  <p className="mt-1 text-gray-900">
                    {organizer.yearsExperience} years
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <p className="mt-1 text-gray-900">{organizer.contactEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <p className="mt-1 text-gray-900">{organizer.contactPhone}</p>
                </div>

                {organizer.businessEmail && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Business Email
                    </label>
                    <p className="mt-1 text-gray-900">{organizer.businessEmail}</p>
                  </div>
                )}

                {organizer.businessPhone && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Business Phone
                    </label>
                    <p className="mt-1 text-gray-900">{organizer.businessPhone}</p>
                  </div>
                )}
                {organizer.website && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <p className="mt-1 text-gray-900">{organizer.website}</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowEditProfile(true)}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Dialog */}
      {showEditProfile && (
        <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Company Profile</DialogTitle>
              <DialogDescription>
                Update your organization's information and contact details.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProfileMutation.mutate(profileForm);
                }}
                className="space-y-4"
              >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={profileForm.companyName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, companyName: e.target.value })
                    }
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={profileForm.yearsExperience}
                    onChange={(e) =>
                      setProfileForm({ 
                        ...profileForm, 
                        yearsExperience: parseInt(e.target.value) || 0
                      })
                    }
                    placeholder="Years in business"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={profileForm.description}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, description: e.target.value })
                  }
                  placeholder="Describe your company's services and experience"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={profileForm.contactEmail}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, contactEmail: e.target.value })
                    }
                    placeholder="contact@company.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={profileForm.contactPhone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, contactPhone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={profileForm.businessEmail}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, businessEmail: e.target.value })
                    }
                    placeholder="business@company.com"
                  />
                </div>

                <div>
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input
                    id="businessPhone"
                    value={profileForm.businessPhone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, businessPhone: e.target.value })
                    }
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyLogo">Company Logo</Label>
                <div className="space-y-3">
                  {logoPreview && (
                    <div className="flex items-center space-x-3">
                      <img 
                        src={logoPreview} 
                        alt="Company Logo Preview" 
                        className="w-16 h-16 object-contain rounded border"
                      />
                      <span className="text-sm text-gray-600">Current/Preview Logo</span>
                    </div>
                  )}
                  <Input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Upload PNG, JPG, or SVG. Max file size: 5MB. Recommended: 200x200px
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={profileForm.website}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, website: e.target.value })
                  }
                  placeholder="https://yourcompany.com"
                />
              </div>

              </form>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditProfile(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Button clicked, profileForm:", profileForm);
                  try {
                    updateProfileMutation.mutate(profileForm);
                  } catch (err) {
                    console.error("Mutation error:", err);
                  }
                }}
                disabled={updateProfileMutation.isPending}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Trip Dialog */}
      {showEditTrip && editingTrip && (
        <Dialog open={showEditTrip} onOpenChange={setShowEditTrip}>
          <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Trip Package</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTripMutation.mutate({
                  tripId: editingTrip.id,
                  tripData: tripForm,
                });
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editTitle">Trip Title</Label>
                  <Input
                    id="editTitle"
                    value={tripForm.title}
                    onChange={(e) =>
                      setTripForm({ ...tripForm, title: e.target.value })
                    }
                    placeholder="e.g., 14-Day Premium Umrah Package"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="editDestination">Destination</Label>
                  <Select
                    value={tripForm.destination || ""}
                    onValueChange={(value) =>
                      setTripForm({ ...tripForm, destination: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {DESTINATIONS.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={tripForm.description}
                  onChange={(e) =>
                    setTripForm({ ...tripForm, description: e.target.value })
                  }
                  placeholder="Describe your trip package in detail..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editMaxPilgrims">Maximum Pilgrims</Label>
                  <Input
                    id="editMaxPilgrims"
                    type="number"
                    value={tripForm.maxPilgrims}
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        maxPilgrims: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="editPricePerPerson">
                    Price Per Person ($)
                  </Label>
                  <Input
                    id="editPricePerPerson"
                    type="number"
                    value={tripForm.pricePerPerson}
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        pricePerPerson: parseFloat(e.target.value),
                      })
                    }
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editDepartureDate">Departure Date</Label>
                  <Input
                    id="editDepartureDate"
                    type="date"
                    value={
                      tripForm.departureDate
                        ? new Date(tripForm.departureDate).toISOString().split('T')[0]
                        : ""
                    }
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        departureDate: new Date(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="editReturnDate">Return Date</Label>
                  <Input
                    id="editReturnDate"
                    type="date"
                    value={
                      tripForm.returnDate
                        ? new Date(tripForm.returnDate).toISOString().split('T')[0]
                        : ""
                    }
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        returnDate: new Date(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editAccommodation">Accommodation</Label>
                  <Input
                    id="editAccommodation"
                    value={tripForm.accommodation}
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        accommodation: e.target.value,
                      })
                    }
                    placeholder="e.g., 5-star hotel near Haram"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="editAccommodationStars">Hotel Stars</Label>
                  <Select
                    value={tripForm.accommodationStars?.toString() || "3"}
                    onValueChange={(value) =>
                      setTripForm({
                        ...tripForm,
                        accommodationStars: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Package Inclusions */}
              <div>
                <Label>Package Inclusions</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="editIncludesFlights"
                      checked={tripForm.includesFlights || false}
                      onChange={(e) =>
                        setTripForm({
                          ...tripForm,
                          includesFlights: e.target.checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="editIncludesFlights"
                      className="flex items-center gap-2"
                    >
                      <Plane className="w-4 h-4" />
                      Flights included
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="editIncludesMeals"
                      checked={tripForm.includesMeals || false}
                      onChange={(e) =>
                        setTripForm({
                          ...tripForm,
                          includesMeals: e.target.checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="editIncludesMeals"
                      className="flex items-center gap-2"
                    >
                      <Utensils className="w-4 h-4" />
                      Meals included
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="editIncludesTransport"
                      checked={tripForm.includesTransport || false}
                      onChange={(e) =>
                        setTripForm({
                          ...tripForm,
                          includesTransport: e.target.checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="editIncludesTransport"
                      className="flex items-center gap-2"
                    >
                      <Car className="w-4 h-4" />
                      Transport included
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="editIncludesGuide"
                      checked={tripForm.includesGuide || false}
                      onChange={(e) =>
                        setTripForm({
                          ...tripForm,
                          includesGuide: e.target.checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="editIncludesGuide"
                      className="flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      Trip Zakirs (Spiritual Priests) included
                    </Label>
                  </div>
                </div>
              </div>

              {/* Trip Zakirs Section for Edit */}
              {tripForm.includesGuide && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="editTripZakirs">
                      Number of Zakire Ahlaylbait
                    </Label>
                    <Input
                      id="editTripZakirs"
                      type="number"
                      value={tripForm.tripZakirs || 2}
                      onChange={(e) => {
                        const count = parseInt(e.target.value);
                        if (count >= 2 && count <= 5) {
                          const existingNames = tripForm.tripZakirNames || [];
                          const names = Array.from(
                            { length: count },
                            (_, i) => existingNames[i] || "",
                          );
                          setTripForm({
                            ...tripForm,
                            tripZakirs: count,
                            tripZakirNames: names,
                          });
                        }
                      }}
                      min="2"
                      max="5"
                      placeholder="Zakire Ahlaylbait (2-5)"
                    />
                  </div>

                  <div>
                    <Label>Trip Zakire Ahlaylbait names</Label>
                    <div className="space-y-2 mt-2">
                      {Array.from(
                        { length: tripForm.tripZakirs || 2 },
                        (_, index) => (
                          <Input
                            key={index}
                            placeholder={`Zakir ${index + 1} Name`}
                            value={tripForm.tripZakirNames?.[index] || ""}
                            onChange={(e) => {
                              const newNames = [
                                ...(tripForm.tripZakirNames || []),
                              ];
                              newNames[index] = e.target.value;
                              setTripForm({
                                ...tripForm,
                                tripZakirNames: newNames,
                              });
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Itinerary Section for Edit */}
              <div className="space-y-4">
                <Label>Daily Itinerary</Label>
                <div className="space-y-3">
                  {/* Itinerary Day inputs */}
                  {((tripForm.itinerary as any[]) || []).map((day, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Day {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newItinerary = [
                              ...((tripForm.itinerary as any[]) || []),
                            ];
                            newItinerary.splice(index, 1);
                            setTripForm({
                              ...tripForm,
                              itinerary: newItinerary,
                            });
                          }}
                        >
                          Remove Day
                        </Button>
                      </div>

                      {/* Activities for this day */}
                      <div className="space-y-2">
                        <Label className="text-sm">Activities</Label>
                        {(day.activities || []).map(
                          (activity: string, actIndex: number) => (
                            <div key={actIndex} className="flex gap-2">
                              <Input
                                value={activity}
                                onChange={(e) => {
                                  const newItinerary = [
                                    ...((tripForm.itinerary as any[]) || []),
                                  ];
                                  if (!newItinerary[index].activities)
                                    newItinerary[index].activities = [];
                                  newItinerary[index].activities[actIndex] =
                                    e.target.value;
                                  setTripForm({
                                    ...tripForm,
                                    itinerary: newItinerary,
                                  });
                                }}
                                placeholder={`Activity ${actIndex + 1} (e.g., Visit Masjid al-Haram, Tawaf, etc.)`}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newItinerary = [
                                    ...((tripForm.itinerary as any[]) || []),
                                  ];
                                  newItinerary[index].activities.splice(
                                    actIndex,
                                    1,
                                  );
                                  setTripForm({
                                    ...tripForm,
                                    itinerary: newItinerary,
                                  });
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ),
                        )}

                        {/* Add activity button */}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newItinerary = [
                              ...((tripForm.itinerary as any[]) || []),
                            ];
                            if (!newItinerary[index].activities)
                              newItinerary[index].activities = [];
                            newItinerary[index].activities.push("");
                            setTripForm({
                              ...tripForm,
                              itinerary: newItinerary,
                            });
                          }}
                          className="w-fit"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Activity
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add day button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newItinerary = [
                        ...((tripForm.itinerary as any[]) || []),
                      ];
                      newItinerary.push({
                        day: newItinerary.length + 1,
                        activities: [""],
                      });
                      setTripForm({ ...tripForm, itinerary: newItinerary });
                    }}
                    className="w-fit"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Day
                  </Button>

                  <p className="text-sm text-gray-500">
                    Edit detailed daily activities for your pilgrimage. Each day
                    should include spiritual activities, visits to holy sites,
                    meals, and any special ceremonies or prayers.
                  </p>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <Label>Trip Images</Label>
                <div className="space-y-3">
                  {/* Image URL inputs */}
                  {((tripForm.images as string[]) || []).map(
                    (imageUrl, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={imageUrl}
                          onChange={(e) => {
                            const newImages = [
                              ...((tripForm.images as string[]) || []),
                            ];
                            newImages[index] = e.target.value;
                            setTripForm({ ...tripForm, images: newImages });
                          }}
                          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newImages = [
                              ...((tripForm.images as string[]) || []),
                            ];
                            newImages.splice(index, 1);
                            setTripForm({ ...tripForm, images: newImages });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ),
                  )}

                  {/* Add image button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newImages = [
                        ...((tripForm.images as string[]) || []),
                        "",
                      ];
                      setTripForm({ ...tripForm, images: newImages });
                    }}
                    className="w-fit"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image URL
                  </Button>

                  <p className="text-sm text-gray-500">
                    Add URLs to high-quality images of your trip destinations,
                    accommodations, or activities. Recommended size: 800x500px
                    or larger.
                    <br />
                    <strong>Note:</strong> If no images are provided, we'll use
                    beautiful destination-specific stock photos as fallbacks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditTrip(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateTripMutation.isPending}>
                  {updateTripMutation.isPending ? "Updating..." : "Update Trip"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
}
