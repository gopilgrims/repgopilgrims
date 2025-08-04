import { useState } from "react";
import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Search,
  Filter,
  Plus,
  Calendar,
  MapPin,
  CheckCircle,
  User,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Review, Trip, InsertReview, TripWithOrganizer } from "@shared/schema";

export default function ReviewsPage() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, isRTL } = useTranslation();
  const queryClient = useQueryClient();
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Check URL params for tripId to auto-open review dialog
  const urlParams = new URLSearchParams(window.location.search);
  const urlTripId = urlParams.get('tripId');
  
  const [reviewForm, setReviewForm] = useState({
    tripId: "",
    organizerId: "",
    rating: 5,
    spiritualGuidanceRating: 5,
    spiritualCoverageRating: 5,
    accommodationDistanceRating: 5,
    supportBehaviorRating: 5,
    foodQualityRating: 5,
    hotelQualityRating: 5,
    valueForMoneyRating: 5,
    transportationRating: 5,
    proServicesRating: 5,
    title: "",
    comment: "",
    goodExperience: "",
    badExperience: "",
  });

  // Fetch all reviews with trip and organizer info
  const { data: reviews =[], isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
    enabled: isAuthenticated,
  });

  // Fetch user's completed trips for review creation
  const { data: userTrips = [] } = useQuery<Trip[]>({
    queryKey: ["/api/users", user?.id, "completed-trips"],
    queryFn: () => fetch(`/api/users/${user!.id}/completed-trips`).then(res => res.json()),
    enabled: !!user?.id && isAuthenticated,
  });

  // Fetch trips with organizer data for review display
  const { data: tripsWithOrganizer = [] } = useQuery<TripWithOrganizer[]>({
    queryKey: ["/api/trips"],
    enabled: isAuthenticated,
  });

  // Auto-select trip and open review dialog if tripId in URL
  React.useEffect(() => {
    if (urlTripId && userTrips.length > 0 && !selectedTrip) {
      const trip = userTrips.find(t => t.id === urlTripId);
      if (trip) {
        setSelectedTrip(trip);
        setReviewForm({ ...reviewForm, tripId: urlTripId });
        setShowCreateReview(true);
      }
    }
  }, [urlTripId, userTrips, selectedTrip]);

  // Create review mutation
  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: InsertReview) => {
      const response = await apiRequest("POST", "/api/reviews", reviewData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trips"] });
      toast({
        title: t("success"),
        description: t("reviews.submitSuccess"),
      });
      setShowCreateReview(false);
      setReviewForm({
        tripId: "",
        organizerId: "",
        rating: 5,
        spiritualGuidanceRating: 5,
        spiritualCoverageRating: 5,
        accommodationDistanceRating: 5,
        supportBehaviorRating: 5,
        foodQualityRating: 5,
        hotelQualityRating: 5,
        valueForMoneyRating: 5,
        transportationRating: 5,
        proServicesRating: 5,
        title: "",
        comment: "",
        goodExperience: "",
        badExperience: "",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: t("auth.unauthorized"),
          description: t("auth.loginAgain"),
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Filter reviews based on rating and search term
  const filteredReviews = reviews.filter((review) => {
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating;
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip) return;

    createReviewMutation.mutate({
      tripId: selectedTrip.id,
      userId: (user as any)?.id || "",
      organizerId: selectedTrip.organizerId,
      rating: reviewForm.rating,
      spiritualGuidanceRating: reviewForm.spiritualGuidanceRating,
      spiritualCoverageRating: reviewForm.spiritualCoverageRating,
      accommodationDistanceRating: reviewForm.accommodationDistanceRating,
      supportBehaviorRating: reviewForm.supportBehaviorRating,
      foodQualityRating: reviewForm.foodQualityRating,
      hotelQualityRating: reviewForm.hotelQualityRating,
      valueForMoneyRating: reviewForm.valueForMoneyRating,
      transportationRating: reviewForm.transportationRating,
      proServicesRating: reviewForm.proServicesRating,
      title: reviewForm.title,
      comment: reviewForm.comment,
      goodExperience: reviewForm.goodExperience,
      badExperience: reviewForm.badExperience,
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const getTripById = (tripId: string) => {
    return tripsWithOrganizer.find(trip => trip.id === tripId);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t("auth.accessDenied")}
            </h1>
            <p className="text-gray-600 mb-6">
              {t("reviewsPage.loginToView")}
            </p>
            <Link href="/login">
              <Button>
                {t("reviewsPage.loginToContinue")}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("backToHome")}
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{t("reviews")}</h1>
              <p className="text-gray-600 mt-2">
                {t("reviewsPage.description")}
              </p>
            </div>
            
            {isAuthenticated && (
              <Dialog open={showCreateReview} onOpenChange={setShowCreateReview}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    {t("reviewsPage.writeReview")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader className="pb-4 sticky top-0 bg-white z-10 border-b">
                    <DialogTitle>Share Your Experience</DialogTitle>
                    <DialogDescription>
                      Help fellow Zaers by sharing your spiritual journey experience
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <Label htmlFor="trip">Select Trip</Label>
                      <Select
                        value={selectedTrip?.id || ""}
                        onValueChange={(value) => {
                          const trip = userTrips.find(t => t.id === value);
                          setSelectedTrip(trip || null);
                          setReviewForm({ ...reviewForm, tripId: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a completed trip" />
                        </SelectTrigger>
                        <SelectContent>
                          {userTrips.map((trip) => (
                            <SelectItem key={trip.id} value={trip.id}>
                              {trip.title} - {trip.destination}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="goodExperience" className="text-base font-medium text-green-700">
                          What went well? (Good Experience)
                        </Label>
                        <Textarea
                          id="goodExperience"
                          placeholder="Share the positive aspects of your spiritual journey..."
                          value={reviewForm.goodExperience}
                          onChange={(e) => setReviewForm({ ...reviewForm, goodExperience: e.target.value })}
                          className="mt-2 min-h-[100px] border-green-200 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="badExperience" className="text-base font-medium text-red-700">
                          What didn't go well? (Areas for Improvement)
                        </Label>
                        <Textarea
                          id="badExperience"
                          placeholder="Share constructive feedback to help improve future trips..."
                          value={reviewForm.badExperience}
                          onChange={(e) => setReviewForm({ ...reviewForm, badExperience: e.target.value })}
                          className="mt-2 min-h-[100px] border-red-200 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-semibold">Overall Rating</Label>
                      <div className="mt-2">
                        {renderStars(reviewForm.rating, true, (rating) =>
                          setReviewForm({ ...reviewForm, rating })
                        )}
                      </div>
                    </div>

                    {/* Detailed Ratings Section - Simplified */}
                    <div className="space-y-3 border-t pt-4">
                      <Label className="text-base font-medium">Detailed Ratings</Label>
                      <p className="text-xs text-gray-500">Rate specific aspects (1-5 stars each)</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        {/* Spiritual Guidance */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Spiritual Guidance & Coverage</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.spiritualGuidanceRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, spiritualGuidanceRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.spiritualGuidanceRating})</span>
                          </div>
                        </div>

                        {/* Spiritual Coverage */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Aamaal Coverage</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.spiritualCoverageRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, spiritualCoverageRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.spiritualCoverageRating})</span>
                          </div>
                        </div>

                        {/* Accommodation Distance */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Distance From Haram</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.accommodationDistanceRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, accommodationDistanceRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.accommodationDistanceRating})</span>
                          </div>
                        </div>

                        {/* Support/Behavior */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Leader & Volunteers</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.supportBehaviorRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, supportBehaviorRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.supportBehaviorRating})</span>
                          </div>
                        </div>

                        {/* Food Quality */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Food</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.foodQualityRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, foodQualityRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.foodQualityRating})</span>
                          </div>
                        </div>

                        {/* Hotel Quality */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Hotel, Bed & Bath</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.hotelQualityRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, hotelQualityRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.hotelQualityRating})</span>
                          </div>
                        </div>

                        {/* Value for Money */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Value For Money</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.valueForMoneyRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, valueForMoneyRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.valueForMoneyRating})</span>
                          </div>
                        </div>

                        {/* Transportation */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">Transport</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.transportationRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, transportationRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.transportationRating})</span>
                          </div>
                        </div>

                        {/* PRO Services */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">PRO Services</Label>
                          <div className="flex items-center gap-1">
                            {renderStars(reviewForm.proServicesRating, true, (rating) =>
                              setReviewForm({ ...reviewForm, proServicesRating: rating })
                            )}
                            <span className="text-xs text-gray-400">({reviewForm.proServicesRating})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Review Title</Label>
                      <Input
                        id="title"
                        value={reviewForm.title}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, title: e.target.value })
                        }
                        placeholder="e.g., Exceptional spiritual journey"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="comment">Overall Experience</Label>
                      <Textarea
                        id="comment"
                        value={reviewForm.comment}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, comment: e.target.value })
                        }
                        placeholder="Share details about your spiritual journey, the organizer's service, accommodations, and overall experience..."
                        rows={5}
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateReview(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={createReviewMutation.isPending || !selectedTrip}
                      >
                        {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviewsLoading ? (
            <div className="text-center py-8">Loading reviews...</div>
          ) : filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || filterRating !== "all"
                    ? "Try adjusting your search or filters"
                    : "Be the first to share your spiritual journey experience"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map((review) => {
              const trip = getTripById(review.tripId);
              return (
                <Card key={review.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                          </span>
                          {review.isVerified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {((review as any).goodExperience && (review as any).goodExperience.trim()) && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-600 bg-green-50">
                              Has Positive Feedback
                            </Badge>
                          )}
                          {((review as any).badExperience && (review as any).badExperience.trim()) && (
                            <Badge variant="outline" className="text-xs text-orange-600 border-orange-600 bg-orange-50">
                              Has Improvement Areas
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">{review.title}</CardTitle>
                        {trip && (
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {trip.destination}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {trip.title}
                            </span>
                          </CardDescription>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>Zaer Review</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {review.comment && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">General Comment</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    )}
                    
                    {/* Good Experience Section */}
                    {(review as any).goodExperience && (review as any).goodExperience.trim() && (
                      <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                        <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          What went well
                        </h4>
                        <p className="text-green-800 leading-relaxed">
                          {(review as any).goodExperience}
                        </p>
                      </div>
                    )}
                    
                    {/* Bad Experience Section */}
                    {(review as any).badExperience && (review as any).badExperience.trim() && (
                      <div className="mb-4 p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r">
                        <h4 className="text-sm font-medium text-orange-700 mb-2 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Areas for improvement
                        </h4>
                        <p className="text-orange-800 leading-relaxed">
                          {(review as any).badExperience}
                        </p>
                      </div>
                    )}
                    
                    {/* Detailed Ratings Display - Consistent with form */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium mb-2 text-gray-700">Detailed Ratings</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spiritual Guidance & Coverage</span>
                          <span className="font-medium">{review.spiritualGuidanceRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aamaal Coverage</span>
                          <span className="font-medium">{review.spiritualCoverageRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distance From Haram</span>
                          <span className="font-medium">{review.accommodationDistanceRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Leader & Volunteers</span>
                          <span className="font-medium">{review.supportBehaviorRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Food</span>
                          <span className="font-medium">{review.foodQualityRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hotel, Bed & Bath</span>
                          <span className="font-medium">{review.hotelQualityRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Value For Money</span>
                          <span className="font-medium">{review.valueForMoneyRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transport</span>
                          <span className="font-medium">{review.transportationRating || 5}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">PRO Services</span>
                          <span className="font-medium">{review.proServicesRating || 5}/5</span>
                        </div>
                      </div>
                    </div>
                    
                    {trip && (
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                        <span>Trip: {trip.title}</span>
                        <span>Organizer: {trip.organizer?.companyName || 'N/A'}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
        
        {/* Load More Button - for future pagination */}
        {filteredReviews.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}