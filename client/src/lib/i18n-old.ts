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
    organizerDashboard: 'Organizer Dashboard',
    organizerSignup: 'Organizer Signup',
    whatsappParser: 'WhatsApp Parser',
    whatsappDescription: 'Convert your WhatsApp tour announcements into structured trip listings quickly and easily',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin',
    
    // Common
    filter: 'Filter',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    create: 'Create',
    update: 'Update',
    view: 'View',
    close: 'Close',
    
    // Home page - nested structure
    home: {
      hero: {
        title: 'Find Your Perfect',
        subtitle: 'Spiritual Journey',
        description: 'Connect with verified tour operators for authentic pilgrimage experiences to sacred destinations worldwide'
      },
      stats: {
        zaireens: 'Happy Zaireens',
        organizers: 'Verified Organizers',
        operators: 'Verified Operators',
        destinations: 'Sacred Destinations',
        reviews: 'Authentic Reviews',
        rating: 'Average Rating',
        countries: 'Countries Served'
      },
      features: {
        verified: 'Verified Organizers',
        verifiedDesc: 'All tour operators are thoroughly vetted and verified',
        transparent: 'Transparent Reviews',
        transparentDesc: 'Read honest experiences from fellow travelers',
        secure: 'Secure Bookings',
        secureDesc: 'Safe and secure payment processing',
        support: '24/7 Support',
        supportDesc: 'Round-the-clock customer assistance'
      },
      cta: {
        title: 'Ready to Begin Your Spiritual Journey?',
        description: 'Join thousands of satisfied zaireens who found their perfect pilgrimage through our platform',
        button: 'Start Planning Today'
      },
      featured: {
        title: 'Featured Spiritual Journeys',
        subtitle: 'Handpicked pilgrimage packages from our most trusted organizers'
      },
      trust: {
        title: 'Why Choose MakeMeZaer?',
        subtitle: 'Your trusted partner for authentic spiritual journeys',
        verified: 'Verified Organizers',
        reviews: 'Transparent Reviews',
        payments: 'Secure Payments',
        support: '24/7 Support'
      },
      organizer: {
        title: 'Are You a Tour Organizer?',
        subtitle: 'Join our network of trusted spiritual journey organizers and reach thousands of zaireens worldwide'
      }
    },
    
    // Navigation structure
    nav: {
      browse: 'Browse Trips',
      organizers: 'For Organizers',
      help: 'Help & Support'
    },
    
    // Search structure
    search: {
      destination: 'Destination',
      date: 'Departure Date',
      pilgrims: 'Number of Zaireens',
      button: 'Search Trips'
    },
    
    // Keep flat structure for simple keys
    welcomeTitle: 'Find Your Perfect Spiritual Journey',
    welcomeSubtitle: 'Connect with verified organizers for authentic pilgrimage experiences to sacred destinations',
    searchPlaceholder: 'Search destinations, dates, or packages...',
    featuredTrips: 'Featured Spiritual Journeys',
    backToHome: 'Back to Home',
    
    // Language switcher
    selectLanguage: 'Select Language',
    
    // Trips
    destination: 'Destination',
    duration: 'Duration',
    price: 'Price',
    groupSize: 'Group Size',
    departure: 'Departure',
    bookNow: 'Book Now',
    viewDetails: 'View Details',
    allTrips: 'All Trips',
    filterByDestination: 'Filter by Destination',
    filterByPrice: 'Filter by Price',
    sortBy: 'Sort By',
    priceRange: 'Price Range',
    dateRange: 'Date Range',
    
    // Reviews
    writeReview: 'Write Review',
    shareExperience: 'Share Your Experience',
    helpFellowZaers: 'Help fellow Zaers by sharing your spiritual journey experience',
    overallRating: 'Overall Rating',
    detailedRatings: 'Detailed Ratings',
    rateSpecificAspects: 'Rate specific aspects (1-5 stars each)',
    spiritualGuidance: 'Spiritual Guidance',
    spiritualGuidanceFull: 'Spiritual Guidance by Zakire Ahlul Bayt',
    spiritualCoverage: 'Aamaal Coverage',
    spiritualCoverageFull: 'Spiritual Coverage of Aamaal',
    accommodationDistance: 'Location',
    accommodationDistanceFull: 'Accommodation Distance from Haram',
    supportBehavior: 'Support',
    supportBehaviorFull: 'Support/Behaviour from Leader and Volunteers',
    foodQuality: 'Food',
    foodQualityFull: 'Quality of Food',
    hotelQuality: 'Hotel',
    hotelQualityFull: 'Hotel, Bed and Bath',
    valueForMoney: 'Value',
    valueForMoneyFull: 'Value for Money',
    transportation: 'Transport',
    transportationFull: 'Transportation and Commuting',
    proServices: 'PRO Services',
    proServicesFull: 'PRO Services - Ease of Visa clearance, Airport Entry/Exit',
    reviewTitle: 'Review Title',
    reviewComment: 'Your Experience',
    selectTrip: 'Select Trip',
    chooseCompletedTrip: 'Choose a completed trip',
    submitReview: 'Submit Review',
    ratingBreakdown: 'Rating Breakdown',
    verified: 'Verified',
    zaerReview: 'Zaer Review',
    noReviewsFound: 'No reviews found',
    adjustFilters: 'Try adjusting your search or filters',
    firstToReview: 'Be the first to share your spiritual journey experience',
    allRatings: 'All Ratings',
    
    // Trip Details
    itinerary: 'Daily Itinerary',
    accommodation: 'Accommodation',
    inclusions: 'Inclusions',
    exclusions: 'Exclusions',
    zakirs: 'Trip Zakirs (Spiritual Priests)',
    organizer: 'Organizer',
    
    // Organizer Dashboard
    dashboard: 'Dashboard',
    myTrips: 'My Trips',
    createTrip: 'Create Trip',
    editTrip: 'Edit Trip',
    tripManagement: 'Trip Management',
    
    // Admin
    userManagement: 'User Management',
    organizerVerification: 'Organizer Verification',
    systemSettings: 'System Settings',
    
    // Forms
    tripTitle: 'Trip Title',
    description: 'Description',
    startDate: 'Start Date',
    endDate: 'End Date',
    maxPilgrims: 'Maximum Pilgrims',
    
    // Messages
    success: 'Success',
    error: 'Error',
    unauthorized: 'Unauthorized',
    loggedOut: 'You are logged out. Logging in again...',
    reviewSubmitted: 'Review submitted successfully!',
    failedToSubmit: 'Failed to submit review. Please try again.',
    
    // Destinations
    umrah: 'Umrah',
    hajj: 'Hajj',
    iraq: 'Iraq Ziyarat',
    iran: 'Iran Ziyarat',
    syria: 'Syria Ziyarat',
    combined: 'Combined Package'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    trips: 'الرحلات',
    reviews: 'المراجعات',
    organizerDashboard: 'لوحة المنظم',
    organizerSignup: 'تسجيل منظم',
    whatsappParser: 'محلل واتساب',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    admin: 'إدارة',
    
    // Common
    search: 'بحث',
    filter: 'تصفية',
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تحرير',
    delete: 'حذف',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    submit: 'إرسال',
    create: 'إنشاء',
    update: 'تحديث',
    view: 'عرض',
    close: 'إغلاق',
    
    // Home page
    welcomeTitle: 'اعثر على رحلتك الروحية المثالية',
    welcomeSubtitle: 'تواصل مع منظمين موثقين لتجارب حج أصيلة إلى المقاصد المقدسة',
    searchPlaceholder: 'البحث عن الوجهات والتواريخ والحزم...',
    featuredTrips: 'الرحلات الروحية المميزة',
    backToHome: 'العودة للرئيسية',
    
    // Language switcher
    selectLanguage: 'اختر اللغة',
    
    // Trips
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
    priceRange: 'نطاق السعر',
    dateRange: 'نطاق التاريخ',
    
    // Reviews
    writeReview: 'كتابة مراجعة',
    shareExperience: 'شارك تجربتك',
    helpFellowZaers: 'ساعد الزوار الآخرين من خلال مشاركة تجربة رحلتك الروحية',
    overallRating: 'التقييم العام',
    detailedRatings: 'التقييمات التفصيلية',
    rateSpecificAspects: 'قيم جوانب محددة (من 1-5 نجوم لكل منها)',
    spiritualGuidance: 'الإرشاد الروحي',
    spiritualGuidanceFull: 'الإرشاد الروحي من قبل ذاكر أهل البيت',
    spiritualCoverage: 'تغطية الأعمال',
    spiritualCoverageFull: 'التغطية الروحية للأعمال',
    accommodationDistance: 'الموقع',
    accommodationDistanceFull: 'المسافة من الحرم',
    supportBehavior: 'الدعم',
    supportBehaviorFull: 'الدعم والسلوك من القائد والمتطوعين',
    foodQuality: 'الطعام',
    foodQualityFull: 'جودة الطعام',
    hotelQuality: 'الفندق',
    hotelQualityFull: 'الفندق والسرير والحمام',
    valueForMoney: 'القيمة',
    valueForMoneyFull: 'القيمة مقابل المال',
    transportation: 'النقل',
    transportationFull: 'النقل والمواصلات',
    proServices: 'خدمات PRO',
    proServicesFull: 'خدمات الـ PRO - سهولة تخليص التأشيرة ودخول/خروج المطار',
    reviewTitle: 'عنوان المراجعة',
    reviewComment: 'تجربتك',
    selectTrip: 'اختر الرحلة',
    chooseCompletedTrip: 'اختر رحلة مكتملة',
    submitReview: 'إرسال المراجعة',
    ratingBreakdown: 'تفصيل التقييم',
    verified: 'موثق',
    zaerReview: 'مراجعة زائر',
    noReviewsFound: 'لم يتم العثور على مراجعات',
    adjustFilters: 'جرب تعديل البحث أو المرشحات',
    firstToReview: 'كن أول من يشارك تجربة رحلتك الروحية',
    allRatings: 'جميع التقييمات',
    
    // Destinations
    umrah: 'عمرة',
    hajj: 'حج',
    iraq: 'زيارة العراق',
    iran: 'زيارة إيران',
    syria: 'زيارة سوريا',
    combined: 'باقة مدمجة'
  },
  
  ur: {
    home: 'گھر',
    trips: 'سفر',
    reviews: 'جائزے',
    organizerDashboard: 'منتظم ڈیش بورڈ',
    organizerSignup: 'منتظم رجسٹریشن',
    whatsappParser: 'واٹس ایپ پارسر',
    login: 'لاگ ان',
    logout: 'لاگ آؤٹ',
    admin: 'ایڈمن',
    search: 'تلاش',
    filter: 'فلٹر',
    loading: 'لوڈ ہو رہا ہے...',
    save: 'محفوظ کریں',
    cancel: 'منسوخ کریں',
    edit: 'ترمیم',
    delete: 'حذف',
    back: 'واپس',
    next: 'اگلا',
    previous: 'پچھلا',
    submit: 'جمع کریں',
    create: 'بنائیں',
    update: 'اپ ڈیٹ',
    view: 'دیکھیں',
    close: 'بند کریں',
    welcomeTitle: 'اپنا بہترین روحانی سفر تلاش کریں',
    welcomeSubtitle: 'مقدس مقامات کے لیے صحیح حج کے تجربات کے لیے تصدیق شدہ منتظمین سے رابطہ کریں',
    searchPlaceholder: 'منزلیں، تاریخیں، یا پیکجز تلاش کریں...',
    featuredTrips: 'نمایاں روحانی سفر',
    backToHome: 'گھر واپس',
    selectLanguage: 'زبان منتخب کریں',
    destination: 'منزل',
    duration: 'مدت',
    price: 'قیمت',
    groupSize: 'گروپ کا سائز',
    departure: 'روانگی',
    bookNow: 'ابھی بک کریں',
    viewDetails: 'تفصیلات دیکھیں',
    writeReview: 'جائزہ لکھیں',
    shareExperience: 'اپنا تجربہ شیئر کریں',
    helpFellowZaers: 'اپنے روحانی سفر کے تجربے کا اشتراک کرکے ساتھی زائرین کی مدد کریں',
    overallRating: 'مجموعی درجہ بندی',
    detailedRatings: 'تفصیلی درجہ بندی',
    rateSpecificAspects: 'مخصوص پہلوؤں کی درجہ بندی کریں (ہر ایک کے لیے 1-5 ستارے)',
    spiritualGuidance: 'روحانی رہنمائی',
    spiritualGuidanceFull: 'ذاکر اہل بیت کی روحانی رہنمائی',
    spiritualCoverage: 'اعمال کا احاطہ',
    spiritualCoverageFull: 'اعمال کا روحانی احاطہ',
    accommodationDistance: 'مقام',
    accommodationDistanceFull: 'حرم سے رہائش کا فاصلہ',
    supportBehavior: 'سپورٹ',
    supportBehaviorFull: 'قائد اور رضاکاروں کی حمایت/رفتار',
    foodQuality: 'کھانا',
    foodQualityFull: 'کھانے کا معیار',
    hotelQuality: 'ہوٹل',
    hotelQualityFull: 'ہوٹل، بستر اور باتھ',
    valueForMoney: 'قیمت',
    valueForMoneyFull: 'پیسے کی قیمت',
    transportation: 'نقل و حمل',
    transportationFull: 'نقل و حمل اور آمد و رفت',
    proServices: 'PRO خدمات',
    proServicesFull: 'PRO خدمات - ویزا کلیئرنس، ایئرپورٹ انٹری/ایگزٹ کی آسانی',
    umrah: 'عمرہ',
    hajj: 'حج',
    iraq: 'عراق زیارت',
    iran: 'ایران زیارت',
    syria: 'شام زیارت',
    combined: 'مشترکہ پیکیج'
  },
  
  fa: {
    home: 'خانه',
    trips: 'سفرها',
    reviews: 'نظرات',
    organizerDashboard: 'داشبورد برگزارکننده',
    organizerSignup: 'ثبت‌نام برگزارکننده',
    whatsappParser: 'تجزیه‌گر واتساپ',
    login: 'ورود',
    logout: 'خروج',
    admin: 'مدیریت',
    search: 'جستجو',
    filter: 'فیلتر',
    loading: 'در حال بارگذاری...',
    save: 'ذخیره',
    cancel: 'لغو',
    edit: 'ویرایش',
    delete: 'حذف',
    back: 'بازگشت',
    next: 'بعدی',
    previous: 'قبلی',
    submit: 'ارسال',
    create: 'ایجاد',
    update: 'به‌روزرسانی',
    view: 'مشاهده',
    close: 'بستن',
    welcomeTitle: 'سفر روحانی کامل خود را پیدا کنید',
    welcomeSubtitle: 'با برگزارکنندگان تایید شده برای تجربه‌های اصیل حج به مقاصد مقدس ارتباط برقرار کنید',
    searchPlaceholder: 'جستجوی مقاصد، تاریخ‌ها، یا بسته‌ها...',
    featuredTrips: 'سفرهای روحانی ویژه',
    backToHome: 'بازگشت به خانه',
    selectLanguage: 'انتخاب زبان',
    destination: 'مقصد',
    duration: 'مدت',
    price: 'قیمت',
    groupSize: 'اندازه گروه',
    departure: 'حرکت',
    bookNow: 'هم اکنون رزرو کنید',
    viewDetails: 'مشاهده جزئیات',
    writeReview: 'نوشتن نظر',
    shareExperience: 'تجربه خود را به اشتراک بگذارید',
    helpFellowZaers: 'با به اشتراک گذاشتن تجربه سفر روحانی خود به زائران همکار کمک کنید',
    overallRating: 'امتیاز کلی',
    detailedRatings: 'امتیازات تفصیلی',
    rateSpecificAspects: 'جنبه‌های خاص را امتیاز دهید (1-5 ستاره برای هر کدام)',
    spiritualGuidance: 'راهنمایی روحانی',
    spiritualGuidanceFull: 'راهنمایی روحانی توسط ذاکر أهل البیت',
    spiritualCoverage: 'پوشش اعمال',
    spiritualCoverageFull: 'پوشش روحانی اعمال',
    accommodationDistance: 'موقعیت',
    accommodationDistanceFull: 'فاصله اقامت از حرم',
    supportBehavior: 'حمایت',
    supportBehaviorFull: 'حمایت/رفتار رهبر و داوطلبان',
    foodQuality: 'غذا',
    foodQualityFull: 'کیفیت غذا',
    hotelQuality: 'هتل',
    hotelQualityFull: 'هتل، تخت و حمام',
    valueForMoney: 'ارزش',
    valueForMoneyFull: 'ارزش در برابر پول',
    transportation: 'حمل و نقل',
    transportationFull: 'حمل و نقل و رفت و آمد',
    proServices: 'خدمات PRO',
    proServicesFull: 'خدمات PRO - سهولت تسویه ویزا، ورود/خروج فرودگاه',
    umrah: 'عمره',
    hajj: 'حج',
    iraq: 'زیارت عراق',
    iran: 'زیارت ایران',
    syria: 'زیارت سوریه',
    combined: 'بسته ترکیبی'
  },
  
  gu: {
    home: 'ઘર',
    trips: 'પ્રવાસો',
    reviews: 'સમીક્ષાઓ',
    organizerDashboard: 'આયોજક ડેશબોર્ડ',
    organizerSignup: 'આયોજક સાઇનઅપ',
    whatsappParser: 'વોટ્સએપ પાર્સર',
    login: 'લોગિન',
    logout: 'લોગઆઉટ',
    admin: 'એડમિન',
    search: 'શોધ',
    filter: 'ફિલ્ટર',
    loading: 'લોડ થઈ રહ્યું છે...',
    save: 'સાચવો',
    cancel: 'રદ કરો',
    edit: 'સંપાદન',
    delete: 'કાઢી નાખો',
    back: 'પાછા',
    next: 'આગળ',
    previous: 'પહેલાં',
    submit: 'સબમિટ કરો',
    create: 'બનાવો',
    update: 'અપડેટ',
    view: 'જુઓ',
    close: 'બંધ કરો',
    welcomeTitle: 'તમારી સંપૂર્ણ આધ્યાત્મિક યાત્રા શોધો',
    welcomeSubtitle: 'પવિત્ર સ્થળોના પ્રામાણિક હજ અનુભવો માટે ચકાસાયેલા આયોજકો સાથે જોડાઓ',
    searchPlaceholder: 'ગંતવ્યો, તારીખો, કે પેકેજો શોધો...',
    featuredTrips: 'વિશિષ્ટ આધ્યાત્મિક યાત્રાઓ',
    backToHome: 'ઘરે પાછા',
    selectLanguage: 'ભાષા પસંદ કરો',
    destination: 'ગંતવ્ય',
    duration: 'અવધિ',
    price: 'કિંમત',
    groupSize: 'જૂથનું કદ',
    departure: 'પ્રસ્થાન',
    bookNow: 'હવે બુક કરો',
    viewDetails: 'વિગતો જુઓ',
    writeReview: 'સમીક્ષા લખો',
    shareExperience: 'તમારો અનુભવ શેર કરો',
    helpFellowZaers: 'તમારી આધ્યાત્મિક યાત્રાનો અનુભવ શેર કરીને સાથી ઝાઇરોને મદદ કરો',
    overallRating: 'એકંદર રેટિંગ',
    detailedRatings: 'વિગતવાર રેટિંગ્સ',
    rateSpecificAspects: 'વિશિષ્ટ પાસાઓને રેટ કરો (દરેક માટે 1-5 સ્ટાર)',
    spiritualGuidance: 'આધ્યાત્મિક માર્ગદર્શન',
    spiritualGuidanceFull: 'ઝાકિર અહલ બૈત દ્વારા આધ્યાત્મિક માર્ગદર્શન',
    spiritualCoverage: 'આમાલ કવરેજ',
    spiritualCoverageFull: 'આમાલનું આધ્યાત્મિક કવરેજ',
    accommodationDistance: 'સ્થાન',
    accommodationDistanceFull: 'હરમથી આવાસનું અંતર',
    supportBehavior: 'સહાય',
    supportBehaviorFull: 'નેતા અને સ્વયંસેવકો પાસેથી સહાય/વર્તન',
    foodQuality: 'ખોરાક',
    foodQualityFull: 'ખોરાકની ગુણવત્તા',
    hotelQuality: 'હોટેલ',
    hotelQualityFull: 'હોટેલ, પથારી અને બાથ',
    valueForMoney: 'મૂલ્ય',
    valueForMoneyFull: 'પૈસાની કિંમત',
    transportation: 'પરિવહન',
    transportationFull: 'પરિવહન અને આવવા-જવા',
    proServices: 'PRO સેવાઓ',
    proServicesFull: 'PRO સેવાઓ - વિઝા ક્લિયરન્સ, એરપોર્ટ એન્ટ્રી/એક્ઝિટની સરળતા',
    umrah: 'ઉમરાહ',
    hajj: 'હજ',
    iraq: 'ઇરાક ઝિયારત',
    iran: 'ઇરાન ઝિયારત',
    syria: 'સીરિયા ઝિયારત',
    combined: 'સંયુક્ત પેકેજ'
  }
};

// Get browser language preference
export const getDefaultLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferredLanguage');
    if (stored && stored in supportedLanguages) {
      return stored;
    }
    
    const browserLang = navigator.language.split('-')[0];
    return browserLang in supportedLanguages ? browserLang : 'en';
  }
  return 'en';
};

// Translation hook
export const useTranslation = () => {
  const { currentLanguage, setLanguage, isRTL } = useLanguage();
  
  const changeLanguage = (lang: string) => {
    if (lang in supportedLanguages) {
      setLanguage(lang as any);
    }
  };
  
  const t = (key: string): string => {
    const keys = key.split('.');
    const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    
    let value: any = currentTranslations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // If value not found in current language, try English fallback
    if (value === undefined) {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { 
    language: currentLanguage, 
    changeLanguage, 
    t, 
    isRTL, 
    supportedLanguages,
    currentLanguage,
    setLanguage
  };
};