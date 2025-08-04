import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/lib/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  MapPin, 
  Star, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Shield,
  Building,
  Eye,
  Award
} from "lucide-react";
import type { Organizer, Trip, TripWithOrganizer } from "@shared/schema";

interface AdminStats {
  totalOrganizers: number;
  verifiedOrganizers: number;
  totalTrips: number;
  totalPilgrims: number;
  totalReviews: number;
  averageRating: number;
}

export default function Admin() {
  const { toast } = useToast();
  const { t, isRTL } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: organizers = [], isLoading: organizersLoading } = useQuery<Organizer[]>({
    queryKey: ["/api/organizers"],
  });

  const { data: trips = [], isLoading: tripsLoading } = useQuery<TripWithOrganizer[]>({
    queryKey: ["/api/trips"],
  });

  // Verify organizer mutation
  const verifyOrganizerMutation = useMutation({
    mutationFn: async ({ organizerId, isVerified }: { organizerId: string; isVerified: boolean }) => {
      const response = await apiRequest("PATCH", `/api/admin/organizers/${organizerId}/verify`, {
        isVerified,
        verificationBadges: isVerified ? ["travel_license", "safety_certified"] : []
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/organizers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Organizer verification status updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update organizer verification",
        variant: "destructive",
      });
    },
  });

  // Filter unverified organizers for moderation
  const unverifiedOrganizers = organizers.filter(org => !org.isVerified);
  const recentTrips = trips.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Admin Header */}
      <section className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-xl opacity-90">Platform management and moderation</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-90">Last updated</div>
              <div className="font-semibold">{new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statsLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Organizers</p>
                      <p className="text-2xl font-bold">{stats?.totalOrganizers || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-verified" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Verified</p>
                      <p className="text-2xl font-bold">{stats?.verifiedOrganizers || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-accent-orange" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Trips</p>
                      <p className="text-2xl font-bold">{stats?.totalTrips || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pilgrims Served</p>
                      <p className="text-2xl font-bold">{stats?.totalPilgrims || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Reviews</p>
                      <p className="text-2xl font-bold">{stats?.totalReviews || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold">{stats?.averageRating?.toFixed(1) || '0.0'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="organizers">Organizers</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="moderation">
              Moderation
              {unverifiedOrganizers.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {unverifiedOrganizers.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-verified rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New organizer registered</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Trip booking completed</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New review submitted</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Verification Rate</span>
                      <span className="text-sm text-verified font-semibold">
                        {stats ? Math.round((stats.verifiedOrganizers / stats.totalOrganizers) * 100) : 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Trip Rating</span>
                      <span className="text-sm text-yellow-600 font-semibold">
                        {stats?.averageRating?.toFixed(1) || '0.0'} ★
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Trips</span>
                      <span className="text-sm text-primary font-semibold">
                        {trips.filter(trip => trip.isActive).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="organizers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Organizers</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage and monitor organizer accounts
                </p>
              </CardHeader>
              <CardContent>
                {organizersLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {organizers.map((organizer) => (
                      <div key={organizer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={organizer.companyLogo || ''} />
                            <AvatarFallback>{organizer.companyName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{organizer.companyName}</h3>
                              {organizer.isVerified ? (
                                <Badge className="bg-verified text-white text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-warning border-warning text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {organizer.yearsExperience} years • {organizer.totalTrips} trips • {organizer.satisfactionRate}% satisfaction
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedOrganizer(organizer)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          
                          {!organizer.isVerified && (
                            <Button 
                              size="sm" 
                              onClick={() => verifyOrganizerMutation.mutate({ 
                                organizerId: organizer.id, 
                                isVerified: true 
                              })}
                              disabled={verifyOrganizerMutation.isPending}
                              className="bg-green-600 text-white hover:bg-green-700 border-0"
                            >
                              <Award className="w-4 h-4 mr-1" />
                              {verifyOrganizerMutation.isPending ? 'Verifying...' : 'Verify'}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
                <p className="text-sm text-gray-600">
                  Monitor trip listings and bookings
                </p>
              </CardHeader>
              <CardContent>
                {tripsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTrips.map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{trip.title}</h3>
                            {trip.organizer.isVerified && (
                              <Badge className="bg-verified text-white text-xs">Verified Organizer</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{trip.destination}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>${trip.pricePerPerson.toLocaleString()}/person</span>
                            <span>{trip.currentBookings}/{trip.maxPilgrims} booked</span>
                            <span>{trip.averageRating > 0 ? `${trip.averageRating.toFixed(1)} ★` : 'No ratings'}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(`/trips/${trip.id}`, '_blank')}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Trip
                          </Button>
                          {!trip.isActive && (
                            <Badge variant="outline" className="text-gray-500">
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Pending Verifications
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Organizers awaiting verification approval
                </p>
              </CardHeader>
              <CardContent>
                {unverifiedOrganizers.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-verified mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No pending verifications at this time.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {unverifiedOrganizers.map((organizer) => (
                      <div key={organizer.id} className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={organizer.companyLogo || ''} />
                              <AvatarFallback>{organizer.companyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{organizer.companyName}</h3>
                              <p className="text-sm text-gray-600">{organizer.contactEmail}</p>
                              <p className="text-sm text-gray-500">
                                Registered {organizer.createdAt ? new Date(organizer.createdAt).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrganizer(organizer)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review Details
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => verifyOrganizerMutation.mutate({ 
                                organizerId: organizer.id, 
                                isVerified: true 
                              })}
                              disabled={verifyOrganizerMutation.isPending}
                              className="bg-green-600 text-white hover:bg-green-700 border-0"
                            >
                              <Award className="w-4 h-4 mr-1" />
                              {verifyOrganizerMutation.isPending ? 'Approving...' : 'Approve'}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => verifyOrganizerMutation.mutate({ 
                                organizerId: organizer.id, 
                                isVerified: false 
                              })}
                              disabled={verifyOrganizerMutation.isPending}
                            >
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              {verifyOrganizerMutation.isPending ? 'Rejecting...' : 'Reject'}
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Experience:</span> {organizer.yearsExperience} years</p>
                          <p><span className="font-medium">Description:</span> {organizer.description ? organizer.description.substring(0, 100) + '...' : 'No description provided'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Single Dialog for Organizer Details */}
      <Dialog open={!!selectedOrganizer} onOpenChange={() => setSelectedOrganizer(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Organizer Details</DialogTitle>
            <DialogDescription>
              Review organizer information and verification status
            </DialogDescription>
          </DialogHeader>
          {selectedOrganizer && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedOrganizer.companyLogo || ''} />
                  <AvatarFallback className="text-lg">
                    {selectedOrganizer.companyName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedOrganizer.companyName}</h3>
                  <p className="text-gray-600">{selectedOrganizer.contactEmail}</p>
                  <p className="text-gray-600">{selectedOrganizer.contactPhone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                  <p className="mt-1">{selectedOrganizer.yearsExperience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Website</label>
                  <p className="mt-1">{selectedOrganizer.website || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Verification Status</label>
                  <div className="mt-1">
                    {selectedOrganizer.isVerified ? (
                      <Badge className="bg-verified text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-warning border-warning">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Total Trips</label>
                  <p className="mt-1">{selectedOrganizer.totalTrips}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Created Date</label>
                  <p className="mt-1">{selectedOrganizer.createdAt ? new Date(selectedOrganizer.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Satisfaction Rate</label>
                  <p className="mt-1">{selectedOrganizer.satisfactionRate}%</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Company Description</label>
                <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedOrganizer.description || 'No description provided'}
                </p>
              </div>

              <div className="flex space-x-3">
                {!selectedOrganizer.isVerified ? (
                  <Button 
                    onClick={() => {
                      verifyOrganizerMutation.mutate({ 
                        organizerId: selectedOrganizer.id, 
                        isVerified: true 
                      });
                      setSelectedOrganizer(null);
                    }}
                    disabled={verifyOrganizerMutation.isPending}
                    className="bg-green-600 text-white hover:bg-green-700 border-0"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    {verifyOrganizerMutation.isPending ? 'Verifying...' : 'Approve Organizer'}
                  </Button>
                ) : (
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      verifyOrganizerMutation.mutate({ 
                        organizerId: selectedOrganizer.id, 
                        isVerified: false 
                      });
                      setSelectedOrganizer(null);
                    }}
                    disabled={verifyOrganizerMutation.isPending}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {verifyOrganizerMutation.isPending ? 'Removing...' : 'Remove Verification'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
