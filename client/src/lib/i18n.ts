import React from 'react';
import { useLanguage } from '@/components/language-provider';
export type { Language } from '@/components/language-provider';

// Internationalization configuration
export const supportedLanguages = {
  en: 'English',
  ar: 'العربية',
  ur: 'اردو',
  fa: 'فارسی',
  gu: 'ગુજરાતી'
};

export const rtlLanguages = ['ar', 'ur', 'fa'];

// Translation keys and values
export const translations = {
  en: {
    // Navigation
    homeNav: 'Home',
    trips: 'Trips',
    reviews: 'Reviews',
    myBookingsNav: 'My Bookings',
    organizerDashboard: 'Organizer Dashboard',
    organizerSignup: 'Organizer Signup',
    whatsappParser: 'WhatsApp Parser',
    whatsappDescription: 'Convert your WhatsApp tour announcements into structured trip listings quickly and easily',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin',
    profile: 'Profile',
    
    // Navigation items
    nav: {
      browse: 'Browse Trips',
      help: 'Help & Support'
    },
    
    // Authentication buttons
    signIn: 'Sign In',
    organisersSignUp: 'Organisers Sign Up',
    pilgrimsSignUp: 'Pilgrims Sign Up',
    
    // Common
    filter: 'Filter',
    loading: 'Loading...',
    backToHome: 'Back to Home',
    selectLanguage: 'Select Language',
    allTrips: 'View All Trips',
    
    // Home page
    home: {
      hero: {
        title: 'Find Your Perfect',
        subtitle: 'Spiritual Journey',
        description: 'Connect with verified tour operators for authentic pilgrimage experiences to sacred destinations worldwide'
      },
      stats: {
        zaireens: 'Happy Zaireens',
        organizers: 'Verified Organizers',
        destinations: 'Sacred Destinations',
        reviews: 'Authentic Reviews',
        rating: 'Average Rating'
      },
      trust: {
        title: 'Why Trust GoPilgrims.com?',
        subtitle: 'Your spiritual journey deserves the highest level of care and authenticity',
        verified: 'Verified Organizers',
        reviews: 'Transparent Reviews',
        payments: 'Secure Payments',
        support: '24/7 Support'
      },
      features: {
        verified: 'Verified Organizers',
        verifiedDesc: 'All tour operators are thoroughly vetted and verified',
        transparent: 'Transparent Reviews',
        transparentDesc: 'Read honest experiences from fellow travelers',
        secure: 'Secure Bookings',
        secureDesc: 'Safe and secure payment processing',
        support: '24/7 Support',
        supportDesc: 'Round-the-clock customer assistance',
        browseVerified: 'Browse verified packages',
        comparePrices: 'Compare prices and reviews',
        readReviews: 'Read authentic pilgrim reviews',
        secureBooking: 'Secure booking and payment',
        listPackages: 'List your pilgrimage packages',
        reachPilgrims: 'Reach thousands of pilgrims',
        manageBookings: 'Manage bookings easily',
        buildReputation: 'Build your trusted reputation'
      },
      cta: {
        title: 'Ready to Begin Your Spiritual Journey?',
        description: 'Join thousands of satisfied zaireens who found their perfect pilgrimage through our platform',
        button: 'Start Planning Today',
        forPilgrims: 'For Pilgrims',
        pilgrimDescription: 'Find and book authentic spiritual journeys with verified organizers',
        pilgrimSignUp: 'Start Your Journey',
        forOrganizers: 'For Organizers',
        organizerDescription: 'List your pilgrimage packages and connect with pilgrims worldwide',
        organizerSignUp: 'Join as Organizer'
      },
      featured: {
        title: 'Featured Spiritual Journeys',
        subtitle: 'Handpicked pilgrimage packages from our most trusted organizers'
      }
    },
    
    // Search
    search: {
      destination: 'Choose your destination'
    },
    searchForm: {
      destination: 'Destination',
      date: 'Departure Date',
      pilgrims: 'Number of Zaireens',
      button: 'Search Trips',
      organizedBy: 'Organized By',
      priceRange: 'Price Range'
    },
    
    // Authentication
    auth: {
      loginRequired: 'Login Required',
      loginToViewBookings: 'Please log in to view your bookings',
      accessDenied: 'Access Denied',
      unauthorized: 'Unauthorized',
      loginAgain: 'You are logged out. Logging in again...'
    },
    
    // Booking Management
    myBookings: {
      title: 'My Bookings',
      subtitle: 'View and manage your trip reservations',
      noBookings: 'No Bookings Yet',
      noBookingsDesc: 'You haven\'t made any bookings yet. Browse our amazing trips to get started!',
      browseTrips: 'Browse Trips'
    },
    
    bookings: {
      pilgrims: 'Pilgrims',
      totalAmount: 'Total Amount',
      bookingDate: 'Booking Date',
      bookingId: 'Booking ID',
      contactInfo: 'Contact Information',
      specialRequests: 'Special Requests',
      organizer: 'Tour Organizer',
      viewTrip: 'View Trip',
      writeReview: 'Write Review'
    },
    
    bookingStatus: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      completed: 'Completed'
    },

    // Trip listing
    destination: 'Destination',
    duration: 'Duration',
    price: 'Price',
    groupSize: 'Group Size',
    departure: 'Departure',
    bookNow: 'Book Now',
    viewDetails: 'View Details',
    filterByDestination: 'Filter by Destination',
    filterByPrice: 'Filter by Price',
    sortBy: 'Sort By',
    dateRange: 'Date Range',
    
    // Trips page
    tripsPage: {
      title: 'Find Your Perfect Pilgrimage',
      description: 'Compare packages from verified organizers worldwide',
      filters: 'Filters',
      allPrices: 'All prices',
      allOrganizers: 'All organizers',
      clearFilters: 'Clear',
      clearAllFilters: 'Clear all filters',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      highestRated: 'Highest Rated',
      departureDate: 'Departure Date',
      tripsFound: 'Trips Found',
      noTripsFound: 'No trips found',
      adjustFilters: 'Try adjusting your search criteria or filters to find more options.'
    },
    
    // Reviews
    reviewsPage: {
      title: 'Reviews',
      description: 'Read authentic reviews from fellow Zaers and share your own spiritual journey experiences',
      writeReview: 'Write Review',
      shareExperience: 'Share Your Experience',
      loginToView: 'Please log in to view and submit reviews.',
      loginToContinue: 'Log In to Continue'
    },
    
    // Footer
    footer: {
      companyDescription: 'Connecting verified tour operators with zaers seeking trusted spiritual journeys. Your gateway to authentic pilgrimage experiences.',
      quickLinks: 'Quick Links',
      browseTrips: 'Browse Trips',
      becomeOrganizer: 'Become Organizer',
      support: 'Support',
      helpCenter: 'Help Center',
      contactUs: 'Contact Us',
      safetyGuidelines: 'Safety Guidelines',
      copyright: '© 2025 GoPilgrims.com. All rights reserved. Serving the global Muslim community with trusted pilgrimage services.'
    },
    
    // Destinations
    destinations: {
      umrah: 'Umrah',
      hajj: 'Hajj',
      iraq: 'Iraq Ziyarat',
      iran: 'Iran Ziyarat',
      syria: 'Syria Ziyarat',
      combined: 'Combined Package'
    }
  },
  
  ar: {
    // Navigation
    homeNav: 'الرئيسية',
    trips: 'الرحلات',
    reviews: 'المراجعات',
    myBookingsNav: 'حجوزاتي',
    organizerDashboard: 'لوحة المنظم',
    organizerSignup: 'تسجيل المنظم',
    whatsappParser: 'محلل واتساب',
    whatsappDescription: 'قم بتحويل إعلانات الرحلات في واتساب إلى قوائم رحلات منظمة بسهولة وسرعة',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    admin: 'المدير',
    profile: 'الملف الشخصي',
    
    // Navigation items
    nav: {
      browse: 'تصفح الرحلات',
      help: 'المساعدة والدعم'
    },
    
    // Authentication buttons
    signIn: 'تسجيل الدخول',
    organisersSignUp: 'تسجيل المنظمين',
    pilgrimsSignUp: 'تسجيل الحجاج',
    
    // Common
    filter: 'تصفية',
    loading: 'جاري التحميل...',
    backToHome: 'العودة للرئيسية',
    selectLanguage: 'اختر اللغة',
    
    // Home page
    home: {
      hero: {
        title: 'اعثر على رحلتك',
        subtitle: 'الروحية المثالية',
        description: 'تواصل مع منظمي الرحلات الموثقين للحصول على تجارب حج أصيلة إلى الوجهات المقدسة حول العالم'
      },
      stats: {
        zaireens: 'زائرون سعداء',
        organizers: 'منظمون موثقون',
        destinations: 'وجهات مقدسة',
        reviews: 'مراجعات أصيلة',
        rating: 'متوسط التقييم'
      },
      features: {
        verified: 'منظمون موثقون',
        verifiedDesc: 'جميع منظمي الرحلات يخضعون للفحص والتوثيق الشامل',
        transparent: 'مراجعات شفافة',
        transparentDesc: 'اقرأ تجارب صادقة من زملائك المسافرين',
        secure: 'حجوزات آمنة',
        secureDesc: 'معالجة دفع آمنة ومحمية',
        support: 'دعم 24/7',
        supportDesc: 'مساعدة العملاء على مدار الساعة'
      },
      cta: {
        title: 'هل أنت مستعد لبدء رحلتك الروحية؟',
        description: 'انضم إلى آلاف الزوار الراضين الذين وجدوا حجهم المثالي من خلال منصتنا',
        button: 'ابدأ التخطيط اليوم'
      },
      featured: {
        title: 'الرحلات الروحية المميزة',
        subtitle: 'باقات حج مختارة بعناية من أكثر منظمينا موثوقية'
      }
    },
    
    // Search
    search: {
      destination: 'اختر وجهتك'
    },
    searchForm: {
      destination: 'الوجهة',
      date: 'تاريخ المغادرة',
      pilgrims: 'عدد الزوار',
      button: 'البحث عن رحلات',
      organizedBy: 'منظم بواسطة',
      priceRange: 'نطاق السعر'
    },
    
    // Authentication
    auth: {
      loginRequired: 'تسجيل الدخول مطلوب',
      loginToViewBookings: 'يرجى تسجيل الدخول لعرض حجوزاتك',
      accessDenied: 'رُفض الوصول',
      unauthorized: 'غير مخول',
      loginAgain: 'تم تسجيل خروجك. سجل الدخول مرة أخرى...'
    },
    
    // Booking Management
    myBookings: {
      title: 'حجوزاتي',
      subtitle: 'اعرض وأدر حجوزات رحلاتك',
      noBookings: 'لا توجد حجوزات بعد',
      noBookingsDesc: 'لم تقم بأي حجوزات بعد. تصفح رحلاتنا الرائعة للبدء!',
      browseTrips: 'تصفح الرحلات'
    },
    
    bookings: {
      pilgrims: 'الحجاج',
      totalAmount: 'المبلغ الإجمالي',
      bookingDate: 'تاريخ الحجز',
      bookingId: 'رقم الحجز',
      contactInfo: 'معلومات الاتصال',
      specialRequests: 'طلبات خاصة',
      organizer: 'منظم الرحلة',
      viewTrip: 'عرض الرحلة',
      writeReview: 'كتابة مراجعة'
    },
    
    bookingStatus: {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      cancelled: 'ملغي',
      completed: 'مكتمل'
    },

    // Trip listing
    destination: 'الوجهة',
    duration: 'المدة',
    price: 'السعر',
    groupSize: 'حجم المجموعة',
    departure: 'المغادرة',
    bookNow: 'احجز الآن',
    viewDetails: 'عرض التفاصيل',
    allTrips: 'جميع الرحلات',
    filterByDestination: 'تصفية حسب الوجهة',
    filterByPrice: 'تصفية حسب السعر',
    sortBy: 'ترتيب حسب',
    dateRange: 'نطاق التاريخ',
    
    // Trips page
    tripsPage: {
      title: 'اعثر على حجك المثالي',
      description: 'قارن الباقات من المنظمين الموثقين حول العالم',
      filters: 'المرشحات',
      allPrices: 'جميع الأسعار',
      allOrganizers: 'جميع المنظمين',
      clearFilters: 'مسح',
      clearAllFilters: 'مسح جميع المرشحات',
      priceLowToHigh: 'السعر: من الأقل للأعلى',
      priceHighToLow: 'السعر: من الأعلى للأقل',
      highestRated: 'الأعلى تقييماً',
      departureDate: 'تاريخ المغادرة',
      tripsFound: 'رحلة موجودة',
      noTripsFound: 'لم يتم العثور على رحلات',
      adjustFilters: 'جرب تعديل معايير البحث أو المرشحات للعثور على المزيد من الخيارات.'
    },
    
    // Reviews
    reviewsPage: {
      title: 'المراجعات',
      description: 'اقرأ مراجعات أصيلة من زوار آخرين وشارك تجارب رحلتك الروحية',
      writeReview: 'كتابة مراجعة',
      shareExperience: 'شارك تجربتك',
      loginToView: 'يرجى تسجيل الدخول لعرض وإرسال المراجعات.',
      loginToContinue: 'سجل الدخول للمتابعة'
    },
    
    // Footer
    footer: {
      companyDescription: 'ربط منظمي الرحلات الموثقين بالزائرين الذين يبحثون عن رحلات روحية موثوقة. بوابتك إلى تجارب الحج الأصيلة.',
      quickLinks: 'روابط سريعة',
      browseTrips: 'تصفح الرحلات',
      becomeOrganizer: 'كن منظماً',
      support: 'الدعم',
      helpCenter: 'مركز المساعدة',
      contactUs: 'اتصل بنا',
      safetyGuidelines: 'إرشادات السلامة',
      copyright: '© 2025 GoPilgrims.com. جميع الحقوق محفوظة. نخدم المجتمع الإسلامي العالمي بخدمات الحج الموثوقة.'
    },
    
    // Destinations
    destinations: {
      umrah: 'عمرة',
      hajj: 'حج',
      iraq: 'زيارة العراق',
      iran: 'زيارة إيران',
      syria: 'زيارة سوريا',
      combined: 'باقة مدمجة'
    }
  },
  
  ur: {
    // Navigation
    homeNav: 'گھر',
    trips: 'سفر',
    reviews: 'جائزے',
    myBookingsNav: 'میری بکنگز',
    organizerDashboard: 'منتظم ڈیش بورڈ',
    organizerSignup: 'منتظم رجسٹریشن',
    whatsappParser: 'واٹس ایپ پارسر',
    whatsappDescription: 'اپنے واٹس ایپ ٹور اعلانات کو آسانی سے منظم ٹرپ لسٹنگز میں تبدیل کریں',
    login: 'لاگ ان',
    logout: 'لاگ آؤٹ',
    admin: 'ایڈمن',
    profile: 'پروفائل',
    
    // Navigation items
    nav: {
      browse: 'سفر دیکھیں',
      help: 'مدد اور سپورٹ'
    },
    
    // Authentication buttons
    signIn: 'لاگ ان',
    organisersSignUp: 'منتظمین کا اندراج',
    pilgrimsSignUp: 'زائرین کا اندراج',
    
    // Common
    filter: 'فلٹر',
    loading: 'لوڈ ہو رہا ہے...',
    backToHome: 'گھر واپس',
    selectLanguage: 'زبان منتخب کریں',
    allTrips: 'تمام سفر دیکھیں',
    
    // Home page
    home: {
      hero: {
        title: 'اپنا کامل',
        subtitle: 'روحانی سفر تلاش کریں',
        description: 'دنیا بھر کے مقدس مقامات کے لیے معتبر ٹور آپریٹرز سے رابطہ کریں'
      },
      stats: {
        zaireens: 'خوش زائرین',
        organizers: 'تصدیق شدہ منتظمین',
        destinations: 'مقدس مقامات',
        reviews: 'سچے جائزے',
        rating: 'اوسط درجہ بندی'
      },
      trust: {
        title: 'GoPilgrims.com پر کیوں بھروسہ کریں؟',
        subtitle: 'آپ کے روحانی سفر کا اعلیٰ ترین معیار اور اصالت کا حقدار ہے',
        verified: 'تصدیق شدہ منتظمین',
        reviews: 'شفاف جائزے',
        payments: 'محفوظ ادائیگی',
        support: '24/7 سپورٹ'
      },
      features: {
        verified: 'تصدیق شدہ منتظمین',
        verifiedDesc: 'تمام ٹور آپریٹرز کی مکمل جانچ اور تصدیق',
        transparent: 'شفاف جائزے',
        transparentDesc: 'ساتھی مسافروں کے سچے تجربات پڑھیں',
        secure: 'محفوظ بکنگز',
        secureDesc: 'محفوظ اور محفوظ ادائیگی',
        support: '24/7 سپورٹ',
        supportDesc: 'مستقل کسٹمر مدد',
        browseVerified: 'تصدیق شدہ پیکیجز دیکھیں',
        comparePrices: 'قیمتوں اور جائزوں کا موازنہ کریں',
        readReviews: 'زائرین کے حقیقی جائزے پڑھیں',
        secureBooking: 'محفوظ بکنگ اور ادائیگی',
        listPackages: 'اپنے حج پیکیجز کی فہرست بنائیں',
        reachPilgrims: 'ہزاروں زائرین تک پہنچیں',
        manageBookings: 'آسانی سے بکنگز منظم کریں',
        buildReputation: 'اپنی معتبر ساکھ بنائیں'
      },
      cta: {
        title: 'کیا آپ اپنا روحانی سفر شروع کرنے کے لیے تیار ہیں؟',
        description: 'ہزاروں مطمئن زائرین میں شامل ہوں جنہوں نے ہمارے پلیٹ فارم کے ذریعے اپنا بہترین حج پایا',
        button: 'آج ہی منصوبہ بندی شروع کریں',
        forPilgrims: 'زائرین کے لیے',
        pilgrimDescription: 'تصدیق شدہ منتظمین کے ساتھ حقیقی روحانی سفر ڈھونڈیں اور بک کریں',
        pilgrimSignUp: 'اپنا سفر شروع کریں',
        forOrganizers: 'منتظمین کے لیے',
        organizerDescription: 'اپنے حج پیکیجز کی فہرست بنائیں اور دنیا بھر کے زائرین سے جڑیں',
        organizerSignUp: 'منتظم کے طور پر شامل ہوں'
      },
      featured: {
        title: 'نمایاں روحانی سفر',
        subtitle: 'ہمارے سب سے قابل اعتماد منتظمین کے منتخب کردہ حج پیکیجز'
      }
    },
    
    // Search
    search: {
      destination: 'اپنی منزل منتخب کریں'
    },
    searchForm: {
      destination: 'منزل',
      date: 'روانگی کی تاریخ',
      pilgrims: 'زائرین کی تعداد',
      button: 'سفر تلاش کریں',
      organizedBy: 'منتظم',
      priceRange: 'قیمت کی حد'
    },
    
    // Authentication
    auth: {
      loginRequired: 'لاگ ان ضروری ہے',
      loginToViewBookings: 'اپنی بکنگز دیکھنے کے لیے لاگ ان کریں',
      accessDenied: 'رسائی مسترد',
      unauthorized: 'غیر مجاز',
      loginAgain: 'آپ لاگ آؤٹ ہو گئے ہیں۔ دوبارہ لاگ ان کریں...'
    },
    
    // Booking Management
    myBookings: {
      title: 'میری بکنگز',
      subtitle: 'اپنی ٹرپ بکنگز دیکھیں اور منظم کریں',
      noBookings: 'ابھی کوئی بکنگ نہیں',
      noBookingsDesc: 'آپ نے ابھی تک کوئی بکنگ نہیں کی۔ شروع کرنے کے لیے ہمارے شاندار سفر دیکھیں!',
      browseTrips: 'سفر دیکھیں'
    },
    
    // Destinations
    destinations: {
      umrah: 'عمرہ',
      hajj: 'حج',
      iraq: 'عراق زیارت',
      iran: 'ایران زیارت',
      syria: 'شام زیارت',
      combined: 'مشترکہ پیکیج'
    }
  },
  
  fa: {
    // Navigation
    homeNav: 'خانه',
    trips: 'سفرها',
    reviews: 'نظرات',
    myBookingsNav: 'رزروهای من',
    login: 'ورود',
    logout: 'خروج',
    
    // Common
    loading: 'در حال بارگذاری...',
    selectLanguage: 'انتخاب زبان',
    
    // Home page
    home: {
      hero: {
        title: 'سفر معنوی',
        subtitle: 'کامل خود را پیدا کنید',
        description: 'با تورگردان‌های معتبر برای تجربه‌های زیارتی اصیل به مقاصد مقدس جهان ارتباط برقرار کنید'
      },
      stats: {
        zaireens: 'زائران خوشحال',
        organizers: 'سازمان‌دهندگان تأیید شده',
        destinations: 'مقاصد مقدس',
        reviews: 'نظرات اصیل',
        rating: 'میانگین امتیاز'
      }
    },
    
    // Destinations
    destinations: {
      umrah: 'عمره',
      hajj: 'حج',
      iraq: 'زیارت عراق',
      iran: 'زیارت ایران',
      syria: 'زیارت شام',
      combined: 'بسته ترکیبی'
    }
  },
  
  gu: {
    // Navigation
    homeNav: 'ઘર',
    trips: 'પ્રવાસો',
    reviews: 'સમીક્ષાઓ',
    myBookingsNav: 'મારી બુકિંગ્સ',
    login: 'લૉગિન',
    logout: 'લૉગઆઉટ',
    
    // Common
    loading: 'લોડ થઈ રહ્યું છે...',
    selectLanguage: 'ભાષા પસંદ કરો',
    
    // Home page
    home: {
      hero: {
        title: 'તમારો સંપૂર્ણ',
        subtitle: 'આધ્યાત્મિક પ્રવાસ શોધો',
        description: 'વિશ્વભરના પવિત્ર સ્થળોમાં પ્રામાણિક તીર્થયાત્રા અનુભવો માટે ચકાસાયેલા ટૂર ઓપરેટરો સાથે જોડાઓ'
      },
      stats: {
        zaireens: 'ખુશ યાત્રીઓ',
        organizers: 'ચકાસાયેલા આયોજકો',
        destinations: 'પવિત્ર સ્થળો',
        reviews: 'પ્રામાણિક સમીક્ષાઓ',
        rating: 'સરેરાશ રેટિંગ'
      }
    },
    
    // Destinations
    destinations: {
      umrah: 'ઉમરાહ',
      hajj: 'હજ',
      iraq: 'ઇરાક ઝિયારત',
      iran: 'ઇરાન ઝિયારત',
      syria: 'સીરિયા ઝિયારત',
      combined: 'સંયુક્ત પેકેજ'
    }
  }
};

// Translation function
export function useTranslation() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    if (typeof value !== 'string') {
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