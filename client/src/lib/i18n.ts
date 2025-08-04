import React from "react";
import { useLanguage } from "@/components/language-provider";
export type { Language } from "@/components/language-provider";

// Internationalization configuration
export const supportedLanguages = {
  en: "English",
  ar: "العربية",
  ur: "اردو",
  fa: "فارسی",
  gu: "ગુજરાતી",
};

export const rtlLanguages = ["ar", "ur", "fa"];

// Translation keys and values
export const translations = {
  en: {
    // Navigation
    homeNav: "Home",
    tripsTitle: "Trips",
    reviews: "Reviews",
    myBookingsNav: "My Bookings",
    organizerDashboard: "Organizer Dashboard",
    whatsappParser: "WhatsApp Parser",
    whatsappDescription:
      "Convert your WhatsApp tour announcements into structured trip listings quickly and easily",
    login: "Login",
    logout: "Logout",
    admin: "Admin",
    profile: "Profile",

    // Navigation items
    nav: {
      browse: "Browse Trips",
      help: "Help & Support",
    },

    // Authentication buttons
    signIn: "Sign In",
    organisersSignUp: "Organisers, Sign Up",
    pilgrimsSignUp: "Pilgrims, Sign Up",

    // Common
    filter: "Filter",
    loading: "Loading...",
    backToHome: "Back to Home",
    selectLanguage: "Select Language",
    allTrips: "View All Trips",

    // Home page
    home: {
      hero: {
        title: "From intention to",
        subtitle: "Spiritual Journey",
        description:
          "Embark on your sacred journey with verified organizers. Explore trusted reviews and book your Hajj, Umrah, or Ziyarat to Iraq, Iran and Syria with confidence.",
        organizerBanner:
          "Are you a tour organizer? Sign up to list your pilgrimage packages, manage bookings, and build your reputation through authentic pilgrim reviews.",
        organizerSignUpButton: "Sign Up as Organizer",
      },
      stats: {
        zaireens: "Happy Zaire",
        organizers: "Verified Organizers",
        destinations: "Sacred Destinations",
        reviews: "Authentic Reviews",
        rating: "Average Rating",
      },
      trust: {
        title: "Why Trust GoPilgrims.com?",
        subtitle:
          "Your spiritual journey deserves the highest level of care and authenticity",
        verified: "Verified Organizers",
        reviews: "Transparent Reviews",
        payments: "Secure Payments",
        support: "24/7 Support",
      },
      features: {
        verified: "Verified Organizers",
        verifiedDesc: "All tour operators are thoroughly vetted and verified",
        transparent: "Transparent Reviews",
        transparentDesc: "Read honest experiences from fellow travelers",
        secure: "Secure Bookings",
        secureDesc: "Safe and secure payment processing",
        support: "24/7 Support",
        supportDesc: "Round-the-clock customer assistance",
        browseVerified: "Browse verified packages",
        comparePrices: "Compare prices and reviews",
        readReviews: "Read authentic pilgrim reviews",
        secureBooking: "Secure booking and payment",
        listPackages: "List your pilgrimage packages",
        reachPilgrims: "Reach millions of pilgrims",
        manageBookings: "Manage bookings easily",
        buildReputation: "Build your trusted reputation",
      },
      cta: {
        title: "Ready to Begin Your Spiritual Journey?",
        description:
          "Join thousands of satisfied zaireens who found their perfect pilgrimage through our platform",
        button: "Start Planning Today",
        forPilgrims: "For Pilgrims",
        pilgrimDescription:
          "Find authentic spiritual journeys with verified organizers",
        pilgrimSignUp: "Start Your Journey",
        exploreTrips: "Explore Trips",
        forOrganizers: "For Organizers",
        organizerDescription:
          "List your pilgrimage packages and connect with pilgrims worldwide",
        organizerSignUp: "Join as Organizer",
      },
      featured: {
        title: "Featured Spiritual Trips",
        subtitle:
          "Handpicked pilgrimage packages from our most trusted organizers",
      },
    },

    // Search
    search: {
      destination: "Choose your destination",
    },
    searchForm: {
      destination: "Destination",
      date: "Departure Date",
      pilgrims: "Number of Zaireens",
      button: "Search Trips",
      organizedBy: "Organized By",
      priceRange: "Price Range",
    },

    // Authentication
    auth: {
      loginRequired: "Login Required",
      loginToViewBookings: "Please log in to view your bookings",
      accessDenied: "Access Denied",
      unauthorized: "Unauthorized",
      loginAgain: "You are logged out. Logging in again...",

      // Login page
      welcomeBack: "Welcome Back",
      signInToAccount: "Sign in to your GoPilgrims.com account",
      continueWithGoogle: "Continue with Google",
      continueWithApple: "Continue with Apple",
      orContinueWithEmail: "Or continue with email",
      email: "Email",
      enterYourEmail: "Enter your email",
      password: "Password",
      enterYourPassword: "Enter your password",
      forgotPassword: "Forgot password?",
      signIn: "Sign In",
      dontHaveAccount: "Don't have an account?",
      signUp: "Sign up",
      welcomeBackToast: "Welcome back!",
      loginSuccessMessage: "You have been successfully logged in.",

      // Register page
      createAccount: "Create Account",
      joinGoPilgrims: "Join GoPilgrims.com and find your perfect pilgrimage",
      firstName: "First Name",
      firstNamePlaceholder: "First name",
      lastName: "Last Name",
      lastNamePlaceholder: "Last name",
      createPassword: "Create a password",
      createPasswordPlaceholder: "Create a secure password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      confirmYourPassword: "Confirm your password",
      agreeToTerms: "I agree to the",
      termsOfService: "Terms of Service",
      and: "and",
      privacyPolicy: "Privacy Policy",
      createAccountButton: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      registrationSuccessful: "Registration successful!",
      checkEmailToVerify: "Please check your email to verify your account.",

      // Register success page
      checkYourEmail: "Check Your Email",
      verificationLinkSent:
        "We've sent a verification link to your email address",
      checkEmailAndClick:
        "Please check your email and click the verification link to activate your account.",
      didntReceiveEmail: "Didn't receive the email? Check your spam folder.",
      goToSignIn: "Go to Sign In",

      // Forgot password page
      forgotPasswordTitle: "Forgot Password",
      forgotPasswordDescription:
        "Enter your email address and we'll send you a link to reset your password.",
      emailAddress: "Email Address",
      sendResetLink: "Send Reset Link",
      sending: "Sending...",
      backToLogin: "Back to Login",

      // Forgot password success page
      resetLinkSent: "Reset Link Sent",
      passwordResetSent:
        "If an account exists with that email, a password reset link has been sent.",
      checkYourEmailReset:
        "We've sent password reset instructions to your email address.",
      checkSpamFolder:
        "If you don't see the email, check your spam folder. The reset link will expire in 1 hour.",
      failedToSendReset: "Failed to send reset email",

      // Validation messages
      validEmailRequired: "Please enter a valid email address",
      passwordMinLength: "Password must be at least 6 characters",
      passwordMinLengthRegister: "Password must be at least 8 characters",
      passwordUppercase: "Password must contain at least one uppercase letter",
      passwordLowercase: "Password must contain at least one lowercase letter",
      passwordNumber: "Password must contain at least one number",
      firstNameMinLength: "First name must be at least 2 characters",
      lastNameMinLength: "Last name must be at least 2 characters",
      passwordsDontMatch: "Passwords don't match",
      mustAgreeToTerms: "You must agree to the terms and conditions",
    },

    // Booking Management
    myBookings: {
      title: "My Bookings",
      subtitle: "View and manage your trip reservations",
      noBookings: "No Bookings Yet",
      noBookingsDesc:
        "You haven't made any bookings yet. Browse our spritual trips to get started!",
      browseTrips: "Browse Trips",
    },

    bookings: {
      pilgrims: "Pilgrims",
      totalAmount: "Total Amount",
      bookingDate: "Booking Date",
      bookingId: "Booking ID",
      contactInfo: "Contact Information",
      specialRequests: "Special Requests",
      organizer: "Tour Organizer",
      viewTrip: "View Trip",
      writeReview: "Write Review",
    },

    bookingStatus: {
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
    },

    // Trip listing
    destination: "Destination",
    duration: "Duration",
    price: "Price",
    groupSize: "Group Size",
    departure: "Departure",
    bookNow: "Book Now",
    viewDetails: "View Details",
    filterByDestination: "Filter by Destination",
    filterByPrice: "Filter by Price",
    sortBy: "Sort By",
    dateRange: "Date Range",

    // Trips page
    tripsPage: {
      title: "Find Your Perfect Pilgrimage",
      description: "Compare packages from verified organizers worldwide",
      filters: "Filters",
      sortBy: "Sort By",
      allPrices: "All Prices",
      allOrganizers: "All Organizers",
      clearFilters: "Clear Filters",
      clearAllFilters: "Clear All Filters",
      priceLowToHigh: "Price: Low to High",
      priceHighToLow: "Price: High to Low",
      highestRated: "Highest Rated",
      departureDate: "Departure Date",
      tripsFound: "trips found",
      noTripsFound: "No trips found",
      adjustFilters: "Try adjusting your filters or search criteria",
    },

    // Reviews
    reviewsPage: {
      title: "Reviews",
      description:
        "Read authentic reviews from fellow Zaers and share your own spiritual trips experiences",
      writeReview: "Write Review",
      shareExperience: "Share Your Experience",
      loginToView: "Please log in to view and submit reviews.",
      loginToContinue: "Log In to Continue",

      // Missing keys for reviews functionality
      submitSuccess: "Review submitted successfully!",
      submitError: "Failed to submit review. Please try again.",
      shareDescription:
        "Help fellow pilgrims by sharing your spiritual journey experience",
      selectTrip: "Select Trip",
      chooseCompletedTrip: "Choose a completed trip to review",
      whatWentWell: "What went well?",
      areasForImprovement: "Areas for improvement",
      positiveAspectsPlaceholder:
        "Share what you enjoyed most about your journey...",
      constructiveFeedbackPlaceholder:
        "Share constructive feedback for improvement...",
      overallRating: "Overall Rating",
      detailedRatings: "Detailed Ratings",
      rateSpecificAspects: "Rate specific aspects (1-5 stars each)",
      spiritualGuidance: "Spiritual Guidance",
      aamaalCoverage: "Aamaal Coverage",
      distanceFromHaram: "Distance from Haram",
      leaderVolunteers: "Leader & Volunteers",
      food: "Food Quality",
      hotelBedBath: "Hotel, Bed & Bath",
      valueForMoney: "Value for Money",
      transport: "Transportation",
      proServices: "PRO Services",
      reviewTitle: "Review Title",
      titlePlaceholder: "Summarize your experience in a few words...",
      overallExperience: "Overall Experience",
      experienceDetailsPlaceholder:
        "Share the details of your spiritual journey experience...",
      submitReview: "Submit Review",
      searchPlaceholder: "Search reviews by title or content...",
      allRatings: "All Ratings",
      fiveStars: "5 Stars",
      fourStars: "4 Stars",
      threeStars: "3 Stars",
      twoStars: "2 Stars",
      oneStar: "1 Star",
      loadingReviews: "Loading reviews...",
      noReviewsFound: "No reviews found",
      adjustFilters: "Try adjusting your search or filters",
      beFirstToReview:
        "Be the first to share your spiritual journey experience",
      hasPositiveFeedback: "Has positive feedback",
      hasImprovementAreas: "Has improvement areas",
      zaerReview: "Zaer Review",
      generalComment: "General Comment",
      loadMoreReviews: "Load More Reviews",
    },

    // Footer
    footer: {
      companyDescription:
        "Connecting verified tour operators with zaers seeking trusted spiritual journeys. Your gateway to authentic pilgrimage experiences.",
      quickLinks: "Quick Links",
      browseTrips: "Browse Trips",
      becomeOrganizer: "Become Organizer",
      support: "Support",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
      safetyGuidelines: "Safety Guidelines",
      copyright:
        "© 2025 GoPilgrims.com. All rights reserved. Serving the global Muslim community with trusted pilgrimage services.",
    },

    // Destinations
    destinations: {
      umrah: "Umrah",
      hajj: "Hajj",
      iraq: "Iraq Ziyarat",
      iran: "Iran Ziyarat",
      syria: "Syria Ziyarat",
      combined: "Combined Package",
    },

    // Organizer Signup
    organizerSignup: {
      hero: {
        title: "Join Our Network of Trusted Organizers",
        subtitle:
          "Connect with pilgrims worldwide and grow your pilgrimage business with our verified platform",
      },
      benefits: {
        getVerified: "Get Verified",
        getVerifiedDesc:
          "Build trust with our comprehensive verification process",
        reachPilgrims: "Reach More Pilgrims",
        reachPilgrimsDesc: "Access our global network of faith-based travelers",
        buildReputation: "Build Your Reputation",
        buildReputationDesc: "Showcase reviews and grow your credibility",
      },
      form: {
        title: "Organizer Registration",
        subtitle:
          "Please provide accurate information for verification purposes",
        accountInfo: "Account Information",
        username: "Username",
        usernamePlaceholder: "your-company-username",
        email: "Email Address",
        emailPlaceholder: "admin@yourcompany.com",
        password: "Password",
        passwordPlaceholder: "Create a secure password",
        companyInfo: "Company Information",
        companyName: "Company Name",
        companyNamePlaceholder: "Sacred Journeys Tours Ltd.",
        description: "Company Description",
        descriptionPlaceholder:
          "Describe your company, services, and experience in organizing pilgrimage trips...",
        yearsExperience: "Years of Experience",
        yearsExperiencePlaceholder: "15",
        website: "Website (Optional)",
        websitePlaceholder: "https://www.yourcompany.com",
        contactInfo: "Contact Information",
        businessEmail: "Business Email",
        businessEmailPlaceholder: "bookings@yourcompany.com",
        businessPhone: "Business Phone",
        businessPhonePlaceholder: "+1 (555) 123-4567",
        verification: "Verification Process",
        verificationDesc:
          "After registration, our team will verify your credentials. Please have the following ready:",
        verificationList: [
          "Business registration documents",
          "Travel operator license",
          "Insurance certificates",
          "References from previous clients",
          "Religious authority endorsements (if applicable)",
        ],
        submitButton: "Register as Organizer",
        submittingButton: "Creating Account...",
        termsText:
          "By registering, you agree to our Terms of Service and Privacy Policy. Your account will be reviewed within 48 hours.",
      },
      success: {
        title: "Welcome to Pilgrimage Connect!",
        message:
          "Your organizer profile has been submitted successfully. Please check your email to verify your account. After email verification, our team will review your credentials and verify your account within 48 hours. You'll receive an email confirmation once your account is approved.",
        nextSteps: "What happens next?",
        nextStepsList: [
          "We'll verify your credentials and experience",
          "Check your references and certifications",
          "Review your company registration and licenses",
          "Approve your profile and send you login credentials",
        ],
        returnButton: "Return to Homepage",
      },
    },

    // Trip Details Page
    tripDetails: {
      // Breadcrumb and navigation
      backToTrips: "Back to trips",
      tripNotFound: "Trip not found",
      browseAllTrips: "Browse all trips",

      // Trip status and info
      stockPhoto: "Stock Photo",
      verified: "Verified",
      newTrip: "New",
      reviews: "reviews",
      tripCompleted: "Trip completed",
      daysRemaining: "days remaining",
      departsIn: "Departs in",
      days: "days",

      // Trip sections
      aboutThisJourney: "About This Journey",
      tripDetailsTitle: "Trip Details",
      whatsIncluded: "What's Included",
      dailyItinerary: "Daily Itinerary",
      itineraryProvided:
        "Detailed itinerary will be provided upon booking confirmation.",
      aboutTheOrganizer: "About the Organizer",
      zaerReviews: "Zaer Reviews",
      viewAllReviews: "View All Reviews",

      // Trip features
      flightsIncluded: "Flights included",
      allMeals: "All meals",
      transportation: "Transportation",
      expertGuide: "Expert guide",
      zakireAhlaylbait: "Zakire Ahlaylbait",

      // Trip details fields
      departure: "Departure",
      return: "Return",
      groupSize: "Group Size",
      maxPilgrims: "Max {{count}} pilgrims",
      accommodation: "Accommodation",

      // Booking section
      perPerson: "per person",
      availableSlots: "Available slots:",
      slotsLeft: "left",
      status: "Status:",
      duration: "Duration:",
      durationDays: "{{count}} days",
      bookNow: "Book Now",
      fullyBooked: "Fully Booked",

      // Booking form
      bookYourPilgrimage: "Book Your Pilgrimage",
      numberOfPilgrims: "Number of Pilgrims",
      pilgrim: "pilgrim",
      pilgrims: "pilgrims",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      specialRequests: "Special Requests (Optional)",
      specialRequestsPlaceholder:
        "Any dietary restrictions, accessibility needs, or special requests...",
      pricePerPerson: "Price per person:",
      totalAmount: "Total amount:",
      submitBookingRequest: "Submit Booking Request",
      processing: "Processing...",
      noPaymentRequired:
        "No payment required now. You'll receive a confirmation email with payment instructions.",

      // Organizer info
      experience: "Experience:",
      years: "years",
      satisfaction: "Satisfaction:",
      totalTrips: "Total trips:",

      // Reviews section
      noReviewsYet: "No reviews yet",
      firstToReview: "Be the first to share your spiritual journey experience",
      verifiedZaer: "Verified Zaer",
      recently: "Recently",
      moreReviews: "{{count}} more reviews",

      // Error messages
      mustBeAtLeast: "Must be at least 1 pilgrim",
      invalidEmail: "Invalid email address",
      phoneRequired: "Phone number is required",

      // Success messages
      bookingSubmitted: "Booking submitted successfully!",
      confirmationEmail: "You will receive a confirmation email shortly.",
      bookingFailed: "Booking failed",
      tryAgainOrContact: "Please try again or contact support.",
    },
  },

  ar: {
    // Navigation
    homeNav: "الرئيسية",
    tripsTitle: "الرحلات",
    reviews: "المراجعات",
    myBookingsNav: "حجوزاتي",
    organizerDashboard: "لوحة المنظم",
    whatsappParser: "محلل واتساب",
    whatsappDescription:
      "قم بتحويل إعلانات الرحلات في واتساب إلى قوائم رحلات منظمة بسهولة وسرعة",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    admin: "المدير",
    profile: "الملف الشخصي",

    // Navigation items
    nav: {
      browse: "تصفح الرحلات",
      help: "المساعدة والدعم",
    },

    // Authentication buttons
    signIn: "تسجيل الدخول",
    organisersSignUp: "تسجيل المنظمين",
    pilgrimsSignUp: "تسجيل الحجاج",

    // Common
    filter: "تصفية",
    loading: "جاري التحميل...",
    backToHome: "العودة للرئيسية",
    selectLanguage: "اختر اللغة",

    // Home page
    home: {
      hero: {
        title: "اعثر على رحلتك",
        subtitle: "الروحية المثالية",
        description:
          "تواصل مع منظمي الرحلات الموثقين للحصول على تجارب حج أصيلة إلى الوجهات المقدسة حول العالم",
        organizerBanner:
          "هل أنت منظم رحلات؟ سجل لإدراج باقات الحج الخاصة بك، وإدارة الحجوزات، وبناء سمعتك من خلال مراجعات الحجاج الأصيلة.",
        organizerSignUpButton: "التسجيل كمنظم",
      },
      stats: {
        zaireens: "زائرون سعداء",
        organizers: "منظمون موثقون",
        destinations: "وجهات مقدسة",
        reviews: "مراجعات أصيلة",
        rating: "متوسط التقييم",
      },
      trust: {
        title: "لماذا تثق في GoPilgrims.com؟",
        subtitle: "رحلتك الروحية تستحق أعلى مستوى من الرعاية والأصالة",
        verified: "منظمون موثقون",
        reviews: "مراجعات شفافة",
        payments: "مدفوعات آمنة",
        support: "دعم 24/7",
      },
      features: {
        verified: "منظمون موثقون",
        verifiedDesc: "جميع منظمي الرحلات يخضعون للفحص والتوثيق الشامل",
        transparent: "مراجعات شفافة",
        transparentDesc: "اقرأ تجارب صادقة من زملائك المسافرين",
        secure: "حجوزات آمنة",
        secureDesc: "معالجة دفع آمنة ومحمية",
        support: "دعم 24/7",
        supportDesc: "مساعدة العملاء على مدار الساعة",
        browseVerified: "تصفح الباقات الموثقة",
        comparePrices: "قارن الأسعار والمراجعات",
        readReviews: "اقرأ مراجعات الحجاج الأصيلة",
        secureBooking: "حجز ودفع آمن",
        listPackages: "أدرج باقات الحج الخاصة بك",
        reachPilgrims: "اوصل إلى ملايين الحجاج",
        manageBookings: "أدر الحجوزات بسهولة",
        buildReputation: "ابن سمعتك الموثوقة",
      },
      cta: {
        title: "هل أنت مستعد لبدء رحلتك الروحية؟",
        description:
          "انضم إلى آلاف الزوار الراضين الذين وجدوا حجهم المثالي من خلال منصتنا",
        button: "ابدأ التخطيط اليوم",
        forPilgrims: "للحجاج",
        pilgrimDescription: "ابحث عن رحلات روحية أصيلة مع منظمين موثقين",
        pilgrimSignUp: "ابدأ رحلتك",
        exploreTrips: "استكشف الرحلات",
        forOrganizers: "للمنظمين",
        organizerDescription:
          "أدرج باقات الحج الخاصة بك وتواصل مع الحجاج حول العالم",
        organizerSignUp: "انضم كمنظم",
      },
      featured: {
        title: "الرحلات الروحية المميزة",
        subtitle: "باقات حج مختارة بعناية من أكثر منظمينا موثوقية",
      },
    },

    // Search
    search: {
      destination: "اختر وجهتك",
    },
    searchForm: {
      destination: "الوجهة",
      date: "تاريخ المغادرة",
      pilgrims: "عدد الزوار",
      button: "البحث عن رحلات",
      organizedBy: "منظم بواسطة",
      priceRange: "نطاق السعر",
    },

    // Authentication
    auth: {
      loginRequired: "تسجيل الدخول مطلوب",
      loginToViewBookings: "يرجى تسجيل الدخول لعرض حجوزاتك",
      accessDenied: "رُفض الوصول",
      unauthorized: "غير مخول",
      loginAgain: "تم تسجيل خروجك. سجل الدخول مرة أخرى...",

      // Login page
      welcomeBack: "أهلاً بعودتك",
      signInToAccount: "تسجيل الدخول إلى حسابك في GoPilgrims.com",
      continueWithGoogle: "المتابعة مع جوجل",
      continueWithApple: "المتابعة مع أبل",
      orContinueWithEmail: "أو المتابعة بالبريد الإلكتروني",
      email: "البريد الإلكتروني",
      enterYourEmail: "أدخل بريدك الإلكتروني",
      password: "كلمة المرور",
      enterYourPassword: "أدخل كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      signIn: "تسجيل الدخول",
      dontHaveAccount: "ليس لديك حساب؟",
      signUp: "إنشاء حساب",
      welcomeBackToast: "أهلاً بعودتك!",
      loginSuccessMessage: "تم تسجيل دخولك بنجاح.",

      // Register page
      createAccount: "إنشاء حساب",
      joinGoPilgrims: "انضم إلى GoPilgrims.com واعثر على حجك المثالي",
      firstName: "الاسم الأول",
      firstNamePlaceholder: "الاسم الأول",
      lastName: "اسم العائلة",
      lastNamePlaceholder: "اسم العائلة",
      createPassword: "إنشاء كلمة مرور",
      createPasswordPlaceholder: "إنشاء كلمة مرور آمنة",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "تأكيد كلمة المرور",
      confirmYourPassword: "تأكيد كلمة المرور",
      agreeToTerms: "أوافق على",
      termsOfService: "شروط الخدمة",
      and: "و",
      privacyPolicy: "سياسة الخصوصية",
      createAccountButton: "إنشاء حساب",
      alreadyHaveAccount: "هل لديك حساب بالفعل؟",
      registrationSuccessful: "تم التسجيل بنجاح!",
      checkEmailToVerify: "يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك.",

      // Register success page
      checkYourEmail: "تحقق من بريدك الإلكتروني",
      verificationLinkSent: "لقد أرسلنا رابط التحقق إلى عنوان بريدك الإلكتروني",
      checkEmailAndClick:
        "يرجى التحقق من بريدك الإلكتروني والنقر على رابط التحقق لتفعيل حسابك.",
      didntReceiveEmail:
        "لم تتلق البريد الإلكتروني؟ تحقق من مجلد الرسائل غير المرغوب فيها.",
      goToSignIn: "الذهاب إلى تسجيل الدخول",

      // Forgot password page
      forgotPasswordTitle: "نسيت كلمة المرور",
      forgotPasswordDescription:
        "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.",
      emailAddress: "عنوان البريد الإلكتروني",
      sendResetLink: "إرسال رابط الإعادة",
      sending: "جاري الإرسال...",
      backToLogin: "العودة لتسجيل الدخول",

      // Forgot password success page
      resetLinkSent: "تم إرسال رابط الإعادة",
      passwordResetSent:
        "إذا كان هناك حساب موجود بهذا البريد الإلكتروني، فقد تم إرسال رابط إعادة تعيين كلمة المرور.",
      checkYourEmailReset:
        "لقد أرسلنا تعليمات إعادة تعيين كلمة المرور إلى عنوان بريدك الإلكتروني.",
      checkSpamFolder:
        "إذا لم تر البريد الإلكتروني، تحقق من مجلد الرسائل غير المرغوب فيها. سينتهي صلاحية رابط الإعادة خلال ساعة واحدة.",
      failedToSendReset: "فشل في إرسال بريد إعادة التعيين",

      // Validation messages
      validEmailRequired: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      passwordMinLength: "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
      passwordMinLengthRegister: "يجب أن تكون كلمة المرور على الأقل 8 أحرف",
      passwordUppercase: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
      passwordLowercase: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل",
      passwordNumber: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
      firstNameMinLength: "يجب أن يكون الاسم الأول على الأقل حرفين",
      lastNameMinLength: "يجب أن يكون اسم العائلة على الأقل حرفين",
      passwordsDontMatch: "كلمات المرور غير متطابقة",
      mustAgreeToTerms: "يجب أن توافق على الشروط والأحكام",
    },

    // Booking Management
    myBookings: {
      title: "حجوزاتي",
      subtitle: "اعرض وأدر حجوزات رحلاتك",
      noBookings: "لا توجد حجوزات بعد",
      noBookingsDesc: "لم تقم بأي حجوزات بعد. تصفح رحلاتنا الرائعة للبدء!",
      browseTrips: "تصفح الرحلات",
    },

    bookings: {
      pilgrims: "الحجاج",
      totalAmount: "المبلغ الإجمالي",
      bookingDate: "تاريخ الحجز",
      bookingId: "رقم الحجز",
      contactInfo: "معلومات الاتصال",
      specialRequests: "طلبات خاصة",
      organizer: "منظم الرحلة",
      viewTrip: "عرض الرحلة",
      writeReview: "كتابة مراجعة",
    },

    bookingStatus: {
      pending: "قيد الانتظار",
      confirmed: "مؤكد",
      cancelled: "ملغي",
      completed: "مكتمل",
    },

    // Trip listing
    destination: "الوجهة",
    duration: "المدة",
    price: "السعر",
    groupSize: "حجم المجموعة",
    departure: "المغادرة",
    bookNow: "احجز الآن",
    viewDetails: "عرض التفاصيل",
    allTrips: "جميع الرحلات",
    filterByDestination: "تصفية حسب الوجهة",
    filterByPrice: "تصفية حسب السعر",
    sortBy: "ترتيب حسب",
    dateRange: "نطاق التاريخ",

    // Trips page
    tripsPage: {
      title: "اعثر على حجك المثالي",
      description: "قارن الباقات من المنظمين الموثقين حول العالم",
      filters: "المرشحات",
      sortBy: "ترتيب حسب",
      allPrices: "جميع الأسعار",
      allOrganizers: "جميع المنظمين",
      clearFilters: "مسح المرشحات",
      clearAllFilters: "مسح جميع المرشحات",
      priceLowToHigh: "السعر: من الأقل إلى الأعلى",
      priceHighToLow: "السعر: من الأعلى إلى الأقل",
      highestRated: "الأعلى تقييماً",
      departureDate: "تاريخ المغادرة",
      tripsFound: "رحلة موجودة",
      noTripsFound: "لم توجد رحلات",
      adjustFilters: "جرب تعديل المرشحات أو معايير البحث",
    },
    // Reviews
    reviewsPage: {
      title: "المراجعات",
      description: "اقرأ مراجعات أصيلة من زوار آخرين وشارك تجارب رحلتك الروحية",
      writeReview: "كتابة مراجعة",
      shareExperience: "شارك تجربتك",
      loginToView: "يرجى تسجيل الدخول لعرض وإرسال المراجعات.",
      loginToContinue: "سجل الدخول للمتابعة",

      // Missing keys for reviews functionality
      submitSuccess: "تم إرسال المراجعة بنجاح!",
      submitError: "فشل في إرسال المراجعة. يرجى المحاولة مرة أخرى.",
      shareDescription:
        "ساعد الحجاج الآخرين من خلال مشاركة تجربة رحلتك الروحية",
      selectTrip: "اختر الرحلة",
      chooseCompletedTrip: "اختر رحلة مكتملة لمراجعتها",
      whatWentWell: "ما الذي سار بشكل جيد؟",
      areasForImprovement: "مجالات التحسين",
      positiveAspectsPlaceholder: "شارك ما استمتعت به أكثر في رحلتك...",
      constructiveFeedbackPlaceholder: "شارك تعليقات بناءة للتحسين...",
      overallRating: "التقييم العام",
      detailedRatings: "التقييمات التفصيلية",
      rateSpecificAspects: "قيم جوانب محددة (من 1-5 نجوم لكل منها)",
      spiritualGuidance: "الإرشاد الروحي",
      aamaalCoverage: "تغطية الأعمال",
      distanceFromHaram: "المسافة من الحرم",
      leaderVolunteers: "القائد والمتطوعون",
      food: "جودة الطعام",
      hotelBedBath: "الفندق والسرير والحمام",
      valueForMoney: "القيمة مقابل المال",
      transport: "المواصلات",
      proServices: "الخدمات الاحترافية",
      reviewTitle: "عنوان المراجعة",
      titlePlaceholder: "لخص تجربتك في بضع كلمات...",
      overallExperience: "التجربة العامة",
      experienceDetailsPlaceholder: "شارك تفاصيل تجربتك الروحية...",
      submitReview: "إرسال المراجعة",
      searchPlaceholder: "البحث في المراجعات بالعنوان أو المحتوى...",
      allRatings: "جميع التقييمات",
      fiveStars: "5 نجوم",
      fourStars: "4 نجوم",
      threeStars: "3 نجوم",
      twoStars: "نجمتان",
      oneStar: "نجمة واحدة",
      loadingReviews: "جاري تحميل المراجعات...",
      noReviewsFound: "لم يتم العثور على مراجعات",
      adjustFilters: "جرب تعديل البحث أو المرشحات",
      beFirstToReview: "كن أول من يشارك تجربة رحلته الروحية",
      hasPositiveFeedback: "لديه تعليقات إيجابية",
      hasImprovementAreas: "لديه مجالات للتحسين",
      zaerReview: "مراجعة زائر",
      generalComment: "تعليق عام",
      loadMoreReviews: "تحميل المزيد من المراجعات",
    },

    // Footer
    footer: {
      companyDescription:
        "ربط منظمي الرحلات الموثقين بالزائرين الذين يبحثون عن رحلات روحية موثوقة. بوابتك إلى تجارب الحج الأصيلة.",
      quickLinks: "روابط سريعة",
      browseTrips: "تصفح الرحلات",
      becomeOrganizer: "كن منظماً",
      support: "الدعم",
      helpCenter: "مركز المساعدة",
      contactUs: "اتصل بنا",
      safetyGuidelines: "إرشادات السلامة",
      copyright:
        "© 2025 GoPilgrims.com. جميع الحقوق محفوظة. نخدم المجتمع الإسلامي العالمي بخدمات الحج الموثوقة.",
    },

    // Destinations
    destinations: {
      umrah: "عمرة",
      hajj: "حج",
      iraq: "زيارة العراق",
      iran: "زيارة إيران",
      syria: "زيارة سوريا",
      combined: "باقة مدمجة",
    },

    // Organizer Signup
    organizerSignup: {
      hero: {
        title: "انضم إلى شبكتنا من المنظمين الموثوقين",
        subtitle:
          "تواصل مع الحجاج حول العالم وأنم أعمال الحج الخاصة بك مع منصتنا المعتمدة",
      },
      benefits: {
        getVerified: "احصل على التحقق",
        getVerifiedDesc: "ابن الثقة من خلال عملية التحقق الشاملة لدينا",
        reachPilgrims: "اوصل إلى المزيد من الحجاج",
        reachPilgrimsDesc: "اصل إلى شبكتنا العالمية من المسافرين المؤمنين",
        buildReputation: "ابن سمعتك",
        buildReputationDesc: "اعرض المراجعات وأنم مصداقيتك",
      },
      form: {
        title: "تسجيل المنظم",
        subtitle: "يرجى تقديم معلومات دقيقة لأغراض التحقق",
        accountInfo: "معلومات الحساب",
        username: "اسم المستخدم",
        usernamePlaceholder: "اسم-مستخدم-شركتك",
        email: "عنوان البريد الإلكتروني",
        emailPlaceholder: "admin@yourcompany.com",
        password: "كلمة المرور",
        passwordPlaceholder: "إنشاء كلمة مرور آمنة",
        companyInfo: "معلومات الشركة",
        companyName: "اسم الشركة",
        companyNamePlaceholder: "شركة الرحلات الروحية المقدسة المحدودة",
        description: "وصف الشركة",
        descriptionPlaceholder:
          "صف شركتك وخدماتك وخبرتك في تنظيم رحلات الحج...",
        yearsExperience: "سنوات الخبرة",
        yearsExperiencePlaceholder: "15",
        website: "الموقع الإلكتروني (اختياري)",
        websitePlaceholder: "https://www.yourcompany.com",
        contactInfo: "معلومات الاتصال",
        businessEmail: "البريد الإلكتروني التجاري",
        businessEmailPlaceholder: "bookings@yourcompany.com",
        businessPhone: "هاتف العمل",
        businessPhonePlaceholder: "+1 (555) 123-4567",
        verification: "عملية التحقق",
        verificationDesc:
          "بعد التسجيل، سيقوم فريقنا بالتحقق من أوراق اعتمادك. يرجى إعداد ما يلي:",
        verificationList: [
          "وثائق تسجيل الأعمال",
          "رخصة مشغل السفر",
          "شهادات التأمين",
          "مراجع من العملاء السابقين",
          "تأييدات السلطة الدينية (إن أمكن)",
        ],
        submitButton: "التسجيل كمنظم",
        submittingButton: "إنشاء الحساب...",
        termsText:
          "بالتسجيل، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا. سيتم مراجعة حسابك خلال 48 ساعة.",
      },
      success: {
        title: "مرحباً بك في Pilgrimage Connect!",
        message:
          "تم إرسال ملف المنظم الخاص بك بنجاح. يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك. بعد التحقق من البريد الإلكتروني، سيقوم فريقنا بمراجعة أوراق اعتمادك والتحقق من حسابك خلال 48 ساعة. ستتلقى تأكيد بريد إلكتروني بمجرد الموافقة على حسابك.",
        nextSteps: "ما الذي سيحدث بعد ذلك؟",
        nextStepsList: [
          "سنتحقق من أوراق اعتمادك وخبرتك",
          "فحص مراجعك وشهاداتك",
          "مراجعة تسجيل شركتك وتراخيصها",
          "الموافقة على ملفك الشخصي وإرسال بيانات اعتماد تسجيل الدخول",
        ],
        returnButton: "العودة إلى الصفحة الرئيسية",
      },
      // Trip Details Page
      tripDetails: {
        // Breadcrumb and navigation
        backToTrips: "العودة إلى الرحلات",
        tripNotFound: "الرحلة غير موجودة",
        browseAllTrips: "تصفح جميع الرحلات",

        // Trip status and info
        stockPhoto: "صورة أرشيفية",
        verified: "موثق",
        newTrip: "جديد",
        reviews: "مراجعات",
        tripCompleted: "الرحلة مكتملة",
        daysRemaining: "أيام متبقية",
        departsIn: "تنطلق في",
        days: "أيام",

        // Trip sections
        aboutThisJourney: "حول هذه الرحلة",
        tripDetailsTitle: "تفاصيل الرحلة",
        whatsIncluded: "ما هو مشمول",
        dailyItinerary: "البرنامج اليومي",
        itineraryProvided: "سيتم توفير برنامج مفصل عند تأكيد الحجز.",
        aboutTheOrganizer: "حول المنظم",
        zaerReviews: "مراجعات الزوار",
        viewAllReviews: "عرض جميع المراجعات",

        // Trip features
        flightsIncluded: "الطيران مشمول",
        allMeals: "جميع الوجبات",
        transportation: "المواصلات",
        expertGuide: "مرشد خبير",
        zakireAhlaylbait: "ذاكر أهل البيت",

        // Trip details fields
        departure: "المغادرة",
        return: "العودة",
        groupSize: "حجم المجموعة",
        maxPilgrims: "حد أقصى {{count}} حاج",
        accommodation: "الإقامة",

        // Booking section
        perPerson: "لكل شخص",
        availableSlots: "الأماكن المتاحة:",
        slotsLeft: "متبقي",
        status: "الحالة:",
        duration: "المدة:",
        durationDays: "{{count}} أيام",
        bookNow: "احجز الآن",
        fullyBooked: "محجوز بالكامل",

        // Booking form
        bookYourPilgrimage: "احجز رحلتك",
        numberOfPilgrims: "عدد الحجاج",
        pilgrim: "حاج",
        pilgrims: "حجاج",
        emailAddress: "عنوان البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        specialRequests: "طلبات خاصة (اختياري)",
        specialRequestsPlaceholder:
          "أي قيود غذائية، احتياجات خاصة، أو طلبات خاصة...",
        pricePerPerson: "السعر لكل شخص:",
        totalAmount: "المبلغ الإجمالي:",
        submitBookingRequest: "إرسال طلب الحجز",
        processing: "جاري المعالجة...",
        noPaymentRequired:
          "لا يوجد دفع مطلوب الآن. ستتلقى بريد إلكتروني للتأكيد مع تعليمات الدفع.",

        // Organizer info
        experience: "الخبرة:",
        years: "سنوات",
        satisfaction: "الرضا:",
        totalTrips: "إجمالي الرحلات:",

        // Reviews section
        noReviewsYet: "لا توجد مراجعات بعد",
        firstToReview: "كن أول من يشارك تجربة رحلته الروحية",
        verifiedZaer: "زائر موثق",
        recently: "مؤخراً",
        moreReviews: "{{count}} مراجعة أخرى",

        // Error messages
        mustBeAtLeast: "يجب أن يكون حاج واحد على الأقل",
        invalidEmail: "عنوان بريد إلكتروني غير صحيح",
        phoneRequired: "رقم الهاتف مطلوب",

        // Success messages
        bookingSubmitted: "تم إرسال الحجز بنجاح!",
        confirmationEmail: "ستتلقى بريد إلكتروني للتأكيد قريباً.",
        bookingFailed: "فشل الحجز",
        tryAgainOrContact: "يرجى المحاولة مرة أخرى أو الاتصال بالدعم.",
      },
    },

    // Trip Details Page
    tripDetails: {
      // Breadcrumb and navigation
      backToTrips: "العودة إلى الرحلات",
      tripNotFound: "الرحلة غير موجودة",
      browseAllTrips: "تصفح جميع الرحلات",

      // Trip status and info
      stockPhoto: "صورة أرشيفية",
      verified: "موثق",
      newTrip: "جديد",
      reviews: "مراجعات",
      tripCompleted: "الرحلة مكتملة",
      daysRemaining: "أيام متبقية",
      departsIn: "تنطلق في",
      days: "أيام",

      // Trip sections
      aboutThisJourney: "حول هذه الرحلة",
      tripDetailsTitle: "تفاصيل الرحلة",
      whatsIncluded: "ما هو مشمول",
      dailyItinerary: "البرنامج اليومي",
      itineraryProvided: "سيتم توفير برنامج مفصل عند تأكيد الحجز.",
      aboutTheOrganizer: "حول المنظم",
      zaerReviews: "مراجعات الزوار",
      viewAllReviews: "عرض جميع المراجعات",

      // Trip features
      flightsIncluded: "الطيران مشمول",
      allMeals: "جميع الوجبات",
      transportation: "المواصلات",
      expertGuide: "مرشد خبير",
      zakireAhlaylbait: "ذاكر أهل البيت",

      // Trip details fields
      departure: "المغادرة",
      return: "العودة",
      groupSize: "حجم المجموعة",
      maxPilgrims: "حد أقصى {{count}} حاج",
      accommodation: "الإقامة",

      // Booking section
      perPerson: "لكل شخص",
      availableSlots: "الأماكن المتاحة:",
      slotsLeft: "متبقي",
      status: "الحالة:",
      duration: "المدة:",
      durationDays: "{{count}} أيام",
      bookNow: "احجز الآن",
      fullyBooked: "محجوز بالكامل",

      // Booking form
      bookYourPilgrimage: "احجز رحلتك",
      numberOfPilgrims: "عدد الحجاج",
      pilgrim: "حاج",
      pilgrims: "حجاج",
      emailAddress: "عنوان البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      specialRequests: "طلبات خاصة (اختياري)",
      specialRequestsPlaceholder:
        "أي قيود غذائية، احتياجات خاصة، أو طلبات خاصة...",
      pricePerPerson: "السعر لكل شخص:",
      totalAmount: "المبلغ الإجمالي:",
      submitBookingRequest: "إرسال طلب الحجز",
      processing: "جاري المعالجة...",
      noPaymentRequired:
        "لا يوجد دفع مطلوب الآن. ستتلقى بريد إلكتروني للتأكيد مع تعليمات الدفع.",

      // Organizer info
      experience: "الخبرة:",
      years: "سنوات",
      satisfaction: "الرضا:",
      totalTrips: "إجمالي الرحلات:",

      // Reviews section
      noReviewsYet: "لا توجد مراجعات بعد",
      firstToReview: "كن أول من يشارك تجربة رحلته الروحية",
      verifiedZaer: "زائر موثق",
      recently: "مؤخراً",
      moreReviews: "{{count}} مراجعة أخرى",

      // Error messages
      mustBeAtLeast: "يجب أن يكون حاج واحد على الأقل",
      invalidEmail: "عنوان بريد إلكتروني غير صحيح",
      phoneRequired: "رقم الهاتف مطلوب",

      // Success messages
      bookingSubmitted: "تم إرسال الحجز بنجاح!",
      confirmationEmail: "ستتلقى بريد إلكتروني للتأكيد قريباً.",
      bookingFailed: "فشل الحجز",
      tryAgainOrContact: "يرجى المحاولة مرة أخرى أو الاتصال بالدعم.",
    },
  },

  ur: {
    // Navigation
    homeNav: "گھر",
    tripsTitle: "سفر",
    reviews: "جائزے",
    myBookingsNav: "میری بکنگز",
    organizerDashboard: "منتظم ڈیش بورڈ",
    whatsappParser: "واٹس ایپ پارسر",
    whatsappDescription:
      "اپنے واٹس ایپ ٹور اعلانات کو آسانی سے منظم ٹرپ لسٹنگز میں تبدیل کریں",
    login: "لاگ ان",
    logout: "لاگ آؤٹ",
    admin: "ایڈمن",
    profile: "پروفائل",

    // Navigation items
    nav: {
      browse: "سفر دیکھیں",
      help: "مدد اور سپورٹ",
    },

    // Authentication buttons
    signIn: "لاگ ان",
    organisersSignUp: "منتظمین کا اندراج",
    pilgrimsSignUp: "زائرین کا اندراج",

    // Common
    filter: "فلٹر",
    loading: "لوڈ ہو رہا ہے...",
    backToHome: "گھر واپس",
    selectLanguage: "زبان منتخب کریں",
    allTrips: "تمام سفر دیکھیں",

    // Home page
    home: {
      hero: {
        title: "اپنا کامل",
        subtitle: "روحانی سفر تلاش کریں",
        description:
          "دنیا بھر کے مقدس مقامات کے لیے معتبر ٹور آپریٹرز سے رابطہ کریں",
        organizerBanner:
          "کیا آپ ٹور آرگنائزر ہیں؟ اپنے حج پیکیجز کی فہرست بنانے، بکنگز کا انتظام کرنے، اور حقیقی زائرین کے جائزوں کے ذریعے اپنی ساکھ بنانے کے لیے سائن اپ کریں۔",
        organizerSignUpButton: "منتظم کے طور پر سائن اپ کریں",
      },
      stats: {
        zaireens: "خوش زائرین",
        organizers: "تصدیق شدہ منتظمین",
        destinations: "مقدس مقامات",
        reviews: "سچے جائزے",
        rating: "اوسط درجہ بندی",
      },
      trust: {
        title: "GoPilgrims.com پر کیوں بھروسہ کریں؟",
        subtitle: "آپ کے روحانی سفر کا اعلیٰ ترین معیار اور اصالت کا حقدار ہے",
        verified: "تصدیق شدہ منتظمین",
        reviews: "شفاف جائزے",
        payments: "محفوظ ادائیگی",
        support: "24/7 سپورٹ",
      },
      features: {
        verified: "تصدیق شدہ منتظمین",
        verifiedDesc: "تمام ٹور آپریٹرز کی مکمل جانچ اور تصدیق",
        transparent: "شفاف جائزے",
        transparentDesc: "ساتھی مسافروں کے سچے تجربات پڑھیں",
        secure: "محفوظ بکنگز",
        secureDesc: "محفوظ اور محفوظ ادائیگی",
        support: "24/7 سپورٹ",
        supportDesc: "مستقل کسٹمر مدد",
        browseVerified: "تصدیق شدہ پیکیجز دیکھیں",
        comparePrices: "قیمتوں اور جائزوں کا موازنہ کریں",
        readReviews: "زائرین کے حقیقی جائزے پڑھیں",
        secureBooking: "محفوظ بکنگ اور ادائیگی",
        listPackages: "اپنے حج پیکیجز کی فہرست بنائیں",
        reachPilgrims: "ہزاروں زائرین تک پہنچیں",
        manageBookings: "آسانی سے بکنگز منظم کریں",
        buildReputation: "اپنی معتبر ساکھ بنائیں",
      },
      cta: {
        title: "کیا آپ اپنا روحانی سفر شروع کرنے کے لیے تیار ہیں؟",
        description:
          "ہزاروں مطمئن زائرین میں شامل ہوں جنہوں نے ہمارے پلیٹ فارم کے ذریعے اپنا بہترین حج پایا",
        button: "آج ہی منصوبہ بندی شروع کریں",
        forPilgrims: "زائرین کے لیے",
        pilgrimDescription:
          "تصدیق شدہ منتظمین کے ساتھ حقیقی روحانی سفر ڈھونڈیں",
        pilgrimSignUp: "اپنی یاترا شروع کریں",
        exploreTrips: "سفر کی تلاش کریں",
        forOrganizers: "منتظمین کے لیے",
        organizerDescription:
          "اپنے حج پیکیجز کی فہرست بنائیں اور دنیا بھر کے زائرین سے جڑیں",
        organizerSignUp: "منتظم کے طور پر شامل ہوں",
      },
      featured: {
        title: "نمایاں روحانی سفر",
        subtitle: "ہمارے سب سے قابل اعتماد منتظمین کے منتخب کردہ حج پیکیجز",
      },
    },

    // Search
    search: {
      destination: "اپنی منزل منتخب کریں",
    },
    searchForm: {
      destination: "منزل",
      date: "روانگی کی تاریخ",
      pilgrims: "زائرین کی تعداد",
      button: "سفر تلاش کریں",
      organizedBy: "منتظم",
      priceRange: "قیمت کی حد",
    },

    // Authentication
    auth: {
      loginRequired: "لاگ ان ضروری ہے",
      loginToViewBookings: "اپنی بکنگز دیکھنے کے لیے لاگ ان کریں",
      accessDenied: "رسائی مسترد",
      unauthorized: "غیر مجاز",
      loginAgain: "آپ لاگ آؤٹ ہو گئے ہیں۔ دوبارہ لاگ ان کریں...",

      // Login page
      welcomeBack: "خوش آمدید",
      signInToAccount: "اپنے GoPilgrims.com اکاؤنٹ میں سائن ان کریں",
      continueWithGoogle: "گوگل کے ساتھ جاری رکھیں",
      continueWithApple: "ایپل کے ساتھ جاری رکھیں",
      orContinueWithEmail: "یا ای میل کے ساتھ جاری رکھیں",
      email: "ای میل",
      enterYourEmail: "اپنا ای میل درج کریں",
      password: "پاس ورڈ",
      enterYourPassword: "اپنا پاس ورڈ درج کریں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      signIn: "سائن ان",
      dontHaveAccount: "کیا آپ کا اکاؤنٹ نہیں ہے؟",
      signUp: "سائن اپ",
      welcomeBackToast: "خوش آمدید!",
      loginSuccessMessage: "آپ کامیابی سے لاگ ان ہو گئے ہیں۔",

      // Register page
      createAccount: "اکاؤنٹ بنائیں",
      joinGoPilgrims:
        "GoPilgrims.com میں شامل ہوں اور اپنا بہترین حج تلاش کریں",
      firstName: "پہلا نام",
      firstNamePlaceholder: "پہلا نام",
      lastName: "آخری نام",
      lastNamePlaceholder: "آخری نام",
      createPassword: "پاس ورڈ بنائیں",
      createPasswordPlaceholder: "ایک محفوظ پاس ورڈ بنائیں",
      confirmPassword: "پاس ورڈ کی تصدیق",
      confirmPasswordPlaceholder: "پاس ورڈ کی تصدیق کریں",
      confirmYourPassword: "پاس ورڈ کی تصدیق کریں",
      agreeToTerms: "میں اتفاق کرتا ہوں",
      termsOfService: "خدمات کی شرائط",
      and: "اور",
      privacyPolicy: "پرائیویسی پالیسی",
      createAccountButton: "اکاؤنٹ بنائیں",
      alreadyHaveAccount: "کیا پہلے سے اکاؤنٹ ہے؟",
      registrationSuccessful: "رجسٹریشن کامیاب!",
      checkEmailToVerify:
        "کیا آپ نے ابھی تک کوئی بکنگ نہیں کی۔ شروع کرنے کے لیے ہمارے شاندار سفر دیکھیں!",
      // Register success page
      checkYourEmail: "اپنا ای میل چیک کریں",
      verificationLinkSent: "ہم نے آپ کے ای میل پتے پر تصدیقی لنک بھیجا ہے",
      checkEmailAndClick:
        "براہ کرم اپنا ای میل چیک کریں اور اپنا اکاؤنٹ فعال کرنے کے لیے تصدیقی لنک پر کلک کریں۔",
      didntReceiveEmail: "ای میل موصول نہیں ہوا؟ اپنا اسپام فولڈر چیک کریں۔",
      goToSignIn: "سائن ان پر جائیں",

      // Forgot password page
      forgotPasswordTitle: "پاس ورڈ بھول گئے",
      forgotPasswordDescription:
        "اپنا ای میل پتہ درج کریں اور ہم آپ کو پاس ورڈ ری سیٹ کرنے کے لیے لنک بھیجیں گے۔",
      emailAddress: "ای میل ایڈریس",
      sendResetLink: "ری سیٹ لنک بھیجیں",
      sending: "بھیج رہے ہیں...",
      backToLogin: "لاگ ان پر واپس",

      // Forgot password success page
      resetLinkSent: "ری سیٹ لنک بھیجا گیا",
      passwordResetSent:
        "اگر اس ای میل کے ساتھ کوئی اکاؤنٹ موجود ہے تو پاس ورڈ ری سیٹ لنک بھیجا گیا ہے۔",
      checkYourEmailReset:
        "ہم نے آپ کے ای میل پتے پر پاس ورڈ ری سیٹ کی ہدایات بھیجی ہیں۔",
      checkSpamFolder:
        "اگر آپ کو ای میل نظر نہیں آ رہا تو اپنا اسپام فولڈر چیک کریں۔ ری سیٹ لنک 1 گھنٹے میں ختم ہو جائے گا۔",
      failedToSendReset: "ری سیٹ ای میل بھیجنے میں ناکام",

      // Validation messages
      validEmailRequired: "براہ کرم صحیح ای میل پتہ درج کریں",
      passwordMinLength: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے",
      passwordMinLengthRegister: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
      passwordUppercase: "پاس ورڈ میں کم از کم ایک بڑا ا حرف ہونا چاہیے",
      passwordLowercase: "پاس ورڈ میں کم از کم ایک چھوٹا حرف ہونا چاہیے",
      passwordNumber: "پاس ورڈ میں کم از کم ایک نمبر ہونا چاہیے",
      firstNameMinLength: "پہلا نام کم از کم 2 حروف کا ہونا چاہیے",
      lastNameMinLength: "آخری نام کم از کم 2 حروف کا ہونا چاہیے",
      passwordsDontMatch: "پاس ورڈ میچ نہیں کر رہے",
      mustAgreeToTerms: "آپ کو شرائط و ضوابط سے اتفاق کرنا ہوگا",
    },

    // Booking Management
    myBookings: {
      title: "میری بکنگز",
      subtitle: "اپنی ٹرپ بکنگز دیکھیں اور منظم کریں",
      noBookings: "ابھی کوئی بکنگ نہیں",
      noBookingsDesc:
        "آپ نے ابھی تک کوئی بکنگ نہیں کی۔ شروع کرنے کے لیے ہمارے شاندار سفر دیکھیں!",
      browseTrips: "سفر دیکھیں",
    },

    bookings: {
      pilgrims: "زائرین",
      totalAmount: "کل رقم",
      bookingDate: "بکنگ کی تاریخ",
      bookingId: "بکنگ آئی ڈی",
      contactInfo: "رابطے کی معلومات",
      specialRequests: "خصوصی درخواستیں",
      organizer: "ٹور آرگنائزر",
      viewTrip: "سفر دیکھیں",
      writeReview: "جائزہ لکھیں",
    },

    bookingStatus: {
      pending: "زیر التواء",
      confirmed: "تصدیق شدہ",
      cancelled: "منسوخ",
      completed: "مکمل",
    },

    // Trip listing
    destination: "منزل",
    duration: "مدت",
    price: "قیمت",
    groupSize: "گروپ کا سائز",
    departure: "روانگی",
    bookNow: "ابھی بک کریں",
    viewDetails: "تفصیلات دیکھیں",
    filterByDestination: "منزل کے ذریعے فلٹر کریں",
    filterByPrice: "قیمت کے ذریعے فلٹر کریں",
    sortBy: "ترتیب دیں",
    dateRange: "تاریخ کی حد",

    // Trips page
    tripsPage: {
      title: "اپنا بہترین حج تلاش کریں",
      description: "دنیا بھر کے تصدیق شدہ منتظمین کے پیکیجز کا موازنہ کریں",
      filters: "فلٹرز",
      sortBy: "ترتیب دیں",
      allPrices: "تمام قیمتیں",
      allOrganizers: "تمام منتظمین",
      clearFilters: "فلٹرز صاف کریں",
      clearAllFilters: "تمام فلٹرز صاف کریں",
      priceLowToHigh: "قیمت: کم سے زیادہ",
      priceHighToLow: "قیمت: زیادہ سے کم",
      highestRated: "سب سے زیادہ ریٹڈ",
      departureDate: "روانگی کی تاریخ",
      tripsFound: "سفر ملے",
      noTripsFound: "کوئی سفر نہیں ملا",
      adjustFilters: "اپنے فلٹرز یا تلاش کے معیار کو تبدیل کرنے کی کوشش کریں",
    },

    // Reviews
    reviewsPage: {
      title: "جائزے",
      description:
        "ساتھی زائرین کے حقیقی جائزے پڑھیں اور اپنے روحانی سفر کے تجربات شیئر کریں",
      writeReview: "جائزہ لکھیں",
      shareExperience: "اپنا تجربہ شیئر کریں",
      loginToView: "جائزے دیکھنے اور جمع کرنے کے لیے لاگ ان کریں۔",
      loginToContinue: "جاری رکھنے کے لیے لاگ ان کریں",

      // Missing keys for reviews functionality
      submitSuccess: "جائزہ کامیابی سے جمع ہوا!",
      submitError: "جائزہ جمع کرنے میں ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
      shareDescription:
        "اپنے روحانی سفر کے تجربے کو شیئر کر کے ساتھی زائرین کی مدد کریں",
      selectTrip: "سفر منتخب کریں",
      chooseCompletedTrip: "جائزے کے لیے مکمل شدہ سفر منتخب کریں",
      whatWentWell: "کیا اچھا رہا؟",
      areasForImprovement: "بہتری کے علاقے",
      positiveAspectsPlaceholder:
        "اپنے سفر میں جو کچھ آپ کو سب سے زیادہ پسند آیا اسے شیئر کریں...",
      constructiveFeedbackPlaceholder:
        "بہتری کے لیے تعمیری تاثرات شیئر کریں...",
      overallRating: "مجموعی درجہ بندی",
      detailedRatings: "تفصیلی درجہ بندی",
      rateSpecificAspects:
        "مخصوص پہلوؤں کی درجہ بندی کریں (ہر ایک کے لیے 1-5 ستارے)",
      spiritualGuidance: "روحانی رہنمائی",
      aamaalCoverage: "اعمال کا احاطہ",
      distanceFromHaram: "حرم سے فاصلہ",
      leaderVolunteers: "قائد اور رضاکار",
      food: "کھانے کا معیار",
      hotelBedBath: "ہوٹل، بستر اور باتھ",
      valueForMoney: "پیسے کی قیمت",
      transport: "ٹرانسپورٹ",
      proServices: "پروفیشنل سروسز",
      reviewTitle: "جائزے کا عنوان",
      titlePlaceholder: "اپنے تجربے کو چند الفاظ میں خلاصہ کریں...",
      overallExperience: "مجموعی تجربہ",
      experienceDetailsPlaceholder:
        "اپنے روحانی سفر کے تجربے کی تفصیلات شیئر کریں...",
      submitReview: "جائزہ جمع کریں",
      searchPlaceholder: "عنوان یا مواد کے ذریعے جائزوں میں تلاش کریں...",
      allRatings: "تمام ریٹنگز",
      fiveStars: "5 ستارے",
      fourStars: "4 ستارے",
      threeStars: "3 ستارے",
      twoStars: "2 ستارے",
      oneStar: "1 ستارہ",
      loadingReviews: "جائزے لوڈ ہو رہے ہیں...",
      noReviewsFound: "کوئی جائزہ نہیں ملا",
      adjustFilters: "اپنی تلاش یا فلٹرز کو تبدیل کرنے کی کوشش کریں",
      beFirstToReview: "اپنے روحانی سفر کا تجربہ شیئر کرنے والے پہلے بنیں",
      hasPositiveFeedback: "مثبت تاثرات موجود",
      hasImprovementAreas: "بہتری کے علاقے موجود",
      zaerReview: "زائر کا جائزہ",
      generalComment: "عمومی تبصرہ",
      loadMoreReviews: "مزید جائزے لوڈ کریں",
    },

    // Footer
    footer: {
      companyDescription:
        "تصدیق شدہ ٹور آپریٹرز کو قابل اعتماد روحانی سفر کی تلاش میں زائرین سے جوڑنا۔ آپ کا حقیقی حج تجربات کا گیٹ وے۔",
      quickLinks: "فوری لنکس",
      browseTrips: "سفر دیکھیں",
      becomeOrganizer: "سازمان‌دهنده شوید",
      support: "سپورٹ",
      helpCenter: "مدد مرکز",
      contactUs: "ہم سے رابطہ کریں",
      safetyGuidelines: "حفاظتی رہنمائی",
      copyright:
        "© 2025 GoPilgrims.com۔ تمام حقوق محفوظ ہیں۔ قابل اعتماد حج خدمات کے ساتھ عالمی مسلم کمیونٹی کی خدمت کر رہے ہیں۔",
    },

    // Destinations
    destinations: {
      umrah: "عمرہ",
      hajj: "حج",
      iraq: "زیارت عراق",
      iran: "زیارت ایران",
      syria: "زیارت شام",
      combined: "بسته ترکیبی",
    },

    // Organizer Signup
    organizerSignup: {
      hero: {
        title: "ہمارے قابل اعتماد منتظمین کے نیٹ ورک میں شامل ہوں",
        subtitle:
          "دنیا بھر کے زائرین سے جڑیں اور ہمارے تصدیق شدہ پلیٹ فارم کے ساتھ اپنے حج کے کاروبار کو بڑھائیں",
      },
      benefits: {
        getVerified: "تصدیق حاصل کریں",
        getVerifiedDesc: "ہمارے جامع تصدیق کے عمل کے ساتھ اعتماد قائم کریں",
        reachPilgrims: "زیادہ زائرین تک پہنچیں",
        reachPilgrimsDesc:
          "ہمارے عالمی نیٹ ورک تک رسائی حاصل کریں جو ایمان پر مبنی مسافروں کا ہے",
        buildReputation: "اپنی ساکھ بنائیں",
        buildReputationDesc: "نظرات کو دکھائیں اور اپنی ساکھ کو بڑھائیں",
      },
      form: {
        title: "منتظم کی رجسٹریشن",
        subtitle: "تصدیق کے مقاصد کے لیے براہ کرم درست معلومات فراہم کریں",
        accountInfo: "اکاؤنٹ کی معلومات",
        username: "نام صارف",
        usernamePlaceholder: "آپ-کی-کمپنی-کا-صارف-نام",
        email: "ای میل کا پتہ",
        emailPlaceholder: "admin@yourcompany.com",
        password: "پاس ورڈ",
        passwordPlaceholder: "ایک محفوظ پاس ورڈ بنائیں",
        companyInfo: "کمپنی کی معلومات",
        companyName: "کمپنی کا نام",
        companyNamePlaceholder: "پवित्र یاترا ٹورز لمیٹڈ",
        description: "کمپنی کا تفصیل",
        descriptionPlaceholder:
          "اپنی کمپنی، خدمات، اور حج کے سفر کو منظم کرنے میں تجربے کا بیان کریں...",
        yearsExperience: "تجربے کے سال",
        yearsExperiencePlaceholder: "15",
        website: "ویب سائٹ (اختیاری)",
        websitePlaceholder: "https://www.yourcompany.com",
        contactInfo: "رابطے کی معلومات",
        businessEmail: "کاروباری ای میل",
        businessEmailPlaceholder: "bookings@yourcompany.com",
        businessPhone: "کاروباری فون",
        businessPhonePlaceholder: "+1 (555) 123-4567",
        verification: "تصدیقی عمل",
        verificationDesc:
          "رجسٹریشن کے بعد، ہماری ٹیم آپ کی شناختی دستاویزات کی تصدیق کرے گی۔ براہ کرم مندرجہ ذیل تیار رکھیں:",
        verificationList: [
          "کاروباری رجسٹریشن کے دستاویزات",
          "ٹریول آپریٹر لائسنس",
          "انشورنس کے سرٹیفکیٹس",
          "پچھلے کلائنٹس سے حوالہ جات",
          "مذہبی اتھارٹی کی تصدیق (اگر قابل اطلاق ہو)",
        ],
        submitButton: "منتظم کے طور پر رجسٹر کریں",
        submittingButton: "اکاؤنٹ بنا رہے ہیں...",
        termsText:
          "رجسٹر کرنے سے، آپ ہماری خدمات کی شرائط اور رازداری کی پالیسی سے اتفاق کرتے ہیں۔ آپ کے اکاؤنٹ کا جائزہ 48 گھنٹوں میں لیا جائے گا۔",
      },
      success: {
        title: "Pilgrimage Connect میں خوش آمدید!",
        message:
          "آپ کا منتظم پروفائل کامیابی سے جمع کر دیا گیا ہے۔ براہ کرم اپنے اکاؤنٹ کی تصدیق کے لیے اپنا ای میل چیک کریں۔ ای میل کی تصدیق کے بعد، ہماری ٹیم آپ کی اسناد کا جائزہ لے گی اور 48 گھنٹوں میں آپ کے اکاؤنٹ کی تصدیق کرے گی۔ آپ کے اکاؤنٹ کی منظوری کے بعد آپ کو ای میل کی تصدیق موصول ہوگی۔",
        nextSteps: "اب کیا ہوگا؟",
        nextStepsList: [
          "ہم آپ کی اسناد اور تجربے کی تصدیق کریں گے",
          "آپ کے حوالہ جات اور سرٹیفیکیشن چیک کریں گے",
          "آپ کی کمپنی کی رجسٹریشن اور لائسنس کا جائزہ لیں گے",
          "آپ کے پروفائل کو منظور کریں گے اور لاگ ان کی تفصیلات بھیجیں گے",
        ],
        returnButton: "ہوم پیج پر واپس جائیں",
      },
      // Trip Details Page
      tripDetails: {
        // Breadcrumb and navigation
        backToTrips: "سفر میں واپس",
        tripNotFound: "سفر نہیں ملا",
        browseAllTrips: "تصفح جميع الرحلات",

        // Trip status and info
        stockPhoto: "اسٹاک فوٹو",
        verified: "موثق",
        newTrip: "نیا",
        reviews: "مراجعات",
        tripCompleted: "سفر مکمل",
        daysRemaining: "دن باقی",
        departsIn: "روانگی",
        days: "دن",

        // Trip sections
        aboutThisJourney: "اس سفر کے بارے میں",
        tripDetailsTitle: "سفر کی تفصیلات",
        whatsIncluded: "کیا شامل ہے",
        dailyItinerary: "روزانہ کا پروگرام",
        itineraryProvided: "بکنگ کی تصدیق پر تفصیلی پروگرام فراہم کیا جائے گا۔",
        aboutTheOrganizer: "منتظم کے بارے میں",
        zaerReviews: "زائرین کے جائزے",
        viewAllReviews: "مشاہده تمام نظرات",

        // Trip features
        flightsIncluded: "پرواز شامل",
        allMeals: "تمام کھانا",
        transportation: "ٹرانسپورٹ",
        expertGuide: "ماہر گائیڈ",
        zakireAhlaylbait: "ذاکر اہل بیت",

        // Trip details fields
        departure: "روانگی",
        return: "واپسی",
        groupSize: "گروپ کا سائز",
        maxPilgrims: "حد أقصى {{count}} زائرین",
        accommodation: "رہائش",

        // Booking section
        perPerson: "فی شخص",
        availableSlots: "جاهای موجود:",
        slotsLeft: "باقی",
        status: "حالت:",
        duration: "مدت:",
        durationDays: "{{count}} دن",
        bookNow: "ابھی بک کریں",
        fullyBooked: "محجوز بالكامل",

        // Booking form
        bookYourPilgrimage: "اپنا زیارت بک کریں",
        numberOfPilgrims: "زائرین کی تعداد",
        pilgrim: "زائر",
        pilgrims: "زائرین",
        emailAddress: "ای میل ایڈریس",
        phoneNumber: "فون نمبر",
        specialRequests: "خصوصی درخواستیں (اختیاری)",
        specialRequestsPlaceholder:
          "کوئی کھانے کی پابندی، رسائی کی ضروریات، یا خصوصی درخواستیں...",
        pricePerPerson: "فی شخص قیمت:",
        totalAmount: "مبلغ کل:",
        submitBookingRequest: "بکنگ کی درخواست جمع کریں",
        processing: "پروسیسنگ...",
        noPaymentRequired:
          "الان پرداخت لازم نیست. شما ایمیل تأیید با دستورالعمل‌های پرداخت دریافت خواهید کرد.",

        // Organizer info
        experience: "تجربه:",
        years: "سال",
        satisfaction: "رضایت:",
        totalTrips: "کل سفر:",

        // Reviews section
        noReviewsYet: "ابھی تک کوئی جائزہ نہیں",
        firstToReview: "اپنے روحانی سفر کا تجربہ شیئر کرنے والے پہلے بنیں",
        verifiedZaer: "زائر موثق",
        recently: "حال ہی میں",
        moreReviews: "{{count}} مزید جائزے",

        // Error messages
        mustBeAtLeast: "کم از کم 1 زائر ہونا چاہیے",
        invalidEmail: "غلط ای میل ایڈریس",
        phoneRequired: "فون نمبر ضروری ہے",

        // Success messages
        bookingSubmitted: "بکنگ کامیابی سے جمع ہوئی!",
        confirmationEmail: "آپ کو جلد ہی تصدیقی ای میل موصول ہوگی۔",
        bookingFailed: "بکنگ ناکام",
        tryAgainOrContact: "براہ کرم دوبارہ کوشش کریں یا سپورٹ سے رابطہ کریں۔",
      },
    },

    // Trip Details Page
    tripDetails: {
      // Breadcrumb and navigation
      backToTrips: "سفر میں واپس",
      tripNotFound: "سفر نہیں ملا",
      browseAllTrips: "تصفح جميع الرحلات",

      // Trip status and info
      stockPhoto: "اسٹاک فوٹو",
      verified: "موثق",
      newTrip: "نیا",
      reviews: "مراجعات",
      tripCompleted: "سفر مکمل",
      daysRemaining: "دن باقی",
      departsIn: "روانگی",
      days: "دن",

      // Trip sections
      aboutThisJourney: "اس سفر کے بارے میں",
      tripDetailsTitle: "سفر کی تفصیلات",
      whatsIncluded: "کیا شامل ہے",
      dailyItinerary: "روزانہ کا پروگرام",
      itineraryProvided: "بکنگ کی تصدیق پر تفصیلی پروگرام فراہم کیا جائے گا۔",
      aboutTheOrganizer: "منتظم کے بارے میں",
      zaerReviews: "زائرین کے جائزے",
      viewAllReviews: "مشاہده تمام نظرات",

      // Trip features
      flightsIncluded: "پرواز شامل",
      allMeals: "تمام کھانا",
      transportation: "ٹرانسپورٹ",
      expertGuide: "ماہر گائیڈ",
      zakireAhlaylbait: "ذاکر اہل بیت",

      // Trip details fields
      departure: "روانگی",
      return: "واپسی",
      groupSize: "گروپ کا سائز",
      maxPilgrims: "حد أقصى {{count}} زائرین",
      accommodation: "رہائش",

      // Booking section
      perPerson: "فی شخص",
      availableSlots: "جاهای موجود:",
      slotsLeft: "باقی",
      status: "حالت:",
      duration: "مدت:",
      durationDays: "{{count}} دن",
      bookNow: "ابھی بک کریں",
      fullyBooked: "محجوز بالكامل",

      // Booking form
      bookYourPilgrimage: "اپنا زیارت بک کریں",
      numberOfPilgrims: "زائرین کی تعداد",
      pilgrim: "زائر",
      pilgrims: "زائرین",
      emailAddress: "ای میل ایڈریس",
      phoneNumber: "فون نمبر",
      specialRequests: "خصوصی درخواستیں (اختیاری)",
      specialRequestsPlaceholder:
        "کوئی کھانے کی پابندی، رسائی کی ضروریات، یا خصوصی درخواستیں...",
      pricePerPerson: "فی شخص قیمت:",
      totalAmount: "مبلغ کل:",
      submitBookingRequest: "بکنگ کی درخواست جمع کریں",
      processing: "پروسیسنگ...",
      noPaymentRequired:
        "الان پرداخت لازم نیست. شما ایمیل تأیید با دستورالعمل‌های پرداخت دریافت خواهید کرد.",

      // Organizer info
      experience: "تجربه:",
      years: "سال",
      satisfaction: "رضایت:",
      totalTrips: "کل سفر:",

      // Reviews section
      noReviewsYet: "ابھی تک کوئی جائزہ نہیں",
      firstToReview: "اپنے روحانی سفر کا تجربہ شیئر کرنے والے پہلے بنیں",
      verifiedZaer: "زائر موثق",
      recently: "حال ہی میں",
      moreReviews: "{{count}} مزید جائزے",

      // Error messages
      mustBeAtLeast: "کم از کم 1 زائر ہونا چاہیے",
      invalidEmail: "غلط ای میل ایڈریس",
      phoneRequired: "فون نمبر ضروری ہے",

      // Success messages
      bookingSubmitted: "بکنگ کامیابی سے جمع ہوئی!",
      confirmationEmail: "آپ کو جلد ہی تصدیقی ای میل موصول ہوگی۔",
      bookingFailed: "بکنگ ناکام",
      tryAgainOrContact: "براہ کرم دوبارہ کوشش کریں یا سپورٹ سے رابطہ کریں۔",
    },
  },

  fa: {
    // Navigation
    homeNav: "خانه",
    tripsTitle: "سفرها",
    reviews: "نظرات",
    myBookingsNav: "رزروهای من",
    organizerDashboard: "داشبورد سازمان‌دهنده",
    whatsappParser: "وواتساپ پارسر",
    whatsappDescription:
      "اعلانات تور خود را به سرعت و به راحتی به فهرست‌های سفر ساختاری تبدیل کنید",
    login: "ورود",
    logout: "خروج",
    admin: "مدیر",
    profile: "پروفایل",

    // Navigation items
    nav: {
      browse: "مرور سفرها",
      help: "راهنما و پشتیبانی",
    },

    // Authentication buttons
    signIn: "ورود",
    organisersSignUp: "ثبت‌نام سازمان‌دهندگان",
    pilgrimsSignUp: "ثبت‌نام زائران",

    // Common
    filter: "فیلتر",
    loading: "در حال بارگذاری...",
    backToHome: "بازگشت به خانه",
    selectLanguage: "انتخاب زبان",
    allTrips: "مشاهده تمام سفرها",

    // Home page
    home: {
      hero: {
        title: "از نیت تا",
        subtitle: "سفر معنوی",
        description:
          "سفر مقدس خود را با برگزارکنندگان معتبر آغاز کنید. نظرات معتبر را کاوش کنید و حج، عمره یا زیارت خود به عراق، ایران و سوریه را با اطمینان رزرو کنید.",
        organizerBanner:
          "آیا شما برگزارکننده تور هستید؟ برای فهرست کردن بسته‌های زیارتی خود، مدیریت رزروها و ساخت شهرت خود از طریق نظرات واقعی زائران، ثبت‌نام کنید.",
        organizerSignUpButton: "ثبت‌نام به عنوان برگزارکننده",
      },
      stats: {
        zaireens: "زائرین خوشحال",
        organizers: "برگزارکنندگان معتبر",
        destinations: "مقاصد مقدس",
        reviews: "نظرات معتبر",
        rating: "میانگین امتیاز",
      },
      trust: {
        title: "چرا به GoPilgrims.com اعتماد کنیم؟",
        subtitle: "سفر معنوی شما شایسته بالاترین سطح مراقبت و اصالت است",
        verified: "برگزارکنندگان معتبر",
        reviews: "نظرات شفاف",
        payments: "پرداخت‌های امن",
        support: "پشتیبانی 24/7",
      },
      features: {
        verified: "برگزارکنندگان معتبر",
        verifiedDesc: "تمامی اپراتورهای تور به دقت بررسی و تأیید شده‌اند",
        transparent: "نظرات شفاف",
        transparentDesc: "تجربیات واقعی را از مسافران هم‌سفر بخوانید",
        secure: "رزروهای امن",
        secureDesc: "پرداخت ایمن و محافظت شده",
        support: "پشتیبانی 24/7",
        supportDesc: "کمک به مشتری به صورت 24 ساعته",
        browseVerified: "مرور بسته‌های تأیید شده",
        comparePrices: "مقایسه قیمت‌ها و نظرات",
        readReviews: "خواندن نظرات واقعی زائران",
        secureBooking: "رزرو و پرداخت امن",
        listPackages: "فهرست کردن بسته‌های زیارتی خود",
        reachPilgrims: "رسیدن به میلیون‌ها زائر",
        manageBookings: "مدیریت آسان رزروها",
        buildReputation: "ساخت شهرت مورد اعتماد خود",
      },
      cta: {
        title: "آیا آماده‌اید سفر معنوی خود را آغاز کنید؟",
        description:
          "به هزاران زائر راضی بپیوندید که از طریق پلتفرم ما، زیارت ایده‌آل خود را یافته‌اند",
        button: "شروع برنامه‌ریزی امروز",
        forPilgrims: "برای زائران",
        pilgrimDescription: "یافتن سفرهای معنوی واقعی با برگزارکنندگان معتبر",
        pilgrimSignUp: "سفر خود را آغاز کنید",
        exploreTrips: "کاوش در سفرها",
        forOrganizers: "برای برگزارکنندگان",
        organizerDescription:
          "بسته‌های زیارتی خود را فهرست کنید و با زائران در سرتاسر جهان ارتباط برقرار کنید",
        organizerSignUp: "به عنوان برگزارکننده بپیوندید",
      },
      featured: {
        title: "سفرهای معنوی ویژه",
        subtitle: "بسته‌های زیارتی انتخاب شده از معتبرترین برگزارکنندگان ما",
      },
    },

    // Search
    search: {
      destination: "مقصد خود را انتخاب کنید",
    },
    searchForm: {
      destination: "مقصد",
      date: "تاریخ حرکت",
      pilgrims: "تعداد زائرین",
      button: "جستجوی سفرها",
      organizedBy: "برگزار شده توسط",
      priceRange: "محدوده قیمت",
    },

    // Authentication
    auth: {
      loginRequired: "ورود لازم است",
      loginToViewBookings: "لطفاً برای مشاهده رزروهای خود وارد شوید",
      accessDenied: "دسترسی رد شد",
      unauthorized: "غیرمجاز",
      loginAgain: "شما از سیستم خارج شده‌اید. در حال ورود مجدد...",

      // Login page
      welcomeBack: "خوش آمدید",
      signInToAccount: "به حساب کاربری GoPilgrims.com خود وارد شوید",
      continueWithGoogle: "ادامه با گوگل",
      continueWithApple: "ادامه با اپل",
      orContinueWithEmail: "یا ادامه با ایمیل",
      email: "ایمیل",
      enterYourEmail: "ایمیل خود را وارد کنید",
      password: "رمز عبور",
      enterYourPassword: "رمز عبور خود را وارد کنید",
      forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
      signIn: "ورود",
      dontHaveAccount: "حساب کاربری ندارید؟",
      signUp: "ثبت‌نام",
      welcomeBackToast: "خوش آمدید!",
      loginSuccessMessage: "شما با موفقیت وارد شدید.",

      // Register page
      createAccount: "ایجاد حساب کاربری",
      joinGoPilgrims:
        "به GoPilgrims.com بپیوندید و زیارت ایده‌آل خود را پیدا کنید",
      firstName: "نام",
      firstNamePlaceholder: "نام",
      lastName: "نام خانوادگی",
      lastNamePlaceholder: "نام خانوادگی",
      createPassword: "ایجاد رمز عبور",
      createPasswordPlaceholder: "یک رمز عبور امن ایجاد کنید",
      confirmPassword: "تأیید رمز عبور",
      confirmPasswordPlaceholder: "رمز عبور خود را تأیید کنید",
      confirmYourPassword: "رمز عبور خود را تأیید کنید",
      agreeToTerms: "موافقم با",
      termsOfService: "شرایط خدمات",
      and: "و",
      privacyPolicy: "سیاست حفظ حریم خصوصی",
      createAccountButton: "ایجاد حساب",
      alreadyHaveAccount: "قبلاً حساب دارید؟",
      registrationSuccessful: "ثبت‌نام موفق!",
      checkEmailToVerify: "لطفاً ایمیل خود را برای تأیید حساب چک کنید.",

      // Register success page
      checkYourEmail: "ایمیل خود را چک کنید",
      verificationLinkSent: "لینک تأیید به آدرس ایمیل شما ارسال شده است",
      checkEmailAndClick:
        "لطفاً ایمیل خود را چک کنید و روی لینک تأیید کلیک کنید تا حساب خود را فعال کنید.",
      didntReceiveEmail: "ایمیل را دریافت نکردید؟ پوشه اسپم خود را چک کریں.",
      goToSignIn: "رفتن به ورود",

      // Forgot password page
      forgotPasswordTitle: "فراموشی رمز عبور",
      forgotPasswordDescription:
        "آدرس ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور را برای شما ارسال کنیم.",
      emailAddress: "آدرس ایمیل",
      sendResetLink: "ارسال لینک بازنشانی",
      sending: "در حال ارسال...",
      backToLogin: "بازگشت به ورود",

      // Forgot password success page
      resetLinkSent: "لینک بازنشانی ارسال شد",
      passwordResetSent:
        "اگر حسابی با آن ایمیل وجود داشته باشد، لینک بازنشانی رمز عبور ارسال شده است.",
      checkYourEmailReset:
        "دستورالعمل‌های بازنشانی رمز عبور به آدرس ایمیل شما ارسال شده است.",
      checkSpamFolder:
        "اگر ایمیل را نمی‌بینید، پوشه اسپم خود را چک کنید. لینک بازنشانی در 1 ساعت منقضی می‌شود.",
      failedToSendReset: "ارسال ایمیل بازنشانی ناموفق بود",

      // Validation messages
      validEmailRequired: "لطفاً آدرس ایمیل معتبری وارد کنید",
      passwordMinLength: "رمز عبور باید حداقل 6 کاراکتر باشد",
      passwordMinLengthRegister: "رمز عبور باید حداقل 8 کاراکتر باشد",
      passwordUppercase: "رمز عبور باید حداقل یک حرف بزرگ داشته باشد",
      passwordLowercase: "رمز عبور باید حداقل یک حرف کوچک داشته باشد",
      passwordNumber: "رمز عبور باید حداقل یک عدد داشته باشد",
      firstNameMinLength: "نام باید حداقل 2 کاراکتر باشد",
      lastNameMinLength: "نام خانوادگی باید حداقل 2 کاراکتر باشد",
      passwordsDontMatch: "رمزهای عبور مطابقت ندارند",
      mustAgreeToTerms: "باید با شرایط و ضوابط موافقت کنید",
    },

    // Booking Management
    myBookings: {
      title: "رزروهای من",
      subtitle: "رزروهای سفر خود را مشاهده و مدیریت کنید",
      noBookings: "هنوز رزروئی ندارید",
      noBookingsDesc:
        "آپ نے ابھی تک کوئی بکنگ نہیں کی۔ شروع کرنے کے لیے ہمارے شاندار سفر دیکھیں!",
      browseTrips: "مرور سفرها",
    },

    bookings: {
      pilgrims: "زائرین",
      totalAmount: "مبلغ کل",
      bookingDate: "تاریخ رزرو",
      bookingId: "شناسه رزرو",
      contactInfo: "اطلاعات تماس",
      specialRequests: "درخواست‌های ویژه",
      organizer: "سازمان‌دهنده تور",
      viewTrip: "مشاهده سفر",
      writeReview: "نوشتن نظر",
    },

    bookingStatus: {
      pending: "در انتظار",
      confirmed: "تأیید شده",
      cancelled: "لغو شده",
      completed: "تکمیل شده",
    },

    // Trip listing
    destination: "مقصد",
    duration: "مدت",
    price: "قیمت",
    groupSize: "اندازه گروه",
    departure: "روانگی",
    bookNow: "همین حالا رزرو کنید",
    viewDetails: "مشاهده جزئیات",
    filterByDestination: "فیلتر بر اساس مقصد",
    filterByPrice: "فیلتر بر اساس قیمت",
    sortBy: "مرتب‌سازی بر اساس",
    dateRange: "محدوده تاریخ",

    // Trips page
    tripsPage: {
      title: "زیارت کامل خود را پیدا کنید",
      description:
        "بسته‌ها را از سازمان‌دهندگان تأیید شده سراسر جهان مقایسه کنید",
      filters: "فیلترها",
      sortBy: "مرتب‌سازی بر اساس",
      allPrices: "همه قیمت‌ها",
      allOrganizers: "همه سازمان‌دهندگان",
      clearFilters: "پاک کردن فیلترها",
      clearAllFilters: "پاک کردن همه فیلترها",
      priceLowToHigh: "قیمت: کم به زیاد",
      priceHighToLow: "قیمت: زیادہ سے کم",
      highestRated: "بالاترین امتیاز",
      departureDate: "تاریخ عزیمت",
      tripsFound: "سفر پیدا شد",
      noTripsFound: "سفری پیدا نشد",
      adjustFilters: "فیلترها یا معیارهای جستجو را تنظیم کنید",
    },

    // Reviews
    reviewsPage: {
      title: "نظرات",
      description:
        "نظرات اصیل سایر زائران را بخوانید و تجربیات سفر معنوی خود را به اشتراک بگذارید",
      writeReview: "نوشتن نظر",
      shareExperience: "تجربه خود را به اشتراک بگذارید",
      loginToView: "لطفاً برای مشاهده و ارسال نظرات وارد شوید.",
      loginToContinue: "برای ادامه وارد شوید",

      // Missing keys for reviews functionality
      submitSuccess: "نظر با موفقیت ارسال شد!",
      submitError: "ارسال نظر ناموفق بود. لطفاً دوباره تلاش کنید.",
      shareDescription:
        "با به اشتراک گذاشتن تجربه سفر معنوی خود به زائران دیگر کمک کنید",
      selectTrip: "سفر را انتخاب کنید",
      chooseCompletedTrip: "سفر تکمیل شده را برای نظر انتخاب کنید",
      whatWentWell: "چه چیزی خوب پیش رفت؟",
      areasForImprovement: "زمینه‌های بهبود",
      positiveAspectsPlaceholder:
        "آنچه را که در سفرتان بیشترین لذت را بردید به اشتراک بگذارید...",
      constructiveFeedbackPlaceholder:
        "بازخورد سازنده برای بهبود به اشتراک بگذارید...",
      overallRating: "امتیاز کلی",
      detailedRatings: "امتیازات تفصیلی",
      rateSpecificAspects:
        "جنبه‌های خاص را امتیاز دهید (1-5 ستاره برای هر کدام)",
      spiritualGuidance: "راهنمایی روحانی",
      aamaalCoverage: "پوشش اعمال",
      distanceFromHaram: "فاصله از حرم",
      leaderVolunteers: "رهبر و داوطلبان",
      food: "کیفیت غذا",
      hotelBedBath: "هتل، تخت و حمام",
      valueForMoney: "ارزش در برابر پول",
      transport: "حمل و نقل",
      proServices: "خدمات حرفه‌ای",
      reviewTitle: "عنوان نظر",
      titlePlaceholder: "تجربه خود را در چند کلمه خلاصه کنید...",
      overallExperience: "تجربه کلی",
      experienceDetailsPlaceholder:
        "جزئیات تجربه سفر معنوی خود را به اشتراک بگذارید...",
      submitReview: "ارسال نظر",
      searchPlaceholder: "جستجو در نظرات بر اساس عنوان یا محتوا...",
      allRatings: "همه امتیازات",
      fiveStars: "5 ستاره",
      fourStars: "4 ستاره",
      threeStars: "3 ستاره",
      twoStars: "2 ستاره",
      oneStar: "1 ستاره",
      loadingReviews: "در حال بارگذاری نظرات...",
      noReviewsFound: "نظری یافت نشد",
      adjustFilters: "تنظیم جستجو یا فیلترها را امتحان کنید",
      beFirstToReview:
        "اولین نفری باشید که تجربه سفر معنوی خود را به اشتراک می‌گذارد",
      hasPositiveFeedback: "بازخورد مثبت دارد",
      hasImprovementAreas: "زمینه‌های بهبود دارد",
      zaerReview: "نظر زائر",
      generalComment: "نظر عمومی",
      loadMoreReviews: "بارگذاری نظرات بیشتر",
    },

    // Footer
    footer: {
      companyDescription:
        "اتصال تورگردان‌های تأیید شده با زائرانی که به دنبال سفرهای معنوی قابل اعتماد هستند. دروازه شما به تجربیات زیارتی اصیل.",
      quickLinks: "لینک‌های سریع",
      browseTrips: "مرور سفرها",
      becomeOrganizer: "سازمان‌دهنده شوید",
      support: "پشتیبانی",
      helpCenter: "مرکز کمک",
      contactUs: "تماس با ما",
      safetyGuidelines: "راهنمای ایمنی",
      copyright:
        "© 2025 GoPilgrims.com۔ تمام حقوق محفوظ ہیں۔ قابل اعتماد حج خدمات کے ساتھ عالمی مسلم کمیونٹی کی خدمت کر رہے ہیں۔",
    },

    // Destinations
    destinations: {
      umrah: "عمره",
      hajj: "حج",
      iraq: "زیارت عراق",
      iran: "زیارت ایران",
      syria: "زیارت شام",
      combined: "بسته ترکیبی",
    },

    // Organizer Signup
    organizerSignup: {
      hero: {
        title: "به شبکه سازمان‌دهندگان قابل اعتماد ما بپیوندید",
        subtitle:
          "با زائران سراسر جهان ارتباط برقرار کنید و کسب‌وکار زیارت خود را با پلتفرم تأیید شده ما گسترش دهید",
      },
      benefits: {
        getVerified: "تأیید شوید",
        getVerifiedDesc: "با فرآیند جامع تأیید ما اعتماد ایجاد کنید",
        reachPilgrims: "به زائران بیشتری دست یابید",
        reachPilgrimsDesc: "به شبکه جهانی مسافران مؤمن ما دسترسی پیدا کنید",
        buildReputation: "شهرت خود را بسازید",
        buildReputationDesc: "نظرات را نمایش دهید و اعتبار خود را افزایش دهید",
      },
      form: {
        title: "ثبت‌نام سازمان‌دهنده",
        subtitle: "لطفاً اطلاعات دقیق برای اهداف تأیید ارائه دهید",
        accountInfo: "اطلاعات حساب",
        username: "نام کاربری",
        usernamePlaceholder: "نام-کاربری-شرکت-شما",
        email: "آدرس ایمیل",
        emailPlaceholder: "admin@yourcompany.com",
        password: "رمز عبور",
        passwordPlaceholder: "یک رمز عبور امن ایجاد کنید",
        companyInfo: "اطلاعات شرکت",
        companyName: "نام شرکت",
        companyNamePlaceholder: "تورهای سفر مقدس محدود",
        description: "توضیحات شرکت",
        descriptionPlaceholder:
          "شرکت، خدمات اور تجربات کو بیان کریں جو آپ نے زیارت کے سفر کو منظم کرنے میں حاصل کی ہیں...",
        yearsExperience: "تجربے کے سال",
        yearsExperiencePlaceholder: "15",
        website: "ویب سائٹ (اختیاری)",
        websitePlaceholder: "https://www.yourcompany.com",
        contactInfo: "رابطے کی معلومات",
        businessEmail: "کاروباری ای میل",
        businessEmailPlaceholder: "bookings@yourcompany.com",
        businessPhone: "تلفن تجاری",
        businessPhonePlaceholder: "+1 (555) 123-4567",
        verification: "فرآیند تأیید",
        verificationDesc:
          "رجسٹریشن کے بعد، ہماری ٹیم آپ کی اسناد کی تصدیق کرے گی۔ براہ کرم مندرجہ ذیل چیزیں تیار رکھیں:",
        verificationList: [
          "کاروباری رجسٹریشن کے دستاویزات",
          "ٹریول آپریٹر لائسنس",
          "انشورنس کے سرٹیفکیٹس",
          "پچھلے کلائنٹس سے حوالہ جات",
          "مذہبی اتھارٹی کی تصدیق (اگر قابل اطلاق ہو)",
        ],
        submitButton: "منتظم کے طور پر رجسٹر کریں",
        submittingButton: "اکاؤنٹ بنا رہے ہیں...",
        termsText:
          "رجسٹر کرنے سے، آپ ہماری خدمات کی شرائط اور رازداری کی پالیسی سے اتفاق کرتے ہیں۔ آپ کے اکاؤنٹ کا جائزہ 48 گھنٹوں میں لیا جائے گا۔",
      },
      success: {
        title: "به Pilgrimage Connect خوش آمدید!",
        message:
          "پروفایل سازمان‌دهنده شما با موفقیت ارسال شد. لطفاً ایمیل خود را برای تأیید حساب چک کنید. پس از تأیید ایمیل، تیم ما مدارک شما را بررسی کرده و حساب شما را ظرف 48 ساعت تأیید خواهد کرد. پس از تأیید حساب، تأیید ایمیل دریافت خواهید کرد.",
        nextSteps: "چه اتفاقی خواهد افتاد؟",
        nextStepsList: [
          "مدارک و تجربه شما را تأیید خواهیم کرد",
          "مراجع و گواهی‌های شما را بررسی خواهیم کرد",
          "ثبت شرکت و مجوزهای شما را بازبینی خواهیم کرد",
          "پروفایل شما را تأیید کرده و مشخصات ورود را ارسال خواهیم کرد",
        ],
        returnButton: "بازگشت به صفحه اصلی",
      },
      // Trip Details Page
      tripDetails: {
        // Breadcrumb and navigation
        backToTrips: "بازگشت به سفرها",
        tripNotFound: "سفر پیدا نشد",
        browseAllTrips: "مرور همه سفرها",

        // Trip status and info
        stockPhoto: "عکس آرشیوی",
        verified: "تأیید شده",
        newTrip: "جدید",
        reviews: "نظرات",
        tripCompleted: "سفر تکمیل شد",
        daysRemaining: "روز باقی مانده",
        departsIn: "عزیمت در",
        days: "روز",

        // Trip sections
        aboutThisJourney: "درباره این سفر",
        tripDetailsTitle: "جزئیات سفر",
        whatsIncluded: "چه چیزی شامل است",
        dailyItinerary: "برنامه روزانه",
        itineraryProvided: "برنامه تفصیلی در هنگام تأیید رزرو ارائه خواهد شد.",
        aboutTheOrganizer: "درباره سازمان‌دهنده",
        zaerReviews: "نظرات زائران",
        viewAllReviews: "مشاهده همه نظرات",

        // Trip features
        flightsIncluded: "پرواز شامل",
        allMeals: "همه وعده‌های غذایی",
        transportation: "حمل و نقل",
        expertGuide: "راهنمای متخصص",
        zakireAhlaylbait: "ذاکر اہل بیت",

        // Trip details fields
        departure: "عزیمت",
        return: "بازگشت",
        groupSize: "اندازه گروه",
        maxPilgrims: "حداکثر {{count}} زائر",
        accommodation: "اقامت",

        // Booking section
        perPerson: "هر نفر",
        availableSlots: "جاهای موجود:",
        slotsLeft: "باقی",
        status: "وضعیت:",
        duration: "مدت:",
        durationDays: "{{count}} روز",
        bookNow: "همین حالا رزرو کنید",
        fullyBooked: "کاملاً رزرو شده",

        // Booking form
        bookYourPilgrimage: "زیارت خود را رزرو کنید",
        numberOfPilgrims: "تعداد زائران",
        pilgrim: "زائر",
        pilgrims: "زائران",
        emailAddress: "ایمیل",
        phoneNumber: "شماره تلفن",
        specialRequests: "درخواست‌های ویژه (اختیاری)",
        specialRequestsPlaceholder:
          "هر گونه محدودیت غذایی، نیازهای دسترسی، یا درخواست‌های ویژه...",
        pricePerPerson: "قیمت هر نفر:",
        totalAmount: "مبلغ کل:",
        submitBookingRequest: "ارسال درخواست رزرو",
        processing: "در حال پردازش...",
        noPaymentRequired:
          "الان پرداخت لازم نیست. شما ایمیل تأیید با دستورالعمل‌های پرداخت دریافت خواهید کرد.",

        // Organizer info
        experience: "تجربه:",
        years: "سال",
        satisfaction: "رضایت:",
        totalTrips: "کل سفرها:",

        // Reviews section
        noReviewsYet: "هنوز نظری نیست",
        firstToReview: "اپنے روحانی سفر کا تجربہ شیئر کرنے والے پہلے بنیں",
        verifiedZaer: "زائر موثق",
        recently: "حال ہی میں",
        moreReviews: "{{count}} مزید جائزے",

        // Error messages
        mustBeAtLeast: "کم از کم 1 زائر ہونا چاہیے",
        invalidEmail: "غلط ای میل ایڈریس",
        phoneRequired: "فون نمبر ضروری ہے",

        // Success messages
        bookingSubmitted: "رزرو با موفقیت ارسال شد!",
        confirmationEmail: "به زودی ایمیل تأیید دریافت خواهید کرد.",
        bookingFailed: "رزرو ناموفق",
        tryAgainOrContact: "لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.",
      },
    },

    // Trip Details Page
    tripDetails: {
      // Breadcrumb and navigation
      backToTrips: "بازگشت به سفرها",
      tripNotFound: "سفر پیدا نشد",
      browseAllTrips: "مرور همه سفرها",

      // Trip status and info
      stockPhoto: "عکس آرشیوی",
      verified: "تأیید شده",
      newTrip: "جدید",
      reviews: "نظرات",
      tripCompleted: "سفر تکمیل شد",
      daysRemaining: "روز باقی مانده",
      departsIn: "عزیمت در",
      days: "روز",

      // Trip sections
      aboutThisJourney: "درباره این سفر",
      tripDetailsTitle: "جزئیات سفر",
      whatsIncluded: "چه چیزی شامل است",
      dailyItinerary: "برنامه روزانه",
      itineraryProvided: "برنامه تفصیلی در هنگام تأیید رزرو ارائه خواهد شد.",
      aboutTheOrganizer: "درباره سازمان‌دهنده",
      zaerReviews: "نظرات زائران",
      viewAllReviews: "مشاهده همه نظرات",

      // Trip features
      flightsIncluded: "پرواز شامل",
      allMeals: "همه وعده‌های غذایی",
      transportation: "حمل و نقل",
      expertGuide: "راهنمای متخصص",
      zakireAhlaylbait: "ذاکر اہل بیت",

      // Trip details fields
      departure: "عزیمت",
      return: "بازگشت",
      groupSize: "اندازه گروه",
      maxPilgrims: "حداکثر {{count}} زائر",
      accommodation: "اقامت",

      // Booking section
      perPerson: "هر نفر",
      availableSlots: "جاهای موجود:",
      slotsLeft: "باقی",
      status: "وضعیت:",
      duration: "مدت:",
      durationDays: "{{count}} روز",
      bookNow: "همین حالا رزرو کنید",
      fullyBooked: "کاملاً رزرو شده",

      // Booking form
      bookYourPilgrimage: "زیارت خود را رزرو کنید",
      numberOfPilgrims: "تعداد زائران",
      pilgrim: "زائر",
      pilgrims: "زائران",
      emailAddress: "ایمیل",
      phoneNumber: "شماره تلفن",
      specialRequests: "درخواست‌های ویژه (اختیاری)",
      specialRequestsPlaceholder:
        "کوئی کھانے کی پابندی، رسائی کی ضروریات، یا خصوصی درخواستیں...",
      pricePerPerson: "فی شخص قیمت:",
      totalAmount: "مبلغ کل:",
      submitBookingRequest: "بکنگ کی درخواست جمع کریں",
      processing: "پروسیسنگ...",
      noPaymentRequired:
        "الان پرداخت لازم نیست. شما ایمیل تأیید با دستورالعمل‌های پرداخت دریافت خواهید کرد.",

      // Organizer info
      experience: "تجربه:",
      years: "سال",
      satisfaction: "رضایت:",
      totalTrips: "کل سفر:",

      // Reviews section
      noReviewsYet: "هنوز نظری نیست",
      firstToReview: "اپنے روحانی سفر کا تجربہ شیئر کرنے والے پہلے بنیں",
      verifiedZaer: "زائر موثق",
      recently: "حال ہی میں",
      moreReviews: "{{count}} مزید جائزے",

      // Error messages
      mustBeAtLeast: "کم از کم 1 زائر ہونا چاہیے",
      invalidEmail: "غلط ای میل ایڈریس",
      phoneRequired: "فون نمبر ضروری ہے",

      // Success messages
      bookingSubmitted: "رزرو با موفقیت ارسال شد!",
      confirmationEmail: "به زودی ایمیل تأیید دریافت خواهید کرد.",
      bookingFailed: "رزرو ناموفق",
      tryAgainOrContact: "لطفاً دوباره تلاش کریں یا با پشتیبانی تماس بگیرید.",
    },
  },

  gu: {
    // Navigation
    homeNav: "ઘર",
    tripsTitle: "પ્રવાસો",
    reviews: "સમીક્ષાઓ",
    myBookingsNav: "મારી બુકિંગ્સ",
    organizerDashboard: "આયોજક ડેશ બોર્ડ",
    whatsappParser: "વ્હોટ્સએપ પાર્સર",
    whatsappDescription:
      "તમારા વ્હોટ્સએપ ટૂર જાહેરાતોને ઝડપથી અને સરળતાથી સ્ટ્રક્ચર્ડ ટ્રિપ લિસ્ટિંગ્સમાં કન્વર્ટ કરો",
    login: "લૉગિન",
    logout: "લૉગઆઉટ",
    admin: "એડમિન",
    profile: "પ્રોફાઇલ",

    // Navigation items
    nav: {
      browse: "ટ્રિપ્સ બ્રાઉઝ કરો",
      help: "મદદ અને સપોર્ટ",
    },

    // Authentication buttons
    signIn: "સાઇન ઇન",
    organisersSignUp: "આયોજકોનું સાઇન અપ",
    pilgrimsSignUp: "યાત્રીઓનું સાઇન અપ",

    // Common
    filter: "ફિલ્ટર",
    loading: "લોડ થઈ રહ્યું છે...",
    backToHome: "ઘર પાછા",
    selectLanguage: "ભાષા પસંદ કરો",
    allTrips: "બધી ટ્રિપ્સ જુઓ",

    // Home page
    home: {
      hero: {
        title: "તમારો સંપૂર્ણ",
        subtitle: "આધ્યાત્મિક પ્રવાસ શોધો",
        description:
          "વિશ્વભરના પવિત્ર સ્થળોમાં પ્રામાણિક તીર્થયાત્રા અનુભવો માટે ચકાસાયેલા ટૂર ઓપરેટરો સાથે જોડાઓ",
        organizerBanner:
          "શું તમે ટૂર આયોજક છો? તમારા તીર્થયાત્રા પેકેજો સૂચિબદ્ધ કરવા, બુકિંગ્સનું વ્યવસ્થાપન કરવા, અને પ્રામાણિક યાત્રીઓની સમીક્ષાઓ દ્વારા તમારી પ્રતિષ્ઠા બનાવવા માટે સાઇન અપ કરો.",
        organizerSignUpButton: "આયોજક તરીકે સાઇન અપ કરો",
      },
      stats: {
        zaireens: "ખુશ યાત્રીઓ",
        organizers: "ચકાસાયેલા આયોજકો",
        destinations: "પવિત્ર સ્થળો",
        reviews: "પ્રામાણિક સમીક્ષાઓ",
        rating: "સરેરાશ રેટિંગ",
      },
      trust: {
        title: "GoPilgrims.com પર કેમ ભરોસો કરવો?",
        subtitle:
          "તમારી આધ્યાત્મિક યાત્રા સર્વોચ્ચ સ્તરની સંભાળ અને પ્રામાણિકતાની હકદાર છે",
        verified: "ચકાસાયેલા આયોજકો",
        reviews: "નિષ્ઠાવાન સમીક્ષાઓ",
        payments: "સુરક્ષિત ચુકવણી",
        support: "24/7 સપોર્ટ",
      },
      features: {
        verified: "ચકાસાયેલા આયોજકો",
        verifiedDesc: "બધા ટૂર ઓપરેટરો સંપૂર્ણ રીતે ચકાસાયેલા અને સત્યાપિત છે",
        transparent: "નિષ્ઠાવાન સમીક્ષાઓ",
        transparentDesc: "સાથી પ્રવાસીઓના પ્રામાણિક અનુભવો વાંચો",
        secure: "સુરક્ષિત બુકિંગ્સ",
        secureDesc: "સુરક્ષિત અને સંરક્ષિત ચુકવણી પ્રક્રિયા",
        support: "24/7 સપોર્ટ",
        supportDesc: "24 કલાક ગ્રાહક સહાયતા",
        browseVerified: "ચકાસાયેલા પેકેજો બ્રાઉઝ કરો",
        comparePrices: "કિંમત અને સમીક્ષા તુલના કરો",
        readReviews: "પ્રામાણિક યાત્રીઓની સમીક્ષાઓ વાંચો",
        secureBooking: "સુરક્ષિત બુકિંગ અને ચુકવણી",
        listPackages: "તમારા તીર્થયાત્રા પેકેજો સૂચિબદ્ધ કરો",
        reachPilgrims: "લાખો યાત્રીઓ સુધી પહોંચો",
        manageBookings: "સરળતાથી બુકિંગ્સનું વ્યવસ્થાપન કરો",
        buildReputation: "તમારી વિશ્વસનીય પ્રતિષ્ઠા બનાવો",
      },
      cta: {
        title: "શું તમે તમારા આધ્યાત્મિક પ્રવાસ શરૂ કરવા માટે તૈયાર છો?",
        description:
          "હજારો સંતોષપ્રદ યાત્રીઓમાં જોડાઓ જેમણે અમારા પ્લેટફોર્મ દ્વારા તેમના સંપૂર્ણ તીર્થયાત્રા મેળવ્યા",
        button: "આજે જ આયોજન શરૂ કરો",
        forPilgrims: "યાત્રીઓ માટે",
        pilgrimDescription:
          "ચકાસાયેલા منتظمین کے ساتھ حقیقی روحانی سفر ڈھونڈیں",
        pilgrimSignUp: "اپنی یاترا شروع کریں",
        exploreTrips: "سفر کی تلاش کریں",
        forOrganizers: "منتظمین کے لیے",
        organizerDescription:
          "اپنے حج پیکیجز کی فہرست بنائیں اور دنیا بھر کے زائرین سے جڑیں",
        organizerSignUp: "منتظم کے طور پر شامل ہوں",
      },
      featured: {
        title: "વિશિષ્ટ આધ્યાત્મિક યાત્રાઓ",
        subtitle:
          "અમારા સૌથી વિશ્વસનીય આયોજકોના હાથથી પસંદ કરેલા તીર્થયાત્રા પેકેજો",
      },
    },

    // Search
    search: {
      destination: "તમારું ગંતવ્ય પસંદ કરો",
    },
    searchForm: {
      destination: "ગંતવ્ય",
      date: "પ્રસ્થાનની તારીખ",
      pilgrims: "યાત્રીઓની સંખ્યા",
      button: "ટ્રિપ્સ શોધો",
      organizedBy: "આયોજક",
      priceRange: "કિંમતની શ્રેણી",
    },

    // Authentication
    auth: {
      loginRequired: "લૉગિન જરૂરી છે",
      loginToViewBookings: "તમારી બુકિંગ્સ જોવા માટે કૃપા કરીને લૉગિન કરો",
      accessDenied: "પ્રવેશ નામંજૂર",
      unauthorized: "અનધિકૃત",
      loginAgain: "તમે લૉગ આઉટ થયા છો. ફરીથી લૉગિન કરી રહ્યા છીએ...",

      // Login page
      welcomeBack: "પાછા આવવા બદલ આભાર",
      signInToAccount: "તમારા GoPilgrims.com એકાઉન્ટમાં સાઇન ઇન કરો",
      continueWithGoogle: "ગૂગલ સાથે ચાલુ રાખો",
      continueWithApple: "એપલ સાથે ચાલુ રાખો",
      orContinueWithEmail: "અથવા ઈમેઇલ સાથે ચાલુ રાખો",
      email: "ઈમેઇલ",
      enterYourEmail: "તમારું ઈમેઇલ દાખલ કરો",
      password: "પાસવર્ડ",
      enterYourPassword: "તમારો પાસવર્ડ દાખલ કરો",
      forgotPassword: "પાસવર્ડ ભૂલી ગયા?",
      signIn: "સાઇન ઇન",
      dontHaveAccount: "એકાઉન્ટ નથી?",
      signUp: "સાઇન અપ",
      welcomeBackToast: "આવવા બદલ આભાર!",
      loginSuccessMessage: "તમે સફળતાપૂર્વક લૉગ ઇન થયા છો.",

      // Register page
      createAccount: "એકાઉન્ટ બનાવો",
      joinGoPilgrims:
        "GoPilgrims.com માં જોડાઓ અને તમારી સંપૂર્ણ તીર્થયાત્રા શોધો",
      firstName: "પ્રથમ નામ",
      firstNamePlaceholder: "પ્રથમ નામ",
      lastName: "અંતિમ નામ",
      lastNamePlaceholder: "અંતિમ નામ",
      createPassword: "પાસવર્ડ બનાવો",
      createPasswordPlaceholder: "એક સુરક્ષિત પાસવર્ડ બનાવો",
      confirmPassword: "પાસવર્ડની પુષ્ટિ",
      confirmPasswordPlaceholder: "પાસવર્ડની પુષ્ટિ કરો",
      confirmYourPassword: "પાસવર્ડની પુષ્ટિ કરો",
      agreeToTerms: "હું સંમત છું",
      termsOfService: "સેવાની શરતો",
      and: "અને",
      privacyPolicy: "ગોપનીયતા નીતિ",
      createAccountButton: "એકાઉન્ટ બનાવો",
      alreadyHaveAccount: "પહેલેથી એકાઉન્ટ છે?",
      registrationSuccessful: "નોંધણી સફળ!",
      checkEmailToVerify:
        "કૃપા કરીને તમારા એકાઉન્ટની ચકાસણી માટે તમારું ઈમેઇલ ચેક કરો.",

      // Register success page
      checkYourEmail: "તમારું ઈમેઇલ ચેક કરો",
      verificationLinkSent: "અમે તમારા ઈમેઇલ એડ્રેસ પર ચકાસણી લિંક મોકલ્યું છે",
      checkEmailAndClick:
        "કૃપા કરીને તમારું ઈમેઇલ ચેક કરો અને તમારા એકાઉન્ટને સક્રિય કરવા માટે ચકાસણી લિંક પર ક્લિક કરો.",
      didntReceiveEmail: "ઈમેઇલ મળ્યું નથી? તમારા સ્પામ ફોલ્ડરને ચક કરો.",
      goToSignIn: "સાઇન ઇન પર જાઓ",

      // Forgot password page
      forgotPasswordTitle: "પાસવર્ડ ભૂલી ગયા",
      forgotPasswordDescription:
        "તમારું ઈમેઇલ એડ્રેસ દાખલ કરો અને અમે તમને પાસવર્ડ રીસેટ કરવા માટે લિંક મોકલીશું.",
      emailAddress: "ઈમેઇલ એડ્રેસ",
      sendResetLink: "રીસેટ લિંક મોકલો",
      sending: "મોકલી રહ્યાં છીએ...",
      backToLogin: "લૉગિન પર પાછા",

      // Forgot password success page
      resetLinkSent: "રીસેટ લિંક મોકલ્યું",
      passwordResetSent:
        "જો તે ઈમેઇલ સાથે એકાઉન્ટ અસ્તિત્વમાં છે, તો પાસવર્ડ રીસેટ લિંક મોકલવામાં આવ્યું છે.",
      checkYourEmailReset:
        "અમે તમારા ઈમેઇલ એડ્રેસ પર પાસવર્ડ રીસેટની સૂચનાઓ મોકલ્યા છે.",
      checkSpamFolder:
        "જો તમને ઈમેઇલ દેખાતું નથી, તો તમારા સ્પામ ફોલ્ડરને ચક કરો. રીસેટ લિંક 1 કલાકમાં સમાપ્ત થઈ જશે.",
      failedToSendReset: "રીસેટ ઈમેઇલ મોકલવામાં નિષ્ફળ",

      // Validation messages
      validEmailRequired: "કૃપા કરીને માન્ય ઈમેઇલ એડ્રેસ દાખલ કરો",
      passwordMinLength: "પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરોનો હોવો જોઈએ",
      passwordMinLengthRegister: "પાસવર્ડ ઓછામાં ઓછા 8 અક્ષરોનો હોવો જોઈએ",
      passwordUppercase: "પાસવર્ડમાં ઓછામાં ઓછો એક મોટો અક્ષર હોવો જોઈએ",
      passwordLowercase: "પાસવર્ડમાં ઓછામાં ઓછો એક નાનો અક્ષર હોવો જોઈએ",
      passwordNumber: "પાસવર્ડમાં ઓછામાં ઓછો એક નંબર હોવો જોઈએ",
      firstNameMinLength: "પ્રથમ નામ ઓછામાં ઓછા 2 અક્ષરોનું હોવું જોઈએ",
      lastNameMinLength: "અંતિમ નામ ઓછામાં ઓછા 2 અક્ષરોનું હોવું જોઈએ",
      passwordsDontMatch: "પાસવર્ડ મેળ ખાતા નથી",
      mustAgreeToTerms: "તમારે નિયમો અને શરતો સાથે સંમત થવું જોઈએ",
    },

    // Booking Management
    myBookings: {
      title: "મારી બુકિંગ્સ",
      subtitle: "તમારા પ્રવાસની બુકિંગ્સ જુઓ અને વ્યવસ્થાપિત કરો",
      noBookings: "હજી કોઈ બુકિંગ નથી",
      noBookingsDesc:
        "તમે હજી કોઈ બુકિંગ નથી કરી. શરૂ કરવા માટે અમારા આધ્યાત્મિક પ્રવાસોને બ્રાઉઝ કરો!",
      browseTrips: "પ્રવાસો બ્રાઉઝ કરો",
    },

    bookings: {
      pilgrims: "યાત્રીઓ",
      totalAmount: "કુલ રકમ",
      bookingDate: "બુકિંગ તારીખ",
      bookingId: "બુકિંગ આઈડી",
      contactInfo: "સંપર્ક માહિતી",
      specialRequests: "વિશેષ વિનંતીઓ",
      organizer: "ટૂર આયોજક",
      viewTrip: "પ્રવાસ જુઓ",
      writeReview: "સમીક્ષા લખો",
    },

    bookingStatus: {
      pending: "પ્રતીક્ષા કરી રહ્યા છે",
      confirmed: "તસદીક કરેલ",
      cancelled: "રદ કરેલ",
      completed: "પૂર્ણ થયેલ",
    },

    // Trip listing
    destination: "ગંતવ્ય",
    duration: "અવધિ",
    price: "કિંમત",
    groupSize: "ગણતરી",
    departure: "પ્રસ્થાન",
    bookNow: "હવે બુક કરો",
    viewDetails: "વિગતવાર જુઓ",
    filterByDestination: "ગંતવ્ય દ્વારા ફિલ્ટર કરો",
    filterByPrice: "કિંમત દ્વારા ફિલ્ટર કરો",
    sortBy: "આધારે ક્રમબદ્ધ કરો",
    dateRange: "તારીખની શ્રેણી",

    // Trips page
    tripsPage: {
      title: "તમારો સંપૂર્ણ તીર્થયાત્રા શોધો",
      description: "વિશ્વભરના ચકાસાયેલા આયોજકો પાસેથી પેકેજોની તુલના કરો",
      filters: "ફિલ્ટર્સ",
      sortBy: "આધારે ક્રમબદ્ધ કરો",
      allPrices: "બધી કિંમતો",
      allOrganizers: "બધા આયોજકો",
      clearFilters: "ફિલ્ટર્સ સાફ કરો",
      clearAllFilters: "બધા ફિલ્ટર્સ સાફ કરો",
      priceLowToHigh: "કિંમત: ઓછીથી ઊંચી",
      priceHighToLow: "કિંમત: ઊંચીથી ઓછી",
      highestRated: "સૌથી વધુ રેટેડ",
      departureDate: "પ્રસ્થાન તારીખ",
      tripsFound: "પ્રવાસો મળ્યા",
      noTripsFound: "કોઈ પ્રવાસ મળ્યો નથી",
      adjustFilters:
        "તમારા ફિલ્ટર્સ અથવા શોધ માપદંડને સમાયોજિત કરવાનો પ્રયાસ કરો",
    },

    // Reviews
    reviewsPage: {
      title: "સમીક્ષાઓ",
      description:
        "સાથી યાત્રીઓના પ્રામાણિક جائزے વાંચો અને તમારા આત્મિક પ્રવાસના અનુભવને શેર કરો",
      writeReview: "સમીક્ષા લખો",
      shareExperience: "તમારો અનુભવ શેર કરો",
      loginToView: "કૃપા કરીને સમીક્ષાઓ જોવા અને સબમિટ કરવા માટે લૉગિન કરો.",
      loginToContinue: "જારી રાખવા માટે લૉગિન કરો",

      // Missing keys for reviews functionality
      submitSuccess: "સમીક્ષા સફળતાપૂર્વક સબમિટ થઈ!",
      submitError: "સમીક્ષા સબમિટ કરવામાં નિષ્ફળ. કૃપા કરીને ફરીથી પ્રયાસ કરો.",
      shareDescription:
        "તમારા આધ્યાત્મિક પ્રવાસના અનુભવને શેર કરીને સાથી યાત્રીઓને મદદ કરો",
      selectTrip: "પ્રવાસ પસંદ કરો",
      chooseCompletedTrip: "સમીક્ષા માટે પૂર્ણ થયેલ પ્રવાસ પસંદ કરો",
      whatWentWell: "શું સારું રહ્યું?",
      areasForImprovement: "સુધારાના ક્ષેત્રો",
      positiveAspectsPlaceholder:
        "તમારા પ્રવાસમાં તમને સૌથી વધુ શું ગમ્યું તે શેર કરો...",
      constructiveFeedbackPlaceholder:
        "સુધારા માટે રચનાત્મક પ્રતિસાદ શેર કરો...",
      overallRating: "એકંદર રેટિંગ",
      detailedRatings: "વિગતવાર રેટિંગ્સ",
      rateSpecificAspects: "વિશિષ્ટ પાસાઓને રેટ કરો (દરેક માટે 1-5 સ્ટાર)",
      spiritualGuidance: "આધ્યાત્મિક માર્ગદર્શન",
      aamaalCoverage: "આમાલ કવરેજ",
      distanceFromHaram: "હરમથી અંતર",
      leaderVolunteers: "નેતા અને સ્વયંસેવકો",
      food: "ખોરાકની ગુણવત્તા",
      hotelBedBath: "હોટેલ, બેડ અને બાથ",
      valueForMoney: "પૈસાની કિંમત",
      transport: "પરિવહન",
      proServices: "વ્યાવસાયિક સેવાઓ",
      reviewTitle: "સમીક્ષાનું શીર્ષક",
      titlePlaceholder: "તમારા અનુભવને થોડા શબ્દોમાં સારાંશ આપો...",
      overallExperience: "એકંદર અનુભવ",
      experienceDetailsPlaceholder:
        "તમારા આધ્યાત્મિક પ્રવાસના અનુભવની વિગતો શેર કરો...",
      submitReview: "સમીક્ષા સબમિટ કરો",
      searchPlaceholder: "શીર્ષક અથવા સામગ્રી દ્વારા સમીક્ષાઓ શોધો...",
      allRatings: "બધી રેટિંગ્સ",
      fiveStars: "5 સ્ટાર",
      fourStars: "4 સ્ટાર",
      threeStars: "3 સ્ટાર",
      twoStars: "2 સ્ટાર",
      oneStar: "1 સ્ટાર",
      loadingReviews: "સમીક્ષાઓ લોડ થઈ રહી છે...",
      noReviewsFound: "કોઈ સમીક્ષા મળી નથી",
      adjustFilters: "તમારી શોધ અથવા ફિલ્ટર્સને સમાયોજિત કરવાનો પ્રયાસ કરો",
      beFirstToReview: "તમારા આધ્યાત્મિક પ્રવાસના અનુભવને શેર કરનાર પ્રથમ બનો",
      hasPositiveFeedback: "સકારાત્મક પ્રતિસાદ છે",
      hasImprovementAreas: "સુધારાના ક્ષેત્રો છે",
      zaerReview: "યાત્રીની સમીક્ષા",
      generalComment: "સામાન્ય ટિપ્પણી",
      loadMoreReviews: "વધુ સમીક્ષાઓ લોડ કરો",
    },

    // Footer
    footer: {
      companyDescription:
        "તસદીક કરેલ ટૂર ઓપરેટર્સને વિશ્વસનીય આધ્યાત્મિક યાત્રાઓની શોધમાં યાત્રીઓ સાથે જોડવું. તમારા માટે પ્રામાણિક તીર્થયાત્રા અનુભવ માટેનું ગેટવે.",
      quickLinks: "ઝડપી લિંક્સ",
      browseTrips: "પ્રવાસો બ્રાઉઝ કરો",
      becomeOrganizer: "સંગઠક બનવું",
      support: "સહાય",
      helpCenter: "મદદ કેન્દ્ર",
      contactUs: "અમારો સંપર્ક કરો",
      safetyGuidelines: "સુરક્ષા માર્ગદર્શિકા",
      copyright:
        "© 2025 GoPilgrims.com. બધા હક્કો સુરક્ષિત છે. વિશ્વના મુસ્લિમ સમુદાયને વિશ્વસનીય તીર્થયાત્રા સેવાઓ સાથે સેવા આપવી.",
    },

    // Destinations
    destinations: {
      umrah: "ઉમ્રાહ",
      hajj: "હજ",
      iraq: "ઇરાક ઝિયારત",
      iran: "ઇરાન ઝિયારત",
      syria: "સિરિયા ઝિયારત",
      combined: "એકત્રિત પેકેજ",
    },

    // Organizer Signup
    organizerSignup: {
      hero: {
        title: "અમારા વિશ્વસનીય આયોજકોના નેટવર્કમાં જોડાઓ",
        subtitle:
          "વિશ્વભરના યાત્રીઓ સાથે જોડાઓ અને અમારા ચકાસાયેલા પ્લેટફોર્મ સાથે તમારા તીર્થયાત્રા વ્યવસાયને વધારવા માટે સાઇન અપ કરો",
      },
      benefits: {
        getVerified: "તસદીક મેળવો",
        getVerifiedDesc: "અમારા વ્યાપક તસદીક પ્રક્રિયા સાથે વિશ્વાસ બનાવો",
        reachPilgrims: "વધુ યાત્રીઓ સુધી પહોંચો",
        reachPilgrimsDesc:
          "અમારા વિશ્વવ્યાપી નેટવર્ક સુધી પહોંચો જે વિશ્વાસ પર આધારિત મુસાફરો છે",
        buildReputation: "તમારી પ્રતિષ્ઠા બનાવો",
        buildReputationDesc:
          "સમીક્ષાઓને પ્રદર્શિત કરો અને તમારી વિશ્વસનીયતા વધારવા માટે કામ કરો",
      },
      form: {
        title: "આયોજક નોંધણી",
        subtitle: "કૃપા કરીને ચકાસણીના ઉદ્દેશ્યો માટે ચોક્કસ માહિતી પ્રદાન કરો",
        accountInfo: "ખાતાની માહિતી",
        username: "વપરાશકર્તા નામ",
        usernamePlaceholder: "તમારી-કંપની-વપરાશકર્તા-નામ",
        email: "ઈમેઇલ સરનામું",
        emailPlaceholder: "admin@yourcompany.com",
        password: "પાસવર્ડ",
        passwordPlaceholder: "એક સુરક્ષિત પાસવર્ડ બનાવો",
        companyInfo: "કંપનીની માહિતી",
        companyName: "કંપનીનું નામ",
        companyNamePlaceholder: "પવિત્ર યાત્રાઓ ટૂર લિમિટેડ",
        description: "કંપનીનું વર્ણન",
        descriptionPlaceholder:
          "તમારી કંપની, સેવાઓ, અને તીર્થયાત્રા પ્રવાસોનું આયોજન કરવામાં અનુભવ વર્ણવો...",
        yearsExperience: "અનુભવના વર્ષો",
        yearsExperiencePlaceholder: "15",
        website: "વેબસાઇટ (વૈકલ્પિક)",
        websitePlaceholder: "https://www.yourcompany.com",
        contactInfo: "સંપર્ક માહિતી",
        businessEmail: "કારોબારી ઈમેઇલ",
        businessEmailPlaceholder: "bookings@yourcompany.com",
        businessPhone: "કારોબારી ફોન",
        businessPhonePlaceholder: "+1 (555) 123-4567",
        verification: "તસદીક પ્રક્રિયા",
        verificationDesc:
          "નોંધણી પછી, અમારી ટીમ તમારી ઓળખપત્રોની તસદીક કરશે. કૃપા કરીને નીચેની વસ્તુઓ તૈયાર રાખો:",
        verificationList: [
          "વ્યાપાર નોંધણી દસ્તાવેજો",
          "યાત્રા ઓપરેટર લાઇસન્સ",
          "વિશ્વાસપાત્રતા પ્રમાણપત્રો",
          "મૂળ ગ્રાહકો પાસેથી સંદર્ભો",
          "ધાર્મિક સત્તાવાળાઓની મંજૂરી (જો લાગુ પડે તો)",
        ],
        submitButton: "આયોજક તરીકે નોંધણી કરો",
        submittingButton: "ખાતું બનાવવામાં આવી રહ્યું છે...",
        termsText:
          "નોંધણી કરીને, તમે અમારી સેવા શરતો અને ગોપનીયતા નીતિ સાથે સંમત છો. તમારા ખાતાની સમીક્ષા 48 કલાકમાં કરવામાં આવશે.",
      },
      success: {
        title: "યાત્રા જોડાણમાં આપનું સ્વાગત છે!",
        message:
          "તમારો આયોજક પ્રોફાઇલ સફળતાપૂર્વક સબમિટ કરવામાં આવ્યો છે. કૃપા કરીને તમારા ખાતાની ચકાસણી માટે તમારું ઈમેઇલ ચેક કરો. ઈમેઇલ ચકાસણી પછી, અમારી ટીમ તમારી પ્રમાણપત્રોની સમીક્ષા કરશે અને 48 કલાકમાં તમારા ખાતાની તસદીક કરશે. તમારા ખાતાની મંજૂરી પછી, તમને ઈમેઇલ દ્વારા જાણ કરવામાં આવશે.",
        nextSteps: "હવે શું થશે?",
        nextStepsList: [
          "અમે તમારી પ્રમાણપત્રો અને અનુભવની તસદીક કરીશું",
          "તમારા સંદર્ભો અને પ્રમાણપત્રો ચકાસીશું",
          "તમારી કંપનીની નોંધણી અને લાઇસન્સની સમીક્ષા કરીશું",
          "તમારા પ્રોફાઇલને મંજૂરી આપીશું અને લોગિનની વિગતો મોકલીશું",
        ],
        returnButton: "હોમપેજ પર પાછા જાઓ",
      },
      // Trip Details Page
      tripDetails: {
        // Breadcrumb and navigation
        backToTrips: "પ્રવાસોમાં પાછા જાઓ",
        tripNotFound: "પ્રવાસ મળ્યો નથી",
        browseAllTrips: "બધી મુસાફરીઓ બ્રાઉઝ કરો",

        // Trip status and info
        stockPhoto: "સ્ટોક ફોટો",
        verified: "તસદીક કરેલ",
        newTrip: "નવું",
        reviews: "સમીક્ષાઓ",
        tripCompleted: "સફર પૂર્ણ",
        daysRemaining: "બાકીના દિવસો",
        departsIn: "પ્રસ્થાનમાં",
        days: "દિવસ",

        // Trip sections
        aboutThisJourney: "આ યાત્રા વિશે",
        tripDetailsTitle: "યાત્રાની વિગતો",
        whatsIncluded: "શું સામેલ છે",
        dailyItinerary: "દૈનિક કાર્યક્રમ",
        itineraryProvided: "બુકિંગની પુષ્ટિ પર વિગતવાર કાર્યક્રમ આપવામાં આવશે.",
        aboutTheOrganizer: "આયોજક વિશે",
        zaerReviews: "ઝાયર સમીક્ષાઓ",
        viewAllReviews: "બધી સમીક્ષાઓ જુઓ",

        // Trip features
        flightsIncluded: "ફ્લાઇટ્સ સામેલ છે",
        allMeals: "બધા ભોજન",
        transportation: "પરિવહન",
        expertGuide: "વિશેષજ્ઞ માર્ગદર્શક",
        zakireAhlaylbait: "ઝાકિર અહલયલબૈત",

        // Trip details fields
        departure: "પ્રસ્થાન",
        return: "વાપસી",
        groupSize: "ગણતરી",
        maxPilgrims: "મહત્તમ {{count}} યાત્રીઓ",
        accommodation: "રહેઠાણ",

        // Booking section
        perPerson: "પ્રતિ વ્યક્તિ",
        availableSlots: "ઉપલબ્ધ સ્લોટ્સ:",
        slotsLeft: "બાકી",
        status: "સ્થિતિ:",
        duration: "અવધિ:",
        durationDays: "{{count}} દિવસ",
        bookNow: "હવે બુક કરો",
        fullyBooked: "પૂર્ણ રીતે બુક કરેલ",

        // Booking form
        bookYourPilgrimage: "તમારી તીર્થયાત્રા બુક કરો",
        numberOfPilgrims: "યાત્રીઓની સંખ્યા",
        pilgrim: "યાત્રી",
        pilgrims: "યાત્રીઓ",
        emailAddress: "ઈમેઇલ સરનામું",
        phoneNumber: "ફોન નંબર",
        specialRequests: "વિશેષ વિનંતીઓ (વૈકલ્પિક)",
        specialRequestsPlaceholder:
          "કોઈ ખોરાકની મર્યાદાઓ, ઍક્સેસની જરૂરિયાતો, અથવા વિશેષ વિનંતીઓ...",
        pricePerPerson: "પ્રતિ વ્યક્તિ કિંમત:",
        totalAmount: "કુલ રકમ:",
        submitBookingRequest: "બકિંગ વિનંતી મોકલો",
        processing: "પ્રોસેસિંગ...",
        noPaymentRequired:
          "હવે કોઈ ચુકવણીની જરૂર નથી. તમે ચુકવણીની સૂચનાઓ સાથે એક પુષ્ટિ ઈમેઇલ પ્રાપ્ત કરશો.",

        // Organizer info
        experience: "અનુભવ:",
        years: "વર્ષ",
        satisfaction: "સંતોષ:",
        totalTrips: "કુલ પ્રવાસો:",

        // Reviews section
        noReviewsYet: "હજી સુધી કોઈ સમીક્ષા નથી",
        firstToReview:
          "તમારા આધ્યાત્મિક પ્રવાસનો અનુભવ શેર કરવા માટે પહેલો બનો",
        verifiedZaer: "તસદીક કરેલ યાત્રી",
        recently: "તાજેતરમાં",
        moreReviews: "{{count}} વધુ સમીક્ષાઓ",

        // Error messages
        mustBeAtLeast: "કમથી કમ 1 યાત્રી હોવો જોઈએ",
        invalidEmail: "અમાન્ય ઈમેઇલ એડ્રેસ",
        phoneRequired: "ફોન નંબર જરૂરી છે",

        // Success messages
        bookingSubmitted: "બુકિંગ સફળતાપૂર્વક સબમિટ કરવામાં આવી છે!",
        confirmationEmail: "તમે ટૂંક સમયમાં એક પુષ્ટિ ઈમેઇલ પ્રાપ્ત કરશો.",
        bookingFailed: "બુકિંગ નિષ્ફળ",
        tryAgainOrContact:
          "કૃપા કરીને ફરીથી પ્રયાસ કરો અથવા સપોર્ટ સાથે સંપર્ક કરો.",
      },
    },

    // Trip Details Page
    tripDetails: {
      // Breadcrumb and navigation
      backToTrips: "પ્રવાસોમાં પાછા જાઓ",
      tripNotFound: "પ્રવાસ મળ્યો નથી",
      browseAllTrips: "બધી મુસાફરીઓ બ્રાઉઝ કરો",

      // Trip status and info
      stockPhoto: "સ્ટોક ફોટો",
      verified: "તસદીક કરેલ",
      newTrip: "નવું",
      reviews: "સમીક્ષાઓ",
      tripCompleted: "સફર પૂર્ણ",
      daysRemaining: "બાકીના દિવસો",
      departsIn: "પ્રસ્થાનમાં",
      days: "દિવસ",

      // Trip sections
      aboutThisJourney: "આ યાત્રા વિશે",
      tripDetailsTitle: "યાત્રાની વિગતો",
      whatsIncluded: "શું સામેલ છે",
      dailyItinerary: "દૈનિક કાર્યક્રમ",
      itineraryProvided: "બુકિંગની પુષ્ટિ પર વિગતવાર કાર્યક્રમ આપવામાં આવશે.",
      aboutTheOrganizer: "આયોજક વિશે",
      zaerReviews: "ઝાયર સમીક્ષાઓ",
      viewAllReviews: "બધી સમીક્ષાઓ જુઓ",

      // Trip features
      flightsIncluded: "ફ્લાઇટ્સ સામેલ છે",
      allMeals: "બધા ભોજન",
      transportation: "પરિવહન",
      expertGuide: "વિશેષજ્ઞ માર્ગદર્શક",
      zakireAhlaylbait: "ઝાકિર અહલયલબૈત",

      // Trip details fields
      departure: "પ્રસ્થાન",
      return: "વાપસી",
      groupSize: "ગણતરી",
      maxPilgrims: "મહત્તમ {{count}} યાત્રીઓ",
      accommodation: "રહેઠાણ",

      // Booking section
      perPerson: "પ્રતિ વ્યક્તિ",
      availableSlots: "ઉપલબ્ધ સ્લોટ્સ:",
      slotsLeft: "બાકી",
      status: "સ્થિતિ:",
      duration: "અવધિ:",
      durationDays: "{{count}} દિવસ",
      bookNow: "હવે બુક કરો",
      fullyBooked: "પૂર્ણ રીતે બુક કરેલ",

      // Booking form
      bookYourPilgrimage: "તમારી તીર્થયાત્રા બુક કરો",
      numberOfPilgrims: "યાત્રીઓની સંખ્યા",
      pilgrim: "યાત્રી",
      pilgrims: "યાત્રીઓ",
      emailAddress: "ઈમેઇલ સરનામું",
      phoneNumber: "ફોન નંબર",
      specialRequests: "વિશેષ વિનંતીઓ (વૈકલ્પિક)",
      specialRequestsPlaceholder:
        "કોઈ ખોરાકની મર્યાદાઓ, ઍક્સેસની જરૂરિયાતો, અથવા વિશેષ વિનંતીઓ...",
      pricePerPerson: "પ્રતિ વ્યક્તિ કિંમત:",
      totalAmount: "કુલ રકમ:",
      submitBookingRequest: "બકિંગ વિનંતી મોકલો",
      processing: "પ્રોસેસિંગ...",
      noPaymentRequired:
        "હવે કોઈ ચુકવણીની જરૂર નથી. તમે ચુકવણીની સૂચનાઓ સાથે એક પુષ્ટિ ઈમેઇલ પ્રાપ્ત કરશો.",

      // Organizer info
      experience: "અનુભવ:",
      years: "વર્ષ",
      satisfaction: "સંતોષ:",
      totalTrips: "કુલ પ્રવાસો:",

      // Reviews section
      noReviewsYet: "હજી સુધી કોઈ સમીક્ષા નથી",
      firstToReview: "તમારા આધ્યાત્મિક પ્રવાસનો અનુભવ શેર કરવા માટે પહેલો બનો",
      verifiedZaer: "તસદીક કરેલ યાત્રી",
      recently: "તાજેતરમાં",
      moreReviews: "{{count}} વધુ સમીક્ષાઓ",

      // Error messages
      mustBeAtLeast: "કમથી કમ 1 યાત્રી હોવો જોઈએ",
      invalidEmail: "અમાન્ય ઈમેઇલ એડ્રેસ",
      phoneRequired: "ફોન નંબર જરૂરી છે",

      // Success messages
      bookingSubmitted: "બુકિંગ સફળતાપૂર્વક સબમિટ કરવામાં આવી છે!",
      confirmationEmail: "તમે ટૂંક સમયમાં એક પુષ્ટિ ઈમેઇલ પ્રાપ્ત કરશો.",
      bookingFailed: "બુકિંગ નિષ્ફળ",
      tryAgainOrContact:
        "કૃપા કરીને ફરીથી પ્રયાસ કરો અથવા સપોર્ટ સાથે સંપર્ક કરો.",
    },
  },
};

// Translation function
export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object") {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    if (typeof value !== "string") {
      return key; // Return key if final value is not a string
    }

    // Handle simple parameter replacement
    if (params) {
      return value.replace(/\{\{([^}]+)\}\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return value;
  };

  return { t };
}
