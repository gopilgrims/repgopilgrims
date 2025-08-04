import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Users, Phone, Mail, Star, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { format } from "date-fns";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Booking } from "@shared/schema";

interface BookingWithTrip extends Booking {
  trip: {
    id: string;
    title: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    pricePerPerson: number;
    images: string[];
    organizer: {
      companyName: string;
      contactEmail: string;
      contactPhone: string;
    };
  };
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-600" />;
    case 'completed':
      return <Star className="h-4 w-4 text-blue-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'completed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function MyBookings() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { t } = useTranslation();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['/api/bookings/user', user?.id],
    queryFn: () => fetch(`/api/bookings/user/${user?.id}`).then(res => res.json()),
    enabled: !!user?.id && isAuthenticated,
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-semibold mb-4">{t("auth.loginRequired")}</h2>
              <p className="text-muted-foreground mb-6">{t("auth.loginToViewBookings")}</p>
              <Link href="/login">
                <Button>{t("login")}</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("myBookings.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("myBookings.subtitle")}</p>
        </div>

      {bookings.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t("myBookings.noBookings")}</h3>
            <p className="text-muted-foreground mb-6">{t("myBookings.noBookingsDesc")}</p>
            <Link href="/trips">
              <Button>{t("myBookings.browseTrips")}</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking: BookingWithTrip) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      <Link href={`/trips/${booking.trip.id}`} className="hover:underline">
                        {booking.trip.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.trip.destination}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(booking.status)}
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Trip Image */}
                {booking.trip.images && booking.trip.images.length > 0 && (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={booking.trip.images[0]}
                      alt={booking.trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Booking Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span className="font-medium">Departure:</span>
                      <span>{format(new Date(booking.trip.departureDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span className="font-medium">Return:</span>
                      <span>{format(new Date(booking.trip.returnDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">Pilgrims:</span>
                      <span>{booking.numberOfPilgrims}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Total Amount:</span>
                      <span className="text-lg font-bold text-primary">
                        ${booking.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Booking Date:</span>
                      <span>{format(new Date(booking.createdAt!), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Booking ID:</span>
                      <span className="font-mono text-xs">{booking.id}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{booking.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{booking.contactPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Special Requests</h4>
                    <p className="text-sm">{booking.specialRequests}</p>
                  </div>
                )}

                {/* Organizer Information */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Tour Organizer</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{booking.trip.organizer.companyName}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{booking.trip.organizer.contactEmail}</span>
                        </div>
                        {booking.trip.organizer.contactPhone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{booking.trip.organizer.contactPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/trips/${booking.trip.id}`}>
                        <Button variant="outline" size="sm">
                          View Trip
                        </Button>
                      </Link>
                      {(booking.status === 'completed' || booking.status === 'confirmed') && (
                        <Link href={`/reviews?tripId=${booking.trip.id}`}>
                          <Button variant="outline" size="sm">
                            Write Review
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}