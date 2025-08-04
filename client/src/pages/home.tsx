import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm from "@/components/search-form";
import TripCard from "@/components/trip-card";
import { Button } from "@/components/ui/button";
import { Shield, Star, Lock, Headphones } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import type { TripWithOrganizer } from "@shared/schema";

export default function Home() {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: trips = [], isLoading } = useQuery<TripWithOrganizer[]>({
    queryKey: ["/api/trips"],
  });

  // Redirect organizers to their dashboard
  useEffect(() => {
    if (isAuthenticated && user && user.role === "organizer") {
      setLocation("/organizer-dashboard");
    }
  }, [isAuthenticated, user, setLocation]);

  const featuredTrips = trips.slice(0, 3);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-blue-700 text-white py-20">
        {/* Background pattern overlay */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Organizer CTA Banner */}

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("home.hero.title")}
            <br />
            <span className="text-accent-orange">
              {t("home.hero.subtitle")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t("home.hero.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Organizer Card - 50% width */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("home.cta.forOrganizers")}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {t("home.cta.organizerDescription")}
                </p>
                <ul className="text-xs text-gray-600 mb-6 space-y-1 text-left">
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.listPackages")}
                  </li>
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.reachPilgrims")}
                  </li>
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.manageBookings")}
                  </li>
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.buildReputation")}
                  </li>
                </ul>
                <Link href="/organizer-signup">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-3">
                    {t("home.cta.organizerSignUp")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pilgrim Card - 50% width */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("home.cta.forPilgrims")}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {t("home.cta.pilgrimDescription")}
                </p>
                <ul className="text-xs text-gray-600 mb-6 space-y-1 text-left">
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.browseVerified")}
                  </li>
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.comparePrices")}
                  </li>
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.readReviews")}
                  </li>
                  <li className="flex items-center">
                    <Star className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 fill-current" />
                    {t("home.features.secureBooking")}
                  </li>
                </ul>

                <Link href="/trips">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-3">
                    {t("home.cta.pilgrimSignUp")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Trust indicators 
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">15K+</div>
              <div className="text-sm opacity-90">
                {t("home.stats.zaireens")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm opacity-90">
                {t("home.stats.organizers")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-sm opacity-90">{t("home.stats.rating")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">
                {t("home.stats.destinations")}
              </div>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* Featured Trip Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.featured.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("home.featured.subtitle")}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/trips">
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
              >
                {t("allTrips")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.trust.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("home.trust.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("home.trust.verified")}
              </h3>
              <p className="text-gray-600">{t("home.features.verifiedDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("home.trust.reviews")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.transparentDesc")}
              </p>
            </div>

            {/* <div className="text-center">
              <div className="bg-accent-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("home.trust.payments")}
              </h3>
              <p className="text-gray-600">{t("home.features.secureDesc")}</p>
            </div> */}

            <div className="text-center">
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("home.trust.support")}
              </h3>
              <p className="text-gray-600">{t("home.features.supportDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section 
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pilgrim Testimonials
            </h2>
            <p className="text-xl text-gray-600">
              Hear from fellow pilgrims about their transformative journeys
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                rating: 5,
                text: "The verification system gave me complete confidence in choosing my organizer. The trip exceeded all expectations, and every detail was perfectly arranged.",
                name: "Aisha Rahman",
                trip: "Umrah 2023 • London, UK",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=100&h=100&fit=crop&crop=face"
              },
              {
                rating: 5,
                text: "Being able to compare packages side-by-side and read honest reviews made all the difference. My Hajj journey was spiritually enriching and worry-free.",
                name: "Mohamed Hassan",
                trip: "Hajj 2023 • Toronto, Canada",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=100&h=100&fit=crop&crop=face"
              },
              {
                rating: 5,
                text: "The platform's transparency and the organizer's verified credentials gave me peace of mind. The Iraq ziyarat was perfectly organized and deeply meaningful.",
                name: "Fatima Ali",
                trip: "Iraq Ziyarat 2023 • Sydney, Australia",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      <Footer />
    </div>
  );
}
